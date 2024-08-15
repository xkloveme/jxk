
// 判断数据类型
export function getValueType (value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
};

/**
 * 日期拆解
 * @param {Date} d 待拆解的日期对象
 * @returns {Object} 拆解后的日期对象
 */
export function dismantleDate(d) {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');
  return { year, month, day, hours, minutes, seconds };
}

// 验证身份证号
export const checkIDCardValidity = (idCard) => {
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  const sum = idCard
      .slice(0, 17)
      .split('')
      .reduce((acc, num, index) => acc + num * factor[index], 0);
  const mod = sum % 11;
  return parityBit[mod] === idCard.slice(17).toUpperCase();
};