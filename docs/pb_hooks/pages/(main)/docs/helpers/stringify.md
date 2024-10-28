# `stringify` - Circular-Safe Stringify Helper

- **Type**: Function
- **Description**: The `stringify` helper is a `JSON.stringify` replacement that prevents circular references from causing errors. It is useful when you need to serialize complex objects for logging or debugging.

## Example Usage:

```ejs
<%% log.dbg("Request Context:", stringify(context)); %>
```
