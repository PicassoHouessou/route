const path = require('path');
const prettierCommand = (filenames) =>
   `prettier ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')} --loglevel warn --write`;

module.exports = {
   '*.{js,ts}': [
      //"ng lint",
      prettierCommand,
   ],
};
