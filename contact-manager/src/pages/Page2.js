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
import contact from './../data/Contact_Image.png';
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card'
import md5 from 'md5';
import './styles.css';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = { deleteContact: false, addModal: false, editModal: false, logout: false };
	}

	componentDidMount() {
		// fetch('http://dummy.restapiexample.com/api/v1/employees')
		// 	.then(data => data.json())
		// 	.then(json => alert(JSON.stringify(json.data)))
	}

	renderAddForm() {
		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Row>
							<Col sm = '5'>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'First name' ref = { name => (this.fName = name) } />
							</Col>
							<Col>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'Last name' ref = { name => (this.lName = name) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Phone</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'phone' placeholder = 'Phone #' ref = { name => (this.phone = name) } />
					</Form.Group>
				</Form>
				<Button className = 'buttoncolor2' onClick = { () => document.getElementById('thanks').className = 'visible' }>Add</Button>
			</div>
		);
	}

	renderAddModal() {
		return (
			<Modal className = 'modalcolor' centered size = 'xl' show = { this.state.addModal } onHide = { () => this.setState({ addModal: false }) }>
				<Modal.Header className = 'modalbg' closeButton>
					<Modal.Title>Add Contact</Modal.Title>
				</Modal.Header>
				<Modal.Body className = 'modalbg'>
					<Container>
						<Row>
						<Col>
							{ this.renderAddForm() }
						</Col>
						<Col className = 'center' lg = '5'>
							<Figure.Image width = '60%' src = { contact } alt = 'Contact_Image' />
							<Figure.Caption id = 'thanks' className = 'invisible'>Contact added.</Figure.Caption>
						</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderEditForm() {
		return (
			<div>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Row>
							<Col sm = '5'>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'First name' ref = { name => (this.fName = name) } />
							</Col>
							<Col>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'Last name' ref = { name => (this.lName = name) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group>
						<Form.Label>Phone</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'phone' placeholder = 'Phone #' ref = { name => (this.phone = name) } />
					</Form.Group>
				</Form>
				<Button className = 'buttoncolor2' onClick = { () => document.getElementById('thanks').className = 'visible' }>Save</Button>
			</div>
		);
	}

	renderEditModal() {
		return (
			<Modal className = 'modalcolor' centered size = 'xl' show = { this.state.editModal } onHide = { () => this.setState({ editModal: false }) }>
				<Modal.Header className = 'modalbg' closeButton>
					<Modal.Title>Edit Contact</Modal.Title>
				</Modal.Header>
				<Modal.Body className = 'modalbg'>
					<Container>
						<Row>
						<Col>
							{ this.renderEditForm() }
						</Col>
						<Col className = 'center' lg = '5'>
							<Figure.Image width = '60%' src = { contact } alt = 'Contact_Image' />
							<Figure.Caption id = 'thanks' className = 'invisible'>Contact information updated.</Figure.Caption>
						</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}

	renderNavigation() {
		return (
			<Navbar className = 'swatch' variant = 'dark' sticky = 'top'>
				<Container expand = 'sm'>
					<Navbar.Brand className = 'navbrand'>Blackjack</Navbar.Brand>
					 <Nav className = 'p-2'>
						<Nav.Item>
							<Nav.Link className = 'navbrand'
								eventKey = 'logout'
								onSelect = { () => this.setState({ logout: true }) }
							>
								Logout
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		);
	}

	renderCards(){
		return(
			<div>
			<Card className = 'cardhead'>
  				<Card.Header>
					<Form.Row>
						<Col className = 'searchbar'>
      						<Form.Control size = 'lg' type="text" placeholder="Search Contacts" className="mr-sm-2 searchcolor" />
						</Col>
						<Col>
      						<Button size = 'lg' className = 'buttoncolor'>Search</Button>
						</Col>
						<Col>
							<Button className = 'float-right buttoncolor' size = 'lg' variant='outline-dark' eventKey = 'add-contact' onClick = {() => this.setState({ addModal: true})}>
								Add Contact
							</Button>
						</Col>
    				</Form.Row>
				</Card.Header>
			</Card>
            <Card className = 'cardbody mx-auto'>
				<Row>
				<Col>
				<Card.Body>
					<p>FirstName          LastName</p>
					<p>Email              Phone#</p>
					<p>Address</p>
				</Card.Body>
				</Col>
				<Col className = 'center float-right'>
					<Button className = 'float-right buttoncolorform' size = 'lg' variant='outline-dark' eventKey = 'add-contact' onClick = {() => this.setState({ editModal: true})}>
						Edit Contact
					</Button>
					<Button className = 'float-right buttoncolorform' size = 'lg' variant='outline-dark' eventKey = 'add-contact' onClick = {() => this.setState({ deleteContact: true})}>
						Delete Contact
					</Button>
				</Col>
				</Row>
			</Card>
			</div>
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
				{ this.renderCards() }
				{ this.renderAddModal() }
				{ this.renderEditModal() }
			</div>
		);
	}
}