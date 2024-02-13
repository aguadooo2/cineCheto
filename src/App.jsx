import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieList from './pages/MovieList'
import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'
import {Routes, Route, Link, NavLink} from 'react-router-dom';
import Main from './pages/Main'
import Pelicula from './pages/Pelicula'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Header />

        <Routes>
          <Route path='/' element={<Main/>}/> 
          <Route path='/Pelicula/:id' element={<Pelicula/>}/> 
        </Routes>

        {/* <MovieList /> */}
        {/* <Slider /> */}

        <Footer />

    </div>

  )
}

export default App
