import { Command } from "./command";
import { ProjectStrategy } from "./project-version/project-strategy";

export class Tag {
  language: string;
  commander: Command;
  private lastVerison?: string;
  private version?: string;

  constructor(language: string) {
    this.language = language;
    this.commander = new Command();
  }

  get currentVersion(): string | undefined {
    return this.version;
  }

  get lastVersion(): string | undefined {
    return this.lastVerison;
  }

  lastTag() {
    try {
      if(!this.lastVerison) {
        this.lastVerison = this.commander.exec("git describe --tags --abbrev=0");
      }

      return this.lastVerison;
    } catch (error) {
      return null;
    }
  }

  create() {
     this.version = this.currentProjectVersion();
    const lastVersion = this.lastTag();

    if (this.version === lastVersion) {
      throw new Error("Please bump the version of your project");
    }

    this.createTag(this.version);

    return this.version;
  }

  private createTag(currentProjectVersion: string) {
    this.commander.exec(`git tag -a ${currentProjectVersion} -m "Automatic Release version ${currentProjectVersion}`)
    this.commander.exec(`git push origin ${currentProjectVersion}`)
  }

  private currentProjectVersion() {
    return new ProjectStrategy(this.language).getVersion();
  }
}
