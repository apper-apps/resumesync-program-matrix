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
        animate={{ 
          scale: dragActive ? 1.02 : 1, 
          opacity: 1 
        }}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center
          transition-all duration-300 cursor-pointer backdrop-blur-sm
          ${dragActive 
            ? 'border-primary bg-blue-50/80 shadow-lg' 
            : 'border-gray-300 hover:border-primary/50 hover:bg-blue-50/30'
          }
          ${loading ? 'pointer-events-none' : ''}
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
            animate={{ 
              scale: dragActive ? 1.15 : loading ? 1.05 : 1,
              rotate: loading ? 360 : 0
            }}
            transition={{ 
              scale: { duration: 0.2 },
              rotate: { duration: 2, repeat: loading ? Infinity : 0, ease: "linear" }
            }}
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              loading 
                ? 'bg-primary/10 border-2 border-primary/20' 
                : dragActive 
                ? 'bg-primary/20' 
                : 'bg-blue-100'
            }`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader2" className="w-8 h-8 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ 
                  y: dragActive ? [-2, 2, -2] : 0,
                  scale: dragActive ? 1.1 : 1
                }}
                transition={{ 
                  y: { duration: 1, repeat: dragActive ? Infinity : 0 },
                  scale: { duration: 0.2 }
                }}
              >
                <ApperIcon name="Upload" className="w-8 h-8 text-primary" />
              </motion.div>
            )}
          </motion.div>
          
          <motion.div
            animate={{ opacity: loading ? 0.7 : 1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {loading ? 'Processing your resume...' : dragActive ? 'Drop your file here' : 'Upload your resume'}
            </h3>
            <p className="text-gray-500 mb-4">
              {loading ? 'Please wait while we process your file' : 'Drag and drop your file here, or click to browse'}
            </p>
            <p className="text-sm text-gray-400">
              Supports PDF and DOCX files up to 10MB
            </p>
          </motion.div>
          
          {!loading && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm">
                <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </motion.div>
          )}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 text-sm text-primary"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ApperIcon name="Sparkles" className="w-4 h-4" />
              </motion.div>
              <span>Extracting text and analyzing content...</span>
            </motion.div>
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