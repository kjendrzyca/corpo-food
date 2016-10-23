import React from 'react';
import {connect} from 'react-redux';
import browserHistory from '../utils/browserHistory';

import OrderState from '../enums/orderState';

const OrderDetails = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    _dateToString (date) {
        if (!date) {
            return null;
        }
        const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    },

    render () {
        const {order, resources} = this.props;

        const stateStyle = (() => {
            switch (order.state) {
            case OrderState.Open: return 'primary';
            case OrderState.Ordered: return 'info';
            case OrderState.Delivered: return 'success';
            default: return 'danger';
            }
        })();

        return (
            <div>
                <button
                    className="btn btn-default"
                    onClick={() => browserHistory.push('/')}
                >
                    {resources.backToDashboard}
                </button>
                <h2>{order.restaurant} <span className={`label label-${stateStyle}`}>{order.state}</span></h2>
                <p>{resources.orderBy(order.author)}</p>
                <p>{resources.orderedAt} {this._dateToString(order.deadline)}</p>
                <p>{resources.foodExpectedAt} {this._dateToString(order.deliveryTime)}</p>
                <p>{resources.menu} <a href={order.menu}>{order.menu}</a></p>
                <p>{resources.extraCostPerMeal} {order.extraCostPerMeal}</p>
                <p>{resources.deliveryCost} {order.deliveryCost}</p>
                <div>
                    <h3>{resources.descriptionHeader}</h3>
                    <p>{order.description}</p>
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({
        resources: state.localization.resources.orderDetails
    })
)(OrderDetails);
