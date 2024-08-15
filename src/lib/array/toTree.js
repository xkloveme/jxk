/**
 * 将数组转换为树形结构
 * 
 * @alias array_toTree
 * @category array
 * 
 * @param {Array} items - 数组数据
 * @param {Object} [options={}] - 字段指定与配置
 * @param {string} [options.idField='id'] - ID字段名称
 * @param {string} [options.pidField='pid'] - 父ID字段名称
 * @param {string} [options.childrenField='children'] - 子节点字段名称
 * 
 * @returns {Array} - 转换后的树形结构数组
 * 
 * @example
 * array_toTree([{id: 1, pid: 0}, {id: 2, pid: 1}, {id: 3, pid: 1}], {});
 * // 返回 [{id: 1, children: [{id: 2}, {id: 3}]}]
 * 
 * @author xkloveme <xkloveme@gmail.com>
 */
export default (items, options = {}) => {
  const { idField = 'id', pidField = 'pid', childrenField = 'children' } = options;

  const findParent = (parent, child) => {
    return parent[idField] === child[pidField];
  };

  const tree = {};
  for (const item of items) {
    let parent = items.find((parent) => findParent(parent, item));
    if (parent === undefined) parent = tree;
    if (!parent[childrenField]) {
      parent[childrenField] = [];
    }
    delete item[pidField];
    parent[childrenField].push(item);
  }
  return tree[childrenField] || [];
};