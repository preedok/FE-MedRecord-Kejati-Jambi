import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';
import { useRecords } from '../context/RecordContext';
import RecordsPage from './RecordsPage';

const PoliUmumPage = () => {
    // Simply use RecordsPage with filter preset to 'umum'
    // This is a wrapper component for Poli Umum specific view

    return <RecordsPage defaultFilter="umum" />;
};

export default PoliUmumPage;