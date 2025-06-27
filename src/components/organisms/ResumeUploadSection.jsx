import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FileUpload from '@/components/molecules/FileUpload';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { resumeService } from '@/services/api/resumeService';

const ResumeUploadSection = ({ onResumeUpload, currentResume }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (file) => {
    setUploading(true);
    
    try {
      const resume = await resumeService.uploadFile(file);
      onResumeUpload(resume);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleClearResume = () => {
    onResumeUpload(null);
    toast.info('Resume cleared');
  };

  if (currentResume) {
    return (
      <Card className="w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Current Resume
            </h3>
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={handleClearResume}
            >
              Clear
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ApperIcon name="FileText" className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-900 truncate">
                {currentResume.fileName}
              </p>
              <p className="text-xs text-green-700">
                Uploaded successfully • Ready for optimization
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500" />
            </div>
          </motion.div>
          
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              icon="Upload"
              onClick={() => handleClearResume()}
            >
              Upload Different Resume
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Your Resume
          </h3>
          <p className="text-gray-600 text-sm">
            Start by uploading your current resume to begin the optimization process
          </p>
        </div>
        
        <FileUpload
          onFileSelect={handleFileSelect}
          loading={uploading}
          accept=".pdf,.docx"
        />
        
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <ApperIcon name="Shield" className="w-4 h-4 mr-1" />
            Secure upload
          </div>
          <div className="flex items-center">
            <ApperIcon name="Zap" className="w-4 h-4 mr-1" />
            Instant processing
          </div>
          <div className="flex items-center">
            <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
            Privacy protected
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeUploadSection;