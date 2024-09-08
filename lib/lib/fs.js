function byteArrayToUtf8(byteArray) {
  let utf8String = ''
  for (let i = 0; i < byteArray.length; i++) {
    utf8String += String.fromCharCode(byteArray[i])
  }
  return decodeURIComponent(escape(utf8String)) // Handle multi-byte characters
}

const readFileSync = (path, options) => {
  const res = $os.readFile(path)
  if (typeof res === 'string') {
    return res
  }
  const s = byteArrayToUtf8(res)
  return s
}

const existsSync = (path, fileType = `file`) => {
  const isDir = (() => {
    try {
      $os.readDir(path)
      return true
    } catch {
      return false
    }
  })()
  const isFile = (() => {
    if (isDir) {
      return false
    }
    try {
      return $filesystem.fileFromPath(path) !== null
    } catch {
      return false
    }
  })()
  // console.log(JSON.stringify({ path, isDir, isFile }, null, 2))
  return fileType === 'file'
    ? isFile
    : fileType === 'dir'
      ? isDir
      : isFile || isDir
}

module.exports = { readFileSync, existsSync }
