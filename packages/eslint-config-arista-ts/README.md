# eslint-config-arista-ts

Arista's eslint config for TypeScript code.

## Usage

Create an `.eslintrc.json` file in your project with something similar to the following:

```json
{
  "files": ["**/*.ts"],
  "extends": ["arista-ts"],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
},
```

and add `"eslint-config-arista-ts": "<VERSION>"` to your `package.json` devDependencies.

This config should be applied only to `.ts` and `.tsx` files.
