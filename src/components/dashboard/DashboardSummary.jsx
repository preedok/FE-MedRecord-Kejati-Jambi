import React from 'react';
import { Users, FileText, ClipboardList, Activity } from 'lucide-react';
import StatsCard from './StatsCard';

const DashboardSummary = ({ stats }) => {
    const statsData = [
        {
            icon: Users,
            title: 'Total Pasien',
            value: stats.totalPatients || 0,
            color: 'teal',
            percentage: 75
        },
        {
            icon: FileText,
            title: 'Rekam Medis',
            value: stats.totalRecords || 0,
            color: 'blue',
            percentage: 60
        },
        {
            icon: ClipboardList,
            title: 'Poli Umum',
            value: stats.poliUmum || 0,
            color: 'purple',
            percentage: 85
        },
        {
            icon: ClipboardList,
            title: 'Poli Gigi',
            value: stats.poliGigi || 0,
            color: 'orange',
            percentage: 40
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
                <StatsCard
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    color={stat.color}
                    percentage={stat.percentage}
                />
            ))}
        </div>
    );
};

export default DashboardSummary;