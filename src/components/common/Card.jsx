import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = 'p-6',
  hover = true
}) => {
  const hoverClass = hover ? 'hover:shadow-xl' : '';
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg ${padding} ${hoverClass} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;