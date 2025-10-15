import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Activity,
    Users,
    FileText,
    ClipboardList,
    LogOut,
    Stethoscope,
    User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo-kejaksaan.png';

const iconMap = {
    Activity,
    Users,
    FileText,
    ClipboardList,
    Stethoscope,
    User,
};

const Sidebar = ({ isOpen, onLogout }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    // Menu berdasarkan role
    const adminMenu = [
        { path: '/', label: 'Dashboard', icon: 'Activity' },
        { path: '/patients', label: 'Data Pasien', icon: 'Users' },
        { path: '/records', label: 'Rekam Medis', icon: 'FileText' },
        { path: '/poli-umum', label: 'Poli Umum', icon: 'ClipboardList' },
        { path: '/poli-gigi', label: 'Poli Gigi', icon: 'ClipboardList' },
    ];

    const patientMenu = [
        { path: '/', label: 'Dashboard', icon: 'Activity' },
        { path: '/my-records', label: 'Rekam Medis Saya', icon: 'FileText' },
    ];

    const menuItems = currentUser?.role === 'admin' ? adminMenu : patientMenu;

    return (
        <div className="w-72 gradient-bg-primary text-white h-screen overflow-y-auto rounded-tr-[58px] rounded-br-[58px]">
            <div className="p-6">
                {/* Logo */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Kejati Jambi</h1>
                            <p className="text-xs text-teal-300">Digital Health</p>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="mb-8 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
                            {currentUser?.role === 'admin' ? (
                                <Stethoscope className="w-6 h-6" />
                            ) : (
                                <User className="w-6 h-6" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold">{currentUser?.name}</p>
                            <p className="text-xs text-teal-300">
                                {currentUser?.role === 'admin' ? 'Dokter' : 'Pasien'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-white/20 shadow-lg'
                                        : 'hover:bg-white/10'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        if (window.confirm('Yakin ingin keluar?')) {
                            onLogout();
                            navigate('/login');
                        }
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all mt-8 border border-red-400/30"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Keluar</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
