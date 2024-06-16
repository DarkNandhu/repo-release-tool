import * as core from "@actions/core";
import { Release } from "./helpers/release";
import { Command } from "./helpers/command";

const command = new Command();

const setupGit = () => {
  command.exec(`git config user.email "github-actions-bot@users.noreply.github.com"`);
  command.exec(`git config user.name "github-actions-bot"`);
}

const run = async () => {
  try {
    setupGit();
    const githubToken = core.getInput("github_token");
    const language = core.getInput("language");
    if (!githubToken) {
      throw new Error("GITHUB_TOKEN environment variable is required");
    }

    await new Release(githubToken, language).create();
  } catch (e: any) {
    console.error(e);

    core.setFailed(`Unable to create release: Error: ${e.message}`);
  }
};

run();
