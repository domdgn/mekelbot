import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const gold: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("gold")));
    },
    name: "gold",
    parameters: { aliases: ["glod"] },
    description: "Celebrate a gold split with us!"
};

export { gold };