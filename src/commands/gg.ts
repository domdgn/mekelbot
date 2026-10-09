import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const gg: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.gg));
    },
    name: "gg",
    description: "Say gg!"
};
export { gg };