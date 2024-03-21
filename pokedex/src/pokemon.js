import { createRoot } from 'react-dom/client'; // Update import statement
import Pokemon from './ui/components/Pokemon';
import React from 'react';

const root = createRoot(document.getElementById('pokemon')); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
    <Pokemon />
  </React.StrictMode>,
);
