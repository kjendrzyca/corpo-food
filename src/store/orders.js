export const orders = (state = [], action) => {
    switch (action.type) {
    case 'ADD_NEW_ORDER':
        return [
            ...state,
            action.order,
        ];
    case 'HYDRATE_ORDERS':
        return action.orders;
    default:
        return state;
    }
};

export const activeOrder = (state = {fetching: true}, action) => {
    switch (action.type) {
    case 'GET_ORDER':
        return action.activeOrder;
    case 'FETCHING_ORDER':
        return {
            ...state,
            fetching: true,
        };
    case 'SIGN_UP_FOR_MEAL':
        return {
            ...state,
            meals: [
                ...state.meals,
                action.meal,
            ],
        };
    case 'REMOVE_MEAL':
        return {
            ...state,
            meals: state.meals.filter(meal => meal._id !== action.meal._id),
        };
    case 'CHANGE_STATE':
        return {
            ...state,
            state: action.state,
        };
    default:
        return state;
    }
};
