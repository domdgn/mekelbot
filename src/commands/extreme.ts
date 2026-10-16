import type { ICommand } from "../interfaces/ICommand.js";

const extremegaming: ICommand = {
    function: async (context) => {
        await context.reply(`bro's gaming is EXTREME!!!`);
    },
    name: "extremegaming",
    description: "keaganextremegaming"
};

export { extremegaming };