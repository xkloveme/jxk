import { SM2 } from "../../utils/sm2";
/**
 * SM2 椭圆曲线公钥密码算法
 * 
 * @description SM2 是中华人民共和国密码行业标准，由国家密码管理局于 2010 年 12 月发布。
 *              SM2 算法基于椭圆曲线离散对数难题，具有高安全性和高效率的特点。
 *              该算法支持密钥生成、数字签名、签名验证、公钥加密和密钥协商等功能。
 * 
 * @module SM2
 * @category sm
 * @alias sm2
 * @author xkloveme <xkloveme@gmail.com>
 * @since 0.1.0
 * @date 2024-08-10 21:53:59
 * 
 * @see {@link https://www.oscca.gov.cn/sca/xxgk/2010-12/17/content_1002386.shtml} SM2 椭圆曲线公钥密码算法标准
 * @see {@link sm3} SM3 密码杂凑算法
 * @see {@link sm4} SM4 分组密码算法
 * 
 * @example
 * // 密钥对管理示例
 * import { sm2 } from 'jxk'
 * 
 * // 生成密钥对
 * const keyPair = sm2.generateKeyPairHex()
 * console.log('公钥长度:', keyPair.publicKey.length)   // 130 位十六进制
 * console.log('私钥长度:', keyPair.privateKey.length)  // 64 位十六进制
 * 
 * // 公钥压缩（节省存储空间）
 * const compressedPublicKey = sm2.compressPublicKeyHex(keyPair.publicKey)
 * console.log('压缩公钥长度:', compressedPublicKey.length) // 66 位十六进制
 * 
 * // 验证公钥等价性
 * const isEquivalent = sm2.comparePublicKeyHex(keyPair.publicKey, compressedPublicKey)
 * console.log('公钥等价:', isEquivalent) // true
 * 
 * @example
 * // 加密解密示例
 * import { sm2 } from 'jxk'
 * 
 * const keyPair = sm2.generateKeyPairHex()
 * const plaintext = '机密消息内容'
 * 
 * // 加密操作
 * const cipherMode = 1 // 1: C1C3C2模式, 0: C1C2C3模式
 * const encrypted = sm2.doEncrypt(plaintext, keyPair.publicKey, cipherMode)
 * console.log('密文长度:', encrypted.length)
 * 
 * // 解密操作
 * const decrypted = sm2.doDecrypt(encrypted, keyPair.privateKey, cipherMode)
 * console.log('解密结果:', decrypted) // '机密消息内容'
 * 
 * // 支持 ASN.1 编码
 * const asn1Encrypted = sm2.doEncrypt(plaintext, keyPair.publicKey, cipherMode, { asn1: true })
 * const asn1Decrypted = sm2.doDecrypt(asn1Encrypted, keyPair.privateKey, cipherMode, { asn1: true })
 * 
 * @example
 * // 数字签名与验证示例
 * import { sm2 } from 'jxk'
 * 
 * const keyPair = sm2.generateKeyPairHex()
 * const message = '需要签名的文档内容'
 * 
 * // 基本签名
 * const signature = sm2.doSignature(message, keyPair.privateKey)
 * const isValid = sm2.doVerifySignature(message, signature, keyPair.publicKey)
 * console.log('签名验证结果:', isValid) // true
 * 
 * // 使用 SM3 哈希 + DER 编码的高级签名
 * const advancedSignature = sm2.doSignature(message, keyPair.privateKey, {
 *   hash: true,      // 使用 SM3 哈希
 *   der: true,       // 使用 DER 编码
 *   publicKey: keyPair.publicKey,  // 提供公钥提升性能
 *   userId: 'user@example.com'     // 用户标识
 * })
 * 
 * const advancedValid = sm2.doVerifySignature(message, advancedSignature, keyPair.publicKey, {
 *   hash: true,
 *   der: true,
 *   userId: 'user@example.com'
 * })
 * 
 * @example
 * // 安全最佳实践
 * import { sm2 } from 'jxk'
 * 
 * // 1. 使用安全的随机数生成器初始化
 * await sm2.initRNGPool()
 * 
 * // 2. 生成密钥对时使用高质量随机数
 * const keyPair = sm2.generateKeyPairHex()
 * 
 * // 3. 验证公钥有效性
 * const isValidPublicKey = sm2.verifyPublicKey(keyPair.publicKey)
 * if (!isValidPublicKey) {
 *   throw new Error('公钥验证失败')
 * }
 * 
 * // 4. 安全存储私钥（实际应用中应加密存储）
 * // 注意：这只是示例，实际中不应直接打印私钥
 * console.log('请安全存储私钥:', keyPair.privateKey)
 * 
 * @security
 * 安全注意事项：
 * 1. 私钥必须安全存储，不得明文传输或存储
 * 2. 在生产环境中使用高质量的随机数生成器
 * 3. 定期更新密钥对，避免长期使用同一密钥
 * 4. 对敏感数据加密时，建议结合使用 SM4 对称加密
 * 5. 签名时使用 SM3 哈希加强安全性
 */
 * @example
 * import {sm2} from "jxk";
 let keypair = sm2.generateKeyPairHex()

