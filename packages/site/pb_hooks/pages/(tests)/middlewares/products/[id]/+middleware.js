/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
    const start = new Date().toISOString();
    sleep(250);

    return { middlewares: [...(api.data.middlewares ?? []), `${start}: /products/[id]/+middleware.js`] }
}