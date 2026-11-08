/**
 * The installed pocketpages version, for the header badge.
 *
 * Goja can't require a bare JSON subpath ('pocketpages/package.json'), but it
 * can require a JSON file by absolute path, so try where the package lives:
 * next to pb_hooks when deployed (PocketHost ships node_modules there), or at
 * the monorepo root when running from this repo (bun hoists it there).
 */
const candidates = [
  `${__hooks}/../node_modules/pocketpages/package.json`,
  `${__hooks}/../../../node_modules/pocketpages/package.json`,
]

let version = ''
for (const path of candidates) {
  try {
    version = require(path).version
    if (version) break
  } catch (e) {}
}

module.exports = version
