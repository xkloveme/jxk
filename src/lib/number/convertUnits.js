import { findUnit } from '../../utils/common';
/**
 * 转换单位
 * @author Marshall <https://github.com/Xy2002>
 * @category number
 * @alias number_convertUnits
 * @param {number} value 待转换的值
 * @param {string} fromUnitName 需要转换的单位
 * @param {string} toUnitName 转换后的单位
 * @param {Object} [customUnits={}] 自定义单位
 * @returns {number} 转换后的值
 * @example
    const lengthResult = convertUnits(100, 'meter', 'km'); // 0.1
    const areaResult = convertUnits(1000, 'squareMeter', 'km²'); // 0.001
 * @example
    // 自定义单位的示例用法
    const customUnits = {
        another: {
            unit1: { factor: 3, symbol: lengthSymbol, aliases: [] }, // symbol这里可以随意定义，或者可以用Symbol()来定义
            unit2: { factor: 4, symbol: lengthSymbol, aliases: [] },
        }
    };
    const customResult = convertUnits(100, 'unit1', 'unit2', customUnits); // 75
 */
export default (value, fromUnitName, toUnitName, customUnits = {}) => {
    const fromUnit = findUnit(fromUnitName, customUnits);
    const toUnit = findUnit(toUnitName, customUnits);

    if (fromUnit.symbol !== toUnit.symbol) {
        throw new Error('Units must be of the same category for conversion');
    }

    return (value * fromUnit.factor) / toUnit.factor;
};
