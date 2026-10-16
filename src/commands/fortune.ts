import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const fortune: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("fortune")));
    },
    name: "fortune",
    description: "New fortune telling service in chat! Just run this command!!"
};

export { fortune };