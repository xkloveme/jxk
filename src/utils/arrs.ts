import { isNumber } from './number';
import { OBJ } from './types';

/**
 * 数组转Tree
 * @param {*} items 数组
 * @param {*} options 字段指定与配置
 * @returns 返回值
 */
export const arrayToTree = (items: any[], options: OBJ = {}): OBJ | any[] => {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  if (!options.childrenField) options.childrenField = 'children';

  const { idField, pidField, childrenField } = options;

  const findFun = (parent: OBJ, child: OBJ) => {
    return parent[idField] === child[pidField];
  };

  const tree: OBJ | any[] = {};
  for (const item of items) {
    let ptr = items.find((parent) => findFun(parent, item));
    if (ptr === undefined) ptr = tree;
    if (!ptr[childrenField]) {
      ptr[childrenField] = [];
    }
    delete item[pidField];
    ptr[childrenField].push(item);
  }
  return tree[childrenField] || [];
};

/**
 * 私有方法 - 拆分Tree的Children
 * @param {*} node 拆分节点
 * @param {*} items 容器
 * @param {*} options 配置数据
 * @param {*} parentId 顶级父级id
 */
const treeToArrayVisitNode = (
  node: OBJ,
  items: OBJ,
  options: OBJ,
  parentId: number | string | undefined,
): void => {
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
 * Tree转数组
 * @param {*} tree 原数据
 * @param {*} options 配置数据
 * @returns 返回值
 */
export const treeToArray = (tree: any[], options: OBJ = {}): any[] => {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  if (!options.childrenField) options.childrenField = 'children';

  const items: any[] = [];
  for (const node of tree) {
    treeToArrayVisitNode(node, items, options, undefined);
  }
  return items;
};

/**
 * 数组（对象）深度克隆
 * @param {*} obj
 * @returns
 */
export const deepClone = (obj: OBJ | any[]): OBJ | any[] => {
  const objClone: OBJ | any[] = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key]);
      } else {
        objClone[key] = obj[key];
      }
    }
  }
  return objClone;
};

/**
 * 私有方法-通过子id 获取祖级
 * @param {*} arr 原数组
 * @param {*} id 子id
 * @param {*} items 容器
 * @param {*} options 配置数据
 */
const getParent = (
  arr: any[],
  id: number | string,
  items: any[],
  options: OBJ,
): void => {
  const { idField, pidField } = options;
  const tmp = arr.filter((i) => i[idField] === id)[0];

  if (tmp && tmp[pidField]) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, options);
  } else {
    items.unshift(tmp);
  }
};

/**
 * 在 Tree 中获取指定子id的祖级数据
 * @param {*} tree 原数据-Tree
 * @param {*} sonId 子id
 * @param {*} options 配置数据
 * @returns
 */
export const findParentTree = (
  tree: any[],
  sonId: number | string,
  options: OBJ = {},
): any[] => {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  if (!options.childrenField) options.childrenField = 'children';
  const { idField, pidField } = options;

  const arr: any[] = treeToArray(tree, options);
  const items: any[] = [];
  const tmp: any[] = arr.filter((i) => i[idField] === sonId)[0];
  if (tmp) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, options);
  }

  return items;
};

/**
 * 在数组中获取指定子id的祖级数据
 * @param {*} arr 原数据-数组
 * @param {*} sonId 子id
 * @param {*} options 配置数据
 * @returns
 */
export const findParentArr = (
  arr: any[],
  sonId: number | string,
  options: OBJ = {},
): any[] => {
  if (!options.idField) options.idField = 'id';
  if (!options.pidField) options.pidField = 'pid';
  const { idField, pidField } = options;

  const items: any[] = [];
  const tmp: any[] = arr.filter((i) => i[idField] === sonId)[0];
  if (tmp) {
    items.unshift(tmp);
    getParent(arr, tmp[pidField], items, options);
  }

  return items;
};

/**
 * 数字数组，返回最大元素值
 * @param {(number | string)[]} arr
 * @returns { number }
 */
export const arrayMax = (arr: (number | string)[]): number => {
  const newArr: number[] = arr.map((i) => {
    if (!isNumber(i)) {
      throw new Error('数组元素必须是数字型或数字型字符串');
    }
    return Number(i);
  });
  return Math.max.apply(null, newArr);
};

/**
 * 数字数组，返回最小元素值
 * @param {(number | string)[]} arr
 * @returns { number }
 */
export const arrayMin = (arr: (number | string)[]): number => {
  const newArr: number[] = arr.map((i) => {
    if (!isNumber(i)) {
      throw new Error('数组元素必须是数字型或数字型字符串');
    }
    return Number(i);
  });

  return Math.min.apply(null, newArr);
};
