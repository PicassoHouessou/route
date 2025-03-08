const path = require('path');
const prettierCommand = (filenames) =>
   `prettier ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')} --loglevel warn --write`;
const addProcessedFilesByPrettierCommand = (filenames) =>
   `prettier ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')} --loglevel warn --write`;

console.log(prettierCommand);

module.exports = {
   '*.{js,ts}': [
      //"ng lint",
      prettierCommand,
      addProcessedFilesByPrettierCommand,
   ],
};
