import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const woof: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("woof")));
    },
    name: "woof",
    parameters: { aliases: ["puppy", "dog"] },
    description: "*awoo's at you*"
};


export { woof };