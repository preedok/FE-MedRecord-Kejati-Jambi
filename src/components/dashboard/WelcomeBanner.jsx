import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const WelcomeBanner = ({ userName, userRole, todayStats }) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-6 h-6" />
                            <span className="text-teal-100 font-medium">{formatDate(new Date())}</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">
                            {getGreeting()}, {userName}! 👋
                        </h1>
                        <p className="text-teal-100 text-lg">
                            {userRole === 'admin'
                                ? 'Semoga hari Anda menyenangkan dalam melayani pasien'
                                : 'Semoga kesehatan Anda selalu terjaga'
                            }
                        </p>
                    </div>

                    {/* Today's Stats - Only for Admin */}
                    {userRole === 'admin' && todayStats && (
                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 min-w-[200px]">
                            <p className="text-teal-100 text-sm mb-2">Hari Ini</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Pasien Baru</span>
                                    <span className="text-2xl font-bold">{todayStats.newPatients || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Kunjungan</span>
                                    <span className="text-2xl font-bold">{todayStats.visits || 0}</span>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12% dari kemarin</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;