import { STRATEGY_MAP } from "./constants";
import { ProjectVersion } from "./project-version";

export class ProjectStrategy {
  private strategy: ProjectVersion;

  constructor(language: string) {
    this.strategy = STRATEGY_MAP[language];
  }

  getVersion(): string {
    return this.strategy.getVersion();
  }
}