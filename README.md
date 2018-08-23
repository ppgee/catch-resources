# catch-resources

这是一个根据Puppeteer，获取网页中的资源文件并拉入本地的小工具

## Features

* 通过获取自己配置的网页和获取资源文件类型，下载到本地

## Configuration

配置根目录的`config.js`文件提供的选项

* `catchUrl`: 想要获取的页面url
* `catchType`: 获取资源文件的类型（类型名根据 `window.performance.getEntriesByType('resource')` 中的 `initiatorType`相同）

## Usage

```bash
npm install
node index.js
```

或者

```bash
npm install
npm start
```

## Issues
Submit the [issues](https://github.com/ppgee/catch-resources/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/ppgee/catch-resources) and submit pull requests.

**Enjoy!**
