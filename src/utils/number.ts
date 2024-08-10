/**
 * 判断是否是数字
 * @param {number | string} num 数字
 * @returns {boolean} 布尔值
 */
export function isNumber(num: string | number): boolean {
  return new RegExp(/^-?([0-9]?|[1-9]\d+)(\.\d+)?$/).test(`${num}`);
}

/**
 * 数字转千分位
 * @param {number | string} num 数字
 * @returns {string} 千分位数字
 */
export function thousandth(num: string | number): string {
  if (!isNumber(num)) {
    throw new Error('输入参数必须是数字或数字型字符串');
  }

  num = `${num}`; // To String
  const numArr: string[] = num.split('.');
  numArr[0] = numArr[0].replace(/(?=\B(\d{3})+$)/g, ',');
  num = numArr.join('.');
  return num;
}

/**
 * 数字补0
 * @param { string | number } num 原数字
 * @param { number } len 总位数（总长度）
 * @returns {string} 返回补0后的字符串
 */
export function zeroFilling(
  num: string | number,
  len: number,
  check: boolean = true,
): string {
  num = `${num}`;

  if (check && !/^([0-9]?|([1-9]\d+))$/.test(num)) {
    throw new Error('输入参数必须是大于等于0的整数');
  }

  const currLen = num.length;
  if (currLen < len) {
    num = `0${num}`;
    return zeroFilling(num, len, false);
  }
  return num;
}
