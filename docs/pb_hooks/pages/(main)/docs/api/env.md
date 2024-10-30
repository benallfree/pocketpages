# `env` - Accessing Environment Variables

- **Type**: Function
- **Description**: The `env` function allows you to securely access environment variables within your EJS templates. Environment variables are often used to store secrets such as API keys, database credentials, and other sensitive information that should not be hard-coded into your application.

## Example Usage:

```ejs
<%%
  const apiKey = env('API_KEY');
  log.info('API Key accessed.');
%>

<p>Your API Key is: <%%= apiKey %></p>
```

> **Note**: Be cautious when displaying sensitive information in your templates to avoid exposing secrets.
