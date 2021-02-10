import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import EplPage from '../pages/epl';
import MlbPage from '../pages/mlb';
import NbaPage from '../pages/nba';
import NflPage from '../pages/nfl';
import NhlPage from '../pages/nhl';

const Dashboard = () => <h2>Dashboard</h2>;
const NewBet = () => <h2>New Bet</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route path="/bets/new" component={NewBet} />
						<Route exact path="/epl" component={EplPage} />
						<Route exact path="/mlb" component={MlbPage} />
						<Route exact path="/nba" component={NbaPage} />
						<Route exact path="/nfl" component={NflPage} />
						<Route exact path="/nhl" component={NhlPage} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
