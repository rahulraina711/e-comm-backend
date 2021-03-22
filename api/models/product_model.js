const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    productImage : { type: String, required: true},
    description: {type: String, required: true},
    price: {type:Number ,default:0},
    category:{type: String, required: true}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Product", productSchema);