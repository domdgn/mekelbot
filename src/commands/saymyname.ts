import type { ICommand } from "../interfaces/ICommand.js";

const saymyname: ICommand = {
    function: (reply: (text: string) => void) => {
        reply(userDisplayName);
    },
    name: "saymyname",
    description: "Says your name"
};

export { saymyname };