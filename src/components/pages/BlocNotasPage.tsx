import React, { useState } from 'react';
import { IoDocument, IoFolder, IoHelp, IoSearch } from 'react-icons/io5';
import ContainerPage from './ContainerPage';

const BlocNotasPage: React.FC = () => {
    const [text, setText] = useState('Bienvenido al Bloc de notas\n\nEste es un editor de texto simple con el estilo clásico de Windows.\n\nPuedes escribir aquí tu contenido...');
    const [fileName, setFileName] = useState('Sin título');

    const handleNewFile = () => {
        setText('');
        setFileName('Sin título');
    };

    const handleSave = () => {
        // Aquí puedes implementar la lógica de guardado
        console.log('Guardando archivo:', fileName);
    };

    return (
        <ContainerPage
            title={`${fileName} - Bloc de notas`}
            className="w-[700px] h-[500px] z-100"
            onClose={() => console.log('Cerrando Bloc de notas')}
            onMinimize={() => console.log('Minimizando Bloc de notas')}
            onResize={() => console.log('Cambiando tamaño del Bloc de notas')}
        >
            <div className="flex flex-col h-full">
                {/* Barra de menú */}
                <div className="bg-gray-100 border-b border-gray-300">
                    <div className="flex items-center px-2 py-1 space-x-1">
                        <button className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded transition-colors">
                            Archivo
                        </button>
                        <button className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded transition-colors">
                            Editar
                        </button>
                        <button className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded transition-colors">
                            Formato
                        </button>
                        <button className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded transition-colors">
                            Ver
                        </button>
                        <button className="px-3 py-1 text-sm hover:bg-blue-500 hover:text-white rounded transition-colors">
                            Ayuda
                        </button>
                    </div>
                </div>

                {/* Barra de herramientas */}
                <div className="bg-gray-50 border-b border-gray-300 px-2 py-1">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleNewFile}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title="Nuevo"
                        >
                            <IoDocument className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title="Guardar"
                        >
                            <IoFolder className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Buscar">
                            <IoSearch className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded transition-colors" title="Ayuda">
                            <IoHelp className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Área de texto */}
                <div className="flex-1 bg-white">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-full p-4 resize-none outline-none font-mono text-sm text-gray-800 leading-relaxed"
                        placeholder="Escribe aquí tu texto..."
                    />
                </div>

                {/* Barra de estado */}
                <div className="bg-gray-100 border-t border-gray-300 px-3 py-1 text-xs text-gray-600">
                    <span>Listo</span>
                    <span className="float-right">Línea 1, Columna 1</span>
                </div>
            </div>
        </ContainerPage>
    );
};

export default BlocNotasPage;
