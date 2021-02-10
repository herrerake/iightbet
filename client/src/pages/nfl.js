import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const NflPage = () => {
	const [nflTeams, setNflTeams] = useState('');
	const [nflSchedule, setNflSchedule] = useState('');

	const nflTeamsUrl =
		'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4391';
	const nflScheduleUrl =
		'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4391';

	useEffect(() => {
		const fetchNflTeams = async () => {
			const result = await axios(nflTeamsUrl);
			setNflTeams(result.data);
		};
		fetchNflTeams();
	}, []);

	console.log('nflTeams: ', nflTeams);

	useEffect(() => {
		const fetchNflSchedule = async () => {
			const result = await axios(nflScheduleUrl);
			setNflSchedule(result.data);
		};
		fetchNflSchedule();
	}, []);

	console.log('nflSchedule: ', nflSchedule);

	return (
		<div className="container">
			<h1>NFL Teams</h1>
			{/* <pre>{JSON.stringify(nflTeams, null, 4)}</pre> */}
			<ul>
				{nflTeams.teams &&
					nflTeams.teams.map((item, index) => (
						<li key={index}>{item.strTeam}</li>
					))}
			</ul>
			<div>
				<h1>NFL Schedule</h1>
				<ul>
					{nflSchedule.events &&
						nflSchedule.events.map((item, index) => (
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

export default NflPage;
