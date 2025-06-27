const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let resumeData = [
  {
    Id: 1,
    originalText: "",
    optimizedText: "",
    fileName: "",
    uploadDate: new Date().toISOString(),
    atsScore: 0
  }
];

export const resumeService = {
  async getAll() {
    await delay(300);
    return [...resumeData];
  },

  async getById(id) {
    await delay(200);
    const resume = resumeData.find(item => item.Id === parseInt(id, 10));
    return resume ? { ...resume } : null;
  },

  async create(resumeData) {
    await delay(400);
    const maxId = resumeData.length > 0 ? Math.max(...resumeData.map(r => r.Id)) : 0;
    const newResume = {
      Id: maxId + 1,
      originalText: resumeData.originalText || "",
      optimizedText: "",
      fileName: resumeData.fileName || "",
      uploadDate: new Date().toISOString(),
      atsScore: 0,
      ...resumeData
    };
    resumeData.push(newResume);
    return { ...newResume };
  },

  async update(id, updateData) {
    await delay(300);
    const index = resumeData.findIndex(item => item.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Resume not found');
    }
    
    const updatedResume = {
      ...resumeData[index],
      ...updateData,
      Id: resumeData[index].Id // Prevent ID modification
    };
    resumeData[index] = updatedResume;
    return { ...updatedResume };
  },

  async delete(id) {
    await delay(250);
    const index = resumeData.findIndex(item => item.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Resume not found');
    }
    resumeData.splice(index, 1);
    return true;
  },

  async uploadFile(file) {
    await delay(500);
    
    const text = await this.extractTextFromFile(file);
    const newResume = await this.create({
      originalText: text,
      fileName: file.name,
      uploadDate: new Date().toISOString()
    });
    
    return newResume;
  },

  async extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
      if (file.type === 'application/pdf') {
        // Simulate PDF text extraction
        setTimeout(() => {
          resolve(`John Smith
Contact: john.smith@email.com | (555) 123-4567

PROFESSIONAL SUMMARY
Experienced software developer with 3+ years building web applications using modern JavaScript frameworks. Passionate about creating user-friendly interfaces and writing clean, maintainable code.

TECHNICAL SKILLS
• Programming Languages: JavaScript, HTML, CSS, Python
• Frameworks & Libraries: React, Node.js, Express
• Databases: MongoDB, MySQL
• Tools: Git, VS Code, npm

PROFESSIONAL EXPERIENCE

Software Developer | Tech Solutions Inc. | 2021 - Present
• Developed and maintained web applications using React and Node.js
• Collaborated with cross-functional teams to deliver projects on time
• Implemented responsive designs and optimized application performance
• Participated in code reviews and maintained coding standards

Junior Developer | StartupCo | 2020 - 2021
• Built user interfaces using HTML, CSS, and JavaScript
• Worked with REST APIs to integrate frontend with backend services
• Fixed bugs and implemented new features based on user feedback

EDUCATION
Bachelor of Science in Computer Science
State University | 2020

PROJECTS
Personal Portfolio Website
• Built responsive portfolio site using React and deployed on Netlify
• Showcased projects with detailed descriptions and live demos`);
        }, 1000);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Simulate DOCX text extraction
        setTimeout(() => {
          resolve(`Sarah Johnson
Email: sarah.johnson@gmail.com | Phone: (555) 987-6543

OBJECTIVE
Recent graduate seeking a frontend development position where I can apply my knowledge of modern web technologies and contribute to innovative projects.

EDUCATION
Bachelor of Science in Information Technology
City University | May 2023
GPA: 3.8/4.0

TECHNICAL SKILLS
Frontend: HTML5, CSS3, JavaScript, React, Vue.js
Backend: Node.js, Python, PHP
Databases: MySQL, PostgreSQL, MongoDB
Tools: Git, GitHub, VS Code, Figma

PROJECTS

E-commerce Website (React)
• Developed a full-stack e-commerce application using React and Node.js
• Implemented user authentication, shopping cart, and payment integration
• Used Redux for state management and MongoDB for data storage

Task Management App (Vue.js)
• Created a responsive task management application with Vue.js
• Implemented drag-and-drop functionality and real-time updates
• Deployed using Firebase hosting and authentication

Weather Dashboard
• Built a weather dashboard consuming OpenWeatherMap API
• Implemented location-based weather forecasts and interactive charts
• Responsive design optimized for mobile and desktop

EXPERIENCE

Web Development Intern | Digital Agency | Summer 2022
• Assisted in developing client websites using HTML, CSS, and JavaScript
• Collaborated with designers to implement pixel-perfect designs
• Gained experience with content management systems and SEO best practices

CERTIFICATIONS
• JavaScript Algorithms and Data Structures (freeCodeCamp)
• Responsive Web Design (freeCodeCamp)`);
        }, 800);
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  }
};