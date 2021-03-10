# eslint-config-arista-js

Arista's eslint config for JavaScript code.

## Usage

Create an `.eslintrc.json` file in your project with something similar to the following:

```json
{
  "files": ["**/*.js"],
  "extends": ["arista-js"]
}
```

and add `"eslint-config-arista-js": "<VERSION>"` to your `package.json` devDependencies.

This config should be applied only to `.js` and `.jsx` files.
