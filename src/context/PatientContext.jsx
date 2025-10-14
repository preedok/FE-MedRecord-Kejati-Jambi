import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([
        {
            id: 1,
            nama: 'Ramadhani Nadri',
            ttl: '15 Maret 1985',
            jenisKelamin: 'Laki-laki',
            alamat: 'Jl. Merdeka No. 123, Jakarta',
            noTelp: '081234567890',
            email: 'budi.santoso@email.com'
        },
        {
            id: 2,
            nama: 'Siti Nurhaliza',
            ttl: '22 Juni 1990',
            jenisKelamin: 'Perempuan',
            alamat: 'Jl. Sudirman No. 45, Bandung',
            noTelp: '081234567891',
            email: 'siti.nur@email.com'
        },
        {
            id: 3,
            nama: 'Ahmad Hidayat',
            ttl: '10 Januari 1978',
            jenisKelamin: 'Laki-laki',
            alamat: 'Jl. Pahlawan No. 67, Surabaya',
            noTelp: '081234567892',
            email: 'ahmad.hidayat@email.com'
        }
    ]);

    const addPatient = (patientData) => {
        const newPatient = {
            ...patientData,
            id: Date.now()
        };
        setPatients([...patients, newPatient]);
        return newPatient;
    };

    const updatePatient = (id, patientData) => {
        setPatients(patients.map(patient =>
            patient.id === id ? { ...patient, ...patientData } : patient
        ));
    };

    const deletePatient = (id) => {
        setPatients(patients.filter(patient => patient.id !== id));
    };

    const getPatientById = (id) => {
        return patients.find(patient => patient.id === id);
    };

    const searchPatients = (query) => {
        return patients.filter(patient =>
            patient.nama.toLowerCase().includes(query.toLowerCase()) ||
            patient.alamat.toLowerCase().includes(query.toLowerCase())
        );
    };

    const value = {
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        getPatientById,
        searchPatients
    };

    return (
        <PatientContext.Provider value={value}>
            {children}
        </PatientContext.Provider>
    );
};