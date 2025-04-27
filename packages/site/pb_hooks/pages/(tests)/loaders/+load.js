/**
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
const load = (context) => {
    return {
        method: context.request.method
    }
}

module.exports = load
