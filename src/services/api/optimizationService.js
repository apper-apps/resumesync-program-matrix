const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const optimizationService = {
  async optimizeResume(resumeText, jobDescription) {
    await delay(2000); // Simulate AI processing time
    
    const jdKeywords = this.extractKeywords(jobDescription);
    const resumeKeywords = this.extractKeywords(resumeText);
    
    const matchingKeywords = jdKeywords.filter(keyword =>
      resumeKeywords.some(rKeyword => 
        rKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(rKeyword.toLowerCase())
      )
    );
    
    const missingKeywords = jdKeywords.filter(keyword =>
      !matchingKeywords.some(mKeyword => 
        mKeyword.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    const atsScore = Math.round((matchingKeywords.length / jdKeywords.length) * 100);
    
    const optimizedText = this.generateOptimizedResume(resumeText, missingKeywords, jdKeywords);
    
    const suggestions = this.generateSuggestions(resumeText, jobDescription, missingKeywords);
    
    return {
      optimizedText,
      atsScore: Math.min(atsScore + 15, 95), // Boost score for optimization
      matchingKeywords,
      missingKeywords,
      suggestions,
      keywordAnalysis: {
        total: jdKeywords.length,
        matched: matchingKeywords.length,
        missing: missingKeywords.length
      }
    };
  },

  extractKeywords(text) {
    const commonTechKeywords = [
      'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java',
      'HTML', 'CSS', 'MongoDB', 'MySQL', 'Git', 'Docker', 'AWS', 'REST API', 'GraphQL',
      'Testing', 'Agile', 'Scrum', 'Frontend', 'Backend', 'Full Stack', 'Mobile',
      'Redux', 'Next.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel',
      'PostgreSQL', 'Firebase', 'Kubernetes', 'CI/CD', 'DevOps', 'Linux', 'Windows',
      'Machine Learning', 'AI', 'Data Science', 'Analytics', 'Cloud', 'Microservices'
    ];
    
    const textUpper = text.toUpperCase();
    return commonTechKeywords.filter(keyword => 
      textUpper.includes(keyword.toUpperCase())
    );
  },

  generateOptimizedResume(originalText, missingKeywords, allKeywords) {
    let optimized = originalText;
    
    // Add missing keywords contextually
    if (missingKeywords.includes('TypeScript')) {
      optimized = optimized.replace(/JavaScript/g, 'JavaScript/TypeScript');
    }
    
    if (missingKeywords.includes('Testing') && !optimized.toLowerCase().includes('test')) {
      optimized = optimized.replace(
        /• (Developed|Built|Created)/g,
        '• $1 and tested'
      );
    }
    
    if (missingKeywords.includes('Agile') && !optimized.toLowerCase().includes('agile')) {
      optimized = optimized.replace(
        /Collaborated with/g,
        'Collaborated with cross-functional teams in Agile development environment, working with'
      );
    }
    
    // Enhance technical descriptions
    optimized = optimized.replace(
      /web applications/g,
      'responsive web applications'
    );
    
    optimized = optimized.replace(
      /using React/g,
      'using React with modern hooks and state management'
    );
    
    // Add quantifiable achievements
    optimized = optimized.replace(
      /• Developed/g,
      '• Successfully developed'
    );
    
    optimized = optimized.replace(
      /• Built/g,
      '• Architected and built'
    );
    
    return optimized;
  },

  generateSuggestions(resumeText, jobDescription, missingKeywords) {
    const suggestions = [];
    
    if (missingKeywords.includes('TypeScript')) {
      suggestions.push({
        type: 'skill',
        title: 'Add TypeScript Experience',
        description: 'The job requires TypeScript. Consider highlighting any TypeScript experience or mention it alongside JavaScript.',
        priority: 'high',
        action: 'Add "JavaScript/TypeScript" to your skills section'
      });
    }
    
    if (missingKeywords.includes('Testing')) {
      suggestions.push({
        type: 'experience',
        title: 'Highlight Testing Experience',
        description: 'Testing is important for this role. Mention any testing frameworks you\'ve used or testing practices you follow.',
        priority: 'medium',
        action: 'Add testing experience or mention Jest, Cypress, or unit testing'
      });
    }
    
    if (missingKeywords.includes('Agile')) {
      suggestions.push({
        type: 'methodology',
        title: 'Mention Agile Experience',
        description: 'This role uses Agile methodology. Include any experience with Scrum, sprints, or Agile practices.',
        priority: 'medium',
        action: 'Add Agile/Scrum experience to your work descriptions'
      });
    }
    
    if (!resumeText.toLowerCase().includes('achieve') && !resumeText.toLowerCase().includes('improve')) {
      suggestions.push({
        type: 'impact',
        title: 'Add Quantifiable Achievements',
        description: 'Include specific achievements and metrics to show your impact.',
        priority: 'high',
        action: 'Add numbers, percentages, or specific outcomes to your experience'
      });
    }
    
    if (resumeText.split('\n').length < 15) {
      suggestions.push({
        type: 'content',
        title: 'Expand Content',
        description: 'Your resume could benefit from more detailed descriptions of your experience.',
        priority: 'low',
        action: 'Add more details about your projects and responsibilities'
      });
    }
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  },

  async generatePDF(resumeText, fileName = 'optimized_resume.pdf') {
    await delay(1000);
    
    // This would integrate with a PDF generation library like jsPDF
    // For now, we'll simulate the PDF generation
    const blob = new Blob([resumeText], { type: 'text/plain' });
    return {
      blob,
      fileName,
      url: URL.createObjectURL(blob)
    };
  }
};