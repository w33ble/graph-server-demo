const micromatch = require('micromatch');

module.exports = {
  '*.{js,jsx,mjs,ts,tsx}': ['eslint --fix'],
  '*.{json,css}': files => {
    const match = micromatch.not(files, ['package.json', 'package-lock.json']);
    return match.map(file => `prettier --write ${file}`);
  },
};
