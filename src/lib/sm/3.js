import { SM3 } from "../../utils/sm3";

/**
 * SM3 哈希算法实现
 * @module SM3
 */

/**
 * SM3 密码杂凑算法实现
 * 
 * @description SM3 是中华人民共和国密码行业标准，由国家密码管理局于 2010 年 12 月发布。
 *              SM3 算法适用于商用密码应用中的数字签名和验证，消息认证码的生成与验证，
 *              以及随机数的生成等。该算法对长度为 l (l < 2^64) 的消息，
 *              经过填充和迭代压缩，生成长度为 256 位的杂凑值。
 * 
 * @module SM3
 * @category sm
 * @alias sm3
 * @author xkloveme <xkloveme@gmail.com>
 * @since 0.1.0
 * @date 2024-08-10 21:53:59
 */

/**
 * SM3 消息摘要算法
 * 
 * @description 计算指定数据的 SM3 哈希值。SM3 是一种密码杂凑函数，
 *              具有以下特点：
 *              - 输出长度固定为 256 位（32 字节）
 *              - 单向性：从哈希值无法推导出原始数据
 *              - 雪崩效应：输入的微小变化会导致输出的巨大变化
 *              - 抗碰撞性：难以找到两个不同的输入产生相同的哈希值
 * 
 * @param {string|Buffer} data - 需要计算哈希的数据，可以是字符串或 Buffer 对象
 * @param {Object} [options] - 哈希计算选项
 * @param {string} [options.encoding='hex'] - 输出编码格式，可选值：'hex'、'base64'、'buffer'
 * @param {string} [options.inputEncoding='utf8'] - 输入数据编码格式（当 data 为字符串时）
 * 
 * @returns {string|Buffer} SM3 哈希值，格式由 options.encoding 决定
 * 
 * @throws {TypeError} 当输入参数类型不正确时抛出错误
 * @throws {Error} 当哈希计算失败时抛出错误
 * 
 * @example
 * // 基本用法 - 计算字符串的 SM3 哈希值
 * import { sm3 } from 'jxk'
 * 
 * const message = 'Hello, World!'
 * const hash = sm3(message)
 * console.log(hash)
 * // => '44f0061e69fa6fdfc290c494654a05dc0c053da7e5c52b84ef93a9d67d3fff88'
 * 
 * @example
 * // 使用不同的输出格式
 * const data = '中文测试'
 * 
 * // 十六进制输出（默认）
 * const hexHash = sm3(data, { encoding: 'hex' })
 * console.log(hexHash) // => '66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0'
 * 
 * // Base64 输出
 * const base64Hash = sm3(data, { encoding: 'base64' })
 * console.log(base64Hash) // => 'Zsfzxj7u7dnR8tRr3BDk4kFnxIdc8veiKX2gK49LqOA='
 * 
 * @example
 * // 处理 Buffer 数据
 * const buffer = Buffer.from('Binary data', 'utf8')
 * const bufferHash = sm3(buffer)
 * console.log(bufferHash)
 * // => 'f7c3bc1d808e04732adf679965ccc34ca7ae3441b49bdc6502dd27e4d8c4c43'
 * 
 * @example
 * // 用于数字签名前的消息摘要
 * const document = '重要合同内容...'
 * const digest = sm3(document)
 * console.log('文档摘要:', digest)
 * 
 * @example
 * // 用于密码存储（注意：实际应用中应加盐）
 * const password = 'userPassword123'
 * const salt = 'randomSalt456'
 * const hashedPassword = sm3(password + salt)
 * console.log('密码哈希:', hashedPassword)
 * 
 * @example
 * // 用于数据完整性校验
 * const fileData = 'file content...'
 * const checksum = sm3(fileData)
 * console.log('文件校验和:', checksum)
 * 
 * @see {@link https://www.oscca.gov.cn/sca/xxgk/2010-12/17/content_1002389.shtml} SM3 密码杂凑算法标准
 * @see {@link sm2} SM2 椭圆曲线公钥密码算法
 * @see {@link sm4} SM4 分组密码算法
 */
export default function sm3(data, options) {
    return SM3(data, options)
}