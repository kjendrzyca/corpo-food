import React from 'react';
import DOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import Dashboard from './dashboard';
import NewOrderForm from './newOrderForm';
import OrderOverview from './orderOverview';
import Errors from './errors';
import ManageOrder from './manageOrder';
import Notification from './notification';
import browserHistory from '../utils/browserHistory';

import {orders, activeOrder} from '../store/orders';
import localization from '../store/localization';
import changeLocale from '../store/localizationActions';
import {errors} from '../store/errors';
import chatMessages from '../store/chatMessages';
import user from '../store/user';
import {USERNAME_KEY, setUsername} from '../store/userActions';
import notification from '../store/notification';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        orders,
        activeOrder,
        routing: routerReducer,
        localization,
        errors,
        chatMessages,
        user,
        notification
    }),
    applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const App = connect(state => ({
    resources: state.localization.resources.app
}))(
    React.createClass({
        propTypes: {
            children: React.PropTypes.object,
            resources: React.PropTypes.object.isRequired
        },

        render () {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>
                                {this.props.resources.appName}
                                <small>{this.props.resources.uniqueValueProposition}</small>
                            </h1>
                        </div>
                    </div>
                    <Notification />
                    <Errors />
                    <div className="row">
                        <div className="col-xs-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
    })
);

const renderApp = () => {
    DOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route component={App} path="/">
                    <IndexRoute component={Dashboard} />
                    <Route component={NewOrderForm} path="newOrder" />
                    <Route component={OrderOverview} path="order/:id" />
                    <Route component={ManageOrder} path="manage/order/:accessCode" />
                </Route>
            </Router>
        </Provider>,
        document.getElementById('main-container')
    );
};

const loadUsernameIfPersisted = () => {
    const username = global.localStorage.getItem(USERNAME_KEY);

    if (!username) {
        return;
    }

    store.dispatch(setUsername(username));
};

fetch('/api/currentLocale')
    .then(response => response.json())
    .then(locale => {
        store.dispatch(changeLocale(locale));
        loadUsernameIfPersisted();
        renderApp();
    });
