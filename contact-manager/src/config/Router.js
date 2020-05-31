import React from 'react';
import { Home, ContactManager, NotFound } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/contacts' component = { ContactManager } />
				<Route component = { NotFound } />
			</Switch>
		</BrowserRouter>
	);
};