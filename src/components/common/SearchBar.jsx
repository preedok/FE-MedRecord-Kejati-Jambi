import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Cari...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;