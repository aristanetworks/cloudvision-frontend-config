module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/default-props-match-prop-types': 'error',
    'react/forbid-prop-types': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-filename-extension': [
      'error',
      {
        allow: 'as-needed',
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-fragments': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-default-props': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-string-refs': 'error',
    'react/no-typos': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'error',
    'react/no-unused-state': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
