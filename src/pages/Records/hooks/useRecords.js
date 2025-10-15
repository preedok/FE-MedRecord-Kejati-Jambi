import { useState } from 'react';

export const useRecords = () => {
    const [medicalRecords, setMedicalRecords] = useState([
        {
            id: 1,
            patientId: 1,
            poli: 'umum',
            tanggal: '2025-10-10',
            anamnesa: 'Pasien mengeluh demam tinggi sejak 3 hari yang lalu, disertai batuk dan pilek',
            objektif: 'TD: 120/80 mmHg, Nadi: 88x/menit, Suhu: 38.5°C, RR: 20x/menit',
            diagnosa: 'ISPA (Infeksi Saluran Pernapasan Atas)',
            terapi: 'Paracetamol 3x500mg, Amoxicillin 3x500mg, Istirahat cukup',
            dokter: 'Dr. Rizky Khair'
        },
        {
            id: 2,
            patientId: 2,
            poli: 'umum',
            tanggal: '2025-10-12',
            anamnesa: 'Nyeri kepala berkepanjangan, mual, sensitif terhadap cahaya',
            objektif: 'TD: 130/85 mmHg, Nadi: 78x/menit, Suhu: 36.8°C, RR: 18x/menit',
            diagnosa: 'Tension Headache',
            terapi: 'Ibuprofen 3x400mg, Istirahat, Hindari stress, Minum air putih yang cukup',
            dokter: 'Dr. Rizky Khair'
        },
        {
            id: 3,
            patientId: 1,
            poli: 'umum',
            tanggal: '2025-10-05',
            anamnesa: 'Nyeri perut, mual, muntah sejak kemarin malam',
            objektif: 'TD: 110/70 mmHg, Nadi: 82x/menit, Suhu: 37.2°C',
            diagnosa: 'Gastritis Akut',
            terapi: 'Omeprazole 2x20mg, Antasida 3xC1, Diet lunak',
            dokter: 'Dr. Rizky Khair'
        }
    ]);

    const addRecord = (recordData) => {
        const newRecord = {
            ...recordData,
            id: Date.now(),
            dokter: 'Dr. Rizky Khair'
        };
        setMedicalRecords(prevRecords => [...prevRecords, newRecord]);
        return newRecord;
    };

    const updateRecord = (id, recordData) => {
        setMedicalRecords(prevRecords =>
            prevRecords.map(record =>
                record.id === id ? { ...record, ...recordData } : record
            )
        );
    };

    const deleteRecord = (id) => {
        setMedicalRecords(prevRecords =>
            prevRecords.filter(record => record.id !== id)
        );
    };

    const getRecordById = (id) => {
        return medicalRecords.find(record => record.id === id);
    };

    const getRecordsByPatientId = (patientId) => {
        return medicalRecords.filter(record => record.patientId === patientId);
    };

    const getRecordsByPoli = (poli) => {
        if (poli === 'all') return medicalRecords;
        return medicalRecords.filter(record => record.poli === poli);
    };

    const searchRecords = (query, poli = 'all') => {
        let filtered = medicalRecords;

        if (poli !== 'all') {
            filtered = filtered.filter(record => record.poli === poli);
        }

        if (query) {
            filtered = filtered.filter(record =>
                record.diagnosa.toLowerCase().includes(query.toLowerCase()) ||
                record.anamnesa.toLowerCase().includes(query.toLowerCase())
            );
        }

        return filtered;
    };

    return {
        medicalRecords,
        addRecord,
        updateRecord,
        deleteRecord,
        getRecordById,
        getRecordsByPatientId,
        getRecordsByPoli,
        searchRecords
    };
};