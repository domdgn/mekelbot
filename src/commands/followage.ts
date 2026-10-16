import type { ICommand } from "../interfaces/ICommand.js";

const followage: ICommand = {
    function: async (context) => {
        const broadcasterId = context.channelId;
        const userId = context.userId;

        const { data: [follow] } =
            await apiClient.channels.getChannelFollowers(
                broadcasterId,
                userId
            );

        if (!follow) {
            await context.reply(
                `${context.userDisplayName} isn't following this channel.`
            );
            return;
        }

        const followedAt = new Date(follow.followDate);
        const now = new Date();

        const daysFollowing = Math.floor(
            (now.getTime() - followedAt.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        await context.reply(
            `${context.userDisplayName} has been following for ${daysFollowing} days!`
        );
    },
    name: "followage",
    description: "Check your followage!"
};

export { followage };