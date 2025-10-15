import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User, ArrowLeft, Lock, Mail } from "lucide-react";

const LoginForm = ({ selectedRole, onBack, login, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isDokter = selectedRole === "admin";

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = () => {
        if (!formData.username || !formData.password) {
            setError("Username dan password harus diisi");
            return;
        }

        let userData;

        if (isDokter) {
            if (formData.username === "dokter" && formData.password === "dokter123") {
                userData = { role: "admin", name: "Dr. Rizky Khair" };
                login(userData);
                if (onLoginSuccess) onLoginSuccess();
                // ➡️ Navigasi ke dashboard dokter
                navigate("/dashboard-dokter");
            } else {
                setError("Username atau password dokter salah");
                return;
            }
        } else {
            if (formData.username === "pasien" && formData.password === "pasien123") {
                userData = { role: "pasien", name: "Ramadhani Nadri" };
                login(userData);
                if (onLoginSuccess) onLoginSuccess();
                // ➡️ Navigasi ke dashboard pasien
                navigate("/dashboard-pasien");
            } else {
                setError("Username atau password pasien salah");
                return;
            }
        }
    };

    return (
        <div className="min-h-screen gradient-bg-primary flex items-center justify-center p-4 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
                }}
            ></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Tombol Kembali */}
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center text-white hover:text-teal-200 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>Kembali</span>
                </button>

                {/* Card Login */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 animate-fade-in">
                    <div
                        className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${isDokter
                                ? "from-teal-500 to-emerald-600"
                                : "from-emerald-500 to-teal-600"
                            } rounded-2xl mb-6 mx-auto`}
                    >
                        {isDokter ? (
                            <Stethoscope className="w-8 h-8 text-white" />
                        ) : (
                            <User className="w-8 h-8 text-white" />
                        )}
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                        {isDokter ? "Login Dokter" : "Login Pasien"}
                    </h2>
                    <p className="text-gray-600 mb-8 text-sm text-center">
                        Masukkan kredensial Anda untuk melanjutkan
                    </p>

                    {/* Input Fields */}
                    <div className="space-y-6">
                        {/* Username */}
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                    placeholder={
                                        isDokter
                                            ? "Masukkan username dokter"
                                            : "Masukkan username pasien"
                                    }
                                />
                            </div>
                        </div>

                        {/* Password */}
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Masukkan password"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Tombol Masuk */}
                        <button
                            onClick={handleSubmit}
                            className={`w-full bg-gradient-to-r ${isDokter
                                    ? "from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                                    : "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                } text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                        >
                            Masuk
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6 text-teal-200 text-sm">
                    <p>Sistem aman dan terenkripsi</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
