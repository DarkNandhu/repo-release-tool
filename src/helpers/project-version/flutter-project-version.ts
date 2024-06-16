import { ProjectVersion } from "./project-version";
import fs from "fs";
import yaml from 'js-yaml';

export class FlutterProjectVersion implements ProjectVersion {
  getVersion(): string {
    const pubspec = fs.readFileSync("pubspec.yaml", "utf8");
    const doc: Record<string, any> = yaml.load(pubspec) as Record<string, any>;

    if (doc.version) {
      const version = doc.version.split('+')[0];
      return version;
    }
    
    throw new Error("Could not find version in pubspec.yaml");
  }
}
