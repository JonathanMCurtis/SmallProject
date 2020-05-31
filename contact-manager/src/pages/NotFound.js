import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import contain from './../data/OopsKitty.gif';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default class NotFound extends Component {
	constructor(props) {
		super(props);
	}

	renderNavigation() {
		return (
			<Navbar className = 'swatch' variant = 'dark' sticky = 'top'>
				<Container expand = 'sm'>
					<Navbar.Brand className = 'navbrand'>
						Cream Contacts</Navbar.Brand>
				</Container>
			</Navbar>
		);
	}

	render() {
		return (
			<div>
				{ this.renderNavigation() }
				<Figure.Image className = 'gifloc' width = '35%' src = { contain } alt = 'Contain' />
				<Figure.Caption className = 'gifcap' id = 'thanks'>Oops, you're not supposed to see this</Figure.Caption>
			</div>
		);
	}
}