module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    BigInt: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['arista', 'import'],
  rules: {
    'arista/import-order': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    'camelcase': ['error', { allow: ['delete_all', 'path_elements', '^UNSAFE_'] }],
    'constructor-super': 'error',
    'curly': ['error', 'all'],
    'default-case': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'for-direction': 'error',
    'func-names': 'error',
    'getter-return': 'error',
    'guard-for-in': 'error',
    'import/export': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['error', { commonjs: true }],
    'import/no-webpack-loader-syntax': 'error',
    'lines-between-class-members': 'error',
    'max-classes-per-file': ['error', 1],
    'max-len': [
      'error',
      {
        code: 100,
        ignorePattern: '^\\s+(it|test)\\(',
        ignoreUrls: true,
      },
    ],
    'new-cap': ['error', { capIsNewExceptionPattern: '^Immutable' }],
    'no-alert': ['warn'],
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-confusing-arrow': 'error',
    'no-console': ['warn'],
    'no-const-assign': 'error',
    'no-constant-condition': ['warn'],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-character-class': 'error',
    'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
    'no-empty-pattern': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-misleading-character-class': 'error',
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
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'error',
    'no-obj-calls': 'error',
    'no-octal-escape': 'error',
    'no-octal': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-restricted-globals': [
      'error',
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultstatus',
      'defaultStatus',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'isFinite',
      'isNaN',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-restricted-properties': [
      'error',
      {
        property: '__defineGetter__',
        message: 'Use Object.defineProperty instead',
      },
      {
        property: '__defineSetter__',
        message: 'Use Object.defineProperty instead',
      },
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Use Number.isNaN instead',
      },
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead',
      },
    ],
    'no-return-assign': ['error', 'always'],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-undef': 'error',
    'no-underscore-dangle': ['error', { allow: ['_key', '_value'] }],
    'no-unexpected-multiline': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'object-curly-newline': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
        ignoreConstructors: false,
      },
    ],
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    'prefer-numeric-literals': 'error',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'require-yield': 'error',
    'symbol-description': 'error',
    'radix': 'error',
    'use-isnan': 'error',
    'valid-typeof': ['error', { requireStringLiterals: true }],
    'vars-on-top': 'error',
    'yoda': 'error',
  },
  overrides: [
    {
      files: ['*.i9test.js', '*.spec.js'],
      rules: {
        'func-names': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  ],
};
