import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

export const freak: Command = {
    function: async (context) => {
        const r = Math.random();

        if (r <= 0.001) {
            await context.reply("Mods. ban this guy.");
            await context.say(`/timeout ${context.userDisplayName} 60`);
        } else {
            await context.reply(selectRandom(messages.freaky));
        }
    },
    name: "freak",
    parameters: { aliases: ["joi", "freaky"] },
    description: "Mekelec gets freaky on it!",
};