import React, { useState, useEffect } from 'react';
import Estrenos from '../../public/imagenes/estreno.png'
import Ofertas from '../../public/imagenes/oferta.png'
import Combo from '../../public/imagenes/combo.png'
import Teatro from '../../public/imagenes/teatro.jpg'
import Pelicula from './Pelicula';


const Main = () => {
  const [movies, setMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScroll = (scrollEvent) => {
    setScrollPosition(scrollEvent.target.scrollLeft);
  };

  return (
    <div>
      <div className="container mx-auto p-4 relative">
        <h1 className="text-4xl font-bold mb-8 ml-5">Películas más vistas</h1>
        <div
          className="flex overflow-x-auto p-2 relative"
          onScroll={handleScroll}
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {movies.map((movie) => (
            <div key={movie.id} className="w-60 h-auto mx-2 flex-none">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-56 h-auto rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                  style={{ maxWidth: '100%' }}
                />
            </div>
          ))}
        </div>

        <div
          className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-transparent to-white"
          style={{ pointerEvents: 'none', zIndex: 10 }}
        ></div>
        <div
          className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent to-white"
          style={{ pointerEvents: 'none', zIndex: 10 }}
        ></div>

        {/* ofertas */}
        <br /><br /><br /><br />
        <h1 class="text-4xl font-bold mb-8 ml-5">Las Mejores Ofertas</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-2">Noche de Estrenos</h2>
            <p class="text-gray-700">Disfruta de los últimos estrenos por solo 6.50€</p>
            <img src={Estrenos} alt="" className=" h-auto ml-8" />
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-2">Día del Espectador</h2>
            <p class="text-gray-700">Los miércoles, todas las películas a 4.50€.</p>
            <img src={Ofertas} alt="" className=" h-auto ml-8" />
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-2">Combo Familiar</h2>
            <p class="text-gray-700">Compra 4 entradas y recibe un combo duo gratis.</p>
            <img src={Combo} alt="" className="w-40 h-auto ml-20" />
          </div>

        </div>
        <br /><br />
        <h1 class="text-4xl font-bold mb-8 ml-5">Nuestra Historia</h1>
        <div class="flex">
          <img src={Teatro} alt="" className="w-80 h-auto ml-5" />
          <div class="flex ml-14 mt-10 text-xl">
            <p >
              El teatro <b> Tapaco</b>, también conocido como cine Tapaco o cine Pathè, es un teatro de Córdoba.
              Fue construido como cine entre los años 1929 y 1932, diseñado por el arquitecto madrileño
              Luis Gutiérrez Soto.
              <br /><br />
              El Cine Pathè, actual Teatro Tapaco, fue construido entre los años 1930 y
              1932 según el diseño del arquitecto madrileño Luis Gutiérrez Soto. Situado
              en la calle Jesús y María de la ciudad de Córdoba, y siendo propiedad del
              Excmo. Sr. Don Miguel Fresneda, ocupa una superficie de 1052,12 m², destinado
              al cinematógrafo con una cabida de 1000 espectadores.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Main
