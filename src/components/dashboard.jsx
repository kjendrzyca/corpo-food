import React from 'react';
import {Row, Col, Alert, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import OrderTile from './orderTile';
import {connect} from 'react-redux';

const Dashboard = React.createClass({
    propTypes: {
        orders: React.PropTypes.array.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    _renderOrderTiles () {
        return this.props.orders.map(order => <OrderTile key={order.id} {...order} />);
    },

    _getTileContainerStyles () {
        return {
            marginTop: '1em'
        };
    },

    render () {
        const noOrdersYet = this.props.orders.length
            ? null
            : <Alert bsStyle="warning">{this.props.resources.noOrdersYet}</Alert>;

        return (
            <div className="Dashboard">
                <Row>
                    <Col xs={12}>
                        <Link className="add-order-cta" to={'/newOrder'}>
                            <Button block bsSize="large" bsStyle="success">{this.props.resources.addOrder}</Button>
                        </Link>
                    </Col>
                </Row>
                {noOrdersYet}
                <Row style={this._getTileContainerStyles()}>
                    {this._renderOrderTiles()}
                </Row>
            </div>
        );
    }
});

const ConnectedDashboard = connect(
    state => ({
        orders: state.orders,
        resources: state.localization.resources.dashboard
    })
)(Dashboard);

export default ConnectedDashboard;
