import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const EplPage = () => {
	const [eplTeams, setEplTeams] = useState('');
	const [eplSchedule, setEplSchedule] = useState('');

	const eplTeamsUrl =
		'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328';
	const eplScheduleUrl =
		'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328';

	useEffect(() => {
		const fetchEplTeams = async () => {
			const result = await axios(eplTeamsUrl);
			setEplTeams(result.data);
		};
		fetchEplTeams();
	}, []);

	console.log('eplTeams: ', eplTeams);

	useEffect(() => {
		const fetchEplSchedule = async () => {
			const result = await axios(eplScheduleUrl);
			setEplSchedule(result.data);
		};
		fetchEplSchedule();
	}, []);

	console.log('eplSchedule: ', eplSchedule);

	return (
		<div className="container">
			<h1>English Premier League Teams</h1>
			{/* <pre>{JSON.stringify(eplTeams, null, 4)}</pre> */}
			<ul>
				{eplTeams.teams &&
					eplTeams.teams.map((item, index) => (
						<li key={index}>{item.strTeam}</li>
					))}
			</ul>
			<div>
				<h1>EPL Schedule</h1>
				<ul>
					{eplSchedule.events &&
						eplSchedule.events.map((item, index) => (
							<li key={index}>
								{item.strEventAlternate} on{' '}
								{format(
									new Date(item.dateEvent + ' ' + item.strTime + ' UTC'),
									'EEEE, MMMM d, yyyy'
								).toLocaleString()}{' '}
								at{' '}
								{format(
									new Date(item.dateEvent + ' ' + item.strTime + ' UTC'),
									'hh:mm a'
								).toLocaleString()}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default EplPage;
