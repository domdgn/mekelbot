import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const brown: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.brown));
    },
    name: "brown",
    parameters: { aliases: ["poop", "shit"] },
    description: "Celebrate a brown split with us!"
};

export { brown };