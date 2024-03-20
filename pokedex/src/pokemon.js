import React from 'react';
import pokemon from './ui/components/Pokemon';


const pokemon = ReactDOM.createRoot(document.getElementById('pokemon'));
pokemon.render(
  <React.StrictMode>
    <Pokemon />
  </React.StrictMode>
);