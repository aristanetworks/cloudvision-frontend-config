# eslint-config-arista-react

Arista's eslint config for React/JSX code.

## Usage

Create an `.eslintrc.json` file in your project with something similar to the following:

```json
{
  "files": ["**/*.jsx"],
  "extends": ["arista-js", "arista-react"]
}
```

```json
{
  "files": ["**/*.tsx"],
  "extends": ["arista-ts", "arista-react"],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

and add `"eslint-config-arista-react": "<VERSION>"` to your `package.json` devDependencies.

This config should be applied only to `.jsx` and `.tsx` files.
