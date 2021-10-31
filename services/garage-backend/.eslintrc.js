module.exports = {
  extends: ["eslint-config-garage"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
