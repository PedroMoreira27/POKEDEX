import React from 'react'; // Don't forget to import React

import '../styles/card.css';

function Card({ name, image, description }) {
  return (
    <div className="card">
      <div className="card-details">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>{' '}
        <p className="text-title">{name}</p>
        <p className="text-body">{description}</p>
      </div>
      <button className="card-button">More info</button>
    </div>
  );
}

export default Card;
