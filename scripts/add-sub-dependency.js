const execSync = require("child_process").execSync;

const numArgs = 3; // number of args that follow `node path/to/script.js`
if (process.argv.length !== numArgs + 2) {
  throw new Error(
    `Expected ${numArgs}, but received ${process.argv.length - 2}`
  );
}

const devArgString = process.argv[2].toLowerCase() === "true" ? "--dev" : "";
execSync(
  `yarn lerna add ${devArgString} ${process.argv[3]} --scope @open-match/${process.argv[4]}`
);
