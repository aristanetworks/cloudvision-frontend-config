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
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'property',
        format: ['camelCase'],
        filter: {
          regex: '(delete_all|path_elements)',
          match: false,
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
