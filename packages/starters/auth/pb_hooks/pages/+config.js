module.exports = (api) => ({
  plugins: [
    'pocketpages-plugin-auth',
    {
      name: 'pocketpages-plugin-js-sdk',
      // The auth plugin calls PocketBase's API over HTTP. Set POCKETBASE_URL
      // when PocketBase isn't at http://localhost:8090 (e.g. when hosted).
      host: api.env('POCKETBASE_URL') || 'http://localhost:8090',
    },
    'pocketpages-plugin-ejs',
  ],
  debug: false,
})
