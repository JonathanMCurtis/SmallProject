import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import md5 from 'md5';
import '../pages/styles.css';
import cactus from '../data/cactus.png';
import { LoginForm, SignUpForm } from './';
import { Modal, Container, Row, Col, Figure } from '../pages';
import { createUser, loginUser, logoutUser } from '../config';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = { registerModal: false, loginModal: false };
	}

	signup(values) {
		const { username, password, firstName, lastName } = values;

		this.thanks.className = 'visible';
		this.props.createUser({ User: username, Password: md5(password),
		                        FirstName: firstName, LastName: lastName });
		setTimeout(() => this.setState({ registerModal: false }), 500);
	}

	login(values) {
		const { username, password } = values;

		this.signIn.className = 'visible';
		this.props.loginUser({ 'User': username, 'Password': md5(password) });
		setTimeout(() => this.setState({ loginModal: false }), 500);
	}

	renderRegisterModal() {
		return (
			<Modal centered size = 'lg' show = { this.state.registerModal } onHide = { () => this.setState({ registerModal: false }) }>
				<Modal.Header closeButton>
					<Modal.Title>Welcome!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col className = 'divider'>
								<p className = 'smallText'>Already have an account?<br />
									<button
										className = { buttonLink }
										onClick = { () => this.setState({ registerModal: false },
											() => this.setState({ loginModal: true })) }
									>
										Sign in
									</button>
									{ ' ' }instead!
								</p>
								<SignUpForm onSubmit = { (values) => this.signup(values) } />
							</Col>
							<Col className = 'center' lg = '5'>
								<Figure.Image width = '55%' src = { cactus } alt = 'Cactus' />
								<Figure.Caption ref = { ref => this.thanks = ref } className = 'invisible'>
									Hello! Thank you for signing up.
								</Figure.Caption>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderLoginModal() {
		return (
			<Modal centered size = 'lg' show = { this.state.loginModal } onHide = { () => this.setState({ loginModal: false }) }>
				<Modal.Header closeButton>
					<Modal.Title>Welcome back!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col className = 'center divider' lg = '5'>
								<Figure.Image width = '55%' src = { cactus } alt = 'Cactus' />
								<Figure.Caption ref = { ref => this.signIn = ref } className = 'invisible'>
									Signing in...
								</Figure.Caption>
							</Col>
							<Col>
								<p className = 'smallText'>Don't have an account?<br />
									<button
										className = { buttonLink }
										onClick = { () => this.setState({ loginModal: false },
											() => this.setState({ registerModal: true })) }
									>
										Sign up
									</button>
									{ ' ' }instead!
								</p>
								<LoginForm onSubmit = { values => this.login(values) } />
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderLinks() {
		const { loggedIn, FirstName, logoutUser } = this.props;
		const onSelect = {
			'Sign Up': () => this.setState({ registerModal: true }),
			'Login': () => this.setState({ loginModal: true })
		};

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
				{ this.renderRegisterModal() }
				{ this.renderLoginModal() }
			</Navbar>
		);
	}
}

const mapDispatchToProps = { createUser, loginUser, logoutUser };
const mapStateToProps = ({ loggedIn, currentUser }) => {
	const { FirstName, ErrorID } = currentUser;

	return { loggedIn, FirstName, ErrorID };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);