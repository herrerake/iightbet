import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const NhlPage = () => {
	const [nhlTeams, setNhlTeams] = useState('');
	const [nhlSchedule, setNhlSchedule] = useState('');

	const nhlTeamsUrl =
		'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4380';
	const nhlScheduleUrl =
		'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4380';

	useEffect(() => {
		const fetchNhlTeams = async () => {
			const result = await axios(nhlTeamsUrl);
			setNhlTeams(result.data);
		};
		fetchNhlTeams();
	}, []);

	console.log('nhlTeams: ', nhlTeams);

	useEffect(() => {
		const fetchNhlSchedule = async () => {
			const result = await axios(nhlScheduleUrl);
			setNhlSchedule(result.data);
		};
		fetchNhlSchedule();
	}, []);

	console.log('nhlSchedule: ', nhlSchedule);

	return (
		<div className="container">
			<h1>NHL Teams</h1>
			{/* <pre>{JSON.stringify(nhlTeams, null, 4)}</pre> */}
			<ul>
				{nhlTeams.teams &&
					nhlTeams.teams.map((item, index) => (
						<li key={index}>{item.strTeam}</li>
					))}
			</ul>
			<div>
				<h1>NHL Schedule</h1>
				<ul>
					{nhlSchedule.events &&
						nhlSchedule.events.map((item, index) => (
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

export default NhlPage;
