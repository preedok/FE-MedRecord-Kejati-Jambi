import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { usePatients } from './hooks/usePatients';
import { SearchBar, Button, Modal, Input, Select, Badge } from '../../components/common';
import { getInitials } from '../../utils/formatters';
import { GENDER_OPTIONS } from '../../utils/constants';

const PatientsPage = () => {
    const { patients, addPatient, updatePatient, deletePatient } = usePatients();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // add, edit, view
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        ttl: '',
        jenisKelamin: 'Laki-laki',
        alamat: '',
        noTelp: '',
        email: ''
    });

    const filteredPatients = patients.filter(patient =>
        patient.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (mode, patient = null) => {
        setModalMode(mode);
        setSelectedPatient(patient);
        if (patient && mode !== 'view') {
            setFormData({
                nama: patient.nama,
                ttl: patient.ttl,
                jenisKelamin: patient.jenisKelamin,
                alamat: patient.alamat,
                noTelp: patient.noTelp || '',
                email: patient.email || ''
            });
        } else if (mode === 'add') {
            setFormData({
                nama: '',
                ttl: '',
                jenisKelamin: 'Laki-laki',
                alamat: '',
                noTelp: '',
                email: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'edit') {
            updatePatient(selectedPatient.id, formData);
        } else {
            addPatient(formData);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
            deletePatient(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari pasien..."
                    className="w-full md:w-96"
                />
                <Button icon={Plus} onClick={() => handleOpenModal('add')}>
                    Tambah Pasien
                </Button>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Nama Pasien</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal Lahir</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Jenis Kelamin</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Alamat</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPatients.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        {searchTerm ? 'Tidak ada pasien yang sesuai dengan pencarian' : 'Belum ada data pasien'}
                                    </td>
                                </tr>
                            ) : (
                                filteredPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                                                    {getInitials(patient.nama)}
                                                </div>
                                                <span className="font-medium text-gray-800">{patient.nama}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{patient.ttl}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={patient.jenisKelamin === 'Laki-laki' ? 'info' : 'pink'}>
                                                {patient.jenisKelamin}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{patient.alamat}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => handleOpenModal('view', patient)}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal('edit', patient)}
                                                    className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={
                    modalMode === 'add'
                        ? 'Tambah Pasien Baru'
                        : modalMode === 'edit'
                            ? 'Edit Data Pasien'
                            : 'Detail Pasien'
                }
                size="lg"
            >
                {modalMode === 'view' && selectedPatient ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
                            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                                {getInitials(selectedPatient.nama)}
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-gray-800">{selectedPatient.nama}</h4>
                                <p className="text-gray-600">{selectedPatient.ttl}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 mb-1">Jenis Kelamin</p>
                                <p className="text-gray-800">{selectedPatient.jenisKelamin}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 mb-1">No. Telepon</p>
                                <p className="text-gray-800">{selectedPatient.noTelp || '-'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                                <p className="text-sm font-semibold text-gray-500 mb-1">Alamat</p>
                                <p className="text-gray-800">{selectedPatient.alamat}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                                <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                                <p className="text-gray-800">{selectedPatient.email || '-'}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Nama Lengkap"
                                name="nama"
                                value={formData.nama}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            <Input
                                label="Tanggal Lahir"
                                name="ttl"
                                value={formData.ttl}
                                onChange={handleInputChange}
                                placeholder="contoh: 15 Maret 1985"
                                required
                            />
                        </div>
                        <Select
                            label="Jenis Kelamin"
                            name="jenisKelamin"
                            value={formData.jenisKelamin}
                            onChange={handleInputChange}
                            options={GENDER_OPTIONS}
                            required
                        />
                        <Input
                            label="No. Telepon"
                            name="noTelp"
                            type="tel"
                            value={formData.noTelp}
                            onChange={handleInputChange}
                            placeholder="08123456789"
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@example.com"
                        />
                        <Input
                            label="Alamat Lengkap"
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleInputChange}
                            placeholder="Masukkan alamat lengkap"
                            required
                        />
                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                            <Button type="button" variant="secondary" onClick={handleCloseModal}>
                                Batal
                            </Button>
                            <Button type="submit">
                                {modalMode === 'add' ? 'Tambah Pasien' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default PatientsPage;