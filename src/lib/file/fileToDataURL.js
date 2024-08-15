/**
 * 文件转Base64 DataURL
 * @author wzskyline
 * @category file
 * @alias file_fileToDataURL
 * @param {Object} object 文件或者blob对象
 * @param {Function} callback 回调函数 
 * @example  file_fileToDataURL(file,()=>{}) 
 */
export default (object,callback) => {
    const freader = new FileReader();
    freader.readAsDataURL(object);
    freader.onload = function(e) {
        callback(e.target.result);
    };
};
  