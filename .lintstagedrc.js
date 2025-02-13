const path = require('path');

const buildEslintCommand = (filenames) =>
   `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`;

const prettierCommand = (filenames) =>
   `prettier ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')} --loglevel warn --write`;

module.exports = {
   '*.{js,ts}': [prettierCommand],
};
