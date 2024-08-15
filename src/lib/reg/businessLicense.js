/**
 * 营业执照号码校验
 * @author xkloveme <xkloveme@gmail.com>
 * @category reg
 * @alias reg_businessLicense
 * @returns {RegExp} 返回营业执照号码正则
 * @summary /(^(?:(?![I0ZSV])[\dA-Z]){2}\d{6}(?:(?![I0ZSV])[\dA-Z]){10}$)|(^\d{15}$)|([0-9A-Z]{18})/
 */
export default () => {
    return /(^(?:(?![I0ZSV])[\dA-Z]){2}\d{6}(?:(?![I0ZSV])[\dA-Z]){10}$)|(^\d{15}$)|([0-9A-Z]{18})/;
};
