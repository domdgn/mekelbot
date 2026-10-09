import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import messages from "../data/messages.json" with { type: "json" };

const avery: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(messages.avery));
    },
    name: "avery",
    description: "Random quote ALLEGEDLY from avery"
};

export { avery };