// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');
const { COS_SECRETID, COS_SECRETKEY } = process.env

const cos = new COS({
    SecretId: COS_SECRETID, // COS_SECRETID
    SecretKey: COS_SECRETKEY // COS_SECRETKEY
});

const COS_PUT_OBJECT = async (Key, Body, ContentType) => {
  return await new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: 'listen-wind-1308522723', /* 填入您自己的存储桶，必须字段 */
      Region: 'ap-shanghai',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Body, // 上传文件对象
      ContentType
    }, function(err, data) {
      resolve('https://' + data?.Location)
    });
  })
}

module.exports = {
  COS_PUT_OBJECT
}