publicKey = keypair.publicKey // 公钥
privateKey = keypair.privateKey // 私钥

// 默认生成公钥 130 位太长，可以压缩公钥到 66 位
const compressedPublicKey = sm2.compressPublicKeyHex(publicKey) // compressedPublicKey 和 publicKey 等价
sm2.comparePublicKeyHex(publicKey, compressedPublicKey) // 判断公钥是否等价

// 自定义随机数，参数会直接透传给 BigInt 构造器
// 注意：开发者使用自定义随机数，需要自行确保传入的随机数符合密码学安全
let keypair2 = sm2.generateKeyPairHex('123123123123123')

// 初始化随机数池，在某些场景下可能会用到
await sm2.initRNGPool()

let verifyResult = sm2.verifyPublicKey(publicKey) // 验证公钥
verifyResult = sm2.verifyPublicKey(compressedPublicKey) // 验证公钥
 * @example
// 加密解密
import { sm2 } from 'jxk'
const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
// 支持使用 asn1 对加密结果进行编码，在 options 参数中传入 { asn1: true } 即可，默认不开启
let encryptData = sm2.doEncrypt(msgString, publicKey, cipherMode, { asn1: false }) // 加密结果

// 支持使用 asn1 对密文进行解码再解密，在 options 参数中传入 { asn1: true } 即可，默认不开启
let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode, { asn1: false }) // 解密结果

encryptData = sm2.doEncrypt(msgArray, publicKey, cipherMode) // 加密结果，输入数组
decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode, {output: 'array'}) // 解密结果，输出数组
 * @example
// 签名验签
// 纯签名 + 生成椭圆曲线点
let sigValueHex = sm2.doSignature(msg, privateKey) // 签名
let verifyResult = sm2.doVerifySignature(msg, sigValueHex, publicKey) // 验签结果

// 纯签名
let sigValueHex2 = sm2.doSignature(msg, privateKey, {
    pointPool: [sm2.getPoint(), sm2.getPoint(), sm2.getPoint(), sm2.getPoint()], // 传入事先已生成好的椭圆曲线点，可加快签名速度
}) // 签名
let verifyResult2 = sm2.doVerifySignature(msg, sigValueHex2, publicKey) // 验签结果

// 纯签名 + 生成椭圆曲线点 + der编解码
let sigValueHex3 = sm2.doSignature(msg, privateKey, {
    der: true,
}) // 签名
let verifyResult3 = sm2.doVerifySignature(msg, sigValueHex3, publicKey, {
    der: true,
}) // 验签结果

// 纯签名 + 生成椭圆曲线点 + sm3杂凑
let sigValueHex4 = sm2.doSignature(msg, privateKey, {
    hash: true,
}) // 签名
let verifyResult4 = sm2.doVerifySignature(msg, sigValueHex4, publicKey, {
    hash: true,
}) // 验签结果

// 纯签名 + 生成椭圆曲线点 + sm3杂凑（不做公钥推导）
let sigValueHex5 = sm2.doSignature(msg, privateKey, {
    hash: true,
    publicKey, // 传入公钥的话，可以去掉sm3杂凑中推导公钥的过程，速度会比纯签名 + 生成椭圆曲线点 + sm3杂凑快
})
let verifyResult5 = sm2.doVerifySignature(msg, sigValueHex5, publicKey, {
    hash: true,
    publicKey,
})

// 纯签名 + 生成椭圆曲线点 + sm3杂凑 + 不做公钥推 + 添加 userId（长度小于 8192）
// 默认 userId 值为 1234567812345678
let sigValueHex6 = sm2.doSignature(msgString, privateKey, {
    hash: true,
    publicKey,
    userId: 'testUserId',
})
let verifyResult6 = sm2.doVerifySignature(msgString, sigValueHex6, publicKey, {
    hash: true,
    userId: 'testUserId',
})
 * @author xkloveme <xkloveme@gmail.com>
 * @Date: 2024-08-10 21:53:59
 */
export default function sm2() {
  return SM2
}
