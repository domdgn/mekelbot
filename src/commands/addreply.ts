import type { ICommand } from "../interfaces/ICommand.js";
import { addMessage } from "../utils/messages.js";

const addreply: ICommand = {
    function: async (context, parameters) => {
        // Mods and broadcaster only
        if (
            !context.msg.userInfo.isMod &&
            !context.msg.userInfo.isBroadcaster
        ) {
            await context.reply("Only mods can add replies!");
            return;
        }

        // !addreply <category> <message>
        const category = parameters[0]?.toLowerCase();
        const message = parameters.slice(1).join(" ").trim();

        if (!category || !message) {
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
    parameters: { aliases: [] },
    description: "Add a message to a reply category (mods only)."
};

export { addreply };