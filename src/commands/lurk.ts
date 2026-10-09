import type { ICommand } from "../interfaces/ICommand.js";

const lurk: ICommand = {
    function: async (context) => {
        await context.reply("${context.userDisplayName} is now lurking! :3");
    },
    name: "lurk",
    description: "Tells us that you're lurking :3"
};

export { lurk };