import { getParent } from '../../utils/common';
/**
 * 在数组中获取指定子id的祖级数据
 * @category array
 * @alias array_findParent
 * @param {*} arr 原数据-数组
 * @param {*} sonId 子id
 * @param {*} options 配置数据
 * @returns
 */
export default (
  arr,
  sonId,
  options,
) => {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  const { idField, pidField } = options;

  const items = [];
  const tmp = arr.filter((i) => i[idField] === sonId)[0];
  if (tmp) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, options);
  }

  return items;
};