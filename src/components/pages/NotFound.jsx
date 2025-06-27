import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="FileQuestion" className="w-16 h-16 text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page not found</h2>
          <p className="text-gray-600 leading-relaxed">
            Oops! The page you're looking for doesn't exist. Let's get you back to optimizing your resume.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            variant="primary"
            size="lg"
            icon="Home"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Back to ResumeSync
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Upload" className="w-4 h-4" />
              <span>Upload Resume</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Sparkles" className="w-4 h-4" />
              <span>AI Optimization</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Download" className="w-4 h-4" />
              <span>Download PDF</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;