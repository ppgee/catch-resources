const fs = require('fs')
const path = require('path')

//递归创建目录 同步方法  
function mkdirsSync(dirname) {  
  //console.log(dirname);  
  if (fs.existsSync(dirname)) {  
      return true;  
  } else {  
      if (mkdirsSync(path.dirname(dirname))) {  
          fs.mkdirSync(dirname);  
          return true;  
      }  
  }  
}

module.exports.mkdirsSync = mkdirsSync
