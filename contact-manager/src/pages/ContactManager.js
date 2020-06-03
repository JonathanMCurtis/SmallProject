/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';
import { Navbar, Container, Nav, ButtonGroup, Button, Modal, Row, Col, ListGroup } from './';
import { createContact, deleteContact, getContacts, updateContact, searchContact } from '../config';
import { ContactForm, SearchForm } from '../components';
import './styles.css';

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
						<Button size = 'lg' onClick = { () => this.contact('delete') }>
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
			<>Hello</>
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

		if (!this.props.ErrorID) getContacts({ UserID });
		this.setState({ contact: contactInfo });
	}

	renderContactInfo() {
		const { editing, contact } = this.state;

		let title;
		let submit;
		let contacts = Object.entries(contact).length;

		if (!contacts && !editing) {
			return this.emptyInfo();
		}
		else if (!contacts && editing) {
			title = 'Add Contact';
			submit = 'create';
		}
		else {
			title = 'Update Contact';
			submit = 'update';
		}

		return (
			<ContactForm
				initial = { (contacts && contact) || this.initialContact }
				active = { editing }
				buttonTitle = { title }
				onSubmit = { values => this.contact(submit, values) }
			/>
		);
	}

	renderToolbar() {
		const { UserID, searchContact } = this.props;

		const searchQuery = query => {
			searchContact({ UserID, Search: query })
				.then(() => !this.props.search.ErrorID && this.setState({ searching: true }));
		};

		return (
			<Navbar>
				<Container>
					<Col sm = '3' className = 'justify-content-between'>
						<SearchForm onSubmit = { ({ search }) => searchQuery(search) } />
					</Col>
					<Col>
						<Nav className = 'w-10 float-right justify-content-between'>
							<BsPlus
								as = 'button'
								size = '18px'
								onClick = { () => this.setState({ editing: true, contact: {} }) }
							/>
							{ Object.entries(this.state.contact).length !== 0 && <BsPencil
								as = 'button'
								size = '18px'
								onClick = { () => this.setState({ editing: true }) }
							/> &&
							<BsTrash
								as = 'button'
								size = '18px'
								onClick = { () => this.setState({ deleteContact: true }) }
							/> }
						</Nav>
					</Col>
				</Container>
			</Navbar>
		);
	}

	noContacts() {
		return (
			<>You don't seem to have any contacts. Add some!</>
		);
	}

	renderContacts() {
		const { searching } = this.state;
		const { Contacts, search } = this.props;

		return (
			<Container>
				<Row>
					<Col sm = '3' className = 'scroll'>
						<ListGroup>
							{ (Contacts || searching) && Object.entries((searching && search) || Contacts).map(([ContactID, ContactInfo]) => {
								const { FirstName, LastName } = ContactInfo;

								return (
									<ListGroup.Item
										action
										key = { ContactID }
										onClick = { () => this.setState({ editing: false, contact: { ContactID, ...ContactInfo } }) }
									>
										{ FirstName } { LastName }
									</ListGroup.Item>
								);
							}) || this.noContacts() }
						</ListGroup>
					</Col>
					<Col>
						{ this.renderContactInfo() }
					</Col>
				</Row>
			</Container>
		);
	}

	notLoggedIn() {
		return (
			<>Oops, you don't seem to be logged in!</>
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
					{ this.notLoggedIn() }
				</>
			);
		}
	}
}

const mapDispatchToProps = { createContact, deleteContact, getContacts, updateContact, searchContact };
const mapStateToProps = ({ loggedIn, currentUser, search }) => {
	const { UserID, Contacts, ContactID } = currentUser;

	return { loggedIn, UserID, search, Contacts, ContactID };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactManager);