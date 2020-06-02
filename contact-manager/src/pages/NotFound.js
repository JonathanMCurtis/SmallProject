import React, { Component } from 'react';
import Figure from 'react-bootstrap/Figure';
import contain from './../data/OopsKitty.gif';

export default class NotFound extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Figure.Image className = 'gifloc' width = '35%' src = { contain } alt = 'Contain' />
				<Figure.Caption className = 'gifcap' id = 'thanks'>Oops, you're not supposed to see this</Figure.Caption>
			</div>
		);
	}
}