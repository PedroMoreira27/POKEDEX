import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/card.css';

function Card({ name, image }) {
  return (
    <div className="card" style={{ margin: '3%' }}>
      <Link to={`/pokemon?name=${name}`}>
        <div className="card-details">
          <div className="card-image">
            <img src={image} alt={name} />
          </div>
          <p className="text-title">{name}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
