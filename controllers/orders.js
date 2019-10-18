// set up routing w/express
const express = require('express');
const router = express.Router();

// reference the Order model
const Order = require('../models/order.js')

/* GET orders index view */
router.get('/', (req, res) => {

    Order.find((err, orders) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('orders/index', {
                orders: orders
            })
        }
    })
    res.render('orders/index')
})

/////////////////////////////////////////////////////////////////

/* GET add view */
router.get('/add', (req, res) => {
    res.render('orders/add')
})

/* POST orders/add form submission */
router.post('/add', (req, res) => {
    var costPer;
    if(req.body.size == "S"){
        costPer = 10;
    }
    if(req.body.size == "M"){
        costPer = 15;
    }
    if(req.body.size == "L"){
        costPer = 20;
    }
    var hold = costPer * req.body.quantity;
    // save a new order on mongoose or catch trying
    Order.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        size: req.body.size,
        quantity: req.body.quantity,
        total: hold
    }, (err, order) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/orders')
        }
    })
})

/* GET orders/delete/abc - colon in the path represents a url parameter */
router.get('/delete/:_id', (req, res) => {
    // store the selected id in a local variable
    var _id = req.params._id;

    // use Mongoose to delete the selected document from the db
    Order.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/orders')
        }
    })
})

/* GET orders/edit/abc - populate edit form w/existing order values */
router.get('/edit/:_id', (req, res) => {
    // store the _id parameter in a local variable
    var _id = req.params._id

    // use the selected id to look up the matching document
    Order.findById(_id, (err, order) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.render('orders/edit', {
                order: order
            })
        }
    })
})

/* POST orders/edit/abc - save update to selected order */
router.post('/edit/:_id', (req, res) => {
    var _id = req.params._id

    var costPer;
    if(req.body.size == "S"){
        costPer = 10;
    }
    if(req.body.size == "M"){
        costPer = 15;
    }
    if(req.body.size == "L"){
        costPer = 20;
    }
    var hold = costPer * req.body.quantity

    // instantiate a Order object with the new values from the form submission
    var order = new Order({
        _id: _id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        size: req.body.size,
        quantity: req.body.quantity,
        total: hold
    })

    // update the document with the selected id, passing in our new order object to replace the old vals
    Order.updateOne({ _id: _id }, order, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/orders')
        }
    })
})


module.exports = router