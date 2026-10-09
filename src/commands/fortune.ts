import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const fortune: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.fortune));
    },
    name: "fortune",
    description: "New fortune telling service in chat! Just run this command!!"
};

export { fortune };