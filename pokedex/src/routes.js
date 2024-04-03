import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/';
import Pokemons from './Pages/Pokemons';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons/:pokemonName" element={<Pokemons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
