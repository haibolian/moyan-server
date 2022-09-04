// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');
const { COS_SECRETID, COS_SECRETKEY } = process.env

const cos = new COS({
    SecretId: COS_SECRETID, // COS_SECRETID
    SecretKey: COS_SECRETKEY // COS_SECRETKEY
});

const Bucket = 'listen-wind-1308522723'
const Region = 'ap-shanghai'

const COS_PUT_OBJECT = (Key, Body, ContentType) => {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket, /* 填入您自己的存储桶，必须字段 */
      Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body, // 上传文件对象
      ContentType
    }, function(err, data) {
      resolve('https://' + data?.Location)
    });
  })
}

const COS_DEL_MULTIPLE_OBJECT = (Objects) => {
  return new Promise((resolve, reject) => {
    cos.deleteMultipleObject({
      Bucket,
      Region,
      Objects
    }, function(err, data) {
      resolve(err ? false : true)
    });
  })
}

module.exports = {
  COS_PUT_OBJECT,
  COS_DEL_MULTIPLE_OBJECT
}
