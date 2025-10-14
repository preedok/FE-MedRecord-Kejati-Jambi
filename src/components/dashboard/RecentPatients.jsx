import React from 'react';
import { Eye, MoreVertical } from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import Badge from '../common/Badge';

const RecentPatients = ({ patients = [], onViewPatient }) => {
    if (patients.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Pasien Terbaru</h3>
                <div className="text-center py-8">
                    <p className="text-gray-500">Belum ada data pasien</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Pasien Terbaru</h3>
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    Lihat Semua
                </button>
            </div>

            <div className="space-y-3">
                {patients.slice(0, 5).map((patient) => (
                    <div
                        key={patient.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                {getInitials(patient.nama)}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{patient.nama}</p>
                                <p className="text-xs text-gray-500">{patient.ttl}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant={patient.jenisKelamin === 'Laki-laki' ? 'info' : 'pink'}>
                                {patient.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}
                            </Badge>
                            <button
                                onClick={() => onViewPatient(patient.id)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPatients;