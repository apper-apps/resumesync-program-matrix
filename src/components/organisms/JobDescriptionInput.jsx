import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import TextArea from '@/components/atoms/TextArea';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const JobDescriptionInput = ({ onJobDescriptionChange, jobDescription, loading }) => {
  const [text, setText] = useState(jobDescription || '');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    onJobDescriptionChange(text);
  };

  const handleClear = () => {
    setText('');
    onJobDescriptionChange('');
  };

  const sampleJD = `We are seeking a Senior Frontend Developer to join our dynamic team. The ideal candidate will have:

• 3+ years of experience with React and TypeScript
• Strong knowledge of HTML5, CSS3, and modern JavaScript (ES6+)
• Experience with state management libraries (Redux, Zustand)
• Familiarity with testing frameworks (Jest, Cypress, React Testing Library)
• Understanding of responsive design principles and mobile-first development
• Experience with version control systems (Git) and collaborative development
• Knowledge of modern build tools (Webpack, Vite) and CI/CD pipelines
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

Bonus points for:
• Experience with Next.js or other React frameworks
• Backend development experience with Node.js
• Knowledge of cloud platforms (AWS, Azure, GCP)
• Understanding of accessibility standards (WCAG)
• Experience with design systems and component libraries

Join us to work on exciting projects with modern technologies in an agile environment!`;

  const useSample = () => {
    setText(sampleJD);
  };

  return (
    <Card className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Job Description
            </h3>
            <p className="text-sm text-gray-600">
              Paste the job description you want to optimize your resume for
            </p>
          </div>
          
          {text && (
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the job description here..."
            rows={expanded ? 12 : 6}
            showCharCount
            maxLength={5000}
            className="resize-none"
          />
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <ApperIcon 
                name={expanded ? 'ChevronUp' : 'ChevronDown'} 
                className="w-4 h-4 mr-1" 
              />
              {expanded ? 'Show less' : 'Show more'}
            </button>
            
            {!text && (
              <button
                onClick={useSample}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <ApperIcon name="Sparkles" className="w-4 h-4 mr-1" />
                Use sample JD
              </button>
            )}
          </div>
        </div>

        {text && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ApperIcon name="FileText" className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Job description ready
                </p>
                <p className="text-xs text-blue-700">
                  {text.length} characters • Ready for analysis
                </p>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              Analyze
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default JobDescriptionInput;