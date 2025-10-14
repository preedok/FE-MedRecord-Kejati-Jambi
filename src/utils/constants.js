// User roles
export const USER_ROLES = {
    ADMIN: 'admin',
    PASIEN: 'pasien'
};

// Poli types
export const POLI_TYPES = {
    UMUM: 'umum',
    GIGI: 'gigi'
};

// Poli labels
export const POLI_LABELS = {
    [POLI_TYPES.UMUM]: 'Poli Umum',
    [POLI_TYPES.GIGI]: 'Poli Gigi',
    all: 'Semua Poli'
};

// Gender options
export const GENDER_OPTIONS = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' }
];

// Status badges
export const STATUS_COLORS = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-blue-100 text-blue-700'
};

// Menu items for admin
export const ADMIN_MENU = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'Activity',
        path: '/dashboard'
    },
    {
        id: 'patients',
        label: 'Data Pasien',
        icon: 'Users',
        path: '/patients'
    },
    {
        id: 'records',
        label: 'Rekam Medis',
        icon: 'FileText',
        path: '/records'
    },
    {
        id: 'poli-umum',
        label: 'Poli Umum',
        icon: 'ClipboardList',
        path: '/poli-umum'
    },
    {
        id: 'poli-gigi',
        label: 'Poli Gigi',
        icon: 'ClipboardList',
        path: '/poli-gigi'
    }
];

// Menu items for patient
export const PATIENT_MENU = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'Activity',
        path: '/dashboard'
    },
    {
        id: 'my-records',
        label: 'Rekam Medis Saya',
        icon: 'FileText',
        path: '/my-records'
    }
];

// Date format options
export const DATE_FORMAT = {
    LONG: 'long',
    SHORT: 'short',
    ISO: 'iso'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// API endpoints
export const API_ENDPOINTS = {
    PATIENTS: '/patients',
    RECORDS: '/records',
    AUTH: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
};

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'currentUser',
    TOKEN: 'authToken',
    THEME: 'theme'
};

// Messages
export const MESSAGES = {
    SUCCESS: {
        ADD: 'Data berhasil ditambahkan',
        UPDATE: 'Data berhasil diperbarui',
        DELETE: 'Data berhasil dihapus',
        LOGIN: 'Login berhasil',
        LOGOUT: 'Logout berhasil'
    },
    ERROR: {
        GENERIC: 'Terjadi kesalahan, silakan coba lagi',
        NOT_FOUND: 'Data tidak ditemukan',
        UNAUTHORIZED: 'Anda tidak memiliki akses',
        VALIDATION: 'Mohon periksa kembali data yang dimasukkan'
    },
    CONFIRM: {
        DELETE: 'Apakah Anda yakin ingin menghapus data ini?',
        LOGOUT: 'Apakah Anda yakin ingin keluar?'
    }
};