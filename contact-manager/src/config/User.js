// Fetch URLs
const Login = 'http://www.contacts21.us/php/Login.php';
const CreateUser = 'http://www.contacts21.us/php/CreateUser.php';
const GetContacts = 'http://www.contacts21.us/php/GetContacts.php';
const CreateContact = 'http://www.contacts21.us/php/CreateContact.php';
const DeleteContact = 'http://www.contacts21.us/php/DeleteContact.php';
const SearchContact = 'http://www.contacts21.us/php/SearchContacts.php';
const UpdateContact = 'http://www.contacts21.us/php/UpdateContact.php';

// Actions Types
const ACTIONS = {
	CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
	LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
	CREATE_USER_FAIL: 'CREATE_USER_FAIL',
	LOAD_USER_FAIL: 'LOAD_USER_FAIL',
	LOG_OUT_USER: 'LOG_OUT_USER',
	CREATE_CONTACT: 'CREATE_CONTACT',
	GET_CONTACTS_SUCCESS: 'GET_CONTACTS_SUCCESS',
	GET_CONTACTS_FAIL: 'GET_CONTACTS_FAIL',
	UPDATE_CONTACT: 'UPDATE_CONTACT',
	DELETE_CONTACT: 'DELETE_CONTACT',
	SEARCH_CONTACT: 'SEARCH_CONTACT'
};

const initialState = {
	currentUser: {
		User: '',
		FirstName: '',
		LastName: '',
		UserID: '',
		Contacts: {},
		Error: '',
		ErrorID: ''
	},
	search: {},
	loggedIn: false
};

export default (state = initialState, action) => {
	const { type, data } = action;
	const { currentUser } = state;

	switch (type) {
		case ACTIONS.CREATE_USER_SUCCESS:
		case ACTIONS.LOAD_USER_SUCCESS:
			return { loggedIn: true, currentUser: data };
		case ACTIONS.CREATE_USER_FAIL:
		case ACTIONS.LOAD_USER_FAIL:
			return { currentUser: data };
		case ACTIONS.LOG_OUT_USER:
			return { ...initialState };
		case ACTIONS.CREATE_CONTACT:
		case ACTIONS.GET_CONTACTS_FAIL:
		case ACTIONS.UPDATE_CONTACT:
		case ACTIONS.DELETE_CONTACT:
			return { ...state, currentUser: { ...currentUser, ...data } };
		case ACTIONS.GET_CONTACTS_SUCCESS:
			return { ...state, currentUser: { ...currentUser, Contacts: data } };
		case ACTIONS.SEARCH_CONTACT:
			return { ...state, search: data };
		default:
			return state;
	}
};

const fetchPOST = body => {
	return ({
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
};

/**
 * @description Creates new user given the input object on the form fields.
 *
 * @throws Error 409 if Username is duplicated.
 *
 * @param {Object} user  User Fields
 * @param {String} user.User
 * @param {String} user.Password
 * @param {String} user.FirstName
 * @param {String} user.LastName
 */

export const createUser = user => {
	return dispatch => {
		return fetch(CreateUser, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.ErrorID)
					dispatch({ type: 'CREATE_USER_SUCCESS', data });
				else
					dispatch({ type: 'CREATE_USER_FAIL', data });
			});
	};
};

/**
 * @description Logs in user given the login form fields.
 *
 * @throws Error 401 if login info is incorrect.
 *
 * @param {Object} user  User fields
 * @param {String} user.User
 * @param {String} user.Password
 */

export const loginUser = user => {
	return dispatch => {
		return fetch(Login, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.ErrorID)
					dispatch({ type: 'LOAD_USER_SUCCESS', data });
				else
					dispatch({ type: 'LOAD_USER_FAIL', data });
			});
	};
};

/**
 * @description Logs out user.
 */

export const logoutUser = () => {
	return dispatch => {
		return dispatch({ type: 'LOG_OUT_USER' });
	};
};

/**
 * @description Creates a new contact given the contact form fields.
 *
 * @throws Error 503 if unsuccessful (Connection error).
 *
 * @param {Object} contact  Contact fields
 * @param {String} contact.FirstName
 * @param {String} contact.LastName
 * @param {String} contact.Email
 * @param {String} contact.Phone
 * @param {String} contact.UserID
 */

export const createContact = contact => {
	return dispatch => {
		return fetch(CreateContact, fetchPOST(contact))
			.then(response => response.json())
			.then(data => dispatch({ type: 'CREATE_CONTACT', data }));
	};
};

/**
 * @description Get all contacts for a given user.
 *
 * @throws Error 204 if there are no contacts.
 *
 * @param {Object} user  Current active user
 * @param {String} user.UserID
 */

export const getContacts = user => {
	return dispatch => {
		return fetch(GetContacts, fetchPOST(user))
			.then(response => response.json())
			.then(data => {
				if (!data.ErrorID)
					dispatch({ type: 'GET_CONTACTS_SUCCESS', data });
				else
					dispatch({ type: 'GET_CONTACTS_FAIL', data });
			});
	};
};

/**
 * @description Updates a given contact on the server.
 *
 * @throws Error 204 if contact wasn't found.
 *
 * @param {Object} contact  New contact form fields
 * @param {String} contact.ContactID
 * @param {String} contact.UserID
 * @param {String} contact.FirstName
 * @param {String} contact.LastName
 * @param {String} contact.Email
 * @param {String} contact.Phone
 */

export const updateContact = contact => {
	return dispatch => {
		return fetch(UpdateContact, fetchPOST(contact))
			.then(response => response.json())
			.then(data => dispatch({ type: 'UPDATE_CONTACT', data }));
	};
};

/**
 * @description Deletes a contact from the server.
 *
 * @throws Error 204 if contact wasn't found.
 *
 * @param {Object} contact  Contact information to delete
 * @param {String} contact.ContactID
 * @param {String} contact.UserID
 */

export const deleteContact = contact => {
	return dispatch => {
		return fetch(DeleteContact, fetchPOST(contact))
			.then(response => response.json())
			.then(data => { console.log('Delete contact', data); dispatch({ type: 'DELETE_CONTACT', data }) }) 
			.catch(error => console.error('FUCK', error));
	};
};

/**
 * @description Searches constant given the text field for search.
 *
 * @throws Error 204 if no results were found.
 *
 * @param {Object} contact  Search query in field
 * @param {String} contact.UserID
 * @param {String} contact.Search
 */

export const searchContact = contact => {
	return dispatch => {
		return fetch(SearchContact, fetchPOST(contact))
			.then(response => response.json())
			.then(data => dispatch({ type: 'SEARCH_CONTACT', data }));
	};
};