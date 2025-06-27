import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const KeywordPill = ({ 
  keyword, 
  matched = false, 
  index = 0,
  onClick,
  onRemove 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
        cursor-pointer transition-all duration-200
        ${matched 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
        }
      `}
      onClick={onClick}
    >
      {matched && (
        <ApperIcon name="Check" className="w-3 h-3 mr-1.5" />
      )}
      
      <span>{keyword}</span>
      
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(keyword);
          }}
          className="ml-1.5 hover:bg-red-100 hover:text-red-600 rounded-full p-0.5 transition-colors"
        >
          <ApperIcon name="X" className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
};

export default KeywordPill;