
# Release Tool

A GitHub Action to create a tag and release for your project. This action configures Git and automates the process of creating a release on GitHub. It works for Node.js and Dart projects and will tag the code to the version provided in `package.json` or `pubspec.yml`. After tagging the version, it will push the tag and create a release with a simple release note generated from the commits between the last tag and the current tag.

## How It Works

The action follows these steps:

1. **Setup Git Configuration**:
   - Sets up Git with the necessary configurations using the `setupGit` function in `index.ts`.

2. **Create a Tag**:
   - The `Tag` class in `tag.ts` handles the creation of a new tag based on the version specified in the project’s configuration file (`package.json` or `pubspec.yml`).

3. **Generate Release Notes**:
   - The `Release` class in `release.ts` generates release notes from the commits between the last tag and the current tag.

4. **Create a Release**:
   - The `Release` class uses the GitHub API to create a release with the generated release notes.

## Usage

To use this action in your workflow, include the following step in your `.github/workflows/your-workflow.yml` file:

```yaml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Run Release Tool
        uses: DarkNandhu/repo-release-tool@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          language: 'flutter'
```

## Inputs

| Name          | Description                             | Required | Default |
| ------------- | --------------------------------------- | -------- | ------- |
| `github_token`| GitHub token for authentication         | `true`   |         |
| `language`    | Project language (e.g., flutter, node)  | `true`   |         |

## Example

Here is an example of how to use this action in your workflow:

```yaml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Run Release Tool
        uses: DarkNandhu/repo-release-tool@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          language: 'flutter'
```

## Development

### Prerequisites

- Node.js 20.x
- TypeScript

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/DarkNandhu/repo-release-tool.git
   cd repo-release-tool
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

### Project Structure

- `index.ts`: Entry point of the action.
- `tag.ts`: Handles the creation of tags based on the project version.
- `release.ts`: Manages the creation of releases and generation of release notes.
- `project-strategy.ts`: Determines the project version based on the language specified.
- `helpers/command.ts`: Helper class to execute shell commands.
- `helpers/project-version/project-strategy.ts`: Strategy pattern implementation for determining project versions.
- `helpers/project-version/project-version.ts`: Interface for project version strategies.

### Adding New Features

1. Create a new branch:

   ```sh
   git checkout -b my-new-feature
   ```

2. Make your changes and commit them:

   ```sh
   git commit -am 'Add new feature'
   ```

3. Push your branch:

   ```sh
   git push origin my-new-feature
   ```

4. Create a new Pull Request on GitHub.

## License

This project is licensed under the ISC License.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## Bugs and Issues

Please report any bugs or issues [here](https://github.com/DarkNandhu/repo-release-tool/issues).

## Authors

- [DarkNandhu](https://github.com/DarkNandhu)

## Acknowledgements

- [GitHub Actions](https://github.com/features/actions)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
