import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { Bot } from "@twurple/easy-bot";
import { env } from "./utils/env.js";
import { createCommands, commands } from "./utils/utils.js";
import { exit } from "process";

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

const authenticated = await auth();

authenticated.onRefresh(async (userId, newToken) => {
    console.log(`Twitch refreshed the token for user ${userId}.`);

    // Save the new tokens to durable storage here.
    // Do not log the token values.
});

const apiClient = new ApiClient({ authProvider: authenticated, });

const bot = new Bot({
    authProvider: authenticated,
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

export { auth as authProvider, bot, apiClient };