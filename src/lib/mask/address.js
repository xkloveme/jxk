/**
 * 脱敏地址或普通字符串
 * @author xkloveme <xkloveme@gmail.com>
 * @category  mask
 * @alias mask_address
 * @param {string}   input 地址或普通字符串
 * @returns {String} 返回脱敏后的字符串
 * @example
 * import { mask_address } from 'jxk'
 * mask_address('江苏省南京市鼓楼区中山路18号德基广场写字楼16层') // 江苏省南*市鼓*区中******************层
 * mask_address('北京市海淀区清华园1号') // 北京市海*区清****号
 * mask_address('上海市浦东新区陆家嘴环路1000号') // 上海市浦*****陆***************号
 * mask_address('13812345678') // 1********78
 * mask_address('Hello World') // He*********ld
 */
export default (input) => {
  if (!input || typeof input !== 'string') return '';

  const regexPatterns = [
    { regex: /^(北京市|天津市|上海市|重庆市|.*?省|.*?自治区)/, keep: true },
    { regex: /(.+?市)/, mask: true },
    { regex: /(.+?(区|县|市|自治县|旗|自治旗))/, mask: true },
    { regex: /(.+?(街道|镇|乡))/, mask: true },
    { regex: /(.+?((路|街|巷|弄|号|楼|座|幢|栋|单元|室|层)($|\D)))/g, mask: true },
    { regex: /\d+/g, mask: true }
  ];

  let maskedInput = input;
  for (const { regex, keep, mask } of regexPatterns) {
    maskedInput = maskedInput.replace(regex, match => 
      keep ? match : (mask ? maskString(match) : match)
    );
  }

  // 如果没有被任何规则匹配，则将整个字符串视为普通字符串进行脱敏
  if (maskedInput === input) {
    maskedInput = maskString(input);
  }

  return maskedInput;
};

// 辅助函数：对字符串进行脱敏处理
function maskString(str) {
  const len = str.length;
  if (len <= 1) return '*';
  if (len === 2) return `${str[0]}*`;
  if (len <= 6) return `${str[0]}${'*'.repeat(len - 2)}${str[len - 1]}`;
  return `${str.slice(0, 2)}${'*'.repeat(len - 4)}${str.slice(-2)}`;
}