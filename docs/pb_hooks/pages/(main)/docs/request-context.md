# Understanding the Request Context in PocketPages

PocketPages provides a comprehensive request context object that is accessible in every EJS file. This context object contains several useful properties and functions that enable you to manage request data, log information, require private files, and more. This guide will walk you through the key components of the request context and how to use them effectively.

## The Request Context Object

The request context is automatically passed to every EJS template in your PocketPages application. It provides access to various tools and information relevant to the current request, allowing you to dynamically generate content based on the request data.

### Key Properties and Functions

### 1. `ctx` - The `echo.HttpContext`

- **Type**: [`echo.Context`](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- **Description**: The `ctx` property gives you direct access to the underlying Echo framework's HTTP context. This allows you to interact with the request and response, including reading headers, managing cookies, and more.

#### Example Usage:

```ejs
<h1>Request Method: <%%= ctx.method() %></h1>
<p>Request Path: <%%= ctx.path() %></p>
```

### 2. `params` - Routing and Query String Parameters

- **Type**: Object
- **Description**: The `params` object contains both routing parameters (derived from placeholder directory and file names) and query string parameters. If a query string parameter has the same name as a route parameter, the query string parameter will override the route parameter. See [Accessing Parameters](/docs/parameters) for more details.

#### Example Usage:

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<p>Sort by: <%%= params.sort %></p>
```

### 3. `dbg` - Debug Logging Function

- **Type**: Function
- **Description**: The `dbg` function is a debug logging utility that allows you to log information during the request handling process. This is especially useful for troubleshooting and monitoring your application's behavior.

#### Example Usage:

```ejs
<%% dbg("Product ID:", params.productId); %>
```

### 4. `requirePrivate` - Requiring Private Files

- **Type**: Function
- **Description**: The `requirePrivate` function allows you to require private files that are not accessible by any route. This is useful for including sensitive configuration files, utilities, or modules that should not be exposed to the public.

#### Example Usage:

```ejs
<%%
  const config = requirePrivate('config');
  dbg("Config loaded:", config);
%>
```

See [Private Files](/docs/private-files) for more information.

### 5. `stringify` - Circular-Safe Stringify Helper

- **Type**: Function
- **Description**: The `stringify` helper is a JSON.stringify replacement that prevents circular references from causing errors. It is useful when you need to serialize complex objects for logging or debugging.

#### Example Usage:

```ejs
<%% dbg("Request Context:", stringify(context)); %>
```

### 6. `context` - The Context Object Itself

- **Type**: Object
- **Description**: The `context` property refers to the request context object itself. This can be useful if you need to pass the entire context downstream, for example, when making further processing decisions or passing it to other modules.

#### Example Usage:

```ejs
<%%
  function processContext(ctx) {
    // Do something with the context
  }

  processContext(context);
%>
```

## How the Context is Available in EJS

The request context is injected automatically into every EJS template rendered by PocketPages. This means that whenever you create an EJS file, you can directly access the context and all its properties and functions without any additional setup.

### Example: Using the Request Context in an EJS File

Let's put it all together in a practical example:

```ejs
<%% dbg("Rendering Product Page"); %>

<h1>Product ID: <%%= params.productId %></h1>
<p>Requested by: <%%= ctx.request.header('User-Agent') %></p>

<%% if (params.sort) { %>
<p>Sorting by: <%%= params.sort %></p>
<%% } else { %>
<p>No sorting specified.</p>
<%% } %>

<%%
  const config = requirePrivate('config');
  dbg("Config loaded:", stringify(config));
%>

<h2>Full Request Context</h2>
<pre><%%= stringify(context) %></pre>
```

### Explanation:

- **Debugging**: Logs that the product page is being rendered and outputs important information, like the product ID and configuration settings.
- **Dynamic Content**: Uses the `params` and `ctx` objects to dynamically display the product ID and sort method, along with user-agent information.
- **Security**: Loads a private configuration file using `requirePrivate` without exposing it to public routes.
- **Safety**: Utilizes `stringify` to safely serialize and display the entire context, including circular references.

### 7. `env` - Accessing Environment Variables

- **Type**: Function
- **Description**: The `env` function allows you to securely access environment variables within your EJS templates. Environment variables are often used to store secrets such as API keys, database credentials, and other sensitive information that should not be hard-coded into your application. By using environment variables, you can easily manage these secrets across different environments (development, staging, production) without modifying your code.

#### Example Usage:

```ejs
<%%
  const apiKey = env('API_KEY');
  const dbPassword = env('DB_PASSWORD');
  dbg('API Key:', apiKey);
  dbg('Database Password:', dbPassword);
%%>

<p>Your API Key is: <%%= apiKey %%></p>
<p>Your Database Password is: <%%= dbPassword %%></p>
```

In this example:

- **Accessing Variables**: The `env` function is used to retrieve the values of `API_KEY` and `DB_PASSWORD` from the environment. These values are then available for use within the template.
- **Debugging**: The `dbg` function is used to log the values of these environment variables for debugging purposes (be careful not to expose sensitive information in logs in production environments).

#### Why Use `env`?

Using environment variables helps keep your secrets secure and makes your application more flexible. By storing secrets in environment variables, you can easily adjust them as needed without altering your codebase. This approach also helps you keep sensitive information out of version control.

#### Setting Environment Variables:

Environment variables can be set directly in your server environment or through a `.env` file if your setup supports it. For example:

```
API_KEY=your-secret-api-key
DB_PASSWORD=your-database-password
```

These variables can then be accessed in your EJS templates using the `env` function.

### 8. `data` - Accessing Loaded Data

- **Type**: Object
- **Description**: The `data` property in the request context contains any data that was loaded by the `+load.js` file at the current route level. This data is available to your EJS templates and can be used to dynamically generate content based on the request.

#### How `data` is Populated:

- **Loader Function**: The `+load.js` file must export a function using `module.exports = (context) => { ... }`. This function receives the request context as an argument and should return an object containing the data you want to make available to the template.
- **Data Availability**: The returned object from this function is automatically assigned to the `data` property in the request context, making it accessible within your EJS templates.

#### Example Usage in EJS:

```ejs
<h1>Product Name: <%%= data.product.name %%></h1>
<p>Price: $<%%= data.product.price %%></p>
```

In this example:

- **Dynamic Content**: The `data` property is used to access the `product` object that was loaded by the `+load.js` file, allowing you to display the product name and price dynamically in the template.

#### When `data` is Available:

- **Single Loader Execution**: Only the `+load.js` file at the current route level is executed. Therefore, the `data` property is populated based on the return value of that specific loader function.
- **Multiple EJS Files**: If multiple EJS files exist at the same route level, they will all have access to the same `data` object returned by the `+load.js` file in that directory.

This `data` property is a powerful tool for injecting dynamic content into your pages, based on the logic and data loaded in your `+load.js` file.

For more information, see [Loading Data](/docs/loading-data)
