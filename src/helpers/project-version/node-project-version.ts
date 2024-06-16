import { ProjectVersion } from "./project-version";
import fs from 'fs';

export class NodeProjectVersion implements ProjectVersion {
  getVersion(): string {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
    return packageJson.version;
  } 
  
}
