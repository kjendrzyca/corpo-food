import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const OrderTile = React.createClass({
    propTypes: {
        author: React.PropTypes.string.isRequired,
        deadline: React.PropTypes.object.isRequired,
        hungryGuysCount: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        resources: React.PropTypes.object.isRequired,
        restaurant: React.PropTypes.string.isRequired
    },

    _dateToString (date) {
        const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${date.getHours()}:${minutes}`;
    },

    render () {
        const hungryGuysCountStyles = {
            textAlign: 'right'
        };

        return (
            <div
                className="col-xs-3 OrderTile"
                onClick={() => browserHistory.push(`/order/${this.props.id}`)}
                style={{cursor: 'pointer'}}
            >
                <div className="well">
                    <h3>{this.props.restaurant}</h3>
                    <p>{this.props.resources.deadline} {this._dateToString(this.props.deadline)}</p>
                    <p>{this.props.resources.author} {this.props.author}</p>
                    <p style={hungryGuysCountStyles}>{this.props.hungryGuysCount} {this.props.resources.alreadyOrdered}</p>
                </div>
            </div>
        );
    }
});

export default connect(state => ({resources: state.localization.resources.orderTile}))(OrderTile);
