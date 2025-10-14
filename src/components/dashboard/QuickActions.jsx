import React from 'react';
import { Plus, Users, FileText, Calendar, Download } from 'lucide-react';

const QuickActions = ({ onAction }) => {
    const actions = [
        {
            id: 'add-patient',
            label: 'Tambah Pasien',
            icon: Users,
            color: 'from-teal-500 to-emerald-600',
            description: 'Daftarkan pasien baru'
        },
        {
            id: 'add-record',
            label: 'Rekam Medis',
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
            description: 'Input rekam medis baru'
        },
        {
            id: 'schedule',
            label: 'Jadwal Hari Ini',
            icon: Calendar,
            color: 'from-purple-500 to-purple-600',
            description: 'Lihat jadwal pemeriksaan'
        },
        {
            id: 'export',
            label: 'Export Data',
            icon: Download,
            color: 'from-orange-500 to-orange-600',
            description: 'Unduh laporan'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <button
                        key={action.id}
                        onClick={() => onAction(action.id)}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group"
                    >
                        <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">{action.label}</h4>
                        <p className="text-sm text-gray-500">{action.description}</p>
                    </button>
                );
            })}
        </div>
    );
};

export default QuickActions;