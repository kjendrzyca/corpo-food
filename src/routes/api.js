'use strict';
const Order = require('../models/order');
const HttpStatus = require('http-status');
const OrderState = require('../enums/orderState');

function mapHourToDate (hour) {
    const array = hour.split(':');
    const date = new Date();
    date.setHours(array[0]);
    date.setMinutes(array[1]);

    return date;
}

module.exports = function apiRoutes (router) {
    router.get('/orders', (req, res) => {
        Order.find({}, (err, orders) => {
            var mappedOrders;

            if (err) {
                res.sendStatus(HttpStatus.BAD_REQUEST);
            }

            mappedOrders = orders.map((order) => {
                return {
                    id: order._id,
                    deadline: order.deadline,
                    hungryGuysCount: order.meals.length,
                    author: order.author,
                    restaurant: order.restaurant,
                    state: order.state
                };
            });

            res.json(mappedOrders);
        });
    });

    router.post('/order', (req, res) => {
        const newOrder = req.body;

        const mappedOrder = {
            deadline: mapHourToDate(newOrder.deadline.hour),
            deliveryTime: mapHourToDate(newOrder.deliveryTime.hour),
            restaurant: newOrder.restaurant,
            menu: newOrder.menu,
            description: newOrder.description,
            password: newOrder.password,
            author: newOrder.author,
            deliveryCost: parseInt(newOrder.deliveryCost, 10),
            extraCostPerMeal: parseInt(newOrder.extraCostPerMeal, 10),
            state: OrderState.Open
        };

        const order = new Order(mappedOrder);

        order.save((error) => {
            if (error) {
                const errorsDictionary = [];

                for (let property in error.errors) {
                    if (error.errors.hasOwnProperty(property)) {
                        errorsDictionary.push({property, message: error.errors[property].message});
                    }
                }

                res.status(HttpStatus.BAD_REQUEST);
                res.send(errorsDictionary);
                return;
            }

            res.sendStatus(HttpStatus.OK);
        });
    });
};
