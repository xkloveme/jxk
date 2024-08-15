/**
 * 国内手机号正则
 * @author xkloveme <xkloveme@gmail.com>
 * @category reg
 * @alias reg_phone
 * @returns {RegExp} 返回国内手机号正则
 * @summary /^0{0,1}(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[7-9])[0-9]{8}$/
 */
export default () => {
  return /^0{0,1}(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[7-9])[0-9]{8}$/;
};
