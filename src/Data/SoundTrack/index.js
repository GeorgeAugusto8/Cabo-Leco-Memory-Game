import theme from './themesong.mp3';

const Song = new Audio(theme);
Song.loop = true;
Song.volume = 0.1;

export default Song;