import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Navbar from '../../components/navbar';
import '../../styles/Home.css';
import '../../styles/Types.css';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await api.get('pokemon?limit=2000&offset=0');
        const results = response.data.results;
        const pokemons = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await api.get(pokemon.url);
            return pokemonResponse.data;
          }),
        );
        console.log(pokemons);
        setPokemonList(pokemons);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
    fetchPokemon();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {pokemonList.map((pokemon, index) => (
          <div key={index} className={`card-pkm ${pokemon.types[0].type.name}`}>
            <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
