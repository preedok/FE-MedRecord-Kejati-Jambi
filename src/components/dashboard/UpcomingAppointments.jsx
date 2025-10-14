import React from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { formatTime } from '../../utils/formatters';
import Badge from '../common/Badge';

const UpcomingAppointments = ({ appointments = [] }) => {
    if (appointments.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Jadwal Mendatang</h3>
                <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tidak ada jadwal hari ini</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Jadwal Mendatang</h3>
                <Badge variant="success">{appointments.length} Jadwal</Badge>
            </div>

            <div className="space-y-4">
                {appointments.map((appointment, index) => (
                    <div
                        key={index}
                        className="p-4 border-l-4 border-teal-500 bg-teal-50 rounded-r-xl hover:bg-teal-100 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-gray-800">{appointment.patientName}</p>
                                <p className="text-sm text-gray-600">{appointment.type}</p>
                            </div>
                            <Badge variant="primary">{appointment.poli}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>Ruang {appointment.room}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingAppointments;