import React, { Component } from 'react';
import { Modal, Container, Button, Carousel, Row, Col, Form, Figure } from './';
import cactus from '../data/cactus.png';
import md5 from 'md5';
import './styles.css';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { createUser, loginUser, logoutUser } from '../config';
import { Link } from 'react-router-dom';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = { registerModal: false, loginModal: false };
	}

	renderRegisterForm() {
		const signup = () => {
			this.thanks.className = 'visible';
			this.props.createUser({ User: this.user.value, Password: md5(this.password.value),
				                      FirstName: this.fName.value, LastName: this.lName.value });
		};

		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Row>
							<Col sm = '5'>
								<Form.Control type = 'text' placeholder = 'First name' ref = { ref => (this.fName = ref) } />
							</Col>
							<Col>
								<Form.Control type = 'text' placeholder = 'Last name' ref = { ref => (this.lName = ref) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control type = 'text' placeholder = 'myUsername' ref = { ref => (this.user = ref) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type = 'password' placeholder = 'Password' ref = { ref => (this.password = ref) } />
					</Form.Group>
				</Form>
				<Button onClick = { () => signup() }>Submit</Button>
			</div>
		);
	}

	renderLoginForm() {
		const login = () => {
			this.signIn.className = 'visible';

			this.props.loginUser({ 'User': this.user.value, 'Password': md5(this.password.value) });
		};

		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control type = 'text' placeholder = 'CoolKid123' ref = { ref => (this.user = ref) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type = 'password' placeholder = 'Password' ref = { ref => (this.password = ref) } />
					</Form.Group>
				</Form>
				<Button onClick = { () => login() }>Log in</Button>
			</div>
		);
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
										onClick = { () => this.setState({ loginModal: true, registerModal: false }) }
									>
										Sign in
									</button>
									{ ' ' }instead!
								</p>
								{ this.renderRegisterForm() }
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
										onClick = { () => this.setState({ registerModal: true, loginModal: false }) }
									>
										Sign up
									</button>
									{ ' ' }instead!
								</p>
								{ this.renderLoginForm() }
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderCarousel() {
		return (
			<Carousel className = 'bg-primary slider'>
				<Carousel.Item>
					<h1>First slide label</h1>
				</Carousel.Item>
				<Carousel.Item>
					<h1>Second slide label</h1>
				</Carousel.Item>
				<Carousel.Item>
					<h1>Third slide label</h1>
				</Carousel.Item>
			</Carousel>
		);
	}

	render() {
		return (
			<div>
				<NavBar onSelect = {{
					'Sign Up': () => this.setState({ registerModal: true }),
					'Login': () => this.setState({ loginModal: true }) }}
				/>
				{ this.renderCarousel() }
				{ this.renderRegisterModal() }
				{ this.renderLoginModal() }
			</div>
		);
	}
}

const mapStateToProps = ({ loggedIn, currentUser }) => {
	const { FirstName, ErrorID } = currentUser;

	return { loggedIn, FirstName, ErrorID };
};

const mapDispatchToProps = { createUser, loginUser, logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);