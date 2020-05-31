import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { logoutUser } from '../config';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
	renderLinks() {
		const { onSelect, loggedIn, FirstName, logoutUser } = this.props;

		if (loggedIn) {
			return (
				<>
					<Nav.Item key = 'greeting'>
						<Navbar.Text className = 'text-primary px-2'>Hello, { FirstName }!</Navbar.Text>
					</Nav.Item>
					<Nav.Item key = 'home'>
						<NavLink to = '/' className = 'nav-link'>
							Home
						</NavLink>
					</Nav.Item>
					<Nav.Item key = 'contact'>
						<NavLink to = '/contacts' className = 'nav-link'>
							Contacts
						</NavLink>
					</Nav.Item>
					<Nav.Item key = 'logout'>
						<Link to = '/' className = 'nav-link'>
							<button className = 'bg-transparent border-0 p-0 nav-link' onClick = { () => logoutUser() }>
									Log out
							</button>
						</Link>

					</Nav.Item>
				</>
			);
		}

		return (
			Object.entries(onSelect).map(([text, onClick]) => {
				return (
					<Nav.Item key = { text }>
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
					<Navbar.Brand>
						<Link to = '/' className = 'text-white'>Small Project</Link>
					</Navbar.Brand>
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