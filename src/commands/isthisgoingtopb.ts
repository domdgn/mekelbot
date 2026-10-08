import * as fs from "node:fs";
import type { ICommand } from "../interfaces/ICommand.js";
import { selectRandom } from "../utils/utils.js";
import json5 from "json5";

const messages = json5.parse(fs.readFileSync("./src/data/messages.json5", "utf8"));

const isthisgoingtopb: ICommand = {
    function: (reply: (text: string) => void) => {
        const chance = Math.floor(Math.random() * 101);
        let verdict: string;

        if (chance >= 90) {
            verdict = String(selectRandom(messages.pbHigh));
        } else if (chance >= 50) {
            verdict = String(selectRandom(messages.pbMed));
        } else {
            verdict = String(selectRandom(messages.pbLow));
        }

        reply(`/me ${verdict} | PB Chance: ${chance}%`);
    },
    name: "pbchance",
    parameters: { aliases: ["willthispb", "isthisgoingtopb"] },
    description: "Calculates using advanced prediction mathematics (AKA Math.random()) to see if mekel will pb this run!"
};

export { isthisgoingtopb };