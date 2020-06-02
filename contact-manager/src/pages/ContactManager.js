/* eslint-disable max-len */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BsFillCaretRightFill } from 'react-icons/bs';
import contact2 from './../data/Proj-Logo-Trans2.png';
import contact3 from './../data/Proj-Logo-Trans.png';
import contain from './../data/OopsKitty.gif';
import Figure from 'react-bootstrap/Figure';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';
import { connect } from 'react-redux';
import { createContact, deleteContact, getContacts, updateContact, searchContact } from '../config';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { ContactForm } from '../components';
import './styles.css';

class ContactManager extends Component {
	constructor(props) {
		super(props);

		this.state = { contact: {}, editing: false, deleteContact: false, logout: false, infoCard: false, editCard: false, addCard: false };
	}

	componentDidMount() {
		this.props.getContacts({ UserID: this.props.UserID });
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
								<Button className = 'deletebutton' size = 'lg' eventKey = 'delete'
									onClick = { () => this.props.deleteContact({ 'UserID': this.props.UserID, 'ContactID': this.props.ContactID }) }>
									<p className = 'yesfont'>Yes</p>
								</Button>
							</Col>
							<Col>
								<Button className = 'deletebutton2' size = 'lg' eventKey = 'delete' onClick = { () => this.setState({ deleteContact: false }) }>
									<p className = 'yesfont'>No</p>
								</Button>
							</Col>
						</Row>
					</Col>
				</Modal.Body>
			</Modal>
		);
	}

	renderAddCard() {
		const { editing, contact } = this.state;
		let title;
		const { FirstName, LastName, Email, Phone } = contact;

		if (Object.entries(contact).length === 0 && !editing)
			return <Figure.Image className = 'gifloc' width = '35%' src = { contain } alt = 'Contain' />;
		else if (Object.entries(contact).length === 0 && editing)
			title = 'Add Contact';
		else
			title = 'Update Contact';
		// console.log(contact);

		return <ContactForm initial = {{ FirstName, LastName, Email, Phone }}
			active = { this.state.editing } buttonTitle = { title } onSubmit = { () => this.props.createContact({ 'contact': this.props.contact, 'UserID': this.props.UserID }) } />;
	}

	renderNavBar() {
		// const contact = this.props.Contacts; // this.props.Contacts

		const contact = {
			'ABCDJ': { 'ContactID': '1', 'FirstName': 'John', 'LastName': 'NotJohn', 'Email': 'JohnNotJohn@gmail.com', 'Phone': '123-456-7890' },
			'ABCDfJ': { 'ContactID': '2', 'FirstName': 'Joe', 'LastName': 'NotJoe', 'Email': 'JoeNotJoe@gmail.com', 'Phone': '123-456-7890' },
			'ABCDJd': { 'FirstName': 'John', 'LastName': 'Not John' },
			'ABCDS': { 'FirstName': 'John', 'LastName': 'Not John' },
			'AFCDJ': { 'FirstName': 'John', 'LastName': 'Not John' },
			'ABCDJsa': { 'FirstName': 'John', 'LastName': 'Not John' },
			'DWOIdJ': { 'FirstName': 'Johnny', 'LastName': 'J' }
		}; // this.props.Contacts

		// console.log(this.props.Contacts);

		const { ContactID, FirstName, LastName, Email, Phone } = contact;
		const UserID = this.props.UserID;

		return (
			<Navbar variant = 'dark' sticky = 'top'>
				<Col>
					<Form inline>
						<Form.Control size = 'lg' type = "text" placeholder = "Search Contacts" />
						<Button size = 'lg' onClick = { () => this.props.searchContact({ 'UserID': this.props.UserID, 'Search': 'Search Contacts' }) } >
							Search
						</Button>
					</Form>
				</Col>
				<Col>
					<Nav className = 'float-right'>
						<Button size = 'lg' eventKey = 'add-contact'
							onClick = { () => this.setState({ editing: true, contact: {} }) }>
							<BsPlus size = '40px' />
						</Button>
						<Button size = 'lg' eventKey = 'edit-contact'
							onClick = { () => this.setState({ editing: true, contact: { FirstName, LastName, Email, Phone } }) }>
							<BsPencil size = '40px' />
						</Button>
						<Button size = 'lg' eventKey = 'delete-contact'
							onClick = { () => this.setState({ deleteContact: true }) }>
							<BsTrash size = '40px' />
						</Button>
					</Nav>
				</Col>
			</Navbar>
		);
	}

	// onClick = { () => this.props.deleteContact({ 'ContactID': ContactID, 'UserID': UserID }) }

	renderList() {
		// const contact = this.props.Contacts; // this.props.Contacts

		const contact = {
			'ABCDJ': { 'FirstName': 'John', 'LastName': 'NotJohn', 'Email': 'JohnNotJohn@gmail.com', 'Phone': '123-456-7890' },
			'ABCDfJ': { 'FirstName': 'Joe', 'LastName': 'NotJoe', 'Email': 'JoeNotJoe@gmail.com', 'Phone': '123-456-7890' },
			'ABCDJd': { 'FirstName': 'John', 'LastName': 'Not John' },
			'ABCDS': { 'FirstName': 'John', 'LastName': 'Not John' },
			'AFCDJ': { 'FirstName': 'John', 'LastName': 'Not John' },
			'ABCDJsa': { 'FirstName': 'John', 'LastName': 'Not John' },
			'DWOIdJ': { 'FirstName': 'Johnny', 'LastName': 'J' }
		}; // this.props.Contacts

		console.log(this.props.Contacts);

		return (
			<>
				<Row>
					<Col lg = '4' className = 'scrollbar'>
						<ListGroup>
							{ Object.entries(contact).map(([ContactID, { FirstName, LastName, ...info }]) => {
								return (
									<ListGroup.Item action
										onClick = { () => this.setState({ editing: false, contact: { ContactID, FirstName, LastName, ...info } }) }>
										{ FirstName } { LastName }
									</ListGroup.Item>
								);
							}) }
						</ListGroup>
					</Col>
					<Col>
						{ this.renderAddCard() }
					</Col>
				</Row>
			</>
		);
	}

	render() {
		return (
			<div>
				{ this.renderNavBar() }
				{ this.renderList() }
				{ this.renderDeleteContactModal() }
			</div>
		);
	}
}

const mapStateToProps = ({ loggedIn, currentUser, search, contact }) => {
	const { UserID, Contacts } = currentUser;

	return { loggedIn, UserID, search, contact, Contacts };
};

const mapDispatchToProps = { createContact, deleteContact, getContacts, updateContact, searchContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactManager);