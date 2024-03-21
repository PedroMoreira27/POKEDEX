// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from './data/services/api';
import Card from './ui/components/card';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function getAllPokemons() {
      try {
        const response = await api.get('?limit=1000');
        const { results } = response.data;

        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await api.get(pokemon.url);
            return pokemonResponse.data;
          }),
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error('Erro ao obter dados dos Pokémon:', error);
      }
    }

    getAllPokemons();
  }, []);

  return (
    <div className="Home">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'auto',
          flexWrap: 'wrap',
        }}
      >
        {pokemons.map((pokemon, index) => (
          <Link key={index} to={`/pokemon/${pokemon.id}`}>
            {' '}
            <Card
              name={pokemon.name}
              image={pokemon.sprites?.front_default}
              description={
                pokemon.species.flavor_text_entries
                  ? pokemon.species.flavor_text_entries[6].flavor_text
                  : 'Sem Descrição'
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
