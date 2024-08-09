import { existsSync, promises as fs } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import type { Plugin } from 'vite';

export interface Options {
  packageJsonPath?: string;
  field?: string;
  fileName?: string;
}

function vitePluginGitVersion(options: Options = {}): Plugin {
  const {
    packageJsonPath = join(process.cwd(), 'package.json'),
    field = 'version',
    fileName = 'version.json',
  } = options;

  return {
    name: 'vite-plugin-git-version',
    apply: 'build',
    async buildStart() {
      if (!existsSync(packageJsonPath)) {
        console.error(`package.json not found at ${packageJsonPath}`);
        return;
      }

      try {
        const packageJson: Record<string, any> = JSON.parse(
          await fs.readFile(packageJsonPath, 'utf-8'),
        );
        const version = packageJson[field];
        const name = packageJson.name;
        if (!version) {
          console.error(`No ${field} field found in package.json`);
          return;
        }
        const command = 'git log -1 --pretty=format:';
        const commandContent = 'git log -3 --pretty=format:%s';
        const branch = execSync(`${command}%d`).toString().trim();
        const hash = execSync(`${command}%H`).toString().trim();
        const author = execSync(`${command}%cn`).toString().trim();
        const email = execSync(`${command}%ce`).toString().trim();
        const content = execSync(`${commandContent}`).toString().trim();

        // Generate current timestamp
        const getNowTime = () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        const jsonStr = {
          name,
          version,
          branch,
          hash,
          commitUser: `${author} (${email})`,
          commitContent: content,
          time: getNowTime(),
        };

        this.emitFile({
          fileName,
          source: JSON.stringify(jsonStr, null, 2),
          type: 'asset',
        });
      } catch (e) {
        console.error('Error:', e);
        console.error(`Error on loading package.json at ${packageJsonPath}`);
      }
    },
  };
}

export default vitePluginGitVersion;