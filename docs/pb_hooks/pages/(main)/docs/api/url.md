# `url` - URL Parsing Function

- **Type**: Function
- **Description**: The `url` function is used to parse a URL string. It returns an object equivalent to using `new URL()` in the browser's Web API. This can be helpful for manipulating or inspecting URLs within your EJS templates.

## Example Usage:

```ejs
<%%
  const parsedUrl = url('https://example.com/path?query=123');
%>
<p>Hostname: <%%= parsedUrl.hostname %></p>
<p>Pathname: <%%= parsedUrl.pathname %></p>
<p>Search Params: <%%= parsedUrl.search %></p>
```
