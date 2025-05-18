/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
    const start = new Date().toISOString();
    sleep(250);

    return { middlewares: [...(api.data.middlewares ?? []), `${start}: /products/[id]/+load.js`] }
}