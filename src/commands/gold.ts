import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const gold: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.gold));
    },
    name: "gold",
    parameters: { aliases: ["glod"] },
    description: "Celebrate a gold split with us!"
};

export { gold };