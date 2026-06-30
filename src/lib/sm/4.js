import { SM4, gcmEncrypt, gcmDecrypt } from "../../utils/sm4"

function hexToBytes(hex) {
  const arr = []
  for (let i = 0; i < hex.length; i += 2) {
    arr.push(parseInt(hex.substr(i, 2), 16))
  }
  return new Uint8Array(arr)
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * sm4
 * @category sm
 * @alias sm4
 * @param {string|Uint8Array} originalData - 待加密的数据
 * @param {string|Uint8Array} key 加密密钥
 * @param {Object} [options] 加密选项
 * @param {('ecb'|'cbc'|'gcm')} [options.mode='ecb'] 加密模式
 * @param {('pkcs7'|'none')} [options.padding='pkcs7'] 填充方式
 * @param {('hex'|'array')} [options.output='hex'] 输出格式
 * @param {string|Uint8Array} [options.iv] 初始向量（CBC: 16字节hex; GCM: 12字节Uint8Array）
 * @param {Uint8Array} [options.aad] GCM模式附加认证数据
 * @returns {string|Uint8Array} 加密后的数据
 * @example
 * 加密
 * import {sm4} from "jxk"
 * const msg = '我是原始数据' // 可以为 utf8 串或字节数组
 * const key = '5e0a3ab263b283e3db6001018776c4f0' // 可以为 16 进制串或字节数组，要求为 128 比特
 * let encryptData = sm4.encrypt(msg, key) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none'}) // 加密，不使用 padding
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none', output: 'array'}) // 加密，不使用 padding，输出为字节数组
 * let encryptData = sm4.encrypt(msg, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 加密，cbc 模式
 * let encryptData = sm4.encrypt(msg, key, {mode: 'gcm'}) // 加密，gcm 模式，自动随机IV
 * @example
 * 解密
  import {sm4} from "jxk"
  const encryptData =  'aaff18e2a966d10017469a492b800169d68e6f979da91cdeed454bb769665892' // 可以为 16 进制串或字节数组
  const key = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特
  let decryptData = sm4.decrypt(encryptData, key) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none'}) // 解密，不使用 padding
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none', output: 'array'}) // 解密，不使用 padding，输出为字节数组
  let decryptData = sm4.decrypt(encryptData, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 解密，cbc 模式
  let decryptData = sm4.decrypt(encryptData, key, {mode: 'gcm'}) // 解密，gcm 模式（密文需含IV和Tag）
 * @author xkloveme <xkloveme@gmail.com>
 * @Date: 2024-08-10 21:53:59
 */
export default {
  /**
   * 加密数据
   * @param {string|Uint8Array} originalData - 待加密的数据
   * @param {string|Uint8Array} key - 加密密钥
   * @param {Object} [options] - 加密选项
   * @param {('ecb'|'cbc'|'gcm')} [options.mode='ecb'] - 加密模式
   * @param {('pkcs7'|'none')} [options.padding='pkcs7'] - 填充方式
   * @param {('hex'|'array')} [options.output='hex'] - 输出格式
   * @param {string|Uint8Array} [options.iv] - 初始向量
   * @param {Uint8Array} [options.aad] - GCM附加认证数据
   * @returns {string|Uint8Array} - 加密后的数据
   */
  encrypt: (originalData, key, options = {}) => {
    if (originalData === '' || originalData === null || originalData === undefined) {
      return originalData;
    }
    try {
      if (options.mode === 'gcm') {
        const iv = options.iv || crypto.getRandomValues(new Uint8Array(12))
        const { ciphertext, tag } = gcmEncrypt(originalData, key, iv, options.aad)
        // Format: IV(12) + ciphertext + Tag(16)
        const result = new Uint8Array(12 + ciphertext.length + 16)
        result.set(iv, 0)
        result.set(ciphertext, 12)
        result.set(tag, 12 + ciphertext.length)
        return options.output === 'array' ? result : bytesToHex(result)
      }
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
   * @param {('ecb'|'cbc'|'gcm')} [options.mode='ecb'] - 解密模式
   * @param {('pkcs7'|'none')} [options.padding='pkcs7'] - 填充方式
   * @param {('utf8'|'array')} [options.output='utf8'] - 输出格式
   * @param {string|Uint8Array} [options.iv] - 初始向量
   * @param {Uint8Array} [options.aad] - GCM附加认证数据
   * @returns {string|Uint8Array} - 解密后的数据
   */
  decrypt: (encryptedData, key, options = {}) => {
    if (encryptedData === '' || encryptedData === null || encryptedData === undefined) {
      return encryptedData;
    }

    try {
      if (options.mode === 'gcm') {
        const data = typeof encryptedData === 'string' ? hexToBytes(encryptedData) : encryptedData
        if (data.length < 28) throw new Error('GCM ciphertext too short')
        const iv = data.slice(0, 12)
        const tag = data.slice(data.length - 16)
        const ciphertext = data.slice(12, data.length - 16)
        const plaintext = gcmDecrypt(ciphertext, key, iv, tag, options.aad)
        if (options.output === 'array') {
          return plaintext
        }
        const decoder = new TextDecoder('utf-8')
        const str = decoder.decode(plaintext)
        try {
          if (str.includes('}') || str.includes(']')) {
            return JSON.parse(str)
          }
          return str
        } catch {
          return str
        }
      }
      const decrypted = SM4(encryptedData, key, 0, options);
      if (decrypted === '') {
        throw new Error('Decryption failed')
      }
      if (options.output === 'array') {
        return decrypted;
      } else {
        const decryptedStr = decrypted.toString('utf8');
        try {
          if(decryptedStr.includes('}') || decryptedStr.includes(']')){
            return JSON.parse(decryptedStr);
          }else{
            return decryptedStr;
          }
        } catch (parseError) {
          return decryptedStr;
        }
      }
    } catch (error) {
      console.error('🐛: ~ decrypt ~ error:', encryptedData, error);
      return encryptedData;
    }
  }
}