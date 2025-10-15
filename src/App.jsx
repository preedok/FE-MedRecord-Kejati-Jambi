import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import { RecordProvider } from './context/RecordContext';
import { Sidebar, Header } from './components/layout';
import {
    LoginPage,
    DashboardPage,
    PatientsPage,
    RecordsPage,
    PoliUmumPage,
    PoliGigiPage,
    MyRecordsPage
} from './pages';

// Main App Content Component
const AppContent = () => {
    const { currentUser, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');

    // If not logged in, show login page
    if (!currentUser) {
        return <LoginPage />;
    }

    const handleLogout = () => {
        if (window.confirm('Apakah Anda yakin ingin keluar?')) {
            logout();
            setActiveMenu('dashboard');
        }
    };

    const handleMenuClick = (menuId) => {
        setActiveMenu(menuId);
    };

    const handleQuickAction = (actionId) => {
        switch (actionId) {
            case 'add-patient':
                setActiveMenu('patients');
                break;
            case 'add-record':
                setActiveMenu('records');
                break;
            case 'schedule':
                // Handle schedule
                alert('Fitur jadwal akan segera hadir!');
                break;
            case 'export':
                // Handle export
                alert('Fitur export akan segera hadir!');
                break;
            default:
                break;
        }
    };

    const getPageTitle = () => {
        const titles = {
            dashboard: 'Dashboard',
            patients: 'Data Pasien',
            records: 'Rekam Medis',
            'poli-umum': 'Poli Umum',
            'poli-gigi': 'Poli Gigi',
            'my-records': 'Rekam Medis Saya'
        };
        return titles[activeMenu] || 'Dashboard';
    };

    const renderPage = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardPage onNavigate={handleMenuClick} onQuickAction={handleQuickAction} />;
            case 'patients':
                return <PatientsPage />;
            case 'records':
                return <RecordsPage />;
            case 'poli-umum':
                return <PoliUmumPage />;
            case 'poli-gigi':
                return <PoliGigiPage />;
            case 'my-records':
                return <MyRecordsPage />;
            default:
                return <DashboardPage onNavigate={handleMenuClick} onQuickAction={handleQuickAction} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                activeMenu={activeMenu}
                onMenuClick={handleMenuClick}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header
                    title={getPageTitle()}
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

// Main App Component with Providers
function App() {
    return (
        <AuthProvider>
            <PatientProvider>
                <RecordProvider>
                    <AppContent />
                </RecordProvider>
            </PatientProvider>
        </AuthProvider>
    );
}

export default App;