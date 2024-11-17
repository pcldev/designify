export default function getFilenameAndTypeFromShopifyCDN(shopifyCDN: string) {
  try {
    const urlSplitted = shopifyCDN.split('/')
    const handle = urlSplitted[urlSplitted?.length - 1]?.split('?v=')[0] || ''

    const splittedHandle = handle.split('.')
    const filename = splittedHandle[0] || ''
    const type = splittedHandle[splittedHandle.length - 1] || ''
    return { filename, type }
  } catch (err) {
    return { filename: '', type: '' }
  }
}
