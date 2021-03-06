//vue.config.js不能动态刷新, 修改之后要重启工程

//引入element
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
//---------------


module.exports = {
  devServer: {
    proxy: {  //配置跨域
      '/api': {
        target: 'http://127.0.0.1:8081/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': ''
        }
      },
      '/socket': {
        target:'ws://localhost:8081/',
        ws: true,
        changOrigin: true,
        pathRewrite :{
          '^/socket': ''
        }
      },
      '/joke':{
        target: 'https://autumnfish.cn/api/joke/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          //重写路径
          '^/joke': '' 
        }
      },
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     require('unplugin-vue-components/webpack')({ /* options */ }),
  //     require('unplugin-auto-import/webpack')({ /* options */ }),
  //   ],
  // },
  //   configureWebpack: {
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //   }),
  //   Components({
  //       resolvers: [ElementPlusResolver()],
  //   }),
  //   ],
  // },
}