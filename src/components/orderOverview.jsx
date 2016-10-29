import React from 'react';
import {connect} from 'react-redux';

import {getOrder} from '../store/ordersActions';
import Chat from './chat';
import MealList from './mealList';
import SignUpForMeal from './signUpForMeal';
import OrderDetails from './orderDetails';
import messageBuilderFactory from '../utils/messageBuilderFactory';

const OrderOverview = React.createClass({
    propTypes: {
        getOrder: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
    },

    componentDidMount () {
        this.props.getOrder(this.props.params.id);
    },

    render () {
        const {order, user} = this.props;
        const ifOrderLoaded = content => !order.fetching ? content : null;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-lg-6">
                        <OrderDetails order={order} />
                    </div>
                    {
                        ifOrderLoaded(
                            <div className="col-xs-12 col-lg-6">
                                <MealList meals={order.meals} user={user} />
                                <SignUpForMeal />
                            </div>
                        )
                    }
                </div>
                {
                    ifOrderLoaded(
                        <div className="row">
                            <div className="col-xs-12">
                                <Chat
                                    buildMessage={messageBuilderFactory.regularMessage()}
                                    orderId={order.id}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        );
    },
});

export default connect(
    state => ({
        order: state.activeOrder,
        user: state.user,
    }),
    {getOrder}
)(OrderOverview);
