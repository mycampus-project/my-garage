module.exports = {
  extends: ['./base.js', 'airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/indent': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
