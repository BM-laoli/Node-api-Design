//引入模块，创建简单服务器
const express = require('express');
//引入路径处理模块
const path = require('path');
//引入注意使用第三方模块处理post
const bodyPaser = require('body-parser')

// 引入数据库连接 不需要返回值
require('./model/content')

//创建服务器
const app = express();

/*//初始化数据库,注意reque的时候 会自动执行引入的js文件
require('./model/create')
*/


//前往小心这个要放在所有的use前面，解析我们的post请求数据
app.use(bodyPaser.urlencoded({ extended: false }));
//处理静态资源路径
const DataPath = path.join(__dirname, 'public');
//这个我们后面是有用的，用来操作媒体数据，最重要的就是这个路径还有这个静态资源对象
const StaticUtils = express.static(path.join(__dirname, 'public'));


//拿到路由操作对象
const main = require('./route/mian/main');
//开放接口路径
//拦截请求开始匹配路由  
app.use('/dataPath', (req, res) => {
    res.status(200).send(JSON.stringify({ 'dataPath': DataPath }))
})
app.use(StaticUtils);
app.use('/main', main)


//监听端口
app.listen(3000)
console.log('服务器开启');