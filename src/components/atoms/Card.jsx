import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'default',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' } : {}}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;