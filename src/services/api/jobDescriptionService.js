const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let jobDescriptionData = [
  {
    Id: 1,
    text: "",
    keywords: [],
    requiredSkills: []
  }
];

export const jobDescriptionService = {
  async getAll() {
    await delay(200);
    return [...jobDescriptionData];
  },

  async getById(id) {
    await delay(150);
    const jd = jobDescriptionData.find(item => item.Id === parseInt(id, 10));
    return jd ? { ...jd } : null;
  },

  async create(jdData) {
    await delay(300);
    const maxId = jobDescriptionData.length > 0 ? Math.max(...jobDescriptionData.map(j => j.Id)) : 0;
    const keywords = this.extractKeywords(jdData.text || "");
    const requiredSkills = this.extractRequiredSkills(jdData.text || "");
    
    const newJD = {
      Id: maxId + 1,
      text: jdData.text || "",
      keywords,
      requiredSkills,
      ...jdData
    };
    jobDescriptionData.push(newJD);
    return { ...newJD };
  },

  async update(id, updateData) {
    await delay(250);
    const index = jobDescriptionData.findIndex(item => item.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Job description not found');
    }
    
    const updatedJD = {
      ...jobDescriptionData[index],
      ...updateData,
      Id: jobDescriptionData[index].Id
    };
    
    if (updateData.text) {
      updatedJD.keywords = this.extractKeywords(updateData.text);
      updatedJD.requiredSkills = this.extractRequiredSkills(updateData.text);
    }
    
    jobDescriptionData[index] = updatedJD;
    return { ...updatedJD };
  },

  async delete(id) {
    await delay(200);
    const index = jobDescriptionData.findIndex(item => item.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Job description not found');
    }
    jobDescriptionData.splice(index, 1);
    return true;
  },

  extractKeywords(text) {
    const commonKeywords = [
      'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C++',
      'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind', 'MongoDB', 'MySQL', 'PostgreSQL',
      'Git', 'Docker', 'AWS', 'Azure', 'Firebase', 'REST API', 'GraphQL', 'Redux',
      'Testing', 'Jest', 'Cypress', 'Agile', 'Scrum', 'CI/CD', 'DevOps', 'Linux',
      'Frontend', 'Backend', 'Full Stack', 'Mobile', 'Responsive', 'UI/UX'
    ];
    
    const textUpper = text.toUpperCase();
    return commonKeywords.filter(keyword => 
      textUpper.includes(keyword.toUpperCase())
    );
  },

  extractRequiredSkills(text) {
    const skillPatterns = [
      /(\w+(?:\.\w+)*)\s*(?:experience|skills?|proficiency|knowledge)/gi,
      /(?:experience|proficient|skilled)\s+(?:in|with)\s+([\w\s,/+-]+)/gi,
      /(?:must|should|required)\s+(?:have|know|understand)\s+([\w\s,/+-]+)/gi
    ];
    
    const skills = new Set();
    skillPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          const skillText = match[1].split(/[,&+/]/).map(s => s.trim());
          skillText.forEach(skill => {
            if (skill.length > 2 && skill.length < 30) {
              skills.add(skill);
            }
          });
        }
      }
    });
    
    return Array.from(skills).slice(0, 10);
  }
};