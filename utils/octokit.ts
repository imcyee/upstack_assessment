import { Octokit } from "octokit";

const personalAccessToken = process.env.OCTOKIT_SECRET
const octokit = new Octokit({ auth: personalAccessToken });
const org = "react-native-community"

export { octokit, org }