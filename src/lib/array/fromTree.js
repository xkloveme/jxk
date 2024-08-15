import { treeToArrayVisitNode } from '../../utils/common';
/**
 * 将树形结构转换为扁平化的数组
 * 
 * @alias array_fromTree
 * @category array
 * 
 * @param {Array} tree - 树形结构数组
 * @param {string} [childrenField='children'] - 子节点字段名称
 * 
 * @returns {Array} - 扁平化后的数组
 * 
 * @example
 * array_fromTree([{id: 1, children: [{id: 2}, {id: 3}]}], 'children');
 * // 返回 [{id: 1}, {id: 2}, {id: 3}]
 * 
 * @author xkloveme <xkloveme@gmail.com>
 */
export default function array_fromTree (tree, childrenField = 'children') {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  if (!options.childrenField) options.childrenField = 'children';

  const items = [];
  for (const node of tree) {
    treeToArrayVisitNode(node, items, options, undefined);
  }
  return items;
}