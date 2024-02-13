import React from 'react'

import MovieList from '../pages/MovieList';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Main from '../pages/Main';
import Logo from '../../public/imagenes/favicon.png'
import Favoritas from '../pages/Favoritas';

const Header = () => {
    return (
        <div>
            <header class="bg-neutral-700 text-white">
                <nav class="mx-auto flex max-w-7xl items-center justify-between" >
                    <h1 className="text-2xl font-bold">
                        <Link to="/Main">
                            <span className="text-red-500 ml-6">T</span>
                            <span className="text-gray-300">E</span>
                            <span className="text-blue-500">A</span>

                            <span className="text-red-600">T</span>
                            <span className="text-gray-400">R</span>
                            <span className="text-blue-600">O</span>

                            <span> </span>

                            <span className="text-red-500">T</span>
                            <span className="text-gray-300">A</span>
                            <span className="text-blue-500">P</span>

                            <span className="text-red-600">A</span>
                            <span className="text-gray-400">C</span>
                            <span className="text-blue-600">O</span>
                        </Link>
                    </h1>
                    <div class="flex lg:flex-1">
                        <Link to="/Main">
                            <img class="h-20 ml-5" src={Logo} alt="" />
                        </Link>
                    </div>
                    <div class="flex lg:hidden">

                    </div>
                    <div class="hidden lg:flex lg:gap-x-8 ">

                        <a class="text-lg font-semibold leading-6 "><Link to="/Main">Inicio</Link></a>
                        <a class="text-lg font-semibold leading-6 "><Link to="/Peliculas">Películas</Link></a>
                        <a class="text-lg font-semibold leading-6 "><Link to="/Favoritas">Favoritas</Link></a>
                        <a class="text-lg font-semibold leading-6 "><Link to="/Main">TarjetaTT</Link></a>
                    </div>
                    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a class="text-lg font-semibold leading-6 mr-4"><Link to="/Main">👤 Iniciar Sesión </Link><span aria-hidden="true">&rarr;</span></a>
                    </div>        </nav>
                <div className="bg-neutral-100">
                    .
                </div>
            </header>

            <Routes>
                <Route path='/Main' element={<Main />} />
                <Route path='/Peliculas' element={<MovieList />} />
                <Route path='/Favoritas' element={<Favoritas />} />
            </Routes>
        </div>
    )
}

export default Header
