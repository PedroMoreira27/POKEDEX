import React from 'react';
import '../styles/card.css';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons';

// const element = <FontAwesomeIcon icon={byPrefixAndName.fas['house']} />;

// ReactDOM.render(element, document.body);

function Card({ name, image }) {
  return (
    <div className="card" style={{ margin: '3%' }}>
      <a href={`/pokemon/${name}`}>
        <div className="card-details">
          <div className="card-image">
            <img src={image} alt={name} />
          </div>
          <p className="text-title">{name}</p>
        </div>
      </a>
      <Link to={`/pokemon/${name}`} className="card-button">
        DETALHES
      </Link>
    </div>
  );
}

export default Card;
