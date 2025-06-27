import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ATSScoreMeter = ({ score = 0, size = 120, animated = true }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  
  useEffect(() => {
    if (animated) {
      let start = 0;
      const end = score;
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);
  
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    if (score >= 40) return '#FB923C'; // Orange
    return '#EF4444'; // Red
  };
  
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          height={size}
          width={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
          
          {/* Progress circle */}
          <motion.circle
            stroke={getScoreColor(displayScore)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900"
            style={{ color: getScoreColor(displayScore) }}
          >
            {displayScore}%
          </motion.span>
          <span className="text-xs text-gray-500 font-medium">
            ATS Score
          </span>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${displayScore >= 80 ? 'bg-green-100 text-green-800' : 
            displayScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
            displayScore >= 40 ? 'bg-orange-100 text-orange-800' : 
            'bg-red-100 text-red-800'}
        `}>
          {getScoreLabel(displayScore)}
        </div>
      </motion.div>
    </div>
  );
};

export default ATSScoreMeter;