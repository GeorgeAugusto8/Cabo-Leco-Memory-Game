import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import database from '../../index';

const Leaderboard = () => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    database.child('record').once("value").then(data => {
      if (data.val() !== null) setRecord(data.val());
    });
  }, []);

  return (
    <div className="App">
      <h1>CABO LECOS'S MEMORY GAME WORLD RECORD : {record?.time ? record.time : 59}s</h1>
      <h1 className='Name' >{record?.name ? record.name : 'No record yet'}</h1>
      <a href="/" className="Home" >home</a>
    </div>
  );
}

export default Leaderboard;
