const JwtUtil = require('../model/util/jwt')





//验证token
const loginPash = function(req, res, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
    
    if (req.url != '/login') {
        
        let token = req.headers.authorization;

        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            console.log(req.url);
            res.send({ status: 403, msg: '登录已过期,请重新登录' });
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
};



module.exports = loginPash;