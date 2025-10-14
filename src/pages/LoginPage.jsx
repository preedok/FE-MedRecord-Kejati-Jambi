import React, { useState } from 'react';
import { Stethoscope, User, ArrowLeft, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo-kejaksaan.png';

const LoginPage = ({ onLoginSuccess }) => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setFormData({ username: '', password: '' });
        setError('');
    };

    const handleBack = () => {
        setSelectedRole(null);
        setFormData({ username: '', password: '' });
        setError('');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = () => {
        // Validasi input
        if (!formData.username || !formData.password) {
            setError('Username dan password harus diisi');
            return;
        }

        // Simulasi autentikasi (ganti dengan logika autentikasi sebenarnya)
        let userData;
        if (selectedRole === 'admin') {
            // Validasi untuk dokter
            if (formData.username === 'dokter' && formData.password === 'dokter123') {
                userData = { role: 'admin', name: 'Dr. Rizky Khair' };
            } else {
                setError('Username atau password dokter salah');
                return;
            }
        } else if (selectedRole === 'pasien') {
            // Validasi untuk pasien
            if (formData.username === 'pasien' && formData.password === 'pasien123') {
                userData = { role: 'pasien', name: 'Ramadhani Nadri' };
            } else {
                setError('Username atau password pasien salah');
                return;
            }
        }

        // Login berhasil
        login(userData);
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // Tampilan form login
    if (selectedRole) {
        const isDokter = selectedRole === 'admin';
        return (
            <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)'
                }}></div>

                <div className="relative z-10 w-full max-w-md">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="mb-6 flex items-center text-white hover:text-teal-200 transition-colors duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Kembali</span>
                    </button>

                    {/* Login Form Card */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 animate-fade-in">
                        <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${isDokter ? 'from-teal-500 to-emerald-600' : 'from-emerald-500 to-teal-600'} rounded-2xl mb-6 mx-auto`}>
                            {isDokter ? (
                                <Stethoscope className="w-8 h-8 text-white" />
                            ) : (
                                <User className="w-8 h-8 text-white" />
                            )}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                            {isDokter ? 'Login Dokter' : 'Login Pasien'}
                        </h2>
                        <p className="text-gray-600 mb-8 text-sm text-center">
                            Masukkan kredensial Anda untuk melanjutkan
                        </p>

                        <div className="space-y-6">
                            {/* Username Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                        placeholder={isDokter ? "Masukkan username dokter" : "Masukkan username pasien"}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Masukkan password"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Info Akun Demo */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-xs font-semibold text-blue-800 mb-2">Akun Demo:</p>
                                <p className="text-xs text-blue-700">
                                    Username: <span className="font-mono font-semibold">{isDokter ? 'dokter' : 'pasien'}</span>
                                </p>
                                <p className="text-xs text-blue-700">
                                    Password: <span className="font-mono font-semibold">{isDokter ? 'dokter123' : 'pasien123'}</span>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className={`w-full bg-gradient-to-r ${isDokter ? 'from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700' : 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                            >
                                Masuk
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 text-teal-200 text-sm">
                        <p>Sistem aman dan terenkripsi</p>
                    </div>
                </div>
            </div>
        );
    }

    // Tampilan pilihan role (default)
    return (
        <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)'
            }}></div>

            <div className="relative z-10 w-full max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl mb-6 shadow-2xl">
                        <img src={logo} alt="" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Sistem Rekam Medis Kejaksaan Tinggi Jambi</h1>
                    <p className="text-teal-200 text-lg">Platform Digital Terintegrasi untuk Pelayanan Kesehatan Modern di Klinik Pratama</p>
                </div>

                {/* Login Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Admin Login */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-6">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">Portal Dokter</h2>
                        <p className="text-gray-600 mb-8 text-sm">Akses penuh untuk manajemen rekam medis dan data pasien</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center p-4 bg-teal-50 rounded-xl">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Kelola Data Pasien</span>
                            </div>
                            <div className="flex items-center p-4 bg-teal-50 rounded-xl">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Input Rekam Medis</span>
                            </div>
                            <div className="flex items-center p-4 bg-teal-50 rounded-xl">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Laporan & Analitik</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleRoleSelect('admin')}
                            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Pilih Portal Dokter
                        </button>
                    </div>

                    {/* Patient Login */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">Portal Pasien</h2>
                        <p className="text-gray-600 mb-8 text-sm">Lihat riwayat kesehatan dan rekam medis Anda</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Riwayat Kunjungan</span>
                            </div>
                            <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Data Rekam Medis</span>
                            </div>
                            <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-700">Resep & Terapi</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleRoleSelect('pasien')}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Pilih Portal Pasien
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-teal-200 text-sm">
                    <p>© 2025 Sistem Rekam Medis Digital. Platform Kesehatan Terintegrasi.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;