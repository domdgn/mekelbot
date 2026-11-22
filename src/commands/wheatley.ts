import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const wheatley: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("wheatley")));
    },
    name: "wheatley",
    parameters: { aliases: ["wheat", "wheatle", "pleasejusttellmeawheatleyquote"] },
    description: "wheatley said this!!"
};


export { wheatley };