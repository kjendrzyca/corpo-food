import React from 'react';
import {Button, Input, Row, Col, Grid} from 'react-bootstrap';
import HourInput from './HourInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired
    },

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
            menu: '',
            description: '',
            password: '',
            passwordRepeat: '',
            author: '',
            deliveryCost: '',
            extraCostPerMeal: ''
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
            <Grid>
                <Row>
                    <Col xs={8}>
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
                                id="menu"
                                label="Menu"
                                onChange={this.handleTextChange}
                                placeholder="Menu"
                                type="text"
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
                                id="extraCostPerMeal"
                                label="Do każdego zamowienia"
                                onChange={this.handleTextChange}
                                placeholder="PLN"
                                type="text"
                            />
                            <Button onClick={() => this.props.dispatch(addNewOrder(this.state))} type="button">
                                Save
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default connect()(NewOrderForm);
