import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const freak: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("freaky")));
    },
    name: "freak",
    parameters: { aliases: ["joi", "freaky"] },
    description: "Puppy gets freaky on it!"
};
export { freak };