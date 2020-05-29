import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './config/User';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = initialState => createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store = { store() }>
		<App />
	</Provider>,
	document.getElementById('root')
);