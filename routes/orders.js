const { Router } = require("express");
const Order = require("../models/order")
const router = Router();



router.get('/', async (req,res) => {

    res.render('order', {
        isOrder:true,
        title: 'Order'
    })

})
router.post('/', async (req,res) => {

    res.redirect('/order')
})


module.exports = router