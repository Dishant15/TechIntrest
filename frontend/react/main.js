import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import AddPin from './pages/AddPin';
import PinDetailsPage from './pages/PinDetailsPage';
import UserPinsPage from './pages/UserPinsPage';

import store from './store';
import {addNotification} from './actions/pinActions';

export function loginRequired(nextState, replace) {
    const {loggeduser} = store.getState();
    if (!loggeduser.logged) {
        // give a login required alert
        const notification = {
            type : 'error',
            icon : 'fa-power-off',
            title : 'Loggin Required',
            text : 'You need to be logged in to visit this page',
        }
        store.dispatch(addNotification(notification));
        // redirect to login page with next path details
        replace({
            pathname: '/',
        })
    }
}

ReactDOM.render(
	(
		<Provider store={store}>
			<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
				<Route path ='/' component={Layout} >
					<IndexRoute component={IndexPage}/>
					<Route path ='/pin/add/' component={AddPin} onEnter={loginRequired}/>
					<Route path ='/pin/:id/' component={PinDetailsPage}/>
					<Route path ='/user/:id/pins/' component={UserPinsPage}/>
				</Route>
			</Router>
		</Provider>
	), 
	document.getElementById("react")
);