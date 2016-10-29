import React from 'react';
import {connect} from 'react-redux';

const MealList = React.createClass({
    propTypes: {
        meals: React.PropTypes.array.isRequired,
        removeMeal: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
    },

    removeMeal (meal) {
        this.props.removeMeal(meal);
    },

    render () {
        const {user, resources} = this.props;
        const ifCurrentUser = (meal, content) => user.name === meal.hungryGuy ? content : null;

        return (
            <div className="MealList">
                <h3>{resources.whoIsOrdering}</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{resources.who}</th>
                            <th>{resources.what}</th>
                            <th>{resources.howMuch}</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.meals.map(meal => (
                            <tr key={`${meal.hungryGuy}_${meal.name}_${meal.cost}`}>
                                <td>{meal.hungryGuy}</td>
                                <td>{meal.name}</td>
                                <td>{meal.cost}</td>
                                <td>
                                    {ifCurrentUser(
                                        meal,
                                        <button className="btn btn-default" onClick={this.removeMeal.bind(null, meal)} type="button">
                                            <span aria-hidden="true" className="glyphicon glyphicon-remove" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
});

export default connect(
    state => ({
        resources: state.localization.resources.mealList,
    })
)(MealList);
