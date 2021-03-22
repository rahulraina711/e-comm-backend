const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Order = require('../models/order_model')

// get all orders
router.get("/",(req, res, next) => {
    Order.find().populate('productId').exec()
        .then(doc => {
            
            // console.log("displaying all documents")
            res.status(200).json(doc);

        })
        .catch((err) => {
            console.log(err)
        });
    
})
// create a new order
router.post("/",(req, res)=>{
    const order = new Order({
        productId: req.body.productId,
        quantity: req.body.quantity,
       // user: req.userData.email || "not implemented"
    });
    order.save().then(
        (doc)=>{
            res.status(201).json(doc)
        }
    ).catch(err=>{
        res.status(500).json({message: err})
    });
});

// delete an order
router.get("/:id",(req, res) => {
    const id = req.params.id;
    
    Order.findByIdAndDelete(id).exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(400).json({
                message: err
            });
        });
})

router.delete("/:id",(req,res)=>{
    const id = req.params.id;
    Order.findByIdAndDelete(id).exec().then(doc=>res.status(200).json(doc)).catch(err=>console.log(err));
})

module.exports = router;