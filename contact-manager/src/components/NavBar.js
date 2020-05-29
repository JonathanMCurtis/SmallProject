import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { logoutUser } from '../config';
import { connect } from 'react-redux';

class NavBar extends Component {
	renderLinks() {
		const { onSelect, loggedIn, FirstName, logoutUser } = this.props;

		if (loggedIn) {
			return (
				<div>
					<Nav.Item>
						<Navbar.Text>Hello, { FirstName }!</Navbar.Text>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey = 'logout' onSelect = { () => logoutUser() }>
							Logout
						</Nav.Link>
					</Nav.Item>
				</div>
			);
		}

		return (
			Object.entries(onSelect).map(([text, onClick]) => {
				return (
					<Nav.Item>
						<Nav.Link eventKey = { text } onSelect = { () => onClick() }>
							{ text }
						</Nav.Link>
					</Nav.Item>
				);
			})
		);
	}

	render() {
		return (
			<Navbar bg = 'dark' variant = 'dark' sticky = 'top'>
				<Container expand = 'sm'>
					<Navbar.Brand>Small Project</Navbar.Brand>
					<Nav className = 'ml-auto'>
						{ this.renderLinks() }
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = ({ loggedIn, currentUser }) => {
	const { FirstName } = currentUser;

	return { loggedIn, FirstName };
};

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);