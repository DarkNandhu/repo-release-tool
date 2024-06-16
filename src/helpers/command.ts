import { execSync } from "child_process";

export class Command {
  exec(command: string) {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  }
}