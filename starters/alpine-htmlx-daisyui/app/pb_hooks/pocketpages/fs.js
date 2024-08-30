const readFileSync = (path, options) => {
  const res = $os.readFile(path);
  if (typeof res === "string") {
    return res;
  }
  const s = String.fromCharCode.apply(null, res);
  return s;
};

const existsSync = (path) => {
  try {
    return $filesystem.fileFromPath(path) !== null;
  } catch {
    return false;
  }
};

module.exports = { readFileSync, existsSync };
