import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const categories = {};

['src/lib'].forEach((dirPath) => {
    const fileData = [];
    const libNames = [];
    const dirNames = [];

    // 自动生成导出和单文件
    readdirSync(dirPath).forEach((dir) => {
        dirNames.push(dir);
        const metaFilePath = resolve(dirPath, dir, '_meta.json');
        let metaData = {};
        try {
            metaData = JSON.parse(readFileSync(metaFilePath, 'utf-8'));
        } catch (error) {
            console.error(`Error reading metadata for ${dir}:`, error);
        }

        categories[dir] = { displayName: metaData.name || 'Unknown Name' };
        const files = readdirSync(resolve(dirPath, dir));
        files.forEach((file) => {
            if (file === '_meta.json') return;
            if (file.endsWith('.test.js')) return;

            const filePath = resolve(dirPath, dir, file);
            const stat = statSync(filePath);

            if (stat.isFile() && file.endsWith('.js')) {
                const fileName = basename(file, '.js');
                const exportName = `${dir}_${fileName}`;
                libNames.push(exportName);
                fileData.push(
                    `export { default as ${exportName} } from './lib/${dir}/${file}';\n`
                );

                // 判断是否有相关标签
                const fileContent = readFileSync(filePath, { encoding: 'utf8' });
                if (!fileContent.includes('@author')) {
                    console.log(`${filePath} 文件缺少 [作者]`);
                }
            } else {
                console.log(`${dir}/${file} 不是一个函数文件`);
            }
        });
    });

    writeFileSync(`./src/index.js`, fileData.join(''));
    writeFileSync(`./${dirPath}Names.js`, `export const libNames = ${JSON.stringify(libNames)};`);
    console.log(`${dirPath} 数据生成完毕`);
});

writeFileSync('./categories.json', JSON.stringify(categories));