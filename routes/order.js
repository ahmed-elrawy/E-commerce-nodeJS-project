const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');
const crypto = require('crypto');

// then in your app


// GET ALL ORDERS
/*localhost:3000/api/orders*/
router.get('/', (req, res) => {
    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.title', 'p.description', 'p.price', 'u.username'])
        .sort({ id: 1 })
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({ message: "No orders found" });
            }

        }).catch(err => res.json(err));
});



// Get Single Order
/*localhost:3000/api/orders/6*/
router.get('/:id', async (req, res) => {
    let orderId = req.params.id;
    console.log(orderId);

    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.title', 'p.description', 'p.price', 'p.image', 'od.quantity as quantityOrdered'])
        .filter({ 'o.id': orderId })
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({ message: "No orders found" });
            }

        }).catch(err => res.json(err));
});


router.post('/new', async (req, res) => {
    // create user in req.
    let { userId, products } = req.body;
    console.log(userId);
    console.log(products);
})
module.exports = router;
