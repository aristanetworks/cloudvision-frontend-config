module.exports = {
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  rules: {
    'camelcase': [
      'error',
      {
        allow: ['^UNSAFE_'],
        properties: 'never',
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['MultiSelect'],
      },
    ],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'off',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-string-refs': 'error',
    'react/no-unused-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
      },
    ],
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react-hooks/rules-of-hooks': 'error',
  },
};
