import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Pelicula from './Pelicula';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || {}); // Obtener favoritos del localStorage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '406f4125e93f8a3f17416d072909fb0f';
        let url;

        if (searchTerm.trim()) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setMovies((prevMovies) =>
          searchTerm || !searchTerm.trim() ? data.results : [...prevMovies, ...data.results]
        );

        const initialFavorites = {};
        data.results.forEach(movie => {
          initialFavorites[movie.id] = favorites[movie.id] || false; // Preservar favoritos existentes
        });
        setFavorites(initialFavorites);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  const loadMoreMovies = () => {
    if (!searchTerm.trim()) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleFavorite = (movieId) => {
    const updatedFavorites = {
      ...favorites,
      [movieId]: !favorites[movieId]
    };
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Guardar favoritos en localStorage
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Lista de Películas</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar películas"
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap -mx-2 text-center">
        {movies.map((movie) => (
          <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="bg-gray-200 p-4 rounded transition-transform transform hover:scale-105">
              <Link to={`/Pelicula/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-sm">Año: {movie.release_date && movie.release_date.substring(0, 4)}</p>
              <span
                className="cursor-pointer text-2xl"
                onClick={() => toggleFavorite(movie.id)}
              >
                {favorites[movie.id] ? '★' : '☆'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-neutral-700 text-white p-2 rounded"
          onClick={loadMoreMovies}
        >
          Cargar más películas
        </button>
      </div>
      <Routes>
        <Route path='/Pelicula' element={<Pelicula/>}/> 
      </Routes>
    </div>
  );
};

export default MovieList;
