import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const response = await api.get('pokemon?limit=2000&offset=0');
      setPokemon(response.data.results);
      console.log(pokemon)
    }
    getPokemon();
  }, []);

  return (
    <div>
      {pokemon.map((pokemon, index) => (
        <div key={index}>
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}
