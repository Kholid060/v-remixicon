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
function convertToCjs(content) {
  const result = content.replace(/export const /g, 'exports.');

  return result;
}

(async () => {
  let results = '';

  const icons = fg.sync('icons/**/*.svg');

  icons.forEach((svgPath) => {
    const svg = readFileSync(svgPath, 'utf8');
    const value = valueExtractor(svg);
    const name = nameExtractor(svgPath);
    const code = `export const ${name} = ${value}\n`;

    results += code;
  });
  const cjsContent = await convertToCjs('icons', results);

  await writeFile('icons.js', results);
  await writeFile('./cjs/icons.js', cjsContent);
})();
