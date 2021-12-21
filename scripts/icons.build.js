const { readFileSync } = require('fs');
const { writeFile } = require('fs/promises');
const { basename } = require('path');
const fg = require('fast-glob');
const camelcase = require('lodash.camelcase');

function valueExtractor(svg) {
  const match = svg.match(/d="([^"]*)"/g).pop();
  const value = match.replace('d=', '')

  return value;
}
function nameExtractor(svgPath) {
  const fileName = basename(svgPath, '.svg');
  const name = camelcase(`ri-${fileName}`);

  return name;
}
function convertToCjs(icons) {
  const result = icons.replace(/export const /g, 'exports.');

  return result;
}

(async () => {
  let results = '';
  let iconsTypes = '';

  const icons = fg.sync('icons/**/*.svg');
  const iconsName = [];

  icons.forEach((svgPath) => {
    const svg = readFileSync(svgPath, 'utf8');
    const value = valueExtractor(svg);
    const name = nameExtractor(svgPath);

    const code = `export const ${name} = ${value};\n`;
    const typeCode = `export declare const ${name}: string;\n`;

    results += code;
    iconsTypes += typeCode;
  });

  const cjsContent = convertToCjs(results);

  await writeFile('icons.mjs', results);
  await writeFile('icons.js', results);
  await writeFile('icons.d.ts', iconsTypes);
  await writeFile('./cjs/icons.js', cjsContent);
})();
