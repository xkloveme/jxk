import { add, isBefore } from 'date-fns';

/**
 * 生成时间范围数组
 * 
 * @description 根据指定的时间值生成一个时间范围。从当前时间开始，
 *              按照给定的年、月、日、时、分、秒计算目标时间，
 *              然后返回一个包含开始时间和结束时间的数组。
 *              自动处理时间顺序，确保返回的数组中第一个元素总是更早的时间。
 * 
 * @category time
 * @alias time_dateRange
 * @author xkloveme <xkloveme@gmail.com>
 * @since 0.1.0
 * 
 * @param {number} [year=0] - 需要增加的年数，可为负数，默认为 0
 * @param {number} [month=0] - 需要增加的月数，可为负数，默认为 0
 * @param {number} [day=0] - 需要增加的天数，可为负数，默认为 0
 * @param {number} [hour=0] - 需要增加的小时数，可为负数，默认为 0
 * @param {number} [minute=0] - 需要增加的分钟数，可为负数，默认为 0
 * @param {number} [second=0] - 需要增加的秒数，可为负数，默认为 0
 * 
 * @returns {Array<Date>} 返回一个包含两个 Date 对象的数组，分别代表开始时间和结束时间
 * 
 * @example
 * // 生成未来 7 天的时间范围
 * const futureRange = dateRange(0, 0, 7)
 * // => [new Date(), new Date(七天后)]
 * 
 * @example
 * // 生成过去 30 天的时间范围
 * const pastRange = dateRange(0, 0, -30)
 * // => [new Date(三十天前), new Date()]
 * 
 * @example
 * // 生成未来 2 小时的时间范围
 * const hourRange = dateRange(0, 0, 0, 2)
 * // => [new Date(), new Date(两小时后)]
 * 
 * @example
 * // 生成复杂时间范围，1年 2个月 15天后
 * const complexRange = dateRange(1, 2, 15)
 * // => [new Date(), new Date(1年2个月15天后)]
 */

const dateRange = (year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0) => {
    const now = new Date();
    const targetDate = add(now, { years: year, months: month, days: day, hours: hour, minutes: minute, seconds: second });

    if (isBefore(now, targetDate)) {
        return [now, targetDate];
    }
    return [targetDate, now];
};

export default dateRange;
