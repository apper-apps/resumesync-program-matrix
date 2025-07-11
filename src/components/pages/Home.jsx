import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ResumeUploadSection from '@/components/organisms/ResumeUploadSection';
import JobDescriptionInput from '@/components/organisms/JobDescriptionInput';
import OptimizationResults from '@/components/organisms/OptimizationResults';
import EmptyState from '@/components/organisms/EmptyState';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';
import ApperIcon from '@/components/ApperIcon';
import { optimizationService } from '@/services/api/optimizationService';

const Home = () => {
  const [currentResume, setCurrentResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleResumeUpload = (resume) => {
    setCurrentResume(resume);
    // Clear previous results when new resume is uploaded
    if (optimizationResults) {
      setOptimizationResults(null);
    }
  };

  const handleJobDescriptionChange = async (jdText) => {
    setJobDescription(jdText);
    
    if (currentResume && jdText.trim()) {
      await handleOptimization(currentResume.originalText, jdText);
    }
  };

  const handleOptimization = async (resumeText, jdText) => {
    setOptimizing(true);
    setOptimizationResults(null);
    
    try {
      const results = await optimizationService.optimizeResume(resumeText, jdText);
      setOptimizationResults(results);
      toast.success('Resume optimized successfully!');
    } catch (error) {
      console.error('Optimization error:', error);
      toast.error('Failed to optimize resume. Please try again.');
    } finally {
      setOptimizing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!optimizationResults) return;
    
    setDownloadLoading(true);
    
    try {
      const pdfResult = await optimizationService.generatePDF(
        optimizationResults.optimizedText,
        `optimized_resume_${Date.now()}.pdf`
      );
      
      // Create download link
      const link = document.createElement('a');
      link.href = pdfResult.url;
      link.download = pdfResult.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up URL
      URL.revokeObjectURL(pdfResult.url);
      
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const showEmptyState = !currentResume && !jobDescription && !optimizationResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ResumeSync</h1>
                <p className="text-xs text-gray-600">AI Resume Optimizer</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>Instant Results</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEmptyState ? (
          <EmptyState
            title="Transform Your Resume with AI"
            description="Get your resume noticed by employers with our intelligent optimization system. Upload your resume, paste a job description, and get an ATS-optimized version instantly."
            onAction={() => {
              // Scroll to upload section if it exists
              const uploadSection = document.querySelector('[data-upload-section]');
              if (uploadSection) {
                uploadSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        ) : (
<div className="space-y-8">
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
            >
              <motion.div 
                className={`flex items-center space-x-3 ${currentResume ? 'text-green-600' : 'text-gray-400'}`}
                animate={{ 
                  scale: currentResume ? 1.05 : 1,
                  opacity: 1 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative overflow-hidden ${
                    currentResume ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  animate={{ 
                    borderColor: currentResume ? '#10b981' : '#d1d5db',
                    backgroundColor: currentResume ? '#ecfdf5' : '#ffffff',
                    scale: currentResume ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {currentResume ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <ApperIcon name="Check" className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm font-semibold">1</span>
                  )}
                </motion.div>
                <span className="text-sm font-semibold">Upload Resume</span>
              </motion.div>
              
              <motion.div 
                className={`w-16 h-0.5 rounded-full ${currentResume ? 'bg-green-400' : 'bg-gray-300'}`}
                animate={{ 
                  backgroundColor: currentResume ? '#4ade80' : '#d1d5db',
                  scaleX: currentResume ? 1 : 0.7
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              <motion.div 
                className={`flex items-center space-x-3 ${jobDescription ? 'text-green-600' : currentResume ? 'text-blue-600' : 'text-gray-400'}`}
                animate={{ 
                  scale: jobDescription ? 1.05 : currentResume ? 1.02 : 1,
                  opacity: currentResume ? 1 : 0.6 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative overflow-hidden ${
                    jobDescription ? 'border-green-500 bg-green-50' : 
                    currentResume ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                  }`}
                  animate={{ 
                    borderColor: jobDescription ? '#10b981' : currentResume ? '#3b82f6' : '#d1d5db',
                    backgroundColor: jobDescription ? '#ecfdf5' : currentResume ? '#eff6ff' : '#ffffff',
                    scale: jobDescription ? [1, 1.1, 1] : currentResume ? 1.02 : 1
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {jobDescription ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <ApperIcon name="Check" className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm font-semibold">2</span>
                  )}
                </motion.div>
                <span className="text-sm font-semibold">Add Job Description</span>
              </motion.div>
              
              <motion.div 
                className={`w-16 h-0.5 rounded-full ${optimizationResults ? 'bg-green-400' : jobDescription ? 'bg-blue-400' : 'bg-gray-300'}`}
                animate={{ 
                  backgroundColor: optimizationResults ? '#4ade80' : jobDescription ? '#60a5fa' : '#d1d5db',
                  scaleX: optimizationResults ? 1 : jobDescription ? 0.8 : 0.7
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              <motion.div 
                className={`flex items-center space-x-3 ${optimizationResults ? 'text-green-600' : jobDescription ? 'text-orange-600' : 'text-gray-400'}`}
                animate={{ 
                  scale: optimizationResults ? 1.05 : jobDescription ? 1.02 : 1,
                  opacity: jobDescription ? 1 : 0.6 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center relative overflow-hidden ${
                    optimizationResults ? 'border-green-500 bg-green-50' : 
                    jobDescription ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white'
                  }`}
                  animate={{ 
                    borderColor: optimizationResults ? '#10b981' : jobDescription ? '#f97316' : '#d1d5db',
                    backgroundColor: optimizationResults ? '#ecfdf5' : jobDescription ? '#fff7ed' : '#ffffff',
                    scale: optimizationResults ? [1, 1.1, 1] : jobDescription ? 1.02 : 1
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {optimizationResults ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <ApperIcon name="Download" className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm font-semibold">3</span>
                  )}
                </motion.div>
                <span className="text-sm font-semibold">Download Optimized</span>
              </motion.div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div data-upload-section>
                  <ResumeUploadSection
                    onResumeUpload={handleResumeUpload}
                    currentResume={currentResume}
                  />
                </div>
                
                {currentResume && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <JobDescriptionInput
                      onJobDescriptionChange={handleJobDescriptionChange}
                      jobDescription={jobDescription}
                      loading={optimizing}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Right Column - Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {optimizing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <LoadingSpinner 
                      size="xl" 
                      text="Optimizing your resume..." 
                    />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-4 text-sm text-gray-600 text-center max-w-sm"
                    >
                      Our AI is analyzing the job description and enhancing your resume to maximize ATS compatibility
                    </motion.p>
                  </motion.div>
                )}
                
                {optimizationResults && !optimizing && (
                  <OptimizationResults
                    results={optimizationResults}
                    onDownloadPDF={handleDownloadPDF}
                    downloadLoading={downloadLoading}
                  />
                )}
                
                {!optimizing && !optimizationResults && currentResume && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="ArrowRight" className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ready for Job Description
                    </h3>
                    <p className="text-gray-600">
                      Add a job description to start optimizing your resume
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-600">
                © 2024 ResumeSync. Helping students land their dream jobs.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>Instant Processing</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;