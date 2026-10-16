import messages from "../data/messages.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const messagesPath = fileURLToPath(
    new URL("../data/messages.json", import.meta.url)
);

const data: Record<string, string[]> = messages;

export function getMessages(category: string): string[] {
    return data[category] ?? [];
}

export async function addMessage(
    category: string,
    message: string
): Promise<boolean> {
    if (!Array.isArray(data[category])) {
        return false;
    }

    if (data[category].includes(message)) {
        return false;
    }

    data[category].push(message);

    await writeFile(
        messagesPath,
        JSON.stringify(data, null, 4) + "\n",
        "utf8"
    );

    return true;
}