import React, { Component } from 'react';
import { Carousel } from './';
import './styles.css';

export default class Home extends Component {
	renderCarousel() {
		return (
			<Carousel className = 'bg-primary slider center'>
				<Carousel.Item>
					<h1>First slide label</h1>
				</Carousel.Item>
				<Carousel.Item>
					<h1>Second slide label</h1>
				</Carousel.Item>
				<Carousel.Item>
					<h1>Third slide label</h1>
				</Carousel.Item>
			</Carousel>
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