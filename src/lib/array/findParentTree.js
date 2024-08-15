import { getParent } from '../../utils/common';
import treeToArray from './fromTree';

/**
 * 在 Tree 中获取指定子 ID 的祖级数据
 * 
 * @alias array_findParent
 * @category array
 * 
 * @param {Array} tree - 原始数据 - Tree
 * @param {string|number} sonId - 子节点 ID
 * @param {Object} [options={}] - 配置数据
 * @param {string} [options.idField='id'] - ID 字段名称
 * @param {string} [options.pidField='pid'] - 父节点 ID 字段名称
 * @param {string} [options.childrenField='children'] - 子节点字段名称
 * 
 * @returns {Array} - 包含指定子节点及其所有祖先节点的数据数组
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * const tree = [
 *   { id: 1, pid: 0, children: [
 *     { id: 2, pid: 1, children: [
 *       { id: 3, pid: 2 }
 *     ] }
 *   ] }
 * ];
 * 
 * console.log(array_findParent(tree, 3)); // 输出 [{ id: 3, pid: 2 }, { id: 2, pid: 1 }, { id: 1, pid: 0 }]
 */
export default function array_findParent(tree, sonId, options = {}) {
  // 参数验证
  if (!Array.isArray(tree)) {
    throw new TypeError('The first argument must be an array.');
  }

  if (typeof sonId !== 'string' && typeof sonId !== 'number') {
    throw new TypeError('The second argument must be a string or a number.');
  }

  // 默认配置
  const config = {
    idField: 'id',
    pidField: 'pid',
    childrenField: 'children',
    ...options
  };

  const { idField, pidField } = config;

  const arr = treeToArray(tree, config);
  const items = [];

  // 查找子节点
  const tmp = arr.find((item) => item[idField] === sonId);

  if (tmp) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, config);
  }

  return items;
}