# Serving JSON Responses with PocketPages

PocketPages allows you to easily create RESTful APIs by simply returning JSON content from your `.ejs` templates. If the output of an `.ejs` template parses as valid JSON, PocketPages will automatically serve it as a JSON response. This feature simplifies the process of building APIs within your PocketPages application, enabling you to handle both HTML and JSON responses using the same templating system.

## How It Works

### JSON Parsing in `.ejs` Files

When an `.ejs` template returns content that can be parsed as valid JSON, PocketPages detects this and serves the response with the appropriate `Content-Type: application/json` header. This means that you can use your `.ejs` files to generate dynamic JSON content just as easily as you would generate HTML.

### Creating a JSON Response

To create a JSON response, your `.ejs` template should output a valid JSON string using `<%%= JSON.stringify(...) %%>`. Here’s an example:

### Example JSON Response Template

```ejs
<%%
  const response = {
    status: "success",
    data: {
      productId: params.productId,
      name: "Example Product",
      price: 29.99
    }
  };
%%>

<%%= JSON.stringify(response) %%>
```

### How It Works:

- **Dynamic Data**: The `response` object is dynamically populated with data, such as route parameters or other information, that you want to include in the JSON response.
- **Returning JSON**: The `<%%= JSON.stringify(response) %%>` statement converts the `response` object into a JSON string and outputs it as the template's content.
- **Automatic JSON Response**: Since the output is valid JSON, PocketPages will serve this as a JSON response with the correct headers.

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
