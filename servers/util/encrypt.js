/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/10/12
 * Description: 使用原生模块编写加密工具类
 */

const crypto = require("crypto")
// 签名key值可选，不传默认：xuCMS-defaultKey
module.exports = function (password, key = "xuCMS-defaultKey") {
  const hmac = crypto.createHmac("sha256", key)
  hmac.update(password)
  // 输出格式16进制
  const passwordHmac = hmac.digest("hex")
  return passwordHmac
}
