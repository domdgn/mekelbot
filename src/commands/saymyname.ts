import type { ICommand } from "../interfaces/ICommand.js";

const saymyname: ICommand = {
    function: async (context) => {
        await context.reply("${context.userDisplayName}");
    },
    name: "saymyname",
    description: "It... um... says your name..."
};

export { saymyname };