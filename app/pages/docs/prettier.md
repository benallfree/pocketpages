# Prettier PocketPages

If you like using Prettier to format your code, you'll be happy to know that [prettier-plugin-ejs](https://github.com/ecmel/prettier-plugin-ejs) works pretty well (but not perfectly).

```
bun add -D prettier-plugin-ejs
```

Then, in `package.json`:

```json
"prettier": {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5",
    "plugins": [
        "prettier-plugin-ejs"
    ]
}
```
