module.exports = admin => {
    const express = require('express')
    const inflection = require('inflection')
    const router = express.Router({
        mergeParams: true //合并所有的url，如果你合并那么那个动态的resoulce你是拿不到的
    })
    // const Article = require('../../../../model/Article')

    //测试路由
    router.get('/test',(req,res)=>{
        res.send('ok')
    })

    //增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //查
    router.get('/', async(req, res,next) => {
        const items = await req.Model.find().limit(10)
        res.send(items)
        next()
    })

    //根据id查
    router.get('/:id', async(req, res) => {
        
        console.log('asdasdasd');
        console.log(req.params.id);
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })

    //更新（改）
    router.put('/:id', async(req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })

    //根据id参数（删）
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            sucees: true
        })
    })

    //起一个到哪个台的资源就好了,注意我们的中间件
    admin.use('/CRUD/rest/:resource', async(req, res, next) => {

        //转化成单数大写的字符串形式
        let moldeName = inflection.classify(req.params.resource)
        console.log(moldeName); //categorys ===> Category
        //注意这里的关联查询populate方法，里面放的就是一个要被关联的字段
        req.Model = require(`../../../../model/${moldeName}`)
        req.modelNmae = moldeName
        next()
    }, router)

}
