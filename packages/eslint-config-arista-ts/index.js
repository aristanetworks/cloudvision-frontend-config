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
    /**
     * Enforce `T[]` over `Array<T>` usage.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    /**
     * Manage "@ts-ignore" / "@ts-expect-error" comments.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
     */
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'minimumDescriptionLength': 10,
      },
    ],
    /**
     * Ban `object` / `Function` types etc.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
     */
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // TODO: Remove this later, when we've figured out a workable replacement for `{}`
          '{}': false,
        },
      },
    ],
    /**
     * Enforce `interface` for object definitions.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    /**
     * Enforce return types for functions.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    /**
     * Enforce `public` / `private` / `protected` member accessibility modifiers for classes.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          parameterProperties: 'off',
        },
      },
    ],
    /**
     * Enforce method signature style `prop(): void` over property `prop: () => void`.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
     */
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    /**
     * Enforce variable naming schemes.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'property',
        format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    /**
     * Manage usage of the non-null assertion `!`.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
     */
    '@typescript-eslint/no-non-null-assertion': 'off',
    /**
     * Enforce camel case naming.
     * @see https://eslint.org/docs/rules/camelcase
     */
    'camelcase': 'off',
    /**
     * Disallow Flow type imports, aliases, and annotations in files missing a Flow file
     * declaration.
     * @see https://github.com/gajus/eslint-plugin-flowtype/blob/master/.README/rules/no-types-missing-file-annotation.md
     */
    'flowtype/no-types-missing-file-annotation': 0,
    /**
     * Enforce default export from import.
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
     */
    'import/default': 'off',
    /**
     * Enforce named exports from import.
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
     */
    'import/named': 'off',
    /**
     * Enforce named exports from namespace import (`import * as Namespace from '...'`).
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
     */
    'import/namespace': 'off',
    /**
     * Report use of an exported name as a property on the default export.
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
     */
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        /**
         * Enforce return types for functions.
         * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
         */
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
