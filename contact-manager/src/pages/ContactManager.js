import React, { Component } from 'react';
import { connect } from 'react-redux';
import halfSun from '../data/HalfLogo.png';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';
import { Navbar, Container, Nav, ButtonGroup, Button, Modal, Row, Col, ListGroup, Figure } from './';
import { createContact, deleteContact, getContacts, updateContact, searchContact } from '../config';
import { ContactForm, SearchForm } from '../components';
import sunset from './../data/SunsetLogo.png';
import angry from './../data/AngryFace.png';
import './styles.css';

const buttonLink = 'bg-transparent border-0 p-0 text-primary';

class ContactManager extends Component {
	constructor(props) {
		super(props);

		this.state = { contact: {}, noneSelected: true, searching: false, editing: false, deleteContact: false };
		this.initialContact = { FirstName: '', LastName: '', Email: '', Phone: '' };
	}

	renderDeleteAlert() {
		return (
			<Modal centered size = 'md' show = { this.state.deleteContact } onHide = { () => this.setState({ deleteContact: false }) }>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete this contact?</Modal.Title>
				</Modal.Header>
				<Modal.Body className = 'center'>
					<ButtonGroup>
						<Button size = 'lg' onClick = { () => { this.contact('delete'); this.setState({ noneSelected: true, deleteContact: false }) } }>
							Yes
						</Button>
						<Button size = 'lg' onClick = { () => this.setState({ deleteContact: false }) }>
							No
						</Button>
					</ButtonGroup>
				</Modal.Body>
			</Modal>
		);
	}

	emptyInfo() {
		return (
			<div className = 'center'>
				<Figure.Image width = '55%' src = { sunset } alt = 'Sunset' />
				<p>No contact selected.</p>
			</div>
		);
	}

	renderNotLoggedIn() {
		return (
			<div className = 'header center'>
				<Figure.Image width = '35%' src = { angry } alt = 'Angry' />
				<p>You're not logged in. Click the "Login" button.</p>
			</div>
		);
	}

	async contact(action, values = {}) {
		const { firstName, lastName, email, phone } = values;
		const { UserID, getContacts, createContact, updateContact, deleteContact } = this.props;

		let contactInfo = {
			FirstName: firstName || '',
			LastName: lastName || '',
			Email: email || '',
			Phone: phone || '',
			ContactID: this.state.contact.ContactID
		};

		switch (action) {
			case 'create':
				await createContact({ UserID, ...contactInfo });
				this.setState({ noneSelected: false });
				contactInfo.ContactID = this.props.ContactID;
				break;
			case 'delete':
				await deleteContact({ UserID, ...contactInfo });
				contactInfo = {};
				break;
			case 'update':
				await updateContact({ UserID, ...contactInfo });
				break;
		}

		this.setState({ contact: contactInfo, editing: false });
		if (!this.props.ErrorID) await getContacts({ UserID });
	}

	renderContactInfo() {
		const { editing, contact, noneSelected } = this.state;

		let title;
		let submit;
		let contacts = Object.entries(contact).length;

		if (noneSelected && !editing) {
			return this.emptyInfo();
		}
		else if (noneSelected && editing) {
			title = 'Add Contact';
			submit = 'create';
		}
		else {
			title = 'Update Contact';
			submit = 'update';
		}

		return (
			<>
				<ContactForm
					initial = { (contacts && contact) || this.initialContact }
					active = { editing }
					buttonTitle = { title }
					onSubmit = { values => this.contact(submit, values) }
				/>
				{ this.renderBackground() }
			</>
		);
	}

	renderToolbar() {
		const { UserID, searchContact } = this.props;

		const searchQuery = query => {
			searchContact({ UserID, Search: query });
			this.setState({ searching: true });
		};

		return (
			<Navbar bg = 'third'>
				<Container>
					<Col sm = '3' className = 'justify-content-between'>
						<SearchForm onSubmit = { ({ search }) => searchQuery(search) } />
					</Col>
					<Col>
						<Nav className = 'w-10 float-right justify-content-between'>
							<BsPlus
								as = 'button'
								size = '20px'
								onClick = { () => this.setState({ noneSelected: true, editing: true, contact: {} }) }
							/>
							{ !this.state.noneSelected
							&& <>
								<BsPencil
									as = 'button'
									size = '20px'
									onClick = { () => this.setState({ editing: true }) }
								/>
								<BsTrash
									as = 'button'
									size = '20px'
									onClick = { () => this.setState({ deleteContact: true }) }
								/>
							</> }
						</Nav>
					</Col>
				</Container>
			</Navbar>
		);
	}

	noSearch() {
		const { search } = this.props;

		if (search && search.ErrorID) {
			return (
				<>
					<h5>No contacts met your criteria.</h5>
					<p>Try again, you can search with name, email, or phone number.</p>
				</>
			);
		}
	}

	noContacts() {
		if (this.props.ErrorID === 204) {
			return (
				<h5>Your contact list is empty.{ ' ' }
					<button
						className = { buttonLink }
						onClick = { () => this.setState({ editing: true, contact: {} }) }
					>
					Add Some!
					</button>
				</h5>
			);
		}
	}

	renderBackground() {
		return (
			<div className = 'center'>
				<img height = '55%' src = { halfSun } />
				<p>Thank you for using SummerTime Contacts!</p>
			</div>
		);
	}

	renderContacts() {
		const { searching } = this.state;
		const { Contacts, search } = this.props;
		const searchResults = searching && search && search.ErrorID && {};

		return (
			<div className = 'bg-white properHeight'>
				<Container className = 'py-3'>
					<Row>
						<Col sm = '3' className = 'scroll'>
							<ListGroup>
								{ Contacts && Object.entries(searchResults || search || Contacts).map(([ContactID, ContactInfo]) => {
									const { FirstName, LastName } = ContactInfo;

									return (
										<ListGroup.Item
											action
											key = { ContactID }
											onClick = { () => this.setState({ editing: false, noneSelected: false, contact: { ContactID, ...ContactInfo } }) }
										>
											{ FirstName } { LastName }
										</ListGroup.Item>
									);
								}) }
								{ this.noContacts() }
								{ this.noSearch() }
							</ListGroup>
						</Col>
						<Col className = 'scroll'>
							{ this.renderContactInfo() }
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

	render() {
		if (this.props.loggedIn) {
			return (
				<>
					{ this.renderToolbar() }
					{ this.renderContacts() }
					{ this.renderDeleteAlert() }
				</>
			);
		}
		else {
			return (
				<>
					{ this.renderNotLoggedIn() }
				</>
			);
		}
	}
}

const mapDispatchToProps = { createContact, deleteContact, getContacts, updateContact, searchContact };
const mapStateToProps = ({ loggedIn, currentUser, search }) => {
	const { UserID, Contacts, ContactID, ErrorID } = currentUser;

	return { loggedIn, UserID, search, Contacts, ContactID, ErrorID };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactManager);