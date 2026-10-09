import type { ICommand } from "../interfaces/ICommand.js";
import { getPBs } from "../utils/speedrunHelper.js";

const pb: ICommand = {
    function: async (context) => {
        await context.reply(`/me ${await getPBs()}`);
    },
    name: "pb",
    description: "Retrieves mekels's PB on the speedrun.com leaderboard!"
};

export { pb };