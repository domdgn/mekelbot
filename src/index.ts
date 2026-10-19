import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { Bot } from "@twurple/easy-bot";
import { env } from "./utils/env.js";
import { createCommands, commands } from "./utils/utils.js";

const auth = async () => {
    const a = new RefreshingAuthProvider({
        clientId: env.clientID,
        clientSecret: env.clientSecret,
    });

    await a.addUserForToken({
        accessToken: env.accessToken,
        refreshToken: env.refreshToken,
        expiresIn: 0,
        obtainmentTimestamp: 0,
    });

    a.addIntentsToUser(env.userID, ["chat"]);

    return a;
};

export const apiClient = new ApiClient({ authProvider });

const bot = new Bot({
    auth();,
    channel: "mekelec_",
    commands: createCommands(commands),
});

bot.onSub(({ broadcasterName, userName }) => {
    void bot.say(broadcasterName, `AWOO @${userName}!! subscribed to the channel!`);
});

bot.onResub(({ broadcasterName, userName, months }) => {
    void bot.say(broadcasterName, `AWOO @${userName}!! subscribed to the channel for a total of ${months} months!`);
});

bot.onSubGift(({ broadcasterName, gifterName, userName }) => {
    void bot.say(broadcasterName, `AWOO @${gifterName}!! gifted a subscription to @${userName}!`);
});

bot.onRaid(({ broadcasterName, userName, viewerCount }) => {
    const pupText = (viewerCount <= 1) ? "mekel egg" : "mekel eggs";
    void bot.say(broadcasterName, `AWOO!!! ${userName} is raiding with ${viewerCount} ${pupText}!!!`);
});

bot.onConnect(() => {
    console.log("woof woof it workin");
});