import React, { useState } from 'react';
import ContainerPage from './ContainerPage';
import { IoSearch, IoMic, IoCamera } from 'react-icons/io5';

const GooglePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Aquí puedes implementar la lógica de búsqueda
            console.log('Buscando:', searchQuery);
        }
    };

    return (
        <ContainerPage
            title="Google Chrome"
            className="w-[800px] h-[600px] z-100"
            onClose={() => console.log('Cerrando Google')}
            onMinimize={() => console.log('Minimizando Google')}
            onResize={() => console.log('Cambiando tamaño de Google')}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
                {/* Logo de Google */}
                <div className="text-center">
                    <div className="text-6xl font-bold mb-4">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                    </div>
                </div>

                {/* Barra de búsqueda */}
                <form onSubmit={handleSearch} className="w-full max-w-2xl">
                    <div className="relative">
                        <div className="flex items-center w-full px-4 py-3 border border-gray-300 rounded-full hover:shadow-lg focus-within:shadow-lg focus-within:border-blue-500 transition-all">
                            <IoSearch className="text-gray-400 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar en Google o escribir una URL"
                                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                            />
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Búsqueda por voz"
                                >
                                    <IoMic className="text-blue-500 w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Búsqueda por imagen"
                                >
                                    <IoCamera className="text-blue-500 w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Botones de búsqueda */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleSearch({ preventDefault: () => { } } as React.FormEvent)}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                        Búsqueda de Google
                    </button>
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                        Me siento con suerte
                    </button>
                </div>

                {/* Enlaces adicionales */}
                <div className="text-center text-sm text-gray-600 space-y-2">
                    <p>Google ofrecido en: <a href="#" className="text-blue-600 hover:underline">English</a></p>
                    <div className="flex justify-center space-x-6 text-xs">
                        <a href="#" className="hover:underline">Acerca de</a>
                        <a href="#" className="hover:underline">Publicidad</a>
                        <a href="#" className="hover:underline">Negocios</a>
                        <a href="#" className="hover:underline">Cómo funciona la Búsqueda</a>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
};

export default GooglePage;
