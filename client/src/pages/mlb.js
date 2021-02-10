import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const MlbPage = () => {
	const [mlbTeams, setMlbTeams] = useState('');
	const [mlbSchedule, setMlbSchedule] = useState('');

	const mlbTeamsUrl =
		'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4424';
	const mlbScheduleUrl =
		'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4424';

	useEffect(() => {
		const fetchMlbTeams = async () => {
			const result = await axios(mlbTeamsUrl);
			setMlbTeams(result.data);
		};
		fetchMlbTeams();
	}, []);

	console.log('mlbTeams: ', mlbTeams);

	useEffect(() => {
		const fetchMlbSchedule = async () => {
			const result = await axios(mlbScheduleUrl);
			setMlbSchedule(result.data);
		};
		fetchMlbSchedule();
	}, []);

	console.log('mlbSchedule: ', mlbSchedule);

	return (
		<div className="container">
			<h1>MLB Teams</h1>
			{/* <pre>{JSON.stringify(mlbTeams, null, 4)}</pre> */}
			<ul>
				{mlbTeams.teams &&
					mlbTeams.teams.map((item, index) => (
						<li key={index}>{item.strTeam}</li>
					))}
			</ul>
			<div>
				<h1>MLB Schedule</h1>
				<ul>
					{mlbSchedule.events &&
						mlbSchedule.events.map((item, index) => (
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

export default MlbPage;
