import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../LoginForm";
import LandingPage from "./LandingPage";

const LoginPage = ({ onLoginSuccess }) => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleBack = () => {
        setSelectedRole(null);
    };

    // Jika role sudah dipilih → tampilkan form login
    if (selectedRole) {
        return (
            <LoginForm
                selectedRole={selectedRole}
                onBack={handleBack}
                onLoginSuccess={onLoginSuccess}
                login={login}
            />
        );
    }

    // Jika belum memilih role → tampilkan landing page
    return <LandingPage onRoleSelect={handleRoleSelect} />;
};

export default LoginPage;
