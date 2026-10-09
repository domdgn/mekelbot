import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const freak: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.freaky));
    },
    name: "freak",
    parameters: { aliases: ["joi", "freaky"] },
    description: "Puppy gets freaky on it!"
};
export { freak };