/**
 * 将 Unix 时间戳转换为 Date 对象。
 * 支持秒级 (10位数字) 和毫秒级 (13位数字) 的 Unix 时间戳。
 * 验证时间戳是否有效，并自动调整精度。
 * @author penn <https://github.com/penn201500>
 * @category time
 * @alias time_timestampToDate
 * @param {number|string} ts - Unix 时间戳。
 * @returns {Date|null} 对应的 Date 对象，如果时间戳无效或格式不正确则返回 null。
 *
 * @example
 * // 示例: 有效的秒级时间戳
 * console.log(time_timestampToDate(1704067200)); // 输出: Date 对象，代表 2024-01-01 00:00:00 UTC
 *
 * @example
 * // 示例: 有效的毫秒级时间戳
 * console.log(time_timestampToDate(1704067200000)); // 输出: Date 对象，代表 2024-01-01 00:00:00 UTC
 *
 * @example
 * // 示例: 无效的时间戳
 * console.log(time_timestampToDate("invalid")); // 输出: null
 */
export default (timestamp) => {
  if (!timestamp || timestamp === null || timestamp === undefined) {
    return null;
  }

  const numericTimestamp = Number(timestamp);

  if (isNaN(numericTimestamp) || numericTimestamp < 0) {
    return null;
  }

  // 处理0、10位和13位时间戳
  if (numericTimestamp === 0 || String(numericTimestamp).length === 10) {
    return new Date(numericTimestamp * 1000);
  } else if (String(numericTimestamp).length === 13) {
    return new Date(numericTimestamp);
  }

  return null;
};