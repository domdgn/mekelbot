
const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH ?? "main";
const token = process.env.GITHUB_TOKEN!;

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/messages.json`;

async function githubRequest(url: string, init?: RequestInit) {
    const response = await fetch(url, {
        ...init,
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
            ...init?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(
            `GitHub API error ${response.status}: ${await response.text()}`,
        );
    }

    return response;
}

export async function pushMessages(
    messages: Record<string, string[]>,
): Promise<void> {
    if (!token || !owner || !repo) {
        throw new Error("Missing GitHub environment variables");
    }

    // Get the current file SHA required to update an existing file.
    const fileResponse = await githubRequest(
        `${apiUrl}?ref=${encodeURIComponent(branch)}`,
    );
    const file = await fileResponse.json() as { sha: string };

    // Upload the new JSON. GitHub commits the change automatically.
    await githubRequest(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
        method: "PUT",
        body: JSON.stringify({
            message: "Update Twitch bot messages",
            content: Buffer.from(
                JSON.stringify(messages, null, 4) + "\n",
                "utf8",
            ).toString("base64"),
            sha: file.sha,
            branch,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
