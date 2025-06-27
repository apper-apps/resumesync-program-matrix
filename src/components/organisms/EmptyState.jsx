import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({
  icon = 'FileText',
  title = 'Get started with ResumeSync',
  description = 'Upload your resume and paste a job description to optimize your application',
  actionLabel = 'Upload Resume',
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-16 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-12 h-12 text-primary" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              icon="Upload"
              onClick={onAction}
              className="mt-4"
            >
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Upload" className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">1. Upload Resume</h4>
          <p className="text-sm text-gray-600">Upload your current resume in PDF or DOCX format</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="FileText" className="w-6 h-6 text-orange-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">2. Add Job Description</h4>
          <p className="text-sm text-gray-600">Paste the job description you're applying for</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ApperIcon name="Sparkles" className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">3. Get Optimized</h4>
          <p className="text-sm text-gray-600">Download your ATS-optimized resume instantly</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;