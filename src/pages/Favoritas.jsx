import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favoritas = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites'));
        const favoriteIds = Object.keys(favoritesFromStorage).filter(id => favoritesFromStorage[id]);

        const fetchFavoriteMovies = async () => {
            try {
                const apiKey = '406f4125e93f8a3f17416d072909fb0f';
                const promises = favoriteIds.map(id => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`));
                const responses = await Promise.all(promises);
                const data = await Promise.all(responses.map(response => response.json()));
                setFavoriteMovies(data);
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
            }
        };

        fetchFavoriteMovies();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Películas Favoritas</h1>
            <div className="flex flex-wrap -mx-2">
                {favoriteMovies.map(movie => (
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favoritas;
