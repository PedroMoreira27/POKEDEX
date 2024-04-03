import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams
import api from '../../services/api';
import { Link } from 'react-router-dom';
// import '../../styles/Pokemons.css';

export default function Pokemons() {
  const { pokemonName } = useParams(); // Use o hook useParams para acessar o parâmetro pokemonName

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await api.get(`pokemon/${pokemonName}`);
        setPokemon(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    }
    fetchPokemonDetails();
  }, [pokemonName]); // Certifique-se de incluir pokemonName como uma dependência para que o efeito seja reexecutado quando o nome do Pokémon mudar

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
    <h2>{pokemon.name}</h2>
    <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
    <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
    <p>Height: {pokemon.height}</p>
    <p>Weight: {pokemon.weight}</p>
    <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    <Link to="/">Voltar para Home</Link>
  </div>
  );
  
}
