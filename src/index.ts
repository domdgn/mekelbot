import { StaticAuthProvider } from "@twurple/auth";
import { Bot } from "@twurple/easy-bot";
import { env } from "./utils/env.js";
import { createCommands, commands } from "./utils/utils.js";

const authProvider = new StaticAuthProvider(env.clientID, env.accessToken);

const bot = new Bot({
    authProvider,
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
    void init();
    console.log("woof woof it workin");
});