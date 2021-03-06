import crypto, {randomUUID} from 'crypto'

export default class User {
  public id: string | undefined
  public uuid = ''
  public phone = ''
  public pendingCode = ''
  public codeHash = ''
  public lastSentCode: number = 0

  constructor(uuid: string, phone: string) {
    this.uuid = uuid || User.generateUUID()
    this.phone = phone
  }

  verify(code: string) {
    // TODO hash code and compare to pendingCode
    const hash = crypto.createHash('sha256').update(code).digest('hex')
    console.log(hash, code, this.pendingCode, this.codeHash)
    return this.pendingCode === code && this.codeHash === hash
  }

  static generateUUID(): string {
    return randomUUID()
  }

  static fromDatabase(result: any) {
    const u = new User(result.uuid, result.phone)
    u.id = result.id
    u.pendingCode = result.pendingCode
    u.codeHash = result.codeHash
    return u
  }
}
