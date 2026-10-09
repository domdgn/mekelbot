import { createBotCommand, type BotCommand } from "@twurple/easy-bot";
import type { ICommand } from "../interfaces/ICommand.js";
import { brown } from "../commands/brown.js";
import { fortune } from "../commands/fortune.js";
import { gg } from "../commands/gg.js";
import { gold } from "../commands/gold.js";
import { help } from "../commands/help.js";
import { isthisgoingtopb } from "../commands/isthisgoingtopb.js";
import { woof } from "../commands/woof.js";
import { pb } from "../commands/pb.js";
import { lurk } from "../commands/lurk.js";
import { freak } from "../commands/freak.js";
import { avery } from "../commands/avery.js";
import { saymyname } from "../commands/saymyname.js";

/** Reference to all commands in the bot. */
const commands = [ brown, gold, fortune, isthisgoingtopb, gg, woof, avery, lurk, pb, freak, help, saymyname, ];
const helpCmds = [ brown, gold, fortune, isthisgoingtopb, gg, woof, avery, lurk, pb, freak, help, ]

/**
 * Selects a random item from a given list.
 * @param list List of items
 * @returns Random item from the list
 */
const selectRandom = <T> (list: T[]): T=> {
    return list[Math.floor(Math.random() * list.length)]!;
};
/**
 * Creates a single command. Helper function for createCommands. Should not be called.
 * @param command Command conforming to ICommand
 * @returns Registered command
 */
const createSoloCommand = (command: ICommand) => {
    if (!command.parameters) { command.parameters = {}; }

    return createBotCommand(command.name, (params, { reply }) => {
        command.function(reply, params);
    }, command.parameters);
};

/**
 * Creates commands from a list of ICommand interfaces.
 * @param commands A list of ICommands to be created.
 * @returns List of BotCommand to give to a bot.
 */
const createCommands = (commands: ICommand[]) => {
    const completedCommands: BotCommand[] = [];

    commands.forEach((command) => {
        completedCommands.push(createSoloCommand(command));
    });

    return completedCommands;
};


/**
 * Generates a string of the command names for use in the help command.
 * @param commands List of ICommands to be included in the help command
 * @returns String in the format "commandName1 commandName2 [...]"
 */
const helpCommandGeneration = (commands: ICommand[]) => {
    let string: string = "";

    commands.forEach((command) => {
        string += ` !${command.name}`;
    });

    return string;
};
/**
 * String of the command names for use in the help command.
 */
const commandListString = helpCommandGeneration(helpCmds);


/**
 * Returns the ordinal of the number passed to it.
 * Only returns the ordinal, not the number.
 * Ex: 2 => "nd" and not "2nd", 3 => "rd" and not "3rd".
 * @param n Number to get the ordinal for
 * @returns Ordinal as a string
 */
const getOrdinal = (n: number) => {
    let ordinal = "th";
    if (n % 10 == 1 && n % 100 != 11) {
        ordinal = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
        ordinal = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
        ordinal = "rd";
    }

    return ordinal;
};

export { selectRandom, createCommands, commandListString, commands, getOrdinal };