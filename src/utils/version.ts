export function isVersionUpdated(a: string, b: string): boolean {
  const aArr = a.split('.')
  const bArr = b.split('.')
  for (let i = 0; i < aArr.length; i++) {
    if (parseInt(aArr[i]) < parseInt(bArr[i])) {
      return true
    }
  }
  return false
}
