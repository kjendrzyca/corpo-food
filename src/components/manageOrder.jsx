import React from 'react';
import {connect} from 'react-redux';

import {getOrderToManage, foodOrdered} from '../store/ordersActions';
import OrderDetails from './orderDetails';
import Chat from './chat';
import OrderState from '../enums/orderState';
import messageBuilderFactory from '../utils/messageBuilderFactory';

const ManageOrder = React.createClass({
    propTypes: {
        foodOrdered: React.PropTypes.func.isRequired,
        getOrderToManage: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.getOrderToManage(this.props.params.accessCode);
    },

    renderActions () {
        const {state: orderState} = this.props.order;

        switch (orderState) {
        case (OrderState.Open):
            return (
                <button
                    className="btn btn-primary"
                    onClick={() => this.props.foodOrdered(this.props.params.accessCode)}
                >{this.props.resources.states.ordered}</button>
            );
        default:
            return null;
        }
    },

    render () {
        const {order, resources: {managerBadge}} = this.props;

        const orderLoaded = () => !order.fetching;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <OrderDetails
                            cols={6}
                            order={order}
                        />
                    </div>
                    <div className="col-xs-6">
                        {this.renderActions()}
                    </div>
                </div>
                <div className="row">
                    {
                        orderLoaded() ?
                            (<div className="col-xs-6">
                                <Chat
                                    buildMessage={messageBuilderFactory.messageWithBadge(managerBadge)}
                                    orderId={order.id}
                                />
                            </div>) :
                            null
                    }
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({
        order: state.activeOrder,
        resources: state.localization.resources.orderManagement
    }),
    {foodOrdered, getOrderToManage}
)(ManageOrder);
