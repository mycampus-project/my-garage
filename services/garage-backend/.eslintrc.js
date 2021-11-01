module.exports = {
  extends: ['eslint-config-garage'],
  parserOptions: {
    tsconfigRootDir: '.',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
