import React, { useEffect, useState } from 'react';
import './Home.css';
import RainbowText from 'react-rainbow-text';
import { Link } from 'react-router-dom';
import Song from '../../Data/SoundTrack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const Home = ({level, setLevel}) => {
  const [playSong, setPlaySong] = useState(false);

  useEffect(() => {
    if(!Song.paused) Song.pause();
  }, []);

  const changeLevel = () => {
    switch (level) {
      case 'easy':
        setLevel('normal');
        break;
      case 'normal':
        setLevel('hard');
        break;
      default:
        setLevel('easy');
    };
  };

  const returnPlayIcon = () => {
    return (
      <svg viewBox="0 0 40 40" className="Play" >
        <polygon points="0,0 40,0 40,20" />
        <polygon points="0,40 40,20 40,40 " />
      </svg>
    );
  };

  const onClickAudio = () => {
    if(Song.paused) Song.play(); 
    else Song.pause();
    setPlaySong(!playSong);
  }

  return (
    <div className="App">
      <div className='VolumeBox'>
          <FontAwesomeIcon onClick={() => onClickAudio()} icon={playSong ? faVolumeHigh : faVolumeMute} color='white'/>
      </div>
      <header>
        <div className="Header1">welcome to</div>
        <div className="Header2">
          <RainbowText lightness={0.5}>CABO LECO'S MEMORY GAME</RainbowText>
        </div>
      </header>

      <div className="Option" onClick={() => changeLevel()} >game level: {level}</div>
      <div className="Option">
        <Link to="/leaderboard" style={{ textDecoration: 'none', color: 'white' }}>leaderbord</Link>
      </div>
      <div className="Option">
        <Link to="/game" style={{ textDecoration: 'none', color: 'white' }}>
          play
          {returnPlayIcon()}
        </Link>
      </div>
    </div>
  );
};

export default Home;
