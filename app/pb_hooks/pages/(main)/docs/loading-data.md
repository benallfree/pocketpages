# Loading Data

When an `.ejs` page is parsed, it is passed contextual data:

- `ctx` - the [echo.HttpContext](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- `params` - routing and querystring parameters - see [routing](/docs/routing)
- `dbg` - a debug logging function

In addition to these standard functions, you may add to the context by defining a `+server.js`:

```js
// +server.js

module.exports = (context) => {
  const { dbg } = context

  const start = Date.now()
  const logTime = () => {
    const elapsed = Date.now() - start
    dbg(`${elapsed}ms elapsed`)
  }

  return {
    start,
    logTime,
  }
}
```

When PocketPages encounters a `+server.js` file at the current route level or any higher level, it processes these files alongside the request, adding each loader's return value to the context scope of all `.ejs` files involved in the request.

The `+server.js` files are evaluated in a top-down order based on the directory structure. For example, given the following structure:

```
/pages
    +server.js
    /foo
        +server.js
        /bar
            +server.js
            index.ejs
```

A request to `/foo/bar` will resolve to `/pages/foo/bar/index.ejs`. The `+server.js` files are evaluated from top to bottom, meaning that exports from deeper levels will override those from higher levels if they share the same name:

```
/pages
    +server.js          <-- evaluated first, returns { foo }
    /foo
        +server.js      <-- evaluated second, returns { foo, bar, baz }
        /bar
            +server.js  <-- evaluated third, returns { baz, zod }
            index.ejs
```

In this case, `index.ejs` will access the `foo` value returned at the `/foo` level, not the root level, and it will see `baz` from `/bar`, overriding `baz` from `/foo`.

Lower-level `+server.js` files can rely on the context provided by higher-level `+server.js` files. Data returned from deeper directories will override those from higher levels, and all `+server.js` data will take precedence over default context variables. This structure allows specific `+server.js` files to override general ones while still permitting general files to perform tasks like authorization and security checks.

On the other hand, `+layout.ejs` files are processed in a bottom-up order, opposite to `+server.js` files. Given the following structure:

```
/pages
    +layout.ejs
    +server.js
    /foo
        +layout.ejs
        +server.js
        /bar
            +layout.ejs
            index.ejs
            +server.js
```

The `+layout.ejs` files are evaluated after all `+server.js` files have been processed, meaning that each `+layout.ejs` runs with the combined context available to `index.ejs`, not necessarily the context from its own level. This approach ensures that layouts adapt to the context defined in the most specific (deepest) route.

```
/pages
    +layout.ejs        <-- evaluated third
    +server.js         <-- evaluated first
    /foo
        +layout.ejs    <-- evaluated second
        +server.js     <-- evaluated second
        /bar
            +layout.ejs <-- evaluated first
            index.ejs
            +server.js  <-- evaluated third
```
