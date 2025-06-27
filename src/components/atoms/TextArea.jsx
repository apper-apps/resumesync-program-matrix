import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const TextArea = forwardRef(({ 
  label,
  error,
  rows = 4,
  className = '',
  containerClassName = '',
  showCharCount = false,
  maxLength,
  value = '',
  ...props 
}, ref) => {
  const textAreaClasses = `
    w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500
    transition-all duration-200 focus-ring resize-none
    ${error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : 'border-gray-300 focus:border-primary focus:ring-blue-200'
    }
    ${className}
  `;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showCharCount && maxLength && (
            <span className="text-xs text-gray-500">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={textAreaClasses}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;