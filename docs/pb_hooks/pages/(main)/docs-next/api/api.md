# `api` - The PocketPages API Object

- **Type**: Object
- **Description**: The `api` property refers to the PocketPages API object itself. This object contains all the methods and properties needed for page rendering and is spread into the global context of each EJS page, making all its methods available as globals. This can be useful if you need to pass the entire API object downstream, for example, when making further processing decisions or passing it to other modules.

## Example Usage:

```ejs
<%%
  function processApi(api) {
    // Access API methods directly
    api.print('Hello World');
    api.redirect('/some/path');

    // Or use them as globals (since they're spread into the context)
    print('Hello World');
    redirect('/some/path');
  }

  // Pass the entire API object
  processApi(api);
%>
```
