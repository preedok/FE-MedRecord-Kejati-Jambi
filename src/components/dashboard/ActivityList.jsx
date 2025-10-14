import React from 'react';
import { formatDate, getInitials } from '../../utils/formatters';
import Badge from '../common/Badge';

const ActivityList = ({ activities = [], maxItems = 5 }) => {
    const displayActivities = activities.slice(0, maxItems);

    const getPoliColor = (poli) => {
        const colors = {
            umum: 'purple',
            gigi: 'orange'
        };
        return colors[poli] || 'primary';
    };

    if (displayActivities.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Belum ada aktivitas</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {displayActivities.map((activity, index) => (
                <div
                    key={activity.id || index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {getInitials(activity.patientName)}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{activity.patientName}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{activity.diagnosa}</p>
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <Badge variant={getPoliColor(activity.poli)}>
                            {activity.poli === 'umum' ? 'Poli Umum' : 'Poli Gigi'}
                        </Badge>
                        <p className="text-xs text-gray-500">{formatDate(activity.tanggal, false)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityList;