/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate Indonesian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export const validatePhone = (phone) => {
    const regex = /^(\+62|62|0)[0-9]{9,12}$/;
    return regex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} Is field filled
 */
export const validateRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    return true;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} Is valid length
 */
export const validateMinLength = (value, minLength) => {
    if (!value) return false;
    return value.length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} Is valid length
 */
export const validateMaxLength = (value, maxLength) => {
    if (!value) return true;
    return value.length <= maxLength;
};

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} date - Date to validate
 * @returns {boolean} Is valid date
 */
export const validateDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;

    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate);
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Is within range
 */
export const validateRange = (value, min, max) => {
    const num = Number(value);
    if (isNaN(num)) return false;
    return num >= min && num <= max;
};

/**
 * Validate form data
 * @param {object} data - Form data
 * @param {object} rules - Validation rules
 * @returns {object} Validation result with errors
 */
export const validateForm = (data, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
        const rule = rules[field];
        const value = data[field];

        if (rule.required && !validateRequired(value)) {
            errors[field] = rule.message || `${field} wajib diisi`;
            return;
        }

        if (rule.email && value && !validateEmail(value)) {
            errors[field] = rule.message || 'Format email tidak valid';
            return;
        }

        if (rule.phone && value && !validatePhone(value)) {
            errors[field] = rule.message || 'Format nomor telepon tidak valid';
            return;
        }

        if (rule.minLength && value && !validateMinLength(value, rule.minLength)) {
            errors[field] = rule.message || `Minimal ${rule.minLength} karakter`;
            return;
        }

        if (rule.maxLength && value && !validateMaxLength(value, rule.maxLength)) {
            errors[field] = rule.message || `Maksimal ${rule.maxLength} karakter`;
            return;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};