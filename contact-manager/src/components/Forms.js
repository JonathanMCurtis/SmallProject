import React from 'react';
import { Row, Col, Button } from '../pages';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BsSearch } from 'react-icons/bs';
import './styles.css';

const validateLogin = values => {
	const errors = {};

	if (!values.username)
		errors.username = 'Required';
	if (!values.password)
		errors.password = 'Required';

	return errors;
};

const validateSignUp = values => {
	const errors = {};

	if (!values.firstName)
		errors.firstName = 'Required';

	if (!values.username)
		errors.username = 'Required';
	else if (values.username.length < 3)
		errors.username = 'Must be at least 3 characters';
	else if (values.username.length > 20)
		errors.username = 'Must be less than 20 characters';
	else if (!/([A-z0-9_])*/.test(values.username))
		errors.username = 'Must only contain alphanumeric characters';

	if (!values.password)
		errors.password = 'Required';
	else if (values.password.length < 6)
		errors.password = 'Must be at least 6 characters';
	else if (values.password.length > 16)
		errors.password = 'Must be less than 16 characters';

	return errors;
};

const validateContact = values => {
	const errors = {};

	if (!values.firstName)
		errors.firstName = 'Required';

	if (!values.email && !values.phone) {
		errors.email = 'Email or phone required';
		errors.phone = 'Phone or email required';
	}

	if (values.email && !/^.+@[^\.].*\.[a-z]{2,}$/.test(values.email))
		errors.email = 'Enter valid email address';

	if (values.phone && !/^(\+?[0-9]?)([0-9]{3}-){2}[0-9]{4}$/.test(values.phone))
		errors.phone = 'Phone number format must be 000-111-2222';

	return errors;
};

const FormComponent = ({ errors, touched, fields, active = true, buttonTitle = 'Submit' }) => {
	return (
		<Form>
			{ fields.map((row, idx) => {
				return (
					<Row key = { idx } className = 'form-group'>
						{ row.map(({ sm, key, text, ...extra }) => {
							return (
								<Col key = { key } sm = { sm }>
									<label className = { (text && 'visible') || 'invisible' } htmlFor = { key }>
										{ text || 'Label' }
									</label>
									<Field
										className = { errors[key] && touched[key] ? 'text-input error' : 'text-input' }
										id = { key }
										name = { key }
										type = { extra.type || 'text' }
										readOnly = { !active }
										{ ...extra }
									/>
									<ErrorMessage render = { msg => <div className = 'error'>{ msg }</div> } name = { key } />
								</Col>
							);
						}) }
					</Row>
				);
			}) }
			{ active && <Button type = 'submit'>{ buttonTitle }</Button> }
		</Form>
	);
};

export const LoginForm = ({ onSubmit }) => {
	const history = useHistory();
	const fields = [
		[{ key: 'username', text: 'Username', placeholder: 'User' }],
		[{ key: 'password', text: 'Password', type: 'password', placeholder: 'Password' }]
	];

	return (
		<Formik
			initialValues = {{ username: '', password: '' }}
			validate = { validateLogin }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values).then(error => !error && setTimeout(() => history.push('/contacts'), 500));
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields }) }
		</Formik>
	);
};

export const SignUpForm = ({ onSubmit }) => {
	const history = useHistory();
	const fields = [
		[{ key: 'firstName', text: 'Name', placeholder: 'First Name', sm: '5' },
		 { key: 'lastName', placeholder: 'Last Name' }],
		[{ key: 'username', text: 'Username', placeholder: 'User' }],
		[{ key: 'password', text: 'Password', type: 'password', placeholder: 'Password' }]
	];

	return (
		<Formik
			initialValues = {{ firstName: '', lastName: '', username: '', password: '' }}
			validate = { validateSignUp }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values).then(error => !error && setTimeout(() => history.push('/contacts'), 500));
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields }) }
		</Formik>
	);
};

/**
 * @description Form for contact information.
 *
 * @param {Object}   initial      Initial value for contact fields
 * @param {Function} onSubmit     Callback function to execute when submitting form
 * @param {boolean}  active       Activate/Disable form based on editing
 * @param {String}   buttonTitle  Title for submit button
 */

export const ContactForm = ({ initial, onSubmit, active, buttonTitle }) => {
	const { FirstName, LastName, Email, Phone } = initial;
	const fields = [
		[{ key: 'firstName', text: 'Name', placeholder: 'First Name', sm: '5' },
		 { key: 'lastName', placeholder: 'Last Name' }],
		[{ key: 'email', text: 'Email', type: 'email', placeholder: 'example@domain.com' }],
		[{ key: 'phone', text: 'Phone Number', type: 'tel', placeholder: '123-456-7890' }]
	];

	return (
		<Formik
			initialValues = {{ firstName: FirstName, lastName: LastName, email: Email, phone: Phone }}
			enableReinitialize = { true }
			validate = { validateContact }
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			} }
		>
			{ ({ errors, touched }) => FormComponent({ errors, touched, fields, active, buttonTitle }) }
		</Formik>
	);
};

export const SearchForm = ({ onSubmit }) => {
	return (
		<Formik
			initialValues = {{ search: '' }}
			onSubmit = { (values, { setSubmitting }) => {
				onSubmit(values);
				setSubmitting(false);
			} }
		>
			{ ({ touched }) => (
				<Form>
					<Row>
						<Col lg = '10'>
							<Field
								className = { touched.search && 'text-input' }
								id = 'search'
								name = 'search'
								type = 'text'
								placeholder = 'Search Contacts'
							/>
						</Col>
						<Col className = 'align-self-center ml-n3'>
							<Button variant = 'link ml-n2' type = 'submit'><BsSearch size = '20' /></Button>
						</Col>
					</Row>
				</Form>

			) }
		</Formik>
	);
};