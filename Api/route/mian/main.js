const express = require('express')

//业务逻辑
const guard = require('../../Middleware/loginGuard')
const loginPash = require('../../Middleware/loginPash')




//创建路由对象
const admin = express.Router()
    //验证token
admin.use(loginPash)

//登录路由处理
admin.post('/login', guard)

//首先要验证，然后才是放行到对应的路由接口里面取
admin.get('/text', require('./API/home/index'))




module.exports = admin;