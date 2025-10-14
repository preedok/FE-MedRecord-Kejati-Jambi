import React from 'react';

const StatsCard = ({
    icon: Icon,
    title,
    value,
    color = 'teal',
    percentage = 75
}) => {
    const colorClasses = {
        teal: {
            gradient: 'from-teal-500 to-emerald-600',
            text: 'text-teal-100'
        },
        blue: {
            gradient: 'from-blue-500 to-blue-600',
            text: 'text-blue-100'
        },
        purple: {
            gradient: 'from-purple-500 to-purple-600',
            text: 'text-purple-100'
        },
        orange: {
            gradient: 'from-orange-500 to-orange-600',
            text: 'text-orange-100'
        },
        green: {
            gradient: 'from-green-500 to-green-600',
            text: 'text-green-100'
        },
        red: {
            gradient: 'from-red-500 to-red-600',
            text: 'text-red-100'
        }
    };

    const colors = colorClasses[color] || colorClasses.teal;

    return (
        <div className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
                <Icon className="w-12 h-12 opacity-80" />
                <div className="text-right">
                    <p className="text-3xl font-bold">{value}</p>
                    <p className={`${colors.text} text-sm mt-1`}>{title}</p>
                </div>
            </div>
            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default StatsCard;