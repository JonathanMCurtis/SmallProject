import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import cactus from './../data/cactus.png';
import Figure from 'react-bootstrap/Figure';
import md5 from 'md5';
import './styles.css';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = { registerModal: false, loginModal: false };
	}

	componentDidMount() {
		// fetch('http://dummy.restapiexample.com/api/v1/employees')
		// 	.then(data => data.json())
		// 	.then(json => alert(JSON.stringify(json.data)))
	}

	renderRegisterForm() {
		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Row>
							<Col sm = '5'>
								<Form.Control type = 'text' placeholder = 'First name' ref = { name => (this.fName = name) } />
							</Col>
							<Col>
								<Form.Control type = 'text' placeholder = 'Last name' ref = { name => (this.lName = name) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type = 'password' placeholder = 'Password' ref = { pass => (this.password = pass) } />
					</Form.Group>
				</Form>
				<Button onClick = { () => document.getElementById('thanks').className = 'visible' }>Submit</Button>
			</div>
		);
	}

	renderLoginForm() {
		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type = 'password' placeholder = 'Password' ref = { pass => (this.password = pass) } />
					</Form.Group>
				</Form>
				<Button onClick = { () => document.getElementById('sign-in').className = 'visible' }>Log in</Button>
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
									<button className = { buttonLink } onClick = { () => this.setState({ loginModal: true, registerModal: false })}>
										Sign in
									</button>
									{' '}instead!
								</p>
								{ this.renderRegisterForm() }
							</Col>
							<Col className = 'center' lg = '5'>
								<Figure.Image width = '55%' src = { cactus } alt = 'Cactus' />
								<Figure.Caption id = 'thanks' className = 'invisible'>Hello! Thank you for signing up.</Figure.Caption>
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
								<Figure.Caption id = 'sign-in' className = 'invisible'>Signing in...</Figure.Caption>
							</Col>
							<Col>
								<p className = 'smallText'>Don't have an account?<br />
									<button className = { buttonLink } onClick = { () => this.setState({ registerModal: true, loginModal: false })}>
										Sign up
									</button>
									{' '}instead!
								</p>
								{ this.renderLoginForm() }
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderSlider() {

	}

	renderNavigation() {
		return (
			<Navbar bg = 'dark' variant = 'dark' sticky = 'top'>
				<Container expand = 'sm'>
					<Navbar.Brand>Small Project</Navbar.Brand>
					<Nav className = 'ml-auto'>
						<Nav.Item>
							<Nav.Link
								eventKey = 'register'
								onSelect = { () => this.setState({ registerModal: true }) }
							>
						Register
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								eventKey = 'login'
								onSelect = { () => this.setState({ loginModal: true }) }
							>
									Login
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		);
	}

	render() {
		let newUser = {
			name: '',
			email: '',
			password: ''
		}
	
		return (
			<div>
				{ this.renderNavigation() }
				{ this.renderRegisterModal() }
				{ this.renderLoginModal() }
			</div>
		);
	}
}