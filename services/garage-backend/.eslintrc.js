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
  rules: {
    'no-param-reassign': 0,
    no_underscore_dangle: 0,
  },
};
