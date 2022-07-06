const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')
const router = require('../router')

const app = new Koa()

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
      // onFileBegin: (name, file) => {
      //   // 无论是多文件还是单文件上传都会重复调用此函数
      //   // 最终要保存到的文件夹目录
      //   const dirName = new Date().getFullYear();
      //   const dir = path.join(__dirname, `../upload/${dirName}`);
      //   // 检查文件夹是否存在如果不存在则新建文件夹
      //   if (!fs.existsSync(dir)) {
      //     fs.mkdirSync(dir);
      //   }
      //   // 文件名称去掉特殊字符但保留原始文件名称
      //   const fileName = file.name
      //     .replace(/ /g, "_")
      //     .replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, "_");
      //   file.name = fileName;
      //   // 覆盖文件存放的完整路径(保留原始名称)
      //   file.path = `${dir}/${fileName}`;
      // },
      // onError: (error) => {
      //   app.status = 400;
      //   // 这里可以定义自己的返回内容
      //   app.body = { code: 400, msg: "上传失败", data: {} };
      //   return;
      // },
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
