module.exports = admin => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true //合并所有的url，如果你合并那么那个动态的resoulce你是拿不到的
    })
    const Article = require('../../../../model/Article')

    //测试路由
    router.get('/test',(req,res)=>{
        res.send('ok')
    })

    //增
    router.post('/Article', async (req, res) => {
        const model = await Article.create(req.body)
        res.send(model)
    })

    //查
    router.get('/Article', async(req, res,next) => {
        const items = await Article.find().limit(10)
        res.send(items)
        next()
    })

    //根据id查
    router.get('/Article/:id', async(req, res) => {
        
        console.log('asdasdasd');
        console.log(req.params.id);
        const items = await Article.findById(req.params.id)
        res.send(items)
    })

    //更新（改）
    router.put('/Article/:id', async(req, res) => {
        const items = await Article.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })

    //根据id参数（删）
    router.delete('/Article/:id', async(req, res) => {
        await Article.findByIdAndDelete(req.params.id, req.body)
        res.send({
            sucees: true
        })
    })

    admin.use('/CRUD',router)
}
