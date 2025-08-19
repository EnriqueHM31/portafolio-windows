import React, { useState } from 'react';
import ContainerPage from './ContainerPage';
import {
    IoHome,
    IoPerson,
    IoPhonePortrait,
    IoDesktop,
    IoShield,
    IoColorPalette,
    IoNotifications,
    IoWifi,
    IoBattery,
    IoVolumeHigh
} from 'react-icons/io5';

const ConfiguracionPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('sistema');

    const menuItems = [
        { id: 'sistema', label: 'Sistema', icon: IoDesktop },
        { id: 'dispositivos', label: 'Dispositivos', icon: IoPhonePortrait },
        { id: 'telefono', label: 'Teléfono', icon: IoPhonePortrait },
        { id: 'red', label: 'Red e Internet', icon: IoWifi },
        { id: 'personalizacion', label: 'Personalización', icon: IoColorPalette },
        { id: 'aplicaciones', label: 'Aplicaciones', icon: IoHome },
        { id: 'cuentas', label: 'Cuentas', icon: IoPerson },
        { id: 'hora', label: 'Hora e idioma', icon: IoHome },
        { id: 'juegos', label: 'Juegos', icon: IoHome },
        { id: 'privacy', label: 'Privacidad y seguridad', icon: IoShield },
        { id: 'actualizacion', label: 'Actualización y seguridad', icon: IoShield },
    ];

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'sistema':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Sistema</h2>

                        <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Pantalla</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Resolución de pantalla</span>
                                        <select className="px-3 py-1 border border-gray-300 rounded">
                                            <option>1920 x 1080</option>
                                            <option>1366 x 768</option>
                                            <option>2560 x 1440</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Escala y diseño</span>
                                        <select className="px-3 py-1 border border-gray-300 rounded">
                                            <option>125%</option>
                                            <option>100%</option>
                                            <option>150%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Notificaciones y acciones</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-gray-600">Mostrar notificaciones</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-gray-600">Mostrar recordatorios</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'personalizacion':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Personalización</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Colores</h3>
                                <div className="grid grid-cols-6 gap-2">
                                    {['#0078d4', '#107c10', '#d83b01', '#e81123', '#b4009e', '#5c2d91'].map((color) => (
                                        <button
                                            key={color}
                                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Fondo</h3>
                                <div className="space-y-2">
                                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Elegir imagen
                                    </button>
                                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                                        Elegir color sólido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'red':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Red e Internet</h2>

                        <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <IoWifi className="w-6 h-6 text-blue-500" />
                                        <div>
                                            <h3 className="font-medium text-gray-700">Wi-Fi</h3>
                                            <p className="text-sm text-gray-500">Conectado</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Propiedades
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Configuración avanzada</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                                        Configuración del adaptador
                                    </button>
                                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                                        Solucionador de problemas
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                            <IoHome className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">Selecciona una categoría para comenzar</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <ContainerPage
            title="Configuración"
            className="w-[900px] h-[700px]"
            onClose={() => console.log('Cerrando Configuración')}
            onMinimize={() => console.log('Minimizando Configuración')}
            onResize={() => console.log('Cambiando tamaño de Configuración')}
        >
            <div className="flex h-full">
                {/* Navegación lateral */}
                <div className="w-64 bg-gray-50 border-r border-gray-200">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuración</h2>
                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left transition-colors ${activeSection === item.id
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {renderSectionContent()}
                </div>
            </div>
        </ContainerPage>
    );
};

export default ConfiguracionPage;
