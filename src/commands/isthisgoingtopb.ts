import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import { getMessages } from "../utils/messages.js";

const isthisgoingtopb: ICommand = {
    function: async (context) => {
        const chance = Math.floor(Math.random() * 101);
        let verdict: string;

        if (chance >= 90) {
            verdict = String(selectRandom(getMessages("pbHigh")));
        } else if (chance >= 50) {
            verdict = String(selectRandom(getMessages("pbMed")));
        } else {
            verdict = String(selectRandom(getMessages("pbLow")));
        }

        await context.reply(`/me ${verdict} | PB Chance: ${chance}%`);
    },
    name: "pbchance",
    parameters: { aliases: ["willthispb", "isthisgoingtopb"] },
    description: "Calculates using advanced prediction mathematics (AKA Math.random()) to see if mekel will pb this run!",
};

export { isthisgoingtopb };