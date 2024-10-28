# `context` - The Context Object Itself

- **Type**: Object
- **Description**: The `context` property refers to the request context object itself. This can be useful if you need to pass the entire context downstream, for example, when making further processing decisions or passing it to other modules.

## Example Usage:

```ejs
<%%
  function processContext(ctx) {
    // Do something with the context
  }

  processContext(context);
%>
```
