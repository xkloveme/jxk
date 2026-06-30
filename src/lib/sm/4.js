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
 * SM4 分组密码算法
 * 
 * @description SM4 是中华人民共和国密码行业标准，由国家密码管理局于 2012 年 3 月发布。
 *              SM4 算法是一种对称分组密码算法，分组长度为 128 位，密钥长度为 128 位。
 *              该算法采用非线性变换、线性变换和轮密钥加的迭代结构，
 *              加密轮数为 32 轮，具有高安全性和高效率的特点。
 * 
 * @module SM4
 * @category sm
 * @alias sm4
 * @author xkloveme <xkloveme@gmail.com>
 * @since 0.1.0
 * @date 2024-08-10 21:53:59
 * 
 * @see {@link https://www.oscca.gov.cn/sca/xxgk/2012-03/21/content_1002386.shtml} SM4 分组密码算法标准
 * @see {@link sm2} SM2 椭圆曲线公钥密码算法
 * @see {@link sm3} SM3 密码杂凑算法
 * 
 * @param {string|Uint8Array} originalData - 待加密的数据
 * @param {string|Uint8Array} key 加密密钥
 * @param {Object} [options] 加密选项
 * @param {('ecb'|'cbc'|'gcm')} [options.mode='ecb'] 加密模式
 * @param {('pkcs7'|'none')} [options.padding='pkcs7'] 填充方式
 * @param {('hex'|'array')} [options.output='hex'] 输出格式
 * @param {string|Uint8Array} [options.iv] 初始向量（CBC: 16字节hex; GCM: 12字节Uint8Array）
 * @param {Uint8Array} [options.aad] GCM模式附加认证数据
 * @returns {string|Uint8Array} 加密后的数据
 * 
 * @example
 * // 基本加密操作（ECB 模式）
 * import { sm4 } from 'jxk'
 * 
 * const plaintext = '机密数据内容' 
 * const key = '0123456789abcdeffedcba9876543210' // 128 位密钥（32 个十六进制字符）
 * 
 * // 默认 ECB 模式加密
 * const encrypted = sm4.encrypt(plaintext, key)
 * console.log('密文:', encrypted)
 * 
 * // 解密
 * const decrypted = sm4.decrypt(encrypted, key)
 * console.log('明文:', decrypted) // '机密数据内容'
 * 
 * @example
 * // CBC 模式加密（更安全）
 * import { sm4 } from 'jxk'
 * 
 * const plaintext = '机密数据内容'
 * const key = '0123456789abcdeffedcba9876543210'
 * const iv = 'fedcba98765432100123456789abcdef'  // 128 位初始向量
 * 
 * // CBC 模式加密
 * const encrypted = sm4.encrypt(plaintext, key, {
 *   mode: 'cbc',
 *   iv: iv
 * })
 * 
 * // CBC 模式解密
 * const decrypted = sm4.decrypt(encrypted, key, {
 *   mode: 'cbc',
 *   iv: iv
 * })
 * 
 * @example
 * // 不同输出格式示例
 * const data = '测试数据'
 * const key = '0123456789abcdeffedcba9876543210'
 * 
 * // 十六进制输出（默认）
 * const hexResult = sm4.encrypt(data, key, { output: 'hex' })
 * console.log('十六进制:', hexResult)
 * 
 * // 字节数组输出
 * const arrayResult = sm4.encrypt(data, key, { output: 'array' })
 * console.log('字节数组:', arrayResult)
 * 
 * @example
 * // 无填充模式（数据长度必须是 16 的倍数）
 * const data = '1234567890123456' // 16 字节数据
 * const key = '0123456789abcdeffedcba9876543210'
 * 
 * const encrypted = sm4.encrypt(data, key, { padding: 'none' })
 * const decrypted = sm4.decrypt(encrypted, key, { padding: 'none' })
 * 
 * @example
 * // 批量数据加密（大文件处理）
 * const largeData = 'x'.repeat(10000) // 10KB 数据
 * const key = '0123456789abcdeffedcba9876543210'
 * 
 * console.time('SM4 加密耗时')
 * const encrypted = sm4.encrypt(largeData, key)
 * console.timeEnd('SM4 加密耗时')
 * 
 * console.time('SM4 解密耗时')
 * const decrypted = sm4.decrypt(encrypted, key)
 * console.timeEnd('SM4 解密耗时')
 * 
 * @example
 * // 与 SM2 结合使用（混合加密）
 * import { sm2, sm4 } from 'jxk'
 * 
 * // 1. 生成 SM2 密钥对
 * const keyPair = sm2.generateKeyPairHex()
 * 
 * // 2. 生成 SM4 对称密钥
 * const sm4Key = '0123456789abcdeffedcba9876543210'
 * 
 * // 3. 使用 SM4 加密大量数据
 * const largeData = '大量机密数据...'
 * const encryptedData = sm4.encrypt(largeData, sm4Key)
 * 
 * // 4. 使用 SM2 加密 SM4 密钥
 * const encryptedKey = sm2.doEncrypt(sm4Key, keyPair.publicKey)
 * 
 * // 5. 传输 { encryptedData, encryptedKey }
 * 
 * // 6. 解密过程：
 * // 首先使用 SM2 解密出 SM4 密钥
 * const decryptedSm4Key = sm2.doDecrypt(encryptedKey, keyPair.privateKey)
 * // 然后使用 SM4 密钥解密数据
 * const decryptedData = sm4.decrypt(encryptedData, decryptedSm4Key)
 * 
 * @security
 * 安全注意事项：
 * 1. 密钥必须是 128 位（16 字节）长度，使用高质量随机数生成
 * 2. 生产环境中建议使用 CBC 模式而非 ECB 模式
 * 3. CBC 模式下的初始向量 (IV) 必须唯一且不可预测
 * 4. 密钥存储和传输必须加密保护，不得明文存储
 * 5. 定期轮换密钥，避免长期使用同一密钥
 * 6. 对于大文件加密，考虑使用流式加密方式
 * 7. 加密后的数据应进行完整性校验（如使用 SM3 哈希）
 *
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