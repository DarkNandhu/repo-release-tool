import { FlutterProjectVersion } from "./flutter-project-version";
import { NodeProjectVersion } from "./node-project-version";
import { ProjectVersion } from "./project-version";

export const STRATEGY_MAP: Record<string, ProjectVersion> = {
  'node': new NodeProjectVersion(),
  'flutter': new FlutterProjectVersion()
}