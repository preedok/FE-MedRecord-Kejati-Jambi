import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";
import { RecordProvider } from "./context/RecordContext";
import { Sidebar, Header } from "./components/layout";

import {
    LandingPage,
    LoginPage,
    DashboardPage,
    PatientsPage,
    RecordsPage,
    PoliUmumPage,
    PoliGigiPage,
    MyRecordsPage,
} from "./pages";

// ✅ Komponen proteksi login
const ProtectedRoute = () => {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to="/login" replace />;
    return <Outlet />;
};

// ✅ Layout utama untuk dashboard
const MainLayout = ({ title }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const { logout } = useAuth();

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onLogout={logout} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title={title}
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// ✅ Definisi router baru
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={
                <AuthProvider>
                    <PatientProvider>
                        <RecordProvider>
                            <Outlet />
                        </RecordProvider>
                    </PatientProvider>
                </AuthProvider>
            }
        >
            {/* Halaman awal & login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Area admin/dokter */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout title="Dashboard Dokter" />}>
                    <Route path="/dashboard-dokter" element={<DashboardPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/records" element={<RecordsPage />} />
                    <Route path="/poli-umum" element={<PoliUmumPage />} />
                    <Route path="/poli-gigi" element={<PoliGigiPage />} />
                </Route>
            </Route>

            {/* Area pasien */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout title="Dashboard Pasien" />}>
                    <Route path="/dashboard-pasien" element={<MyRecordsPage />} />
                    <Route path="/my-records" element={<MyRecordsPage />} />
                </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    )
);

// ✅ Komponen utama router provider
export default function AppRouter() {
    return <RouterProvider router={router} />;
}
