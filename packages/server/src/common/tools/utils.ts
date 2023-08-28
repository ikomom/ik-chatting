import * as crypto from 'node:crypto'

export function md5(str: string) {
  const m = crypto.createHash('md5')
  m.update(str, 'utf8')
  return m.digest('hex')
}
