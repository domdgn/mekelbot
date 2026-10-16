import type { ICommand } from "../interfaces/ICommand.js";

const discord: ICommand = {
    function: async (context) => {
        await context.reply(`https://discord.gg/BgNJ6fY3kc`);
    },
    name: "discord",
    description: "Discord link!"
};

export { discord };