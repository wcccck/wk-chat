import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteJsx from '@vitejs/plugin-vue-jsx'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import postCssPxToRem from 'postcss-pxtorem'
import {visualizer} from  'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
// import {autoComplete, Plugin as PluginImportToCDN} from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue(),viteJsx(),createSvgIconsPlugin({
    iconDirs:[path.resolve(process.cwd(),'src/assets/icons/svg')],
    symbolId:'icon-[dir]-[name]'
  }),visualizer({
    emitFile:false,
    filename:'stats.html',
    open:true
  }),viteCompression({
    verbose:true, // 是否在控制台输出压缩结果
    disable:false, // 是否禁用
    threshold:10240, // 体积大于这个才会被压缩 单位b 1b=8B 1B = 1024KB 相当于9kb多就会压缩
    algorithm:"gzip",
    ext:".gz"
  })
  //   ,PluginImportToCDN({
  //   prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
  //   modules:[
  //       autoComplete('vue')
  //   ]
  // })
  ],
  server:{
    proxy:{
      '/api':{
        target:"http://localhost:7777",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/,'')
      },

    }
  },
  resolve:{
    alias:{
      '@':path.join(__dirname,'/src')
    }
  },
  css:{
    postcss:{
      plugins: [
        postCssPxToRem({
          // rootValue: 16, ///
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        drop_console:true
      }
    }
  }
})
