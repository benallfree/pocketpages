---
title: Serving JSON Responses
description: PocketPages automatically detects and serves JSON content from .ejs templates with appropriate headers, enabling RESTful API development alongside HTML pages using the same templating system.
---

# Serving JSON Responses with PocketPages

PocketPages allows you to easily create RESTful APIs by returning JSON content from your `.ejs` templates. If the output of an `.ejs` template parses as valid JSON, PocketPages will automatically serve it as a JSON response. This feature simplifies the process of building APIs within your PocketPages application, enabling you to handle both HTML and JSON responses using the same templating system.

## How It Works

When an `.ejs` template returns content that can be parsed as valid JSON, PocketPages detects this and serves the response with the appropriate `Content-Type: application/json` header. There are several ways to return JSON from your templates:

### 1. Return an Object Directly

The simplest way is to return an object directly from your template:

```ejs
<%%
  return {
    status: "success",
    data: {
      productId: params.productId,
      name: "Example Product",
      price: 29.99
    }
  }
%>
```

### 2. Using `echo()`

You can use the `echo()` function with an object:

```ejs
<%%
  const response = {
    status: "success",
    data: {
      productId: params.productId,
      name: "Example Product",
      price: 29.99
    }
  }
  echo(response)
%>
```

### 3. Using JSON.stringify

You can also explicitly stringify your JSON:

```ejs
<%%
  const response = {
    status: "success",
    data: {
      productId: params.productId,
      name: "Example Product",
      price: 29.99
    }
  }
%>
<%%= JSON.stringify(response) %>
```

### Example URL and Response

Given the following template structure:

```
pb_hooks/
  pages/
    api/
      product/
        [productId].ejs
```

A request to `/api/product/123` might return the following JSON response:

```json
{
  "status": "success",
  "data": {
    "productId": "123",
    "name": "Example Product",
    "price": 29.99
  }
}
```

### Benefits of Using `.ejs` for JSON Responses

1. **Unified Templating**: Use the same `.ejs` templating system for both HTML and JSON responses, reducing the need to learn multiple technologies.
2. **Dynamic Content**: Easily incorporate dynamic data from route parameters, query strings, or database queries into your JSON responses.
3. **Simplified API Development**: Quickly build RESTful APIs alongside your web pages without needing a separate framework or toolset.

### Best Practices

- **Ensure Valid JSON**: Always make sure that the content returned by your `.ejs` templates is valid JSON. If the content cannot be parsed as JSON, PocketPages will not serve it as a JSON response.
- **Use for APIs**: Leverage this feature to build RESTful APIs where the same route structure can return either HTML or JSON, depending on the request and the content generated.
- **Separate Concerns**: For clarity and maintainability, consider organizing your API-related templates in a dedicated folder structure, such as `pages/api/`, to distinguish them from your regular HTML templates.
