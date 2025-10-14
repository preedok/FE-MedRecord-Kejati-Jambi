import { useState, useEffect } from 'react';

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);

    const addPatient = (patient) => {
        const newPatient = { ...patient, id: Date.now() };
        setPatients([...patients, newPatient]);
    };

    const updatePatient = (id, updatedData) => {
        setPatients(patients.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deletePatient = (id) => {
        setPatients(patients.filter(p => p.id !== id));
    };

    const getPatient = (id) => {
        return patients.find(p => p.id === id);
    };

    return { patients, loading, addPatient, updatePatient, deletePatient, getPatient };
};