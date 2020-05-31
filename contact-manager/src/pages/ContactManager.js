import React, { Component, useState, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import contact2 from './../data/Proj-Logo-Trans2.png';
import contact from './../data/Proj-Logo-Trans.png';
import Figure from 'react-bootstrap/Figure';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';
import { createContact, deleteContact, getContacts, updateContact, searchContact, logoutUser } from '../config';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import './styles.css';

export default class ContactManager extends Component {
	constructor(props) {
		super(props);

		this.state = { deleteContact: false, logout: false, infoCard: false };
	}

	renderDeleteContactModal() {
		return (
			<Modal className = 'modalcolor' centered size = 'md' show = { this.state.deleteContact } onHide = { () => this.setState({ deleteContact: false }) }>
				<Modal.Body className = 'modalbg'>
					<Col>
					<Row>
						<p className = 'deletefont'>Are you sure you want to delete this contact?</p>
					</Row>
					<Row className = 'rowspace'>
					<Col>
						<Button className = 'deletebutton' size = 'lg' eventKey = 'delete' onClick = {() => this.setState({ deleteContact: true})}>
						<p className = 'yesfont'>Yes</p>
						</Button>
					</Col>
					<Col>
						<Button className = 'deletebutton2' size = 'lg' eventKey = 'delete' onClick = {() => this.setState({ deleteContact: true})}>
						<p className = 'yesfont'>No</p>
						</Button>
					</Col>
					</Row>
					</Col>
				</Modal.Body>
			</Modal>
		);
	}

	renderInfoCard(){
		return(
				<Col className = 'infocard'>
					<Row>
					<Col className = 'colspace'>
					<Row className = 'contactinfo'>
					<p>Jonathan Curtis</p>
					</Row>
					<Row  className = 'contactinfo'>
					<p>jonathancurtis@gmail.com</p>
					</Row>
					<Row  className = 'contactinfo'>
					<p>321-456-7890</p>
					</Row>
					</Col>
					<Col sm = '1'>
						<Button className = 'buttoncolorform' size = 'lg' eventKey = 'edit' onClick = {() => this.setState({ deleteContact: true})}>
						<BsPencil size = '45px'/>
						</Button>
					</Col>
					<Col sm = '1'>
						<Button className = 'buttoncolorform' size = 'lg' eventKey = 'delete' onClick = {() => this.setState({ deleteContact: true})}>
						<BsTrash size = '45px'/>
						</Button>
					</Col>
					</Row>
				</Col>
		)
	}

	renderAddCard(){
		return(
				<Col className = 'infocard'>
					<Form className = 'formloc'>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Name</Form.Label>
						<Row>
							<Col sm = '6'>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'First name' ref = { name => (this.fName = name) } />
							</Col>
							<Col>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'Last name' ref = { name => (this.lName = name) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Email</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Phone</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'phone' placeholder = 'Phone #' ref = { name => (this.phone = name) } />
					</Form.Group>
					</Form>
					<Button className = 'float-right addbutton' onClick = {() => this.setState({ deleteContact: true})}>Add</Button>
				</Col>
		)
	}

	renderEditCard(){
		return(
				<Col className = 'infocard'>
					<Form className = 'formloc'>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Name</Form.Label>
						<Row>
							<Col sm = '6'>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'First name' ref = { name => (this.fName = name) } />
							</Col>
							<Col>
								<Form.Control className = 'searchcolor2' type = 'text' placeholder = 'Last name' ref = { name => (this.lName = name) } />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Email</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'email' placeholder = 'example@domain.com' ref = { mail => (this.email = mail) } />
					</Form.Group>
					<Form.Group className = 'grouploc'>
						<Form.Label className = 'formlabel'>Phone</Form.Label>
						<Form.Control className = 'searchcolor2' type = 'phone' placeholder = 'Phone #' ref = { name => (this.phone = name) } />
					</Form.Group>
					</Form>
					<Button className = 'float-right addbutton' onClick = {() => this.setState({ deleteContact: true})}>Edit</Button>
				</Col>
		)
	}

	renderNavigation() {
		return (
			<Navbar className = 'swatch' variant = 'dark' sticky = 'top'>
				<Container expand = 'sm'>
					<Navbar.Brand className = 'navbrand'>
						<Figure.Image width = '10%' src = { contact } alt = 'Contact_Image' />
						Cream Contacts</Navbar.Brand>
					 <Nav className = 'p-2'>
						<Nav.Item>
							<Nav.Link className = 'navbrand'
								eventKey = 'logout'
								onSelect = { () => this.setState({ logout: true }) }>
								Logout
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		);
	}

	renderSearch(){
		return(
			<div>
				<Form.Row>
					<Col className = 'searchbar' sm = '2'>
       					<Form.Control size = 'lg' type = "text" placeholder = "Search Contacts" className = "mr-sm-2 searchcolor" />
	 				</Col>
	 				<Col>
       					<Button size = 'lg' className = 'buttoncolor'>
							Search
						</Button>
						<Button className = 'buttoncolor' size = 'lg' eventKey = 'add-contact' 
							onClick = { () => this.setState({ deleteContact: true }) }>
							Add Contact
						</Button>
					</Col>
				</Form.Row>
			</div>
		)
	}

	renderList(){
		return(
			<div>
				<Row>
				<Col lg = '4' className = 'scrollbar'>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>MB</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Mason Benell</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({ deleteContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>JC</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Jonathan Curtis</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({displayContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>LG</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Li Guerry</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({displayContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>IR</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Idel Ramos</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({displayContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>DD</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Dakota Downing</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({displayContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>AV</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Alex Varga</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = {() => this.setState({displayContact: true})}>
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>MB</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Mason Benell</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = "renderInfoCard">
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>MB</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Mason Benell</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = "renderInfoCard">
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>MB</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Mason Benell</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = "renderInfoCard">
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
					<Row className = 'rowpad'>
					<Col className = 'initials' sm = '1.5'>
						<p className = 'initialspos'>MB</p>
					</Col>
					<Col>
						<p className = 'cardfont'>Mason Benell</p>
					</Col>
					<Col sm = '1'>
						<Button className = 'displayicon' eventKey = 'display-contact' onClick = "renderInfoCard">
							<BsFillCaretRightFill className = 'iconpos' size = '45px'/>
						</Button>
					</Col>
					</Row>
				</Col>
				{/* { this.renderEditCard() } */}
				{ this.renderAddCard() }
				{/* { this.renderInfoCard() } */}
				</Row>
			</div>
		)
	}

	render() {
		return (
			<div>
				{ this.renderNavigation() }
				{ this.renderSearch() }
				{ this.renderList() }
				{ this.renderDeleteContactModal() }
				{/* { this.renderInfoCard() } */}
			</div>
		);
	}
}