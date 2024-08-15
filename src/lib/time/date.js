import * as date from 'date-fns';

/**
 * 格式化时间
 * @alias time_date
 * @category time
 * @returns {string} date-fns
 * @author https://github.com/date-fns/date-fns
 * @example
 * 
 * // 全部函数参考文档 https://date-fns.p6p.net/
 import { time_date } from "jxk";

// 示例日期
const date1 = new Date(2024, 0, 1); // 2024年1月1日
const date2 = new Date(2024, 2, 15); // 2024年3月15日

// 检查 date1 是否在 date2 之前
const result = time_date.isBefore(date1, date2);

console.log("date1 是否在 date2 之前：", result); // date1 是否在 date2 之前：true
 */
export default date;
