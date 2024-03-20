import React, { useState, useEffect } from 'react';
import api from '../../data/services/api';
import Card from './card';
const loadAPI = async () => {
  setIsLoading(true);
  setError(null);

  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`(${response.status})`);
    }

    const res = await response.json();
    setPokemon(res);
  } catch (err) {
    console.error(err);
    setError('Erro ao importar dados. Tente novamente');
  } finally {
    setIsLoading(false);
  }

  return (
    <div className="Pokemon">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'auto',
          flexWrap: 'wrap',
        }}
      >
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            name={pokemon.name}
            image={pokemon.sprites?.front_default}
            description={
              pokemon.species.flavor_text_entries
                ? pokemon.species.flavor_text_entries[6].flavor_text
                : 'Sem Descrição'
            }
          />
        ))}
      </div>
    </div>
  );
};
