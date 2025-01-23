---
title: Micro-dash Functions
description: Lightweight utility functions for working with arrays and objects
---

# Micro-dash Functions

PocketPages includes a subset of utility functions from [@s-libs/micro-dash](https://github.com/simontonsoftware/s-libs/tree/master/projects/micro-dash) for working with arrays and objects. These functions are available globally in templates and via `require('pocketpages')`.

## Available Functions

### forEach

Iterates over elements of a collection and invokes an iteratee for each element.

```js
const { forEach } = require('pocketpages')

forEach([1, 2, 3], (value) => {
  dbg(value)
})

forEach({ a: 1, b: 2 }, (value, key) => {
  dbg(key, value)
})
```

### keys

Gets the object's property names as an array.

```js
const { keys } = require('pocketpages')

const obj = { a: 1, b: 2, c: 3 }
const propertyNames = keys(obj)
// => ['a', 'b', 'c']
```

### values

Gets the object's property values as an array.

```js
const { values } = require('pocketpages')

const obj = { a: 1, b: 2, c: 3 }
const propertyValues = values(obj)
// => [1, 2, 3]
```

### merge

Recursively merges own enumerable properties of source objects into the destination object.

```js
const { merge } = require('pocketpages')

const object = {
  a: [{ b: 2 }, { d: 4 }],
}

const other = {
  a: [{ c: 3 }, { e: 5 }],
}

merge(object, other)
// => { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
```

## Using in Templates

These functions are automatically available in EJS templates:

```ejs
<%%
  forEach(['Home', 'About', 'Contact'], (page) => {
    echo(`<a href="/${page.toLowerCase()}">${page}</a>`)
  })
%>

<%%
  const config = { theme: 'dark', lang: 'en' }
  const userPrefs = { theme: 'light' }
  const finalConfig = merge({}, config, userPrefs)
%>
```

## Using in JavaScript Files

Import the functions you need from the PocketPages package:

```js
const { forEach, keys, values, merge } = require('pocketpages')

function processObject(obj) {
  forEach(keys(obj), (key) => {
    dbg(`Processing ${key}:`, obj[key])
  })
}
```

For more detailed information about these utility functions, refer to the [@s-libs/micro-dash documentation](https://github.com/simontonsoftware/s-libs/tree/master/projects/micro-dash).
