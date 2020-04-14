const confusingBrowserGlobals = require('confusing-browser-globals');

const aristaRestrictedGlobals = ['error', 'isFinite', 'isNaN', 'window'].concat(
  confusingBrowserGlobals.filter((value) => value !== 'self'),
);

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:flowtype/recommended'],
  globals: {
    BigInt: 'readonly',
  },
  plugins: ['arista', 'flowtype'],
  rules: {
    'arista/import-order': 'error',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'camelcase': [
      'error',
      {
        allow: ['delete_all', 'path_elements'],
      },
    ],
    'class-methods-use-this': 'off',
    'curly': ['error', 'all'],
    'flowtype/generic-spacing': 'off',
    'flowtype/space-after-type-colon': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'id-length': [
      'error',
      {
        min: 1,
      },
    ],
    'import/export': 'error',
    'import/extensions': 'off',
    'import/first': 'error',
    'import/named': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
      },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'indent': 'off', // prettier will take care of indentation
    'max-len': [
      'error',
      {
        code: 100,
        ignorePattern: '^\\s+(it|test)\\(',
        ignoreUrls: true,
      },
    ],
    'newline-per-chained-call': 'off',
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      },
    ],
    'no-nested-ternary': 'error',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-prototype-builtins': 'off',
    'no-restricted-globals': aristaRestrictedGlobals,
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_key', '_value'],
      },
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'operator-linebreak': 'off',
    'prefer-destructuring': 'off',
    'prefer-object-spread': 'off',
    'prefer-template': 'off',
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single', 'avoid-escape'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'valid-typeof': 'error',
  },
};
