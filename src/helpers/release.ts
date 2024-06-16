import { Command } from "./command";
import { Tag } from "./tag";
import * as github from "@actions/github";

export class Release {
  private githubToken: string;
  private tag: Tag;
  private command: Command;

  constructor(token: string, lang: string) {
    this.githubToken = token;
    this.command = new Command();
    this.tag = new Tag(lang);
  }

  async create() {
    const currentTag = this.createTag();
    const releaseNodes = this.getReleaseNotes()
    await this.createRelease(currentTag, releaseNodes);
  }

  private async createRelease(tag: string, notes: string) {
    const octoKit = github.getOctokit(this.githubToken);
    const { owner, repo } = github.context.repo;
    
    octoKit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name: `Release v${tag}`,
      body: `## Changes\n\n${notes}`,
      draft: false,
      prerelease: false,
    })
  }

  private getReleaseNotes(): string {
    const allCommits: string = this.allCommits();

    return allCommits;
  }

  private allCommits(): string {
    if(!this.tag.lastVersion) {
      return this.command.exec('git log --pretty=format:"%s"');
    }
    return this.command.exec(`git log ${this.tag.lastVersion}..HEAD --pretty=format:"%s"`);
  }

  private createTag() {
    return this.tag.create();
  }
}