import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ChartWidget = ({
    title,
    data = [],
    type = 'bar',
    trend = null
}) => {
    // Simple bar chart visualization
    const maxValue = Math.max(...data.map(d => d.value), 1);

    const getTrendIcon = () => {
        if (!trend) return null;
        if (trend > 0) {
            return (
                <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+{trend}%</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-red-600 text-sm">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span>{trend}%</span>
                </div>
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {getTrendIcon()}
            </div>

            {type === 'bar' && (
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{item.label}</span>
                                <span className="font-semibold text-gray-800">{item.value}</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full transition-all duration-500"
                                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {type === 'donut' && (
                <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        {/* Simple visual representation */}
                        <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-800">
                                    {data.reduce((sum, item) => sum + item.value, 0)}
                                </p>
                                <p className="text-sm text-gray-500">Total</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {data.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">Tidak ada data</p>
                </div>
            )}
        </div>
    );
};

export default ChartWidget;