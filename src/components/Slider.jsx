import React, { useState, useEffect, useRef } from 'react';
import Pelicula from '../pages/Pelicula';

const Slider = () => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '406f4125e93f8a3f17416d072909fb0f';
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Slider de Películas</h1>
      <div
        className="flex overflow-x-auto p-2 relative"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', overflowY: 'hidden' }}
        ref={sliderRef}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-60 h-auto mx-2 flex-none">
            <Link to="/Pelicula">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-60 h-auto rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                style={{ maxWidth: '100%' }}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-transparent to-white"></div>
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent to-white"></div>
      
      <Routes>
        <Route path='/Pelicula' element={<Pelicula />} />
      </Routes>
    </div>
  );
};

export default Slider;
