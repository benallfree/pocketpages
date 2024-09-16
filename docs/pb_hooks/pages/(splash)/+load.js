/**
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
const load = (context) => {
  return {
    version: require(`${__hooks}/../package.json`).version,
  }
}

module.exports = load
