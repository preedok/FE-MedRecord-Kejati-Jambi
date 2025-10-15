import React, { useState } from 'react';
import { User, Calendar, FileText, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePatients } from '../../context/PatientContext';
import { useRecords } from '../../context/RecordContext';
import { formatDate } from '../../utils/formatters';
import { Badge, Card, Modal } from '../../components/common';
import { POLI_LABELS } from '../../utils/constants';

const MyRecordsPage = () => {
    const { currentUser } = useAuth();
    const { patients } = usePatients();
    const { medicalRecords } = useRecords();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Get patient data (assuming first patient for demo)
    const patient = patients[0];
    const myRecords = medicalRecords.filter(r => r.patientId === patient?.id);

    const handleViewDetail = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Patient Profile Card */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                        <User className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{currentUser.name}</h2>
                        <div className="grid md:grid-cols-3 gap-4 text-teal-100">
                            <div>
                                <p className="text-sm">Tanggal Lahir</p>
                                <p className="font-semibold">{patient?.ttl}</p>
                            </div>
                            <div>
                                <p className="text-sm">Jenis Kelamin</p>
                                <p className="font-semibold">{patient?.jenisKelamin}</p>
                            </div>
                            <div>
                                <p className="text-sm">Total Kunjungan</p>
                                <p className="font-semibold">{myRecords.length} kali</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Records List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Riwayat Rekam Medis</h3>
                    <Badge variant="primary">{myRecords.length} Rekam Medis</Badge>
                </div>

                {myRecords.length === 0 ? (
                    <Card>
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Belum ada riwayat rekam medis</p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {myRecords.map(record => (
                            <Card key={record.id} className="hover:shadow-xl">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 mb-1">{record.diagnosa}</h4>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(record.tanggal)}
                                        </p>
                                    </div>
                                    <Badge variant={record.poli === 'umum' ? 'purple' : 'orange'}>
                                        {POLI_LABELS[record.poli]}
                                    </Badge>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">KELUHAN</p>
                                        <p className="text-sm text-gray-800">{record.anamnesa}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">PEMERIKSAAN</p>
                                        <p className="text-sm text-gray-800">{record.objektif}</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-teal-50 rounded-xl border-l-4 border-teal-500">
                                            <p className="text-xs font-semibold text-teal-700 mb-2">DIAGNOSA</p>
                                            <p className="text-sm font-medium text-gray-800">{record.diagnosa}</p>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                                            <p className="text-xs font-semibold text-emerald-700 mb-2">TERAPI & RESEP</p>
                                            <p className="text-sm text-gray-800">{record.terapi}</p>
                                        </div>
                                    </div>
                                    {record.dokter && (
                                        <div className="p-4 bg-blue-50 rounded-xl">
                                            <p className="text-xs font-semibold text-blue-700 mb-2">DOKTER PEMERIKSA</p>
                                            <p className="text-sm text-gray-800">{record.dokter}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleViewDetail(record)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm font-medium">Lihat Detail</span>
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Detail Rekam Medis"
                size="lg"
            >
                {selectedRecord && (
                    <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800">{selectedRecord.diagnosa}</h4>
                                    <p className="text-gray-600">{formatDate(selectedRecord.tanggal)}</p>
                                </div>
                                <Badge variant={selectedRecord.poli === 'umum' ? 'purple' : 'orange'} size="lg">
                                    {POLI_LABELS[selectedRecord.poli]}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 mb-2">ANAMNESA (KELUHAN)</p>
                                <p className="text-gray-800">{selectedRecord.anamnesa}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 mb-2">OBJEKTIF (PEMERIKSAAN)</p>
                                <p className="text-gray-800">{selectedRecord.objektif}</p>
                            </div>
                            <div className="p-4 bg-teal-50 rounded-xl border-l-4 border-teal-500">
                                <p className="text-sm font-semibold text-teal-700 mb-2">DIAGNOSA</p>
                                <p className="text-gray-800 font-medium text-lg">{selectedRecord.diagnosa}</p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                                <p className="text-sm font-semibold text-emerald-700 mb-2">TERAPI & RESEP</p>
                                <p className="text-gray-800">{selectedRecord.terapi}</p>
                            </div>
                            {selectedRecord.dokter && (
                                <div className="p-4 bg-blue-50 rounded-xl">
                                    <p className="text-sm font-semibold text-blue-700 mb-2">DOKTER PEMERIKSA</p>
                                    <p className="text-gray-800 font-medium">{selectedRecord.dokter}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyRecordsPage;