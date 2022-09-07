import React from 'react';
import './Card.css';

const Card = ({id,photo,name,flipCard}) => {
  
  return (
    <div className="Card" id={`card${id}`}>
      <div className="CardFlipBox" id={id} onClick={() => flipCard({id, name})}>
        
        <div className="FlipBoxFront">
          <h1>cmg</h1>
        </div>

        <div className="FlipBoxBack">
          <img srcSet={photo} alt="card"></img>
          <div>{name}</div>
        </div>

      </div>
    </div>

  );
}

export default Card;
