const mongoose = require('mongoose')
const schema = new mongoose.Schema({

    product_name:{ type:String },
    category:{type:String}

})

module.exports = mongoose.model( 'Product',schema )