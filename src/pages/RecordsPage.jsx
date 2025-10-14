import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import { usePatients } from '../context/PatientContext';
import { useRecords } from '../context/RecordContext';
import { SearchBar, Button, Modal, Input, Select, Textarea, Badge } from '../components/common';
import { formatDate, getInitials } from '../utils/formatters';
import { POLI_LABELS } from '../utils/constants';

const RecordsPage = () => {
    const { patients } = usePatients();
    const { medicalRecords, addRecord, updateRecord, deleteRecord } = useRecords();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPoli, setFilterPoli] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formData, setFormData] = useState({
        patientId: '',
        poli: 'umum',
        tanggal: new Date().toISOString().split('T')[0],
        anamnesa: '',
        objektif: '',
        diagnosa: '',
        terapi: ''
    });

    const filteredRecords = medicalRecords.filter(record => {
        const patient = patients.find(p => p.id === record.patientId);
        const matchesSearch = patient?.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosa.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPoli = filterPoli === 'all' || record.poli === filterPoli;
        return matchesSearch && matchesPoli;
    });

    const handleOpenModal = (mode, record = null) => {
        setModalMode(mode);
        setSelectedRecord(record);
        if (record && mode !== 'view') {
            setFormData({
                patientId: record.patientId,
                poli: record.poli,
                tanggal: record.tanggal,
                anamnesa: record.anamnesa,
                objektif: record.objektif,
                diagnosa: record.diagnosa,
                terapi: record.terapi
            });
        } else if (mode === 'add') {
            setFormData({
                patientId: '',
                poli: 'umum',
                tanggal: new Date().toISOString().split('T')[0],
                anamnesa: '',
                objektif: '',
                diagnosa: '',
                terapi: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecord(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'edit') {
            updateRecord(selectedRecord.id, formData);
        } else {
            addRecord(formData);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus rekam medis ini?')) {
            deleteRecord(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const poliOptions = [
        { value: 'all', label: 'Semua Poli' },
        { value: 'umum', label: 'Poli Umum' },
        { value: 'gigi', label: 'Poli Gigi' }
    ];

    const patientOptions = patients.map(p => ({
        value: p.id,
        label: p.nama
    }));

    const poliFormOptions = [
        { value: 'umum', label: 'Poli Umum' },
        { value: 'gigi', label: 'Poli Gigi' }
    ];

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 flex-1">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari pasien atau diagnosa..."
                        className="w-full md:w-96"
                    />
                    <select
                        value={filterPoli}
                        onChange={(e) => setFilterPoli(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        {poliOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    icon={Plus}
                    onClick={() => handleOpenModal('add')}
                >
                    Tambah Rekam Medis
                </Button>
            </div>

            {/* Records Grid */}
            <div className="grid gap-6">
                {filteredRecords.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <p className="text-gray-500">
                            {searchTerm || filterPoli !== 'all'
                                ? 'Tidak ada rekam medis yang sesuai dengan filter'
                                : 'Belum ada data rekam medis'}
                        </p>
                    </div>
                ) : (
                    filteredRecords.map(record => {
                        const patient = patients.find(p => p.id === record.patientId);
                        return (
                            <div key={record.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                            {getInitials(patient?.nama || '')}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{patient?.nama || 'Unknown'}</h3>
                                            <p className="text-sm text-gray-500">{patient?.ttl} • {patient?.jenisKelamin}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={record.poli === 'umum' ? 'purple' : 'orange'}>
                                            {POLI_LABELS[record.poli]}
                                        </Badge>
                                        <span className="text-sm text-gray-500">{formatDate(record.tanggal, false)}</span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">ANAMNESA</p>
                                        <p className="text-sm text-gray-800">{record.anamnesa}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">OBJEKTIF</p>
                                        <p className="text-sm text-gray-800">{record.objektif}</p>
                                    </div>
                                    <div className="p-4 bg-teal-50 rounded-xl">
                                        <p className="text-xs font-semibold text-teal-700 mb-2">DIAGNOSA</p>
                                        <p className="text-sm font-medium text-gray-800">{record.diagnosa}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 rounded-xl">
                                        <p className="text-xs font-semibold text-emerald-700 mb-2">TERAPI</p>
                                        <p className="text-sm text-gray-800">{record.terapi}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleOpenModal('view', record)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm font-medium">Lihat Detail</span>
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal('edit', record)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">Hapus</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={
                    modalMode === 'add' ? 'Tambah Rekam Medis' :
                        modalMode === 'edit' ? 'Edit Rekam Medis' :
                            'Detail Rekam Medis'
                }
                size="lg"
            >
                {modalMode === 'view' && selectedRecord ? (
                    <div className="space-y-4">
                        {(() => {
                            const patient = patients.find(p => p.id === selectedRecord.patientId);
                            return (
                                <>
                                    <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
                                        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                                            {getInitials(patient?.nama || '')}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-800">{patient?.nama}</h4>
                                            <p className="text-gray-600">{formatDate(selectedRecord.tanggal)}</p>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-500 mb-2">ANAMNESA</p>
                                            <p className="text-gray-800">{selectedRecord.anamnesa}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-500 mb-2">OBJEKTIF</p>
                                            <p className="text-gray-800">{selectedRecord.objektif}</p>
                                        </div>
                                        <div className="p-4 bg-teal-50 rounded-xl">
                                            <p className="text-sm font-semibold text-teal-700 mb-2">DIAGNOSA</p>
                                            <p className="text-gray-800 font-medium">{selectedRecord.diagnosa}</p>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-xl">
                                            <p className="text-sm font-semibold text-emerald-700 mb-2">TERAPI</p>
                                            <p className="text-gray-800">{selectedRecord.terapi}</p>
                                        </div>
                                        {selectedRecord.dokter && (
                                            <div className="p-4 bg-blue-50 rounded-xl">
                                                <p className="text-sm font-semibold text-blue-700 mb-2">DOKTER PEMERIKSA</p>
                                                <p className="text-gray-800">{selectedRecord.dokter}</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Select
                                label="Pilih Pasien"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                options={patientOptions}
                                placeholder="-- Pilih Pasien --"
                                required
                            />
                            <Select
                                label="Poli"
                                name="poli"
                                value={formData.poli}
                                onChange={handleInputChange}
                                options={poliFormOptions}
                                required
                            />
                        </div>

                        <Input
                            label="Tanggal Pemeriksaan"
                            name="tanggal"
                            type="date"
                            value={formData.tanggal}
                            onChange={handleInputChange}
                            required
                        />

                        <Textarea
                            label="Anamnesa (Keluhan)"
                            name="anamnesa"
                            value={formData.anamnesa}
                            onChange={handleInputChange}
                            placeholder="Keluhan pasien..."
                            rows={3}
                            required
                        />

                        <Textarea
                            label="Objektif (Pemeriksaan Fisik)"
                            name="objektif"
                            value={formData.objektif}
                            onChange={handleInputChange}
                            placeholder="TD, Nadi, Suhu, dll..."
                            rows={3}
                            required
                        />

                        <Input
                            label="Diagnosa"
                            name="diagnosa"
                            value={formData.diagnosa}
                            onChange={handleInputChange}
                            placeholder="Diagnosa penyakit..."
                            required
                        />

                        <Textarea
                            label="Terapi & Resep"
                            name="terapi"
                            value={formData.terapi}
                            onChange={handleInputChange}
                            placeholder="Obat dan terapi yang diberikan..."
                            rows={3}
                            required
                        />

                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCloseModal}
                            >
                                Batal
                            </Button>
                            <Button type="submit">
                                {modalMode === 'add' ? 'Simpan Rekam Medis' : 'Update Rekam Medis'}
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default RecordsPage;