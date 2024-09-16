# Managing Secrets in PocketPages

When building secure applications, managing secrets like API keys, database credentials, and other sensitive information is crucial. In PocketPages, secrets can be managed in two primary ways: through environment variables or by securely storing them in the PocketBase database. This section will guide you through both methods and explain how to access these secrets within your EJS templates.

## 1. Managing Secrets with Environment Variables

### Why Use Environment Variables?

Environment variables are a secure and straightforward way to manage secrets. By storing secrets in environment variables, you can easily change them without modifying your codebase, making it easier to manage different environments (e.g., development, staging, production).

### Accessing Environment Variables

In PocketPages, environment variables are accessible through the `env` helper, which is available in the request context of every EJS file.

### Example Usage

To access an environment variable within an EJS template, use the `env` helper:

```ejs
<%%
  const apiKey = env('API_KEY');
  dbg('API Key loaded from environment:', apiKey);
%%>

<p>Your API Key is: <%%= apiKey %%></p>
```

### Setting Environment Variables

You can set environment variables in your server's environment or by using a `.env` file if your setup supports it. For example:

```
API_KEY=your-secret-api-key
DB_PASSWORD=your-database-password
```

These variables can then be accessed using the `env` helper, ensuring your secrets are not hard-coded into your application.

## 2. Managing Secrets in the PocketBase Database

### Why Store Secrets in the Database?

Storing secrets in the PocketBase database allows you to centralize and securely manage sensitive information. This method is particularly useful when you need to manage secrets that change frequently or when you need to store secrets specific to a user or application context.

### Fetching Secrets from the Database

To fetch secrets from the PocketBase database, you can perform a database query within your EJS template or within server-side logic. The fetched secrets can then be used as needed.

### Example Usage

Here's how you might fetch a secret from the PocketBase database:

```ejs
<%%
  // Assume `getSecret` is a function that fetches the secret from the database
  const dbPassword = getSecret('DB_PASSWORD');
  dbg('Database password loaded from PocketBase:', dbPassword);
%%>

<p>Your Database Password is: <%%= dbPassword %%></p>
```

### Storing Secrets in the Database

Secrets can be stored in a secure collection within PocketBase, with access limited to specific roles or users. When storing secrets in the database, ensure that they are encrypted and that access is tightly controlled to prevent unauthorized access.

## Best Practices for Managing Secrets

1. **Use Environment Variables for Static Secrets**: Environment variables are ideal for secrets that do not change frequently and need to be consistent across different environments.

2. **Store Dynamic Secrets in the Database**: For secrets that change often or are tied to specific users or applications, store them securely in the PocketBase database.

3. **Avoid Hard-Coding Secrets**: Never hard-code secrets directly into your codebase. This practice increases the risk of exposure, especially if your code is shared or stored in version control.

4. **Use Encryption**: When storing secrets in the database, ensure they are encrypted both at rest and in transit. This adds an extra layer of security in case the database is compromised.

5. **Access Control**: Limit access to secrets based on roles and permissions. Only authorized users and services should have access to sensitive information.
