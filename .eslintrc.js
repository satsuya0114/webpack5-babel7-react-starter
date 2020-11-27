// 0: off, 1: warn, 2: error
module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
    '@babel',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-unresolved': [0],
    'import/extensions': [0],
    'object-curly-newline': 0,
    'react/jsx-props-no-spreading': [0],
    'arrow-parens': ['error', 'as-needed'],
  },
};
