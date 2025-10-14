import React from 'react';
import { Menu, X } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const Header = ({ title, sidebarOpen, onToggleSidebar }) => {
    return (
        <header className="shadow-md border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {sidebarOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500">
                            {formatDate(new Date())}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;