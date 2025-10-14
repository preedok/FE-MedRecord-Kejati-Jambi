import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  className = '',
  placeholder = 'Pilih...'
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;