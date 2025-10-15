import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePatients } from '../Patients/hooks/usePatients';
import { useRecords } from '../Records/hooks/useRecords';
import {
    WelcomeBanner,
    DashboardSummary,
    ActivityList,
    QuickActions,
    RecentPatients,
    ChartWidget
} from '../../components/dashboard';
import Card from '../../components/common/Card';

const DashboardPage = ({ onNavigate, onQuickAction }) => {
    const { currentUser } = useAuth();
    const { patients } = usePatients();
    const { medicalRecords } = useRecords();

    // Calculate stats
    const stats = {
        totalPatients: patients.length,
        totalRecords: medicalRecords.length,
        poliUmum: medicalRecords.filter(r => r.poli === 'umum').length,
        poliGigi: medicalRecords.filter(r => r.poli === 'gigi').length
    };

    const todayStats = {
        newPatients: 3,
        visits: 8
    };

    // Prepare activities data
    const activities = medicalRecords.slice(0, 5).map(record => {
        const patient = patients.find(p => p.id === record.patientId);
        return {
            id: record.id,
            patientName: patient?.nama || 'Unknown',
            diagnosa: record.diagnosa,
            poli: record.poli,
            tanggal: record.tanggal
        };
    });

    // Chart data
    const monthlyData = [
        { label: 'Januari', value: 45 },
        { label: 'Februari', value: 52 },
        { label: 'Maret', value: 48 },
        { label: 'April', value: 61 },
        { label: 'Mei', value: 55 }
    ];

    const handleViewPatient = (patientId) => {
        onNavigate('patients');
    };

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <WelcomeBanner
                userName={currentUser.name}
                userRole={currentUser.role}
                todayStats={todayStats}
            />

            {/* Stats Summary */}
            <DashboardSummary stats={stats} />

            {/* Quick Actions - Admin Only */}
            {currentUser.role === 'admin' && (
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h3>
                    <QuickActions onAction={onQuickAction} />
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
                        <ActivityList activities={activities} />
                    </Card>
                </div>

                {/* Recent Patients - Admin Only */}
                {currentUser.role === 'admin' && (
                    <div>
                        <RecentPatients
                            patients={patients}
                            onViewPatient={handleViewPatient}
                        />
                    </div>
                )}
            </div>

            {/* Charts Section - Admin Only */}
            {currentUser.role === 'admin' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <ChartWidget
                        title="Kunjungan Bulanan"
                        data={monthlyData}
                        type="bar"
                        trend={12}
                    />
                    <ChartWidget
                        title="Distribusi Poli"
                        data={[
                            { label: 'Poli Umum', value: stats.poliUmum },
                            { label: 'Poli Gigi', value: stats.poliGigi }
                        ]}
                        type="bar"
                    />
                </div>
            )}

            {/* Patient View - Show their records */}
            {currentUser.role === 'pasien' && (
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Kesehatan Anda</h3>
                    <div className="space-y-4">
                        {medicalRecords.filter(r => r.patientId === 1).length > 0 ? (
                            <ActivityList
                                activities={medicalRecords.filter(r => r.patientId === 1).map(record => ({
                                    id: record.id,
                                    patientName: currentUser.name,
                                    diagnosa: record.diagnosa,
                                    poli: record.poli,
                                    tanggal: record.tanggal
                                }))}
                            />
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada riwayat rekam medis
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DashboardPage;