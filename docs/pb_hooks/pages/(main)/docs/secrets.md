---
title: Managing Secrets in PocketPages
description: Methods for securely storing and accessing sensitive data in PocketPages applications using environment variables and PocketBase database.
---

# Managing Secrets in PocketPages

When building secure applications, managing secrets like API keys, database credentials, and other sensitive information is crucial. PocketPages provides a secure way to access environment variables through the global `env()` function.

## Using the `env()` Function

The `env()` function is available globally in both templates and JavaScript files. It provides secure access to environment variables:

```javascript
const apiKey = env('API_KEY')
const dbPassword = env('DB_PASSWORD')
```

### In Templates

```ejs
<%% const apiKey = env('API_KEY') %>
<script>
  // Use environment variables to configure your application
  const config = {
    apiEndpoint: '<%%= env('API_ENDPOINT') %>',
    // ...
  }
</script>
```

### In JavaScript Files

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function () {
  const apiKey = env('API_KEY')
  const dbUrl = env('DATABASE_URL')

  // Use environment variables for configuration
  return {
    config: {
      apiEndpoint: env('API_ENDPOINT'),
      // ...
    },
  }
}
```

## Best Practices

1. **Never Expose Secrets in Templates**

   ```ejs
   <!-- DON'T: Expose secrets directly -->
   <meta name="api-key" content="<%%= env('API_KEY') %>">

   <!-- DO: Use environment variables for configuration -->
   <meta name="api-endpoint" content="<%%= env('PUBLIC_API_ENDPOINT') %>">
   ```

2. **Check for Required Variables**

   ```javascript
   const apiKey = env('API_KEY')
   if (!apiKey) {
     error('Missing required API_KEY environment variable')
     // Handle error appropriately
   }
   ```

3. **Use Descriptive Names**

   ```javascript
   // Good
   const stripeSecretKey = env('STRIPE_SECRET_KEY')
   const mailgunApiKey = env('MAILGUN_API_KEY')

   // Avoid
   const key = env('KEY')
   const secret = env('SECRET')
   ```

4. **Document Required Variables**
   ```javascript
   /**
    * Required environment variables:
    * - API_KEY: External service API key
    * - DB_PASSWORD: Database password
    * - SMTP_PASSWORD: Email service password
    */
   ```

## Setting Environment Variables

Environment variables can be set in various ways depending on your deployment environment:

1. **Development Environment**

   ```bash
   # .env file
   API_KEY=your_api_key
   DB_PASSWORD=your_db_password
   ```

2. **Production Environment**

   ```bash
   # Set directly in your hosting environment
   export API_KEY=your_api_key
   export DB_PASSWORD=your_db_password
   ```

3. **Docker Environment**
   ```dockerfile
   ENV API_KEY=your_api_key
   ENV DB_PASSWORD=your_db_password
   ```

## Security Considerations

1. **Never commit secrets to version control**
2. **Use different values for development and production**
3. **Rotate secrets regularly**
4. **Use environment-specific configurations**
5. **Implement proper access controls**

## Additional Resources

- [Environment Variables Documentation](/docs/global-api/env)
- [Deployment Guide](/docs/deploying)
- [Security Best Practices](/docs/security)
