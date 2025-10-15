import React from "react";
import { Stethoscope, User, CheckCircle2 } from "lucide-react";
import logo from "../../../assets/logo-kejaksaan.png";

const LandingPage = ({ onRoleSelect }) => {
    return (
        <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4 relative">
            {/* Layer efek background */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
                }}
            ></div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* ====== HEADER ====== */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl mb-6 shadow-2xl">
                        <img src={logo} alt="logo kejaksaan" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                        Sistem Rekam Medis Kejaksaan Tinggi Jambi
                    </h1>
                    <p className="text-teal-200 text-lg">
                        Platform Digital Terintegrasi untuk Pelayanan Kesehatan Modern di
                        Klinik Pratama Adhyaksa Kejaksaan Tinggi Jambi
                    </p>
                </div>

                {/* ====== PILIH PORTAL ====== */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* ===== Portal Dokter ===== */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-6">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Portal Dokter
                        </h2>
                        <p className="text-gray-600 mb-8 text-sm">
                            Akses penuh untuk manajemen rekam medis dan data pasien
                        </p>

                        <ul className="space-y-3 mb-8">
                            {["Kelola Data Pasien", "Input Rekam Medis", "Laporan & Analitik"].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-teal-50 rounded-xl py-3 px-4 text-gray-700 text-sm font-medium"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-teal-500 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => onRoleSelect("admin")}
                            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Masuk Portal Dokter
                        </button>
                    </div>

                    {/* ===== Portal Pasien ===== */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Portal Pasien
                        </h2>
                        <p className="text-gray-600 mb-8 text-sm">
                            Lihat riwayat kesehatan dan rekam medis Anda
                        </p>

                        <ul className="space-y-3 mb-8">
                            {["Riwayat Kunjungan", "Data Rekam Medis", "Resep & Terapi"].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-emerald-50 rounded-xl py-3 px-4 text-gray-700 text-sm font-medium"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => onRoleSelect("pasien")}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Masuk Portal Pasien
                        </button>
                    </div>
                </div>

                {/* ====== FOOTER ====== */}
                <div className="text-center mt-12 text-teal-200 text-sm">
                    <p>
                        © 2025 Sistem Rekam Medis Digital. Platform Kesehatan Terintegrasi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
