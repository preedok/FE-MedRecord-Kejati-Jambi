import React from 'react';

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  rows = 3,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;