import React, { useEffect, useState } from 'react';
import './Game.css';
import Card from '../../Components/Card/Card.js';
import AllCards from '../../Data/Cards';
import { win, lose } from '../../Data/Resources';
import database from '../../index';

var cardMatches = 0;
var gameTimeLeft = 0;
const Game = ({ gameTime }) => {
  const [flipedCard, setFlipedCard] = useState({ id: 0, name: null });
  const [result, setResult] = useState(0);
  const [gameTotalTime, setGameTotalTime] = useState(0);
  const [record, setRecord] = useState(null);
  const [newRecord, setNewRecord] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    gameTimeLeft = gameTime;
    database.child('record').once("value").then(data => {
      if (data.val() !== null) setRecord(data.val());
    });

    shuffleCards();
    setInterval(() => count(), 1000);
  }, []);

  const shuffleCards = () => {
    for (let i = AllCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [AllCards[i], AllCards[j]] = [AllCards[j], AllCards[i]];
    };

    setCards(AllCards);
  };

  const count = () => {
    gameTimeLeft--;
    if (gameTimeLeft === 0) setResult(-1);
  };

  const restartGame = () => {
    shuffleCards();
    setResult(0);
    setGameTotalTime(null);
    setNewRecord(null)
    setFlipedCard({ id: 0, name: null })
    gameTimeLeft = gameTime;
    cardMatches = 0;
  };

  const flipCard = (card) => {
    var cardToFlip = document.getElementById(card.id);
    cardToFlip.style.transform = 'rotateY(180deg)';

    //if there is no card fliped just flip the card and add it to state
    if (flipedCard.id === 0) setFlipedCard(card);

    //if there is a card already fliped check if cards match and then unflip boath cards(after 1 second to improve game experience)
    else {
      if (flipedCard.name === card.name) cardMatches++;
      setFlipedCard({ id: 0, name: null });
      setTimeout(() => unflipCards(card), 1000);

      //8 cardMatchs = allCards matched, if so game ends and user wins
      if (cardMatches === 8) {
        var totalTime = gameTime - gameTimeLeft;
        setGameTotalTime(totalTime);
        setResult(1);
        if (totalTime < record?.time) setNewRecord({ name: newRecord?.name, time: totalTime });
      };
    }

  };

  const unflipCards = (card) => {
    var firstFlipedCard = document.getElementById(flipedCard.id);
    var secondFlipedCard = document.getElementById(card.id);

    //if cards match, exclude then from DOM(and keep the container so the blank space persists )
    if (flipedCard.name === card.name) {
      var firstFlipedContainer = document.getElementById(`card${flipedCard.id}`);
      var secondFlipedCardContainer = document.getElementById(`card${card.id}`);

      //its necessary to check if container exists due to timeout implementation(without timeout flip effect is not as cool) 
      if (firstFlipedContainer && secondFlipedCardContainer) {
        firstFlipedContainer.removeChild(firstFlipedCard);
        secondFlipedCardContainer.removeChild(secondFlipedCard);
      }
    }

    //else just unflip then
    else {
      firstFlipedCard.style.transform = 'rotateY(0deg)';
      secondFlipedCard.style.transform = 'rotateY(0deg)';
    };

  };

  const saveNewRecord = () => {
    database.child('record').set(newRecord);
    window.alert('sucessfully saved');
  };

  return (
    <div >
      {result === 1 ?
        <div className="Game">
          <div className="Resultado">
            <div className="win">YOU WIN</div>
            <img srcSet={win} alt="win"></img>
            <div> record : {record?.time}s {record?.name}</div>
            <div>seu tempo : {gameTotalTime}s </div>
            <div className="Option" onClick={() => restartGame()}>play again</div>
            <a href="/" className="Option">home</a>
            {newRecord !== null ?
              <div className="Record">
                CONGRATULATIONS!!! you just broke Cabo Leco's memory game world record.
                enter your name and press save to save to leaderboard :
                <input type='text' style={{ width: 300 }} onChange={(e) => setNewRecord({ time: newRecord.time, name: e.target.value })}></input> <button style={{ width: 50, marginTop: 10 }} onClick={() => saveNewRecord()}>save</button>
              </div>
              : null
            }
          </div>
        </div>
        :
        result === -1 ?
          <div className="Game">
            <div className="Resultado">
              <div className="lose">YOU LOSE</div>
              <img srcSet={lose} alt="lose"></img>
              <div className="Option" onClick={() => restartGame()}>play again</div>
              <a href="/" className="Option">home</a>
            </div>
          </div>
          :
          <div className="Game">
            <div className="Time" style={{ animation: `Regressiva ${gameTime}s` }}>time :</div>
            <div className="Cards">
              {cards.map((carta, index) => < Card key={index} id={index + 1} photo={carta.photo} name={carta.name} flipCard={(id, name) => flipCard(id, name)} />)}
            </div>
          </div>
      }
    </div>
  );
};

export default Game;
