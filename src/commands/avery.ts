import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const avery: ICommand = {
    function: async (context) => {
        await context.reply(selectRandom(getMessages("avery")));
    },
    name: "avery",
    parameters: { aliases: ["averity", "ave", "HeyItsMeItsAverity"] },
    description: "Random quote ALLEGEDLY from avery"
};

export { avery };