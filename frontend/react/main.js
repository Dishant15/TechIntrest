import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import IndexPage from './pages/IndexPage';

import store from './store';

ReactDOM.render(
	(
		<Provider store={store}>
			<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
				<Route path ='/' component={IndexPage}/>
			</Router>
		</Provider>
	), 
	document.getElementById("react")
);