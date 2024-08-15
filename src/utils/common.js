
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
export function dismantleDate (d) {
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


/**
 * 私有方法 - 拆分Tree的Children
 * @param {*} node 拆分节点
 * @param {*} items 容器
 * @param {*} options 配置数据
 * @param {*} parentId 顶级父级id
 */
export const treeToArrayVisitNode = (
  node,
  items,
  options,
  parentId,
) => {
  const { idField, pidField, childrenField } = options;

  node[pidField] = parentId;
  items.push(node);
  if (node[childrenField]) {
    for (const child of node[childrenField]) {
      treeToArrayVisitNode(child, items, options, node[idField]);
    }
  }
  delete node[childrenField];
};

/**
 * 私有方法-通过子id 获取祖级
 * @param {*} arr 原数组
 * @param {*} id 子id
 * @param {*} items 容器
 * @param {*} options 配置数据
 */
export const getParent = (
  arr,
  id,
  items,
  options,
) => {
  const { idField, pidField } = options;
  const tmp = arr.filter((i) => i[idField] === id)[0];

  if (tmp && tmp[pidField]) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, options);
  } else {
    items.unshift(tmp);
  }
};


const lengthSymbol = Symbol('length');
const areaSymbol = Symbol('area');
const volumeSymbol = Symbol('volume');
const timeSymbol = Symbol('time');

const units = {
    length: {
        meter: { factor: 1, symbol: lengthSymbol, aliases: ['m'] },
        kilometer: { factor: 1_000, symbol: lengthSymbol, aliases: ['km'] },
        centimeter: { factor: 0.01, symbol: lengthSymbol, aliases: ['cm'] },
        millimeter: { factor: 0.001, symbol: lengthSymbol, aliases: ['mm'] },
        mile: { factor: 1_609.34, symbol: lengthSymbol, aliases: ['mi'] },
        yard: { factor: 0.9144, symbol: lengthSymbol, aliases: ['yd'] },
        foot: { factor: 0.3048, symbol: lengthSymbol, aliases: ['ft'] },
        inch: { factor: 0.0254, symbol: lengthSymbol, aliases: ['in'] }
    },
    area: {
        squareMeter: { factor: 1, symbol: areaSymbol, aliases: ['m²', 'm2'] },
        squareKilometer: { factor: 1e6, symbol: areaSymbol, aliases: ['km²', 'km2'] },
        squareCentimeter: { factor: 0.0001, symbol: areaSymbol, aliases: ['cm²', 'cm2'] },
        squareMillimeter: { factor: 1e-6, symbol: areaSymbol, aliases: ['mm²', 'mm2'] },
        squareMile: { factor: 2.59e6, symbol: areaSymbol, aliases: ['mi²', 'mi2'] },
        squareYard: { factor: 0.836127, symbol: areaSymbol, aliases: ['yd²', 'yd2'] },
        squareFoot: { factor: 0.092903, symbol: areaSymbol, aliases: ['ft²', 'ft2'] },
        squareInch: { factor: 0.00064516, symbol: areaSymbol, aliases: ['in²', 'in2'] }
    },
    volume: {
        cubicMeter: { factor: 1, symbol: volumeSymbol, aliases: ['m³', 'm3'] },
        cubicKilometer: { factor: 1e9, symbol: volumeSymbol, aliases: ['km³', 'km3'] },
        cubicCentimeter: { factor: 1e-6, symbol: volumeSymbol, aliases: ['cm³', 'cm3'] },
        cubicMillimeter: { factor: 1e-9, symbol: volumeSymbol, aliases: ['mm³', 'mm3'] },
        liter: { factor: 0.001, symbol: volumeSymbol, aliases: ['L'] },
        milliliter: { factor: 1e-6, symbol: volumeSymbol, aliases: ['ml'] },
        gallon: { factor: 0.003_785_41, symbol: volumeSymbol, aliases: [] },
        quart: { factor: 0.000_946_353, symbol: volumeSymbol, aliases: [] },
        pint: { factor: 0.000_473_176, symbol: volumeSymbol, aliases: [] },
        cup: { factor: 0.000_24, symbol: volumeSymbol, aliases: [] },
        fluidOunce: { factor: 2.9574e-5, symbol: volumeSymbol, aliases: ['fl oz'] }
    },
    time: {
        second: { factor: 1, symbol: timeSymbol, aliases: ['s'] },
        minute: { factor: 60, symbol: timeSymbol, aliases: ['min'] },
        hour: { factor: 3_600, symbol: timeSymbol, aliases: ['h'] },
        day: { factor: 86_400, symbol: timeSymbol, aliases: ['d'] },
        week: { factor: 604_800, symbol: timeSymbol, aliases: ['wk'] },
        month: { factor: 2.629_74e6, symbol: timeSymbol, aliases: [] }, // average month (30.44 days)
        year: { factor: 3.155_69e7, symbol: timeSymbol, aliases: ['yr'] } // average year (365.24 days)
    }
};

export const findUnit = (unitName, customUnits) => {
    const allUnits = { ...units, ...customUnits };
    for (const category in allUnits) {
        for (const unitKey in allUnits[category]) {
            const unit = allUnits[category][unitKey];
            if (unitKey.toLocaleLowerCase() === unitName.toLocaleLowerCase() || unit.aliases.includes(unitName.toLocaleLowerCase())) {
                return unit;
            }
        }
    }
    throw new Error(`Unit ${unitName} not found`);
};
