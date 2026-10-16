import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const gg: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("gg")));
    },
    name: "gg",
    description: "Say gg!"
};
export { gg };