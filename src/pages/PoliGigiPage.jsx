import React from 'react';
import { ClipboardList, Calendar, Users, TrendingUp } from 'lucide-react';
import Card from '../components/common/Card';

const PoliGigiPage = () => {
    return (
        <div className="space-y-6">
            {/* Coming Soon Banner */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Poli Gigi</h2>
                        <p className="text-orange-100">Layanan Kesehatan Gigi dan Mulut</p>
                    </div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                        <ClipboardList className="w-12 h-12" />
                    </div>
                </div>
            </div>

            {/* Coming Soon Content */}
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <ClipboardList className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Fitur Sedang Dikembangkan</h3>
                    <p className="text-gray-600 mb-6">
                        Fitur Poli Gigi akan segera hadir dengan berbagai layanan kesehatan gigi dan mulut yang lengkap.
                    </p>
                    <div className="inline-block px-6 py-3 bg-orange-100 text-orange-700 rounded-xl font-medium">
                        Coming Soon
                    </div>
                </div>
            </div>

            {/* Feature Preview */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Jadwal Praktik</h4>
                        <p className="text-sm text-gray-600">Atur jadwal pemeriksaan gigi dengan mudah</p>
                    </div>
                </Card>

                <Card>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Data Pasien</h4>
                        <p className="text-sm text-gray-600">Kelola rekam medis gigi pasien</p>
                    </div>
                </Card>

                <Card>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Laporan</h4>
                        <p className="text-sm text-gray-600">Analisis dan statistik layanan</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PoliGigiPage;