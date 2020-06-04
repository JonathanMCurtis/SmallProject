import React, { Component } from 'react';
import Figure from 'react-bootstrap/Figure';
import contain from './../data/OopsKitty.gif';

export default class NotFound extends Component {
	render() {
		return (
			<div className = 'header center'>
				<Figure.Image width = '55%' src = { contain } alt = 'Contain' />
				<Figure.Caption>Oops, you're not supposed to be seeing this</Figure.Caption>
			</div>
		);
	}
}