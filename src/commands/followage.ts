
import type { ICommand } from "../interfaces/ICommand.js";
import { apiClient } from "../index.js";

const followage: ICommand = {
    function: async (context) => {
        try {
            const { data } = await apiClient.channels.getChannelFollowers(
                context.broadcasterId,
                context.userId
            );

            const follow = data[0];

            if (!follow) {
                await context.reply(
                    `${context.userDisplayName} isn't following ${context.broadcasterName}.`
                );
                return;
            }

            const daysFollowing = Math.floor(
                (Date.now() - follow.followDate.getTime()) / 86_400_000
            );

            const years = Math.floor(daysFollowing / 365);
            const months = Math.floor((daysFollowing % 365) / 30);
            const days = daysFollowing - years * 365 - months * 30;

            const duration = [
                years ? `${years} year${years === 1 ? "" : "s"}` : "",
                months ? `${months} month${months === 1 ? "" : "s"}` : "",
                days ? `${days} day${days === 1 ? "" : "s"}` : ""
            ].filter(Boolean).join(", ") || "less than a day";

            await context.reply(
                `${context.userDisplayName} has been following ${context.broadcasterName} for ${duration}!`
            );
        } catch (error) {
            console.error("Failed to get followage:", error);
            await context.reply(
                "Couldn't check followage. Check the bot's Twitch API permissions."
            );
        }
    },
    name: "followage",
    description: "Check how long you've been following the channel!"
};

export { followage };
