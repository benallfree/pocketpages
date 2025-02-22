# `url` - URL Parsing Function

- **Type**: Function
- **Description**: The `url` function is used to parse a URL string. It returns an object equivalent to using `new URL()` in the browser's Web API, with the addition of automatic query string parsing into an object. This can be helpful for manipulating or inspecting URLs within your EJS templates.

## Example Usage:

```ejs
<%%
  // Basic URL parsing
  const parsedUrl = url('https://example.com/path?query=123');
%>
<p>Hostname: <%%= parsedUrl.hostname %></p>
<p>Pathname: <%%= parsedUrl.pathname %></p>
<p>Search: <%%= parsedUrl.search %></p>

<%%
  // Query string parsing
  const withQuery = url('https://example.com/search?name=john&age=25&tags[]=one&tags[]=two')

  // Query parameters are automatically parsed into an object
  dbg({
    name: withQuery.query.name,      // "john"
    age: withQuery.query.age,        // "25"
    tags: withQuery.query.tags       // ["one", "two"]
  })
%>
```

## Query String Parsing

The `query` property contains an object with all query parameters parsed:

- Simple parameters become string values
- Array parameters (using `[]`) become arrays
- Empty values become empty strings
- Missing values become `undefined`

```ejs
<%%
const examples = [
  url('/?name=alice'),               // query.name === "alice"
  url('/?items[]=1&items[]=2'),      // query.items === ["1", "2"]
  url('/?empty='),                   // query.empty === ""
  url('/?missing'),                  // query.missing === undefined
  url('/?a=1&b=2&c=3')              // query === { a: "1", b: "2", c: "3" }
]
%>
```

## See Also

- [Request Context](/docs/context-api/request)
- [Redirect](/docs/context-api/redirect)
- [Parameters](/docs/parameters)
