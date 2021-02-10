import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const NbaPage = () => {
	const [nbaTeams, setNbaTeams] = useState('');
	const [nbaSchedule, setNbaSchedule] = useState('');

	const nbaTeamsUrl =
		'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387';
	const nbaScheduleUrl =
		'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4387';

	useEffect(() => {
		const fetchNbaTeams = async () => {
			const result = await axios(nbaTeamsUrl);
			setNbaTeams(result.data);
		};
		fetchNbaTeams();
	}, []);

	console.log('nbaTeams: ', nbaTeams);

	useEffect(() => {
		const fetchNbaSchedule = async () => {
			const result = await axios(nbaScheduleUrl);
			setNbaSchedule(result.data);
		};
		fetchNbaSchedule();
	}, []);

	console.log('nbaSchedule: ', nbaSchedule);

	return (
		<div className="container">
			<h1>NBA Teams</h1>
			{/* <pre>{JSON.stringify(nbaTeams, null, 4)}</pre> */}
			<ul>
				{nbaTeams.teams &&
					nbaTeams.teams.map((item, index) => (
						<li key={index}>{item.strTeam}</li>
					))}
			</ul>
			<div>
				<h1>NBA Schedule</h1>
				<ul>
					{nbaSchedule.events &&
						nbaSchedule.events.map((item, index) => (
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

export default NbaPage;
