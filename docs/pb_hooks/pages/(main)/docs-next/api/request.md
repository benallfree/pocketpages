---
title: request - HTTP Request Object
description: Access HTTP request details including method, headers, and query parameters in PocketPages templates.
---

# `request` - HTTP Request Object

- **Type**: [`PagesRequest`](https://github.com/pockethost/pockethost/blob/main/src/lib/pages/index.ts)
- **Description**: The `request` object provides access to essential HTTP request information in a framework-agnostic way. This abstraction ensures your templates remain compatible across PocketBase versions.

## Properties

### `method`

- Type: `'get' | 'post' | 'put' | 'delete'`
- Description: The HTTP method of the request

### `url`

- Type: `URLParse<string>`
- Description: A parsed URL object containing query parameters and other URL components

### `formData`

- Type: `Record<string, any>`
- Description: Contains form data submitted with the request

## Example Usage

### Basic Request Information

```ejs
<%%
// Access request method
const method = request.method

// Get URL information
const path = request.url.pathname
const query = request.url.query

// Access form data
const formFields = request.formData
%>
```

### Query Parameter Handling

```ejs
<%%
// Access query parameters from the URL
const page = request.url.query.page || '1'
const sort = request.url.query.sort || 'date'
%>
```

### Form Data Processing

```ejs
<%%
if (request.method === 'post') {
    // Access submitted form data
    const username = request.formData.username
    const email = request.formData.email
}
%>
```
