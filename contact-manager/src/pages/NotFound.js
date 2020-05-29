import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Nothing to see here</h1>
			</div>
		);
	}
}