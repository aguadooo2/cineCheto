import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pelicula = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [purchasedTickets, setPurchasedTickets] = useState(JSON.parse(localStorage.getItem('purchasedTickets')) || []);

  useEffect(() => {
    const fetchMovieDetails = async () => {

      try {
        const apiKey = '406f4125e93f8a3f17416d072909fb0f';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const handleTicketQuantityChange = (event) => {
    setTicketQuantity(parseInt(event.target.value));
  };

  const buyTickets = () => {
    const newTicket = {
      movieId: id,
      seat: selectedSeat,
      row: selectedRow,
      quantity: ticketQuantity
    };
    const updatedPurchasedTickets = [...purchasedTickets, newTicket];
    setPurchasedTickets(updatedPurchasedTickets);
    localStorage.setItem('purchasedTickets', JSON.stringify(updatedPurchasedTickets)); // Guardar entradas compradas en localStorage
    setModalOpen(false);
  };


  const actors = movieDetails?.credits?.cast.slice(0, 5).map((actor) => actor.name).join(', ');
  const director = movieDetails?.credits?.crew.find((crew) => crew.job === 'Director')?.name;

  const releaseDate = movieDetails.release_date;
  const duration = movieDetails.runtime;
  const description = movieDetails.overview;

  let rating = "";
  for (let i = 0; i < Math.floor(movieDetails.vote_average); i++) {
    rating += "⭐";
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handleRowSelection = (row) => {
    setSelectedRow(row);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movieDetails.title}</h1>
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-1/3 rounded"
        />
        <div className="ml-8">
          <br />
          <p><b>Director:</b> {director}</p><br />
          <p><b>Actores:</b> {actors}</p><br />
          <p><b>Valoracion:</b> {rating}</p><br />
          <p><b>Fecha de estreno:</b> {releaseDate}</p><br />
          <p><b>Duracion:</b> {duration} minutos</p><br />
          <p><b>Descripcion:</b> {description}</p><br />
          <button onClick={openModal} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Comprar</button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Selecciona tu asiento, fila y cantidad de entradas</h2>
            <div>
              <label htmlFor="seat">Asiento: </label>
              <input className='bg-gray-100' type="number" id="seat" value={selectedSeat} onChange={(e) => handleSeatSelection(e.target.value)} />
            </div>
            <div>
              <label htmlFor="row">Fila: </label>
              <input className='bg-gray-100' type="number" id="row" value={selectedRow} onChange={(e) => handleRowSelection(e.target.value)} />
            </div>
            <div>
              <label htmlFor="ticketQuantity">Cantidad de entradas: </label>
              <input className='bg-gray-100' type="number" id="ticketQuantity" min="1" value={ticketQuantity} onChange={handleTicketQuantityChange} />
            </div>
            <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">Cerrar</button>
            <button onClick={buyTickets} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Comprar {ticketQuantity} entradas</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pelicula;
