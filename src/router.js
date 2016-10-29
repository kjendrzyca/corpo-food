'use strict';
const orders = require('./controllers/orders');
const localization = require('./controllers/localization');

module.exports = (app) => {
    app.get('/api/orders', orders.list);
    app.post('/api/orders', orders.create);
    app.get('/api/orders/:id', orders.get);
    app.get('/api/orders/manage/:accessCode', orders.getForManager);
    app.post('/api/order/meal', orders.addMeal);
    app.delete('/api/order/:orderId/meal/:mealId', orders.removeMeal);
    app.get('/api/currentLocale', localization.getLocale);
};
