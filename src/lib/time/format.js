import { format } from 'date-fns';

/**
 * 格式化时间
 * @alias time_format
 * @category time
 * @returns {string} 格式化后的时间
 * @author https://github.com/date-fns/date-fns
 * 
 * @example
 * // 示例用法
 * const now = new Date();
 * const formattedNow = time_format(now, 'yyyy-MM-dd HH:mm:ss');
 * console.log(formattedNow); // 输出类似 "2024-08-16 03:10:40"
 */
export default format;