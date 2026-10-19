
import messages from "../../messages/messages.json" with { type: "json" };
import { pushMessages } from "./githubHelper.js";

const data: Record<string, string[]> = messages;

export function getMessages(category: string): string[] {
    return data[category] ?? [];
}

export async function addMessage(
    category: string,
    message: string,
): Promise<boolean> {
    if (!Array.isArray(data[category])) {
        return false;
    }

    if (data[category].includes(message)) {
        return false;
    }

    data[category].push(message);

    try {
        await pushMessages(data);
        return true;
    } catch (error) {
        // Remove the message we just added if saving fails.
        const index = data[category].lastIndexOf(message);
        if (index !== -1) {
            data[category].splice(index, 1);
        }

        console.error("Failed to save messages to GitHub:", error);
        return false;
    }
}