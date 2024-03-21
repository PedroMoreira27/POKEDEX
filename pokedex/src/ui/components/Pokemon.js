import React, { useState, useEffect } from 'react';
import Card from './card';
import { Link } from 'react-router-dom';

function Pokemon() {
  const [parametro, setParametro] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nomePokemon = urlParams.get('name');

    if (nomePokemon) {
      setParametro(nomePokemon); // Define o nome do Pokémon como o parâmetro da URL
    }
  }, []);

  useEffect(() => {
    const loadAPI = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = `https://pokeapi.co/api/v2/pokemon/${parametro}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro ao carregar dados (${response.status})`);
        }

        const res = await response.json();
        setPokemon(res);
      } catch (err) {
        console.error(err);
        setError('Erro ao importar dados. Tente novamente');
      } finally {
        setIsLoading(false);
      }
    };

    if (parametro) {
      loadAPI();
    }
  }, [parametro]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setParametro(event.target.elements.pokemonName.value);
  };

  return (
    <div className="Pokemon">
      <Link to="/">
        <button>Voltar</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Pokémon:
          <input type="text" name="pokemonName" />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {isLoading && <div>Carregando...</div>}
      {error && <div>{error}</div>}
      {pokemon && (
        <Card
          name={pokemon.name}
          image={pokemon.sprites?.front_default}
          description={
            pokemon.species.flavor_text_entries
              ? pokemon.species.flavor_text_entries[6].flavor_text
              : 'Sem Descrição'
          }
        />
      )}
    </div>
  );
}

export default Pokemon;
