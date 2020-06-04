import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import halfSun from '../data/HalfLogo.png';
import background from '../data/beach-landing.jpg';
import curtis from '../data/curtis.jpg';
import liderma from '../data/liderma.jpg';
import alex from '../data/alex.jpg';
import mason from '../data/nimu.png';
import dakota from '../data/dakota.jpg';
import idel from '../data/idel.jpg';

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
						<img src = { halfSun } width = '90%' alt = 'HalfSun' />
						<h2 className = 'text-dark'>SummerTime Contacts</h2>
						<h4 className = 'text-dark mx-n3'>The most revolutionary online contact manager</h4>
					</div>
				</div>
			</div>
		);
	}

	renderTeam() {
		const team = [
			{ name: 'John Curtis', img: curtis, role: 'Project Manager', link: 'https://github.com/JonathanMCurtis' },
			{ name: 'Liderma Guerry', img: liderma, role: 'Database', link: 'https://github.com/liderma' },
			{ name: 'Alex Varga', img: alex, role: 'API', link: 'https://github.com/VargaAlex' },
			{ name: 'Dakota', img: dakota, role: 'API', link: 'https://github.com/tuckerf42' },
			{ name: 'Mason', img: mason, role: 'Front-end', link: 'https://github.com/MasonBenell' },
			{ name: 'Idel Martinez', img: idel, role: 'Front-end', link: 'https://github.com/idelmr' }
		];

		return (
			<Container className = 'center'>
				<h1 className = 'text-light pt-4'>Team</h1>
				<Row xs = { 3 } sm = { 3 } md = { 6 }>
					{ team.map(({ name, img, role, link }, idx) => {
						return (
							<Col key = { idx } className = 'pt-3'>
								<Card className = 'bg-light center'>
									<Image className = 'my-3' width = '80%' alt = { name } src = { img } rounded />
									<a className = 'text-center' href = { link }>{ name }</a>
									<p className = 'text-dark text-center font-weight-bold'>{ role }</p>
								</Card>
							</Col>
						);
					}) }
				</Row>
			</Container>
		);
	}

	renderReviews() {
		const reviews = [
			{ quote: '"Best website of the decade"', company: 'Frobres' },
			{ quote: '"Surprisingly innovative design"', company: 'TMCZ' },
			{ quote: '"#1 website for managing contacts"', company: 'Angrye\'s List' },
			{ quote: '"Average Review:\n5 / 5 stars"', company: 'Chelp' }
		];

		return (
			<Container>
				<Row xs = { 2 } sm = { 2 } md = { 4 } className = 'py-4'>
					{ reviews.map(({ quote, company }, idx) => {
						return (
							<Col key = { idx } className = 'pt-3'>
								<Card className = 'p-3'>
									<h5>{ quote }</h5>
									<h6 className = 'ml-auto'>- { company }</h6>
								</Card>
							</Col>
						);
					}) }
				</Row>
				<Row className = 'center'>
					<p className = 'text-white text-center'>Copyright © 2020 contacts21.us. All Rights Reserved. SummerTime Contacts by Team 21</p>
				</Row>
			</Container>
		);
	}

	render() {
		return (
			<>
				{ this.renderHeading() }
				<div className = 'bottomColor'>
					{ this.renderTeam() }
					{ this.renderReviews() }
				</div>
			</>
		);
	}
}