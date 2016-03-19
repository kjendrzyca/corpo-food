import React from 'react';
import {Button, Input} from 'react-bootstrap';
import HourInput from './HourInput';
import {connect} from 'react-redux';

const NewOrderForm = React.createClass({
    getInitialState () {
        return {
            restaurant: '',
            deadline: {
                hour: '',
                isValid: true
            },
            deliveryTime: {
                hour: '',
                isValid: true
            },
            description: '',
            password: '',
            passwordRepeat: '',
            author: '',
            deliveryCost: '',
            externalCostPerMeal: ''
        };
    },

    handleHourChange (id, hour) {
        this.setState(oldState => {
            oldState[id] = {
                hour,
                isValid: this.validateHour(hour)
            };
        });
    },

    validateHour (hour) {
        const pattern = /[0-9]{1,2}\:[0-9]{2}/;
        return pattern.test(hour);
    },

    handleTextChange (event) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = value;
            return oldState;
        });
    },

    render () {
        return (
            <form>
                <Input
                    id="restaurant"
                    label="Lokal"
                    onChange={this.handleTextChange}
                    placeholder="Lokal"
                    type="text"
                />
                <HourInput
                    id="deadline"
                    label="Zamawiam o"
                    onChange={this.handleHourChange}
                    placeholder="O ktorej zamawiasz"
                    value={this.state.deadline}
                />
                <HourInput
                    id="deliveryTime"
                    label="Zamawiam na"
                    onChange={this.handleHourChange}
                    placeholder="Zamawiam na"
                    value={this.state.deliveryTime}
                />
                <Input
                    id="description"
                    label="Opis"
                    onChange={this.handleTextChange}
                    placeholder="Opis"
                    type="textarea"
                />
                <Input
                    id="password"
                    label="Hasło administracyjne"
                    onChange={this.handleTextChange}
                    placeholder="Hasło administracyjne"
                    type="password"
                />
                <Input
                    id="passwordRepeat"
                    label="Powtorz hasło"
                    onChange={this.handleTextChange}
                    placeholder="Powtorz hasło"
                    type="password"
                />
                <Input
                    id="author"
                    label="Autor"
                    onChange={this.handleTextChange}
                    placeholder="Adres e-mail"
                    type="text"
                />
                <Input
                    id="deliveryCost"
                    label="Koszt dowozu"
                    onChange={this.handleTextChange}
                    placeholder="Koszt dowozu"
                    type="text"
                />
                <Input
                    id="externalCostPerMeal"
                    label="Do każdego zamowienia"
                    onChange={this.handleTextChange}
                    placeholder="PLN"
                    type="text"
                />
                <Button onClick={() => {this.props.dispatch({type: 'ADD_NEW_ORDER', order: this.state});}}>Save</Button>
            </form>
        );
    }
});

export default connect()(NewOrderForm);
