require('./utils/date-format')

const puppeteer = require('puppeteer')
const fs = require('fs')
const { mkdirsSync } = require('./utils/create-file')
const request = require('request')

const { catchUrl, catchType } = require('./config')

// 主程序
async function main () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // 创建文件夹
  const dirPath = `./assets/${new Date().Format("yyyy-MM-dd")}`
  mkdirsSync(dirPath)

  // 进入获取资源的url
  await page.goto(catchUrl)

  // 从页面中获取资源列表
  const remoteObjectResp = (await page.evaluateHandle(() => {
    return JSON.stringify(window.performance.getEntriesByType('resource'))
  }))._remoteObject.value

  // 过滤配置项需要的资源类型
  const resources = (JSON.parse(remoteObjectResp) || []).filter(function (resource) {
    return catchType.includes(resource.initiatorType)
  })

  resources.forEach(function (resource) {
    // 获取路径地址
    const urlPath = resource.name.split(/@|\?/).shift()
    // todo 获取文件名 这里有个问题，有些脚本没有文件后缀
    const fileName = urlPath.split('/').pop()
    // console.log(resource.name)
    request.get(resource.name).pipe(fs.createWriteStream(`${dirPath}/${fileName}`))
  })

  await browser.close()
}

main()
