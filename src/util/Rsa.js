/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import EncryptLong from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。


export default {
    /* JSEncrypt加密 */
    encrypt(data, publicKey) {
      var jsencrypt = new JSEncrypt()
      jsencrypt.setPublicKey(publicKey)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      var result = jsencrypt.encrypt(data)
      return result
    },
    /* 加密 */
    encryptLong(data, publicKey) {
      const PUBLIC_KEY = publicKey
      var encryptor = new EncryptLong()
      encryptor.setPublicKey(PUBLIC_KEY)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      const result = encryptor.encryptLong(data)
      return result
    },
  }