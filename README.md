
## 使用

## 架構
```text
.
└── src
    ├── app 服務項目相關配置
    ├── config 環境設置
    ├── constants 共用變數
    ├── controller router 走的路徑(細項配置)
    ├   ├── *.controller.ts
    ├── db 基層資料庫設置(connection setting)
    ├── middleware 邏輯中間件(驗證等功能)
    ├   ├── *.middle.ts
    ├── model DB schema
    ├── plugins 邏輯插件
    ├── router api 上層共用路由
    ├   ├── *.route.ts
    ├── service 資料庫操作
    ├   ├── *.service.ts
    └── server.ts 項目服務啟動點檔案(入口文件)
```

## 建表
```javascript
npx ts-node ./src/model/cart.model.ts
```

## 套件
* koa-body 解析body參數(在ctx上加上request),支持文件上傳
* nodemon 偵測node文件變化
* dotenv 配置開發變數
* koa-router 設置響應路由
* module-alias 配置路徑alias
* sequelize => ORM 使用對象的方式顯示數據
* mysql2 => mysql 底層再封裝
* ts-node => 執行schema用
* bcrypt => 完整使用的話依賴較多,故改使用 bcrypt.js(c++ 編譯好的);md5不夠安全故不用md5
    * 在源碼加上一段字串 (第一次加鹽)
    * 再在前端加上一段字串 (第二次加鹽)
* jsonwebtoken => JWT = json web token  header:頭訊息/payload:載荷/signature:簽名(安全/有效性)
* session => koa-session
* 讓檔案可在url讀取需install koa static, 某個目錄設為靜態資源文件夾
* 校驗的middleware -> koa-parameters(校驗工具其中一種)

## resources
* [jj112358/node-api](https://github.com/jj112358/node-api)
* https://cloud.tencent.com/developer/article/1533880
* https://pengfeixc.com/blogs/javascript/typescript-namespace
* https://blog.csdn.net/weixin_44067347/article/details/125464102
* https://ithelp.ithome.com.tw/articles/10157949
* https://juejin.cn/post/7044184318825988126
* https://blog.csdn.net/LetsStudy/article/details/118519173
* https://mattxlee.medium.com/%E4%BD%BF%E7%94%A8typescript%E4%BE%86%E6%90%AD%E5%BB%BAkoa%E9%A0%85%E7%9B%AE-3e6403735628
* https://medium.com/@rorast.power.game/%E5%9F%BA%E6%96%BCnodejs%E7%9A%84koa2%E5%9F%BA%E6%9C%AC%E6%95%99%E5%AD%B8-67d1ce0bb59a
* https://www.bilibili.com/video/BV13A411w79h?p=3
* https://hackmd.io/@Heidi-Liu/note-be201-sequelize
* https://github.com/puxiao/notes/blob/master/Nodejs(Koa)%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%9B%AE%E5%BD%95%E5%88%AB%E5%90%8Dalias.md
* https://blog.poychang.net/typescript-running-typescript-ts-node/
* https://hackmd.io/@Heidi-Liu/note-be201-sequelize
* https://sequelize.org/docs/v6/core-concepts/model-instances/
* [連接池(Connection Pool)介紹](http://peggg327.blogspot.com/2014/11/connection-pool.html)
* [進階 RESTful API 討論](https://ithelp.ithome.com.tw/articles/10224134)
* [Koa教學(五)-Cookie&Session](https://kerol2r20.github.io/post/2017-11-07-koa-cookie--session/)
* [koa-session](https://www.npmjs.com/package/koa-session)
* [認識Cookie、Session、Token與JWT](https://blog.yyisyou.tw/5d272c64/)
* [cookie, session 與 jwt-token](https://medium.com/@paulyang1234/cookie-session-%E8%88%87-jwt-token-%E5%AE%89%E5%85%A8%E6%80%A7%E5%95%8F%E9%A1%8C-8945a8a579ac)
* [using process.env in TypeScript](https://stackoverflow.com/questions/45194598/using-process-env-in-typescript)
* [Define types for process.env in TypeScript](https://bobbyhadz.com/blog/typescript-process-env-type)
* [TypeScript 中的多种 import 解义](https://juejin.cn/post/6844903781314854926)
* [sequelize table without column 'id'](https://stackoverflow.com/questions/29233896/sequelize-table-without-column-id)
* [[Node.js] cookie-session驗證原理以及express-session套件使用](https://medium.com/johnny%E7%9A%84%E8%BD%89%E8%81%B7%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%AD%86%E8%A8%98/node-js-cookie-session%E9%A9%97%E8%AD%89%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8Aexpress-session%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8-aeafa386837e)
* [[Day17] TS：理解 Pick、Record 的實作](https://pjchender.dev/ironman-2021/ironman-2021-day17/)
* [How to use the sequelize-typescript.DataType.UUID function in sequelize-typescript](https://snyk.io/advisor/npm-package/sequelize-typescript/functions/sequelize-typescript.DataType.UUID)
* [从 koa-body 入手分析,搞懂 Node.js 文件上传流程](https://juejin.cn/post/6997060777462988837)
* [当Koa遇上Typescript的时候](https://webcache.googleusercontent.com/search?q=cache:GgBbCSVOUDwJ:https://zhuanlan.zhihu.com/p/80357726&cd=8&hl=zh-TW&ct=clnk&gl=tw)
* [Simple file uploads with Koa and FormData](https://medium.com/@stephenjwatkins/from-the-browser-to-s3-1798c13d1ee3)
* [基於Nodejs的Koa2基本教學](https://medium.com/@rorast.power.game/%E5%9F%BA%E6%96%BCnodejs%E7%9A%84koa2%E5%9F%BA%E6%9C%AC%E6%95%99%E5%AD%B8-67d1ce0bb59a)
* [【學習筆記】TypeScript 基礎入門：從型別談起](https://hackmd.io/@Heidi-Liu/typescript#%E5%9E%8B%E5%88%A5%E8%A8%BB%E8%A7%A3-Type-annotation)
* [JS 判別是否為陣列 Array](https://ithelp.ithome.com.tw/articles/10219475)
* [Get a catch block error message with TypeScript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)
* [如何打造安全的會員管理系統](https://medium.com/@xyz030206/%E5%A6%82%E4%BD%95%E7%B0%A1%E5%96%AE%E5%9C%B0%E6%89%93%E9%80%A0%E5%AE%89%E5%85%A8%E7%9A%84%E6%9C%83%E5%93%A1%E7%AE%A1%E7%90%86%E7%B3%BB%E7%B5%B1-97c92c74cb0b)
* [导入和导出数据](https://postman.org.cn/getting-started/importing-and-exporting-data/)
