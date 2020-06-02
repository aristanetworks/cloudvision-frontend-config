module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './packages/**/tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'minimumDescriptionLength': 10,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // TODO: Consider using more specific selectors and formats. For instance, function names
      // should always be camelCase and class/component names should always be PascalCase.
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        // This rule is similar to the old global exception list (which no longer exists).
        selector: 'property',
        format: null,
        filter: {
          regex: '(_skipLogging_|delete_all|path_elements)',
          match: true,
        },
      },
    ],
    'flowtype/no-types-missing-file-annotation': 0,
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
