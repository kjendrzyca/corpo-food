import React from 'react';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {requiredValidator, numberValidator, hourValidator, urlValidator, minimalLengthValidator} from './orderFormValidators';
import {mapOrderStateToOrder} from './orderMapper';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            restaurant: {
                text: ''
            },
            deadline: {
                text: ''
            },
            deliveryTime: {
                text: ''
            },
            menu: {
                text: ''
            },
            description: {
                text: ''
            },
            author: {
                text: ''
            },
            deliveryCost: {
                text: ''
            },
            extraCostPerMeal: {
                text: ''
            }
        };
    },

    handleTextChange (event) {
        const {id, value} = event.target;
        this.handleValueUpdate(id, value);
    },

    handleBackendValidationErrors (validationErrors) {
        validationErrors.forEach(validationError => {
            const currentValue = this.state[validationError.property].text;
            this.handleValueUpdate(validationError.property, currentValue, validationError.message);
        });
    },

    handleSubmit () {
        this.props.dispatch(addNewOrder(mapOrderStateToOrder(this.state), this.handleBackendValidationErrors));
    },

    onChange (id, value) {
        this.setState(oldState => {
            oldState[id] = value;
        });
    },

    handleValueUpdate (id, newText, errorMessage) {
        this.setState(oldState => {
            const newState = {...oldState};
            newState[id] = {
                touched: true,
                text: newText,
                errorMessage
            };

            return newState;
        });
    },

    render () {
        return (
            <div className="row">
                <div className="col-xs-8">
                    <form>
                        <ValidatedInput
                            id="restaurant"
                            label={this.props.resources.restaurant}
                            placeholder={this.props.resources.restaurant}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'restaurant')}
                            validators={[requiredValidator(this.props.resources.validationMessages.required)]}
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label={this.props.resources.orderingAt}
                            placeholder={this.props.resources.orderingAt}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deadline')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                hourValidator(this.props.resources.validationMessages.provideValidHour)
                            ]}
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label={this.props.resources.deliveryAt}
                            placeholder={this.props.resources.deliveryAt}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deliveryTime')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                hourValidator(this.props.resources.validationMessages.provideValidHour)
                            ]}
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label={this.props.resources.menu}
                            placeholder={this.props.resources.menu}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'menu')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                urlValidator(this.props.resources.validationMessages.provideMenuLink)
                            ]}
                            value={this.state.menu}
                        />
                        <div className="form-group">
                            <label htmlFor="description">{this.props.resources.description}</label>
                            <input
                                id="description"
                                className="form-control"
                                onChange={this.handleTextChange}
                                placeholder={this.props.resources.description}
                                type="textarea"
                            />
                        </div>
                        <ValidatedInput
                            id="author"
                            label={this.props.resources.author}
                            placeholder={this.props.resources.author}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'author')}
                            validators={[requiredValidator(this.props.resources.validationMessages.provideAuthor)]}
                            value={this.state.author}
                        />
                        <ValidatedInput
                            id="deliveryCost"
                            label={this.props.resources.deliveryCost}
                            placeholder={this.props.resources.deliveryCost}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deliveryCost')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                numberValidator(this.props.resources.validationMessages.provideValidDeliveryCost)
                            ]}
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            id="extraCostPerMeal"
                            label={this.props.resources.extraCostPerMeal}
                            placeholder={this.props.resources.extraCostPerMeal}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'extraCostPerMeal')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                numberValidator(this.props.resources.validationMessages.provideValidExtraCostPerMeal)
                            ]}
                            value={this.state.extraCostPerMeal}
                        />
                        <button onClick={this.handleSubmit} type="button" className="btn btn-primary">
                            {this.props.resources.save}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
});

export default connect(state => ({resources: state.localization.resources.newOrderForm}))(NewOrderForm);
