/**
 * 获取url参数
 * @author xkloveme <xkloveme@gmail.com>
 * @category browser
 * @alias browser_getQueryParams
 * @param {string} url 要解析的URL
 * @returns {object} 包含所有查询参数的对象
 * @summary 这个函数使用了URL和URLSearchParams接口，解析URL并返回一个包含所有查询参数的对象。
 * 你可以将这个函数用于任何需要解析URL参数的场景。
 */

export default (url) => {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
};
