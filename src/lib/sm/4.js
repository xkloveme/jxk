import {sm4} from "sm-crypto"
/**
 * sm4 
 * @category sm
 * @alias sm4
 * @param {(string | number)} num
 * @returns {boolean}
 * @example
 * 加密
 * import {sm4} from "jxk"
 * const msg = 'hello world! 我是 juneandgreen.' // 可以为 utf8 串或字节数组
 * const key = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特  *
 * let encryptData = sm4.encrypt(msg, key) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 充）
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none'}) // 加密，不使用 padding
 * let encryptData = sm4.encrypt(msg, key, {padding: 'none', output: 'array'}) // 加密，不使用 padding，输出为字节数组
 * let encryptData = sm4.encrypt(msg, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 加密，cbc 模式
 * @example
 * 解密
  import {sm4} from "jxk"
  const encryptData =   '0e395deb10f6e8a17e17823e1fd9bd98a1bff1df508b5b8a1efb79ec633d1bb129432ac1b74972dbe97bab04f024e89c' // 可以为 16 进制串或字节数组
  const key = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特
  let decryptData = sm4.decrypt(encryptData, key) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none'}) // 解密，不使用 padding
  let decryptData = sm4.decrypt(encryptData, key, {padding: 'none', output: 'array'}) // 解密，不使用 padding，输出为字节数组
  let decryptData = sm4.decrypt(encryptData, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 解密，cbc 模式
 * @author xkloveme xkloveme@gmail.com
 * @Date: 2024-08-10 21:53:59
 */
/**
 * SM4 加密和解密工具
 * @category sm
 * @alias sm4
 * @author xkloveme xkloveme@gmail.com
 * @Date: 2024-08-10 21:53:59
 */
export class SM4Tool {
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
  static encrypt(originalData, key, options = {}) {
    if (!originalData) {
      return originalData;
    }

    try {
      const sm4 = new SM4({ mode: options.mode || 'ecb', padding: options.padding || 'pkcs7' });
      const encrypted = sm4.encrypt(originalData, key);

      if (options.output === 'array') {
        return encrypted;
      } else {
        return encrypted.toString('hex');
      }
    } catch (error) {
      console.error('🐛: ~ encrypt ~ error:', originalData, error);
      return '';
    }
  }

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
  static decrypt(encryptedData, key, options = {}) {
    if (!encryptedData) {
      return encryptedData;
    }

    try {
      const sm4 = new SM4({ mode: options.mode || 'ecb', padding: options.padding || 'pkcs7' });
      const decrypted = sm4.decrypt(encryptedData, key);

      if (options.output === 'array') {
        return decrypted;
      } else {
        const decryptedStr = decrypted.toString('utf8');
        try {
          // 尝试解析为 JSON 对象
          return JSON.parse(decryptedStr);
        } catch (parseError) {
          // 如果解析失败，返回原始字符串
          return decryptedStr;
        }
      }
    } catch (error) {
      console.error('🐛: ~ decrypt ~ error:', encryptedData, error);
      return '';
    }
  }
}

// 导出 SM4Tool 类
export default SM4Tool;