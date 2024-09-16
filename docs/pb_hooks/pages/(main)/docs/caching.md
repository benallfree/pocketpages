# Understanding Caching in PocketPages

Effective caching is crucial for optimizing the performance of your web applications. In PocketPages, caching mechanisms are designed to ensure that your content is delivered efficiently while providing flexibility during development. This guide will delve into how caching works in PocketPages, how to manage it during development and production, and considerations when using proxies like Cloudflare.

## Default Caching Behavior in PocketPages

### Development Mode (`--dev`)

- **No Cache Header**: When running PocketPages in development mode using the `--dev` flag, all HTTP responses automatically include a `Cache-Control: no-cache` header.
- **Purpose**: This header instructs browsers and intermediaries not to cache responses, ensuring that developers always see the most recent changes without having to manually clear caches.

  ```http
  Cache-Control: no-cache
  ```

- **Implications**: While this setting is convenient during development, it may not be sufficient in all scenarios, especially when dealing with aggressive caching mechanisms like CDNs.

### Production Mode

- **Default Behavior**: In production mode, PocketPages does not add the `Cache-Control: no-cache` header. Responses may be cached by browsers and intermediaries according to standard caching rules.
- **Custom Headers**: You can set custom `Cache-Control` headers in your responses if you need specific caching behavior.

## Using `asset()` for Cache Busting

### Purpose of `asset()`

- **Functionality**: The `asset()` function in the request context is used to generate asset URLs, appending a cache-busting query parameter when necessary.
- **Syntax**:

  ```ejs
  <img src="<%%= asset('images/logo.png') %>" alt="Logo">
  ```

### Development Mode Behavior

- **Cache Busting**: When `$app.isDev() === true`, `asset()` appends a cache-busting stamp to the URL, such as `?__cache=12885832`.
- **Example**:

  ```html
  <img src="images/logo.png?__cache=12885832" alt="Logo" />
  ```

- **Benefit**: This ensures that even if an asset is cached, the browser will fetch the latest version during development, reflecting any changes immediately.

### Production Mode Behavior

- **Future Considerations**: In future releases, `asset()` may use a static or constant token in production mode to enable cache busting on new releases or deployments.
- **Best Practice**: Using `asset()` ensures that you have control over asset caching behavior across different environments, making it easier to manage cache invalidation after updates.

## Caching and Content Delivery Networks (CDNs)

### Understanding CDN Caching

- **Role of CDNs**: CDNs like Cloudflare cache content to reduce latency and improve performance by serving content from servers closer to the user.
- **Default Behavior**: CDNs have their own caching policies and may cache content even if your server instructs otherwise.

### Cloudflare Default Caching Behavior

- **Documentation**: Refer to [Cloudflare's Default Cache Behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) for detailed information.
- **Key Points**:
  - **Static Assets**: Cloudflare caches static assets like images, CSS, and JavaScript files by default.
  - **Dynamic Content**: Dynamic content is not cached unless explicitly configured.
  - **Cache-Control Headers**: Cloudflare respects `Cache-Control` headers to some extent but has specific rules that may override them.

### Recommendations for Using CDNs

- **Set Appropriate Headers**: Ensure that your application sets `Cache-Control` headers that align with your caching strategy.
- **Use `asset()` Function**: Leverage the `asset()` function to append cache-busting tokens to asset URLs, which can force CDNs to fetch the latest version.
- **Purge Cache on Deployment**: Consider purging the CDN cache after deploying new versions to ensure that users receive the updated content.
- **Test Caching Behavior**: Regularly test how your application behaves behind the CDN to identify any unexpected caching issues.

## Best Practices for Caching in PocketPages

### During Development

- **Rely on `--dev` Mode**: Use the `--dev` flag to automatically prevent caching of responses.
- **Use `asset()`**: Always use the `asset()` function for asset URLs to handle cache busting effectively.
- **Monitor Caching**: Be aware of any proxies or CDNs in your development environment that might cache responses unexpectedly.

### During Production

- **Set Explicit Cache-Control Headers**: Define caching policies for your content by setting appropriate `Cache-Control` headers.
- **Leverage CDN Features**: Use CDN capabilities to cache content effectively while ensuring that updates propagate as needed.
- **Implement Versioning**: Use versioning in your asset filenames or cache-busting tokens to control cache invalidation.
- **Plan for Future Changes**: Since `asset()` may introduce static tokens in the future, ensure your application can handle cache busting based on deployment cycles.

## Example: Implementing Cache Busting with `asset()`

### Using `asset()` in Templates

```ejs
<!-- In your EJS template -->
<link rel="stylesheet" href="<%%= asset('css/styles.css') %>">
<script src="<%%= asset('js/app.js') %>"></script>
```

### Outcome

- **Development Mode**:

  ```html
  <link rel="stylesheet" href="css/styles.css?__cache=12885832" />
  <script src="js/app.js?__cache=12885832"></script>
  ```

- **Production Mode**:

  ```html
  <link rel="stylesheet" href="css/styles.css" />
  <script src="js/app.js"></script>
  ```

- **Future Production Behavior**: With future updates, `asset()` might append a version token in production:

  ```html
  <link rel="stylesheet" href="css/styles.css?v=1.0.3" />
  <script src="js/app.js?v=1.0.3"></script>
  ```
