import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ATSScoreMeter from '@/components/molecules/ATSScoreMeter';
import KeywordPill from '@/components/molecules/KeywordPill';
import ApperIcon from '@/components/ApperIcon';

const OptimizationResults = ({ 
  results, 
  onDownloadPDF, 
  downloadLoading = false 
}) => {
  if (!results) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with ATS Score */}
      <motion.div variants={itemVariants}>
        <Card className="text-center">
          <div className="space-y-4">
            <ATSScoreMeter score={results.atsScore} animated />
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Resume Optimized!
              </h3>
              <p className="text-gray-600">
                Your resume has been enhanced to better match the job requirements
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              icon="Download"
              loading={downloadLoading}
              onClick={onDownloadPDF}
              className="w-full sm:w-auto"
            >
              Download Optimized Resume
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Keyword Analysis */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                Keyword Analysis
              </h4>
              <Badge variant="primary">
                {results.matchingKeywords?.length || 0} matched
              </Badge>
            </div>
            
            {results.keywordAnalysis && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {results.keywordAnalysis.total}
                  </div>
                  <div className="text-xs text-gray-600">Total Keywords</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.keywordAnalysis.matched}
                  </div>
                  <div className="text-xs text-gray-600">Matched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {results.keywordAnalysis.missing}
                  </div>
                  <div className="text-xs text-gray-600">Added</div>
                </div>
              </div>
            )}

            {results.matchingKeywords && results.matchingKeywords.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  Matched Keywords
                </h5>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {results.matchingKeywords.map((keyword, index) => (
                      <KeywordPill
                        key={keyword}
                        keyword={keyword}
                        matched={true}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {results.missingKeywords && results.missingKeywords.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  Keywords Added to Your Resume
                </h5>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {results.missingKeywords.map((keyword, index) => (
                      <KeywordPill
                        key={keyword}
                        keyword={keyword}
                        matched={false}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Optimization Suggestions */}
      {results.suggestions && results.suggestions.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Optimization Suggestions
              </h4>
              
              <div className="space-y-3">
                {results.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                        ${suggestion.priority === 'high' ? 'bg-red-100' :
                          suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}
                      `}>
                        <ApperIcon 
                          name={
                            suggestion.priority === 'high' ? 'AlertTriangle' :
                            suggestion.priority === 'medium' ? 'AlertCircle' : 'Info'
                          }
                          className={`w-3 h-3 ${
                            suggestion.priority === 'high' ? 'text-red-600' :
                            suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                          }`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="text-sm font-medium text-gray-900">
                            {suggestion.title}
                          </h5>
                          <Badge 
                            variant={
                              suggestion.priority === 'high' ? 'danger' :
                              suggestion.priority === 'medium' ? 'warning' : 'primary'
                            }
                            size="xs"
                          >
                            {suggestion.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {suggestion.description}
                        </p>
                        
                        <p className="text-xs text-gray-500 italic">
                          💡 {suggestion.action}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Resume Comparison */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Resume Preview
            </h4>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed font-sans">
                  {results.optimizedText}
                </pre>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">
                  Optimization Complete
                </span>
              </div>
              
              <Button
                variant="primary"
                size="sm"
                icon="Download"
                loading={downloadLoading}
                onClick={onDownloadPDF}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default OptimizationResults;