/**
 * 脱敏邮箱
 * @author xkloveme <xkloveme@gmail.com>
 * @category mask
 * @alias mask_email
 * @param {string} email 邮箱地址
 * @returns {String} 返回脱敏后的邮箱地址
 * @example
 * import { mask_email } from 'jxk'
 * mask_email('contact@163.com') // con***@163.com
 * mask_email('tt@163.com') // tt***@163.com
 */
export default (email) => {
  if (!email) return null
  
  const parts = email.split('@')
  if (parts.length !== 2) return email
  
  const [username, domain] = parts
  
  // 处理@前面的部分
  let maskedUsername
  if (username.length <= 2) {
    maskedUsername = username + '***'
  } else {
    maskedUsername = username.substring(0, 3) + '***'
  }
  
  return `${maskedUsername}@${domain}`
}
