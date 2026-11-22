import { pushMessages, fetchMessages } from "./githubHelper.js";

let data: Record<string, string[]> = {};
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = queue.then(task);
    queue = run.catch(() => {});
    return run;
}

export function loadMessages(): Promise<void> {
    return enqueue(async () => {
        data = await fetchMessages();
    });
}

try {
    await loadMessages();
} catch (error) {
    console.error("Initial message load failed:", error);
}

setInterval(() => {
    loadMessages().catch((err) =>
        console.error("Failed to refresh messages:", err),
    );
}, 5 * 60 * 1000);

export function getMessages(category: string): string[] {
    return data[category] ?? [];
}

export function addMessage(
    category: string,
    message: string,
): Promise<boolean> {
    return enqueue(async () => {
        try {
            const latest = await fetchMessages();

            if (!Array.isArray(latest[category])) {
                return false;
            }

            if (latest[category].includes(message)) {
                data = latest;
                return false;
            }

            latest[category].push(message);
            await pushMessages(latest);

            data = latest;
            return true;
        } catch (error) {
            console.error("Failed to save messages to GitHub:", error);
            return false;
        }
    });
}