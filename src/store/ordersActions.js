import {browserHistory} from 'react-router';

import OrderState from '../enums/orderState';
import {mapHourToDate} from '../services/dateManipulation';
import {checkFetchForErrors, handleFetchErrors} from '../services/errorHandling';
import {setAdminNotification} from './notificationActions';

export function addNewOrder (order, validationErrorsCallback) {
    return dispatch => {
        fetch('/api/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(checkFetchForErrors)
        .then(response => response.json())
        .then(response => {
            const {id: createdOrderId, adminId} = response;
            const newOrder = {
                id: createdOrderId,
                deadline: mapHourToDate(order.deadline),
                hungryGuysCount: 0,
                author: order.author,
                restaurant: order.restaurant,
                state: OrderState.Open
            };
            dispatch({type: 'ADD_NEW_ORDER', order: newOrder});
            dispatch(setAdminNotification(adminId));
            browserHistory.push('/');
        })
        .catch(error => handleFetchErrors(error, dispatch, validationErrorsCallback));
    };
}

export function hydrateOrders () {
    return dispatch => {
        fetch('/api/orders')
        .then(checkFetchForErrors)
        .then(response => response.json())
        .then(orders => {
            const ordersToday = orders.map(orderWithStringDates => {
                return {
                    ...orderWithStringDates,
                    deadline: new Date(orderWithStringDates.deadline)
                };
            })
            .filter(order => {
                const today = new Date();

                return today.getFullYear() === order.deadline.getFullYear() &&
                    today.getMonth() === order.deadline.getMonth() &&
                    today.getDate() === order.deadline.getDate();
            });

            dispatch({type: 'HYDRATE_ORDERS', orders: ordersToday});
        })
        .catch(error => handleFetchErrors(error, dispatch));
    };
}

export function getOrder (id) {
    return dispatch => {
        fetch(`/api/orders/${id}`)
            .then(checkFetchForErrors)
            .then(response => response.json())
            .then(order => {
                const activeOrder = Object.assign(order, {
                    deadline: new Date(order.deadline),
                    deliveryTime: new Date(order.deliveryTime)
                });
                dispatch({type: 'GET_ORDER', activeOrder});
            })
            .catch(error => handleFetchErrors(error, dispatch));
    };
}

export function getOrderForAdministration (adminId) {
    return dispatch => {
        fetch(`/api/orders/admin/${adminId}`)
            .then(checkFetchForErrors)
            .then(response => response.json())
            .then(orderToAdmin => {
                console.log(orderToAdmin);
                 dispatch({type: 'GET_ORDER', activeOrder: orderToAdmin});
            })
            .catch(error => handleFetchErrors(error, dispatch));
    };
}

export const signUpForMeal = (orderId, username, what, howMuch) => {
    const payload = {
        cost: howMuch,
        hungryGuy: username,
        name: what,
        orderId: orderId
    };

    return dispatch => {
        fetch('api/order/meal', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(checkFetchForErrors)
        .then(response => response.json())
        .then(() => dispatch({type: 'SIGN_UP_FOR_MEAL', meal: payload}))
        .catch(error => handleFetchErrors(error, dispatch));
    };
};
