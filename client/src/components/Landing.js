import React from 'react';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="text-center">
        <h1>iightBet</h1>
        Place your bets!!!!!
      </div>
      <div>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => history.push('/epl')}
        >
          EPL
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => history.push('/mlb')}
        >
          MLB
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => history.push('/nba')}
        >
          NBA
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => history.push('/nfl')}
        >
          NFL
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => history.push('/nhl')}
        >
          NHL
        </button>
      </div>
    </div>
  );
};

export default Landing;
