import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import halfSun from '../data/HalfLogo.png';
import background from '../data/beach-landing.jpg';
import curtis from '../data/curtis.jpg';
import liderma from '../data/liderma.jpg';
import alex from '../data/alex.jpg';
import mason from '../data/nimu.png';
import dakota from '../data/dakota.jpg';

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
			{ name: 'Dakota', img: dakota, role: 'API', link: '' },
			{ name: 'Mason', img: mason, role: 'Front-end', link: '' },
			{ name: 'Idel Martinez', img: '', role: 'Front-end', link: '' }
		];

		return (
			<Container className = 'center'>
				<h1>Team</h1>
				<Row className = 'teamContainer'>
					{ team.map(({ name, img, role, link }) => {
						return (
							<Card className = 'cardSize'>
								<Col className = 'center teamFont'>
									<Image className = 'topSpace' width = '90%' src = { img } rounded />
									<div className = 'center cardPad'>
										<a className = 'nameSize' href = { link }>{ name }</a>
										<p className = 'black'>{ role }</p>
									</div>
								</Col>
							</Card>
						);
					}) }
				</Row>
			</Container>
		);
	}

	renderReviews() {
		return (
			<Container className = 'center'>
				<Row className = 'reviewContainer bottomSpace'>
					<Col>
						<Card className = 'cardBorder'>
							<Card.Body className = 'cardColor'>
								<Col>
									<Row>
										<h3>"Best website of the decade"</h3>
									</Row>
									<Row>
										<h5>- Not Forbes</h5>
									</Row>
								</Col>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className = 'cardBorder'>
							<Card.Body className = 'cardColor'>
								<Col>
									<Row>
										<h3>"Surprisingly innovative design"</h3>
									</Row>
									<Row>
										<h5>- Not TMZ</h5>
									</Row>
								</Col>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className = 'cardBorder'>
							<Card.Body className = 'cardColor'>
								<Col>
									<Row>
										<h3>"#1 website for managing contacts"</h3>
									</Row>
									<Row>
										<h5>- Not Angie's List</h5>
									</Row>
								</Col>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card className = 'cardBorder'>
							<Card.Body className = 'cardColor'>
								<Col>
									<Row>
										<h3>"Average Review: 5 / 5 stars"</h3>
									</Row>
									<Row>
										<h5>- Not Yelp</h5>
									</Row>
								</Col>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row>
					<p className = 'white'>Copyright © 2020 contacts21.us. All Rights Reserved. SummerTime Contacts by Team 21</p>
				</Row>
			</Container>
		);
	}

	render() {
		return (
			<div>
				{ this.renderHeading() }
				<div className = 'bottomColor'>
					<div>
						{ this.renderTeam() }
					</div>
					<div className = 'center'>
						<Card className = 'line'></Card>
					</div>
					<div>
						{ this.renderReviews() }
					</div>
				</div>
			</div>
		);
	}
}