const JwtUtil = require('../model/util/jwt')
const { User } = require('../model/create')
const bcrypt = require('bcrypt')


const guard = async(req, res, next) => {
    //注意使用第三方模块处理post
    //进图具体的业务逻辑，解构出来我们需要的东西
    const { email, password, _id } = req.body; //注意啊，由于我们的中间件处理的请求于是乎我们的req身上就有这个处理的所有数据了，这个之前有说过

    console.log(req.body);

    if (email.trim().length == 0 || password.trim().length == 0) {
        res.status(400).send(
                JSON.stringify({ message: '邮箱或密码错误' })
            ) //注意send自动把状态码设置成了200，所以你需要改一下
        return
    }


    //如果用户存在就先找到这个用户额信息,注意这里的这个异步await
    let user = await User.findOne({ email });
    //这里的user就是指向当前查询出来的数据文档对象

    if (user) {
        //比对操作,第一个参数是一个明文密码，第二个参数我们查询出来的加密密码 ，方法返回一个Boolean值,对比成功就是true，异步api可以直接加await
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            //用户校验成功，添加tooken
            // 登陆成功，添加token验证
            let _id = user._id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(_id);
            let token = jwt.generateToken();
            // 将 token 返回给客户端
            res.send({ status: 200, msg: '登陆成功', token: token });
            //校验成功就
            next()
        } else {
            res.status(400).send(
                JSON.stringify({ message: '邮箱或密码错误' })
            )
        }

    } else {
        res.status(400).send(
            JSON.stringify({ message: '邮箱或密码错误' })
        )
    }
}

module.exports = guard