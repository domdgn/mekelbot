import type { BotCommandContext } from "@twurple/easy-bot";

/**
 * Command interface to ensure that it can be registered correctly.
 * @function function Function to be run
 * @member {string} name Name of the command
 * @member {object} parameters Parameters of the command (Optional)
 * @member {string} description A description of the command
 */
export interface ICommand {
    /** Function to be run */
    function: (context: BotCommandContext, parameters: string[]) => Promise<void>
    /** Name of the command */
    name: string
    /** Parameters of the command */
    parameters?: object
    /** A description of the command */
    description: string
}