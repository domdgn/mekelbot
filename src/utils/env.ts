import { defineEnv, string } from "@ctroenv/core";
import { loadEnv } from "@ctroenv/node";

export const env = defineEnv({
    clientID: string(),
    accessToken: string(),
    GITHUB_OWNER: string(),
    GITHUB_REPO: string(),
    GITHUB_BRANCH: string(),
    GITHUB_TOKEN: string(),
    refreshToken: string(),
    clientSecret: string(),
},
{
    source: loadEnv(),
});