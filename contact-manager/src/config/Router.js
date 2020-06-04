import React from 'react';
import { Home, ContactManager, NotFound } from '../pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';

export const Router = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path = '/' component = { Home } />
				<Route exact path = '/contacts' component = { ContactManager } />
				<Route path = { ['/*', '/contacts/*'] } component = { NotFound } />
			</Switch>
		</BrowserRouter>
	);
};