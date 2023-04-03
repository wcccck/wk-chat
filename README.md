## 项目介绍
   这是一个vue3 + typescript + JSX的实战项目 帮助对vue的理解与学习 手写组件 未使用大型UI组件库  
   JSX语法可以在一个页面编写多个组件 vue3对typescript的支持度更高 可以更好的保持项目的健壮性
   项目使用postcss+amfe-flexible 做移动端适配
   SSE 实现用户聊天功能
   
## 项目技术栈
   vue3 + typescript + vite + jsx + axios + sass + flex + svg  
   node版本 v16.13.0  
   管理工具:yarn

# 目标功能
- [x] 聊天组件 -- 完成
- [x] 登录功能 -- 完成
- [x] 通讯录功能 -- 待续
- [x] 朋友圈功能 -- 待续
- [x] 已读功能 -- 完成
- [x] 未读功能 -- 完成
- [x] 发送信息功能 -- 完成
- [x] 发送朋友圈功能 -- 完成
- [x] 评论功能 -- 完成
- [x] 备注功能 -- 完成
- [x] TabBar组件 -- 完成


# 项目布局
```
├── dist                                          // 项目打包路径
├── src                                           // 源码目录
│   ├── assets                                    // 静态资源
│   │   ├── icons                                 // icons目录
│   │   │   ├── svg                               // svg 
│   ├── components                                // 公共组件
│   ├── config                                    // 配置文件
│   ├── http                                      // 请求函数
│   ├── router                                    // 路由表
│   ├── store                                     // pinal全局数据仓库               
│   ├── utils                                     // 工具函数 
│   ├── views                                     // 页面组件 
│   │   ├── address                               // 通讯录页面
│   │   ├── layout                                // 布局页面
│   │   ├── message                               // 消息页面
│   │   ├── login                                 // 登录页面
│   │   ├── chatPage                              // 聊天页面
│   │   ├── discover                              // 朋友圈页面
│   │   │   ├── components                        // discover 组件 
│   │   │   ├── Pages                             // 页面 
│   │   │   │   ├── Editpage                      // 发送朋友圈页面
│   │   ├── profile                               // 个人信息页面
│   │   │   ├── Pages                             // 页面 
│   │   │   │   ├── Editpage                      // 修改个人信息页面
│   │   ├── userInfo                               // 用户信息页面
│   │   │   ├── Pages                             // 页面 
│   │   │   │   ├── Editpage                      // 修改用户信息页面
```



# 部分截图


### 商铺列表页

[//]: # (<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.gif" width="365" height="619"/>)



