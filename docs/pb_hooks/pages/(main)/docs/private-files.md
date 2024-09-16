# Working with Private Files and Directories in PocketPages

In PocketPages, you can securely manage sensitive files and directories that should not be publicly accessible. This is done using a combination of special naming conventions and functions like `requirePrivate`. Files and directories that begin with an underscore (`_`) or a plus sign (`+`) are treated as private or reserved for special processing, ensuring they are not routable and cannot be accessed via a URL. This guide will explain how to effectively use these features in your PocketPages application.

## Private Files and Directories

### Underscore Prefix (`_`)

Any file or directory that begins with an underscore (`_`) is considered private in PocketPages. These files and directories are not routable, meaning they cannot be accessed via a URL. This makes them ideal for storing server-side logic, reusable components, or scripts that should only be used internally within your application.

#### Example Directory Structure

```plaintext
pb_hooks/
  pages/
    _private/
      config.js
    _helpers/
      _authCheck.ejs
    index.ejs
    about.ejs
```

In this example:

- The `_private/` directory and its contents (`config.js`) are private and cannot be accessed via routes.
- The `_helpers/` directory contains private partials like `_authCheck.ejs`, which can be included in other EJS templates but is not routable.

\*Note: While it's safe to store private server-side logic in these files, secrets such as API keys and passwords should never be stored in files that could be committed to a repository. For managing secrets, refer to [Managing Secrets](/docs/secrets) for best practices.

### Plus Prefix (`+`)

Files and directories that begin with a plus sign (`+`) are reserved for special processing by PocketPages and are also not routable. For example, `+load.js` files are used to load data before rendering a template. These files should be used according to their specific purposes as defined by PocketPages.

## Accessing Private Files with `requirePrivate`

PocketPages provides the `requirePrivate` function to securely access files stored in the root `_private` directory. This root `_private` directory is a special case, allowing you to store common libraries and resources that can be accessed from anywhere in your application without worrying about relative path issues.

### Example Usage of `requirePrivate`

```ejs
<%%
  // Load the private configuration file from the root _private directory
  const config = requirePrivate('config.js');

  dbg("Config loaded:", config);
%>

<h1>Welcome to the Secure Page</h1>
```

### Explanation:

- **Loading Files**: The `requirePrivate('config.js')` call loads the file from the root `_private` directory, ensuring it is not publicly accessible.
- **Accessing Data**: Once loaded, you can access the data in these files just as you would with any other module in Node.js.
- **Debugging**: You can log the contents of these files using the `dbg` function for debugging purposes (just be cautious not to expose sensitive information in production logs).

## Practical Use Cases

### 1. Storing Server-Side Logic

Store reusable server-side logic, such as configuration handlers or utility functions, in the root `_private` directory. This approach keeps critical server-side operations private and secure.

### 2. Configuration Files

Store environment-specific configuration files in the root `_private` directory and load them using `requirePrivate` to ensure they are not exposed to public routes. However, remember that secrets such as API keys should be managed using environment variables or a secure secrets management service, rather than being stored in files that could be committed to a repository.

### 3. Secure Data Processing

Use private scripts or partials stored in the root `_private` directory to handle sensitive data processing, ensuring they are only accessible within your server-side code.
