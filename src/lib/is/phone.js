/**
 * 判断是否是中国大陆手机号
 * 
 * 支持以下号段：
 * - 移动：134-139, 147, 150-152, 157-159, 178, 182-184, 187-188, 198
 * - 联通：130-132, 145, 155-156, 166, 171-172, 175-176, 185-186, 196
 * - 电信：133, 149, 153, 173-174, 177, 180-181, 189, 191, 193, 199
 * - 虚拟运营商：170
 * 
 * @author 杜同学 <https://github.com/duweikang>
 * @category is
 * @alias is_phone
 * @param {any} value - 待验证的值
 * @returns {boolean} 如果是有效的中国大陆手机号返回 true，否则返回 false
 * @since 0.1.0
 * 
 * @example
 * // 验证有效手机号
 * is_phone('13812345678'); // true
 * is_phone('15987654321'); // true
 * is_phone('18123456789'); // true
 * 
 * @example
 * // 验证无效输入
 * is_phone('12345678901'); // false (非手机号段)
 * is_phone('138123456789'); // false (位数错误)
 * is_phone('138-1234-5678'); // false (包含分隔符)
 * is_phone(''); // false (空字符串)
 * is_phone(null); // false (非字符串)
 * 
 * @example
 * // 在表单验证中使用
 * function validatePhoneInput(input) {
 *   const phone = input.value.trim();
 *   if (!is_phone(phone)) {
 *     showError('请输入有效的手机号');
 *     return false;
 *   }
 *   return true;
 * }
 * 
 * @example
 * // 过滤数组中的有效手机号
 * const contacts = ['13812345678', '12345678901', '15987654321', 'invalid'];
 * const validPhones = contacts.filter(is_phone);
 * console.log(validPhones); // ['13812345678', '15987654321']
 * 
 * @note 此函数仅验证号码格式，不验证号码是否真实存在或已被分配
 * @note 随着运营商号段的变化，验证规则可能需要更新
 */
export default (value) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(value);
};
