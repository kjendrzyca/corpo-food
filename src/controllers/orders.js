'use strict';
const randomstring = require('randomstring');
const HttpStatus = require('http-status');

const Order = require('../models/order');
const Meal = require('../models/meal').Meal;
const OrderState = require('../enums/orderState');
const Logger = require('../logger');
const mapHourToDate = require('../services/dateManipulation').mapHourToDate;
const handleMongoValidationErrors = require('../services/errorHandling').handleMongoValidationErrors;
const getBestMatchingResources = require('../localizationContent').getBestMatchingResources;

exports.list = (req, res) => {
    Order.find({}, (error, orders) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        const mappedOrders = orders.map((order) => {
            return {
                id: order._id,
                deadline: order.deadline,
                hungryGuysCount: order.meals.length,
                author: order.author,
                restaurant: order.restaurant,
                state: order.state,
            };
        });

        res.json(mappedOrders);
    });
};

exports.get = (req, res) => {
    Order
        .findById(req.params.id)
        .populate('meals')
        .exec((error, order) => {
            if (error) {
                Logger.info(error.message);
                res.sendStatus(HttpStatus.BAD_REQUEST);

                return;
            }

            if (!order) {
                res.sendStatus(HttpStatus.NOT_FOUND);

                return;
            }

            const orderToSend = {
                id: order._id,
                author: order.author,
                deadline: order.deadline,
                deliveryCost: order.deliveryCost,
                deliveryTime: order.deliveryTime,
                description: order.description,
                extraCostPerMeal: order.extraCostPerMeal,
                menu: order.menu,
                restaurant: order.restaurant,
                state: order.state,
                meals: order.meals,
            };

            res.json(orderToSend);
        });
};

exports.getForManager = (req, res) => {
    Order
        .find({_accessCode: req.params.accessCode})
        .populate('meals')
        .exec((error, orders) => {
            if (error) {
                Logger.info(error.message);
                res.sendStatus(HttpStatus.BAD_REQUEST);

                return;
            }

            if (!orders.length) {
                res.sendStatus(HttpStatus.NOT_FOUND);

                return;
            }

            const order = orders[0];

            const orderToSend = {
                id: order._id,
                author: order.author,
                deadline: order.deadline,
                deliveryCost: order.deliveryCost,
                deliveryTime: order.deliveryTime,
                description: order.description,
                extraCostPerMeal: order.extraCostPerMeal,
                menu: order.menu,
                restaurant: order.restaurant,
                state: order.state,
                meals: order.meals,
            };

            res.json(orderToSend);
        });
};

exports.create = (req, res) => {
    const newOrder = req.body;

    const mappedOrder = {
        deadline: mapHourToDate(newOrder.deadline),
        deliveryTime: mapHourToDate(newOrder.deliveryTime),
        restaurant: newOrder.restaurant,
        menu: newOrder.menu,
        description: newOrder.description,
        author: newOrder.author,
        deliveryCost: parseInt(newOrder.deliveryCost, 10),
        extraCostPerMeal: parseInt(newOrder.extraCostPerMeal, 10),
        state: OrderState.Open,
        _accessCode: randomstring.generate(20),
    };

    const order = new Order(mappedOrder);

    order.save(error => {
        if (error) {
            Logger.info(error.message);
            res.status(HttpStatus.BAD_REQUEST);
            res.send({
                message: error.message,
                validationErrors: handleMongoValidationErrors(error.errors, getBestMatchingResources(req).schemaValidation.order),
            });

            return;
        }

        res.status(HttpStatus.OK);
        res.send({id: order._id, accessCode: order._accessCode});
    });
};

exports.addMeal = (req, res) => {
    const mealInput = req.body;

    const mealToAdd = new Meal({
        cost: mealInput.cost,
        hungryGuy: mealInput.hungryGuy,
        name: mealInput.name,
        orderId: mealInput.orderId,
    });

    mealToAdd.validate(validationError => {
        if (validationError) {
            Logger.info(validationError.message);
            res.status(HttpStatus.BAD_REQUEST);
            res.send(handleMongoValidationErrors(validationError.errors));

            return;
        }

        mealToAdd.save(saveError => {
            if (saveError) {
                Logger.info(saveError.message);
                res.sendStatus(HttpStatus.BAD_REQUEST);
                return;
            }

            Order.findOneAndUpdate({_id: mealInput.orderId, state: OrderState.Open}, {
                $push: {
                    meals: mealToAdd,
                },
            }, (error, order) => {
                if (error) {
                    Logger.info(error.message);
                    res.sendStatus(HttpStatus.BAD_REQUEST);
                    return;
                }

                if (!order) {
                    res.sendStatus(HttpStatus.NOT_FOUND);

                    return;
                }

                res.json({mealId: mealToAdd._id});
            });
        });
    });
};

exports.removeMeal = (req, res) => {
    const {orderId, mealId} = req.params;

    Order.findOneAndUpdate({_id: orderId, state: OrderState.Open}, {
        $pull: {
            meals: mealId,
        },
    }, (error, order) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        if (!order) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        res.sendStatus(HttpStatus.OK);
    });
};
