export const fingerprint = (nodeName: string, fingerprint: string) => {
  // Split filename into base and extension
  const lastDotIndex = nodeName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    // No extension - just append fingerprint
    return `${nodeName}.${fingerprint}`
  }

  const base = nodeName.slice(0, lastDotIndex)
  const ext = nodeName.slice(lastDotIndex)

  // Insert fingerprint between base and extension
  return `${base}.${fingerprint}${ext}`
}
