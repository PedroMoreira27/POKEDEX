import React from 'react';
import '../styles/card.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons';

const element = <FontAwesomeIcon icon={byPrefixAndName.fas['house']} />;

ReactDOM.render(element, document.body);

function Card({ name, image, description }) {
  return (
    <div className="card">
      <div className="card-details">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>{' '}
        <p className="text-title">{name}</p>
      </div>
      <button className="card-button"><FontAwesomeIcon icon="fas fa-info-circle" />info</button>
    </div>
  );
}

export default Card;
