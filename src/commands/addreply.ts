import type { ICommand } from "../interfaces/ICommand.js";
import { addMessage } from "../utils/messages.js";

const addreply: ICommand = {
    function: async (context) => {
        if (
            !context.msg.userInfo.isMod &&
            !context.msg.userInfo.isBroadcaster
        ) {
            await context.reply("Only mods can add replies!");
            return;
        }

        const args = context.text.trim();
        const spaceIndex = args.indexOf(" ");

        if (spaceIndex === -1) {
            await context.reply(
                "Usage: !addreply <category> <message>"
            );
            return;
        }

        const category = args.slice(0, spaceIndex).toLowerCase();
        const message = args.slice(spaceIndex + 1).trim();

        if (!message) {
            await context.reply(
                "Usage: !addreply <category> <message>"
            );
            return;
        }

        try {
            const added = await addMessage(category, message);

            if (added) {
                await context.reply(
                    `Added a message to ${category}! :3`
                );
            } else {
                await context.reply(
                    `Unknown category or message already exists: ${category}`
                );
            }
        } catch (error) {
            console.error("Failed to add reply:", error);
            await context.reply("Failed to save the message!");
        }
    },
    name: "addreply",
    description: "Add a message to a reply category (mods only)."
};

export { addreply };