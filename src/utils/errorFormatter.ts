export function formatDuplicateKeyError (e: any) {
  const keys = Object.keys(e.keyPattern)
  return {
    code: 'duplicate_key',
    keys,
    path: ['body'],
    message: `Duplicate key(s) in object: ${keys.join(', ')}`
  }
}
