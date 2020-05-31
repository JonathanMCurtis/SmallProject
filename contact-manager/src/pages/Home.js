import React, { Component } from 'react';
import { Modal, Container, Carousel, Row, Col, Figure } from './';
import cactus from '../data/cactus.png';
import md5 from 'md5';
import './styles.css';
import { NavBar, LoginForm, SignUpForm } from '../components';
import { connect } from 'react-redux';
import { createUser, loginUser, logoutUser } from '../config';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = { registerModal: false, loginModal: false };
	}

	signup(values) {
		const { username, password, firstName, lastName } = values;

		this.thanks.className = 'visible';
		this.props.createUser({ User: username, Password: md5(password),
		                        FirstName: firstName, LastName: lastName });
	}

	login(values) {
		const { username, password } = values;

		this.signIn.className = 'visible';
		this.props.loginUser({ 'User': username, 'Password': md5(password) });
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