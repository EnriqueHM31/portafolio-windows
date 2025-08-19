import React from 'react';
import { IoClose, IoRemove, IoResize } from 'react-icons/io5';

interface ContainerPageProps {
    title: string;
    children: React.ReactNode;
    onClose?: () => void;
    onMinimize?: () => void;
    onResize?: () => void;
    className?: string;
}

const ContainerPage: React.FC<ContainerPageProps> = ({
    title,
    children,
    onClose,
    onMinimize,
    onResize,
    className = ''
}) => {
    return (
        <div className={`bg-black rounded-lg shadow-2xl border border-gray-200 overflow-hidden ${className}`}>
            {/* Barra de título de Windows */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
                    <span className="text-sm font-medium">{title}</span>
                </div>

                {/* Botones de control */}
                <div className="flex items-center space-x-1">
                    <button
                        onClick={onMinimize}
                        className="w-6 h-6 flex items-center justify-center hover:bg-blue-500 rounded transition-colors"
                        title="Minimizar"
                    >
                        <IoRemove className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onResize}
                        className="w-6 h-6 flex items-center justify-center hover:bg-blue-500 rounded transition-colors"
                        title="Cambiar tamaño"
                    >
                        <IoResize className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onClose}
                        className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded transition-colors"
                        title="Cerrar"
                    >
                        <IoClose className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Contenido de la página */}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default ContainerPage;
