import React, { useState } from 'react';
import Home from './Screens/Home/Home.js';
import Game from './Screens/Game/Game.js';
import Leaderboard from './Screens/Leaderboard/Leaderboard.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [level, setLevel] = useState('easy');

  return (
    <div >
      <Router>
        <Switch>
          <Route exact path="/"><Home level={level} setLevel={(level) => setLevel(level)}/></Route>
          <Route path="/game"><Game gameTime={level === 'easy' ? 59 : level === 'normal' ? 49 : 39}/></Route>
          <Route path="/leaderboard"><Leaderboard /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
