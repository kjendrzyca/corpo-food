const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    _order: {
        type: Number,
        ref: 'Order',
    },
    cost: {
        type: Number,
        required: [true, 'Podaj cenę dania!'],
    },
    hungryGuy: {
        type: String,
        required: [true, 'Podaj swoje imię.'],
    },
    name: {
        type: String,
        required: [true, 'Podaj nazwę dania!'],
    },
    orderId: {
        type: String,
        require: [true, 'Podaj id ordera!'],
    },
});

const schemaName = 'Meal';

exports.mealSchema = schemaName;
exports.Meal = mongoose.model(schemaName, mealSchema);
