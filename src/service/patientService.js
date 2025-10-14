import api from './api';

export const patientService = {
    getAllPatients: async () => {
        return await api.get('/patients');
    },

    getPatientById: async (id) => {
        return await api.get(`/patients/${id}`);
    },

    createPatient: async (patientData) => {
        return await api.post('/patients', patientData);
    },

    updatePatient: async (id, patientData) => {
        return await api.put(`/patients/${id}`, patientData);
    },

    deletePatient: async (id) => {
        return await api.delete(`/patients/${id}`);
    },

    searchPatients: async (query) => {
        return await api.get(`/patients/search?q=${query}`);
    }
};