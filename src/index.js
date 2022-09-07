import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCjSzPX50lsfUBkHWw7QIv7iDbr1GDjnBU",
    authDomain: "cabo-leco-memory-game.firebaseapp.com",
    databaseURL: "https://cabo-leco-memory-game.firebaseio.com",
    projectId: "cabo-leco-memory-game",
    storageBucket: "cabo-leco-memory-game.appspot.com",
    messagingSenderId: "891535073352",
    appId: "1:891535073352:web:68b952434ea597a59e387d",
    measurementId: "G-Z68THSNWV1"
}
const app = firebase.initializeApp(config)
const database = app.database().ref().child('teste')
export default database


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

