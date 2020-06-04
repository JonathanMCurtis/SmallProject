import React, { Component } from 'react';
import halfSun from '../data/HalfLogo.png';
import background from '../data/beach-landing.jpg';
import curtis from '../data/curtis.jpg';
import liderma from '../data/liderma.jpg';
import alex from '../data/alex.jpg';
import mason from '../data/mason.jpg';

import './styles.css';
import { Container, Col, Row, Image } from './';

export default class Home extends Component {
	renderHeading() {
		return (
			<div className = 'headingContainer'>
				<div className = 'imgContainer'>
					<img src = { background } width = '100%' alt = 'SummerTime Contacts' />
				</div>
				<div className = 'headerLayer'>
					<div className = 'header'>
						<img src = { halfSun } width = '90%' />
						<h1 className = 'text-dark'>SummerTime Contacts</h1>
						<h2 className = 'text-dark'>Most revolutionary online Contact Manager</h2>
					</div>
				</div>
			</div>
		);
	}

	renderTeam() {
		const team = [
			{ name: 'John Curtis', img: curtis, role: 'Project Manager', link: '' },
			{ name: 'Liderma Guerry', img: liderma, role: 'Database', link: '' },
			{ name: 'Alex Varga', img: alex, role: 'API', link: '' },
			{ name: 'Dakota', img: '', role: 'API', link: '' },
			{ name: 'Mason', img: mason, role: 'Front-end', link: '' },
			{ name: 'Idel Martinez', img: '', role: 'Front-end', link: '' }
		];

		return (
			<Container>
				<h1>Team</h1>
				<Row>
					{ team.map(({ name, img, role, link }) => {
						return (
							<Col className = 'center'>
								<Image width = '90%' src = { img } rounded />
								<div className = 'center text-info'>
									<a href = { link }>{ name }</a>
									<p>{ role }</p>
								</div>
							</Col>
						);
					}) }
				</Row>
			</Container>
		);
	}

	renderReviews() {
		return (
			<></>
		);
	}

	render() {
		return (
			<div>
				{ this.renderHeading() }
				{ this.renderTeam() }
				{ this.renderReviews() }
			</div>
		);
	}
}