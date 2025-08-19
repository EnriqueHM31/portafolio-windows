import React, { useState } from 'react';
import { ContainerPage, GooglePage, BlocNotasPage, ConfiguracionPage } from './index';

const DemoPages: React.FC = () => {
    const [activePage, setActivePage] = useState<string | null>(null);

    const pages = [
        { id: 'google', name: 'Google', component: GooglePage },
        { id: 'bloc-notas', name: 'Bloc de Notas', component: BlocNotasPage },
        { id: 'configuracion', name: 'Configuración', component: ConfiguracionPage },
    ];

    const renderActivePage = () => {
        if (!activePage) return null;

        const page = pages.find(p => p.id === activePage);
        if (!page) return null;

        const PageComponent = page.component;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative">
                    <PageComponent />
                    <button
                        onClick={() => setActivePage(null)}
                        className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        ×
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Demostración de Páginas de Windows
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => setActivePage(page.id)}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-2xl text-blue-600">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{page.name}</h3>
                                <p className="text-gray-600 mb-4">
                                    Haz clic para abrir {page.name} en una ventana de Windows
                                </p>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                    Abrir {page.name}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Características del ContainerPage</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700">Botones de Control:</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <span className="font-mono">Minimizar</span> - Minimiza la ventana</li>
                                <li>• <span className="font-mono">Cambiar tamaño</span> - Cambia el tamaño de la ventana</li>
                                <li>• <span className="font-mono">Cerrar</span> - Cierra la ventana</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700">Estilo Windows 10:</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Barra de título azul con gradiente</li>
                                <li>• Sombras y bordes redondeados</li>
                                <li>• Iconos de react-icons</li>
                                <li>• Diseño responsive con Tailwind CSS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {renderActivePage()}
        </div>
    );
};

export default DemoPages;
