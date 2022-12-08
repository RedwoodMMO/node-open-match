if (!/yarn\.js$/.test(process.env.npm_execpath)) {
  console.error(
    `
This repository uses yarn; please install and use yarn instead of npm:

# Install yarn
npm install --global yarn

# Install this repository's dependencies
yarn
`
  );
  process.exit(1);
}
