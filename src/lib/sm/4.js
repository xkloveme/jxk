import { SM4 } from "../../utils/sm4"
/**
 * sm4
 * @category sm
 * @alias sm4
 * @param {string|Uint8Array} originalData - 待加密的数据
 * @param {string|Uint8Array} key 加密密钥
 * @param {Object} [options] 加密选项
 * @param {('ecb'|'cbc')} [options.mode='ecb'] 加密模式
 * @param {('pkcs7'|'none')} [options.padding='pkcs7'] 填充方式
 * @param {('hex'|'array')} [options.output='hex'] 输出格式
 * @param {string|Uint8Array} [options.iv] 初始向量
 * @returns {string|Uint8Array} 加密后的数据
 * @example
 * 加密
 * import {sm4} from "jxk"
 * const msg = '我是原始数据' // 可以为 utf8 串或字节数组
 * const key = '5e0a3ab263b283e3db6001018776c4f0' // 可以为 16 进制串或字节数组，要求为 128 比特  *
 * let encryptData = sm4.encrypt(msg, key) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 充）
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none'}) // 加密，不使用 padding
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none', output: 'array'}) // 加密，不使用 padding，输出为字节数组
 * let encryptData = sm4.encrypt(msg, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 加密，cbc 模式
 * @example
 * 解密
  import {sm4} from "jxk"
  const encryptData =  'aaff18e2a966d10017469a492b800169d68e6f979da91cdeed454bb769665892' // 可以为 16 进制串或字节数组
  const key = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特
  let decryptData = sm4.decrypt(encryptData, key) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none'}) // 解密，不使用 padding
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none', output: 'array'}) // 解密，不使用 padding，输出为字节数组
  let decryptData = sm4.decrypt(encryptData, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 解密，cbc 模式
 * @author xkloveme <xkloveme@gmail.com>
 * @Date: 2024-08-10 21:53:59
 */
export default {
  /**
   * 加密数据
   * @param {string|Uint8Array} originalData - 待加密的数据
   * @param {string|Uint8Array} key - 加密密钥
   * @param {Object} [options] - 加密选项
   * @param {('ecb'|'cbc')} [options.mode='ecb'] - 加密模式
   * @param {('pkcs7'|'none')} [options.padding='pkcs7'] - 填充方式
   * @param {('hex'|'array')} [options.output='hex'] - 输出格式
   * @param {string|Uint8Array} [options.iv] - 初始向量
   * @returns {string|Uint8Array} - 加密后的数据
   */
  encrypt: (originalData, key, options = {}) => {
    if (originalData === '' || originalData === null || originalData === undefined) {
      return originalData;
    }
    try {
      const encrypted = SM4(originalData + '', key, 1, options);
      if (options.output === 'array') {
        return encrypted;
      } else {
        return encrypted.toString('hex');
      }
    } catch (error) {
      console.error('🐛: ~ encrypt ~ error:', originalData, error);
      return originalData;
    }
  },

  /**
   * 解密数据
   * @param {string|Uint8Array} encryptedData - 待解密的数据
   * @param {string|Uint8Array} key - 解密密钥
   * @param {Object} [options] - 解密选项
   * @param {('ecb'|'cbc')} [options.mode='ecb'] - 解密模式
   * @param {('pkcs7'|'none')} [options.padding='pkcs7'] - 填充方式
   * @param {('utf8'|'array')} [options.output='utf8'] - 输出格式
   * @param {string|Uint8Array} [options.iv] - 初始向量
   * @returns {string|Uint8Array} - 解密后的数据
   */
  decrypt: (encryptedData, key, options = {}) => {
    if (encryptedData === '' || encryptedData === null || encryptedData === undefined) {
      return encryptedData;
    }

    try {
      const decrypted = SM4(encryptedData, key, 0, options);
      if (decrypted === '') {
        throw new Error('Decryption failed')
      }
      if (options.output === 'array') {
        return decrypted;
      } else {
        const decryptedStr = decrypted.toString('utf8');
        try {
          // 尝试解析为 JSON 对象
          if(decryptedStr.includes('}') || decryptedStr.includes(']')){
            return JSON.parse(decryptedStr);
          }else{
            return decryptedStr;
          }
        } catch (parseError) {
          // 如果解析失败，返回原始字符串
          return decryptedStr;
        }
      }
    } catch (error) {
      console.error('🐛: ~ decrypt ~ error:', encryptedData, error);
      return encryptedData;
    }
  }
}