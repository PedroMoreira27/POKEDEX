import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/Home.css';
import '../../styles/Types.css';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
        setPokemonList(pokemons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
    fetchPokemon();
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div className="loading-overlay">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          style={{ display: loading ? 'none' : 'block', width: '40%', height: '5vh', borderRadius: '8px', border: 'none', padding: '0 10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset' }}
          type="text"
          placeholder="Digite o Nome do Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? 'none' : 'auto',
        }}
      >
        {filteredPokemonList.map((pokemon, index) => (
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
