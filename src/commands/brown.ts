import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const brown: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("brown")));
    },
    name: "brown",
    parameters: { aliases: ["poop", "shit"] },
    description: "Celebrate a brown split with us!"
};

export { brown };