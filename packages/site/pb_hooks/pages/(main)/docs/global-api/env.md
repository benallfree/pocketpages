---
title: env - Environment Variable Access
description: Securely access environment variables in PocketPages applications
---

# `env` - Environment Variable Access

- **Type**: `(key: string) => string`
- **Description**: The `env` function provides secure access to environment variables. It returns an empty string if the variable is not found.

## Basic Usage

```javascript
const apiKey = env('API_KEY')
const dbPassword = env('DB_PASSWORD')
```

## Template Usage

```ejs
<%% const apiKey = env('API_KEY') %>
<p>Using API key: <%%= apiKey %></p>
```

## Security Notes

- Returns empty string for undefined variables
- Use for sensitive configuration
- Avoid exposing secrets in templates
- Prefer environment variables over hardcoded values

## Best Practices

1. **Check for Required Variables**

```javascript
const apiKey = env('API_KEY')
if (!apiKey) {
  error('Missing required API_KEY environment variable')
  // Handle error case
}
```

2. **Use Descriptive Names**

```javascript
// Good
const stripeSecretKey = env('STRIPE_SECRET_KEY')

// Avoid
const key = env('KEY')
```

3. **Document Required Variables**

```javascript
// Document required environment variables in your README or configuration files
/**
 * Required environment variables:
 * - API_KEY: Your API key for external service
 * - DB_PASSWORD: Database password
 * - SMTP_PASSWORD: Email service password
 */
```
