import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const FileUpload = ({ 
  onFileSelect, 
  accept = '.pdf,.docx', 
  maxSize = 10 * 1024 * 1024, // 10MB
  loading = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    
    if (!file.type.includes('pdf') && !file.type.includes('wordprocessingml')) {
      return 'Please select a PDF or DOCX file';
    }
    
    return null;
  };

  const handleFile = useCallback((file) => {
    setError('');
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onFileSelect(file);
  }, [onFileSelect, maxSize]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center
          transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-primary bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${loading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />
        
        <div className="space-y-4">
          <motion.div
            animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
            className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
          >
            {loading ? (
              <ApperIcon name="Loader2" className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <ApperIcon name="Upload" className="w-8 h-8 text-primary" />
            )}
          </motion.div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {loading ? 'Processing your resume...' : 'Upload your resume'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-sm text-gray-400">
              Supports PDF and DOCX files up to 10MB
            </p>
          </div>
          
          {!loading && (
            <Button variant="outline" size="sm">
              Choose File
            </Button>
          )}
        </div>
      </motion.div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-sm text-red-600 flex items-center">
            <ApperIcon name="AlertCircle" className="w-4 h-4 mr-2" />
            {error}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;