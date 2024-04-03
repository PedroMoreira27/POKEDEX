import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../services/api';
import Navbar from '../../components/navbar';
import '../../styles/Home.css';
import '../../styles/Types.css';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de loading adicionado

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
        setLoading(false); // Altera o estado de loading para false quando o carregamento estiver concluído
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
    fetchPokemon();
  }, []);

  return (

    <div style={{ position: 'relative' }}>
      {loading && (
        <div className="loading-overlay">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}{' '}
      {/* Renderiza o loading quando loading for true */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
          opacity: loading ? 0.5 : 1, // Reduz a opacidade do conteúdo enquanto loading for true
          pointerEvents: loading ? 'none' : 'auto', // Desabilita cliques enquanto loading for true
        }}
      >
        {pokemonList.map((pokemon, index) => (
          <Link
            key={index}
            to={`/pokemons/${pokemon.name}`}
            className={`card-pkm ${pokemon.types[0].type.name}`}
          >
            <div>
              <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
              <p className='namePokemon'>{pokemon.name.toUpperCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
