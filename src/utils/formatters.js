/**
 * Format date to Indonesian locale
 * @param {string|Date} date - Date to format
 * @param {boolean} withDay - Include day name
 * @returns {string} Formatted date
 */
export const formatDate = (date, withDay = true) => {
    const options = withDay
        ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(date).toLocaleDateString('id-ID', options);
};

/**
 * Format date to short format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (DD/MM/YYYY)
 */
export const formatDateShort = (date) => {
    return new Date(date).toLocaleDateString('id-ID');
};

/**
 * Format currency to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

/**
 * Calculate age from birth date
 * @param {string} birthDate - Birth date string
 * @returns {number} Age in years
 */
export const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

/**
 * Format time to HH:MM
 * @param {string|Date} time - Time to format
 * @returns {string} Formatted time
 */
export const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};