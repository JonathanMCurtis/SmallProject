import React, { Component, Figure } from 'react'; // added Figure for image
import halfsun from './../data/HalfLogo.png'; // top half of logo
import './styles.css';

export default class Home extends Component {
	renderCarousel() {
		return (
			<></>
		);
	}

	render() {
		return (
			<div>
				{ this.renderCarousel() }
			</div>
		);
	}
}