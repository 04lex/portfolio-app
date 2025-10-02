import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Download, ChevronDown, Moon, Sun, Code2, Database, Terminal } from 'lucide-react';

// ForesightJS Hook Implementation
const useForesight = (options = {}) => {
  const elementRef = useRef(null);
  const registerResults = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Simple foresight-like behavior: preload on hover
    const element = elementRef.current;
    
    const handleMouseEnter = () => {
      if (options.onPredict) {
        options.onPredict();
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    registerResults.current = {
      unregister: () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
      }
    };

    return () => {
      if (registerResults.current) {
        registerResults.current.unregister();
      }
    };
  }, [options.onPredict]);

  return { elementRef, registerResults };
};

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Initialize dark mode from memory
  useEffect(() => {
    const savedMode = window.darkModePreference === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    window.darkModePreference = darkMode;
  }, [darkMode]);

  // Connection-aware image quality detection
  useEffect(() => {
    const loadImages = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      let imageQuality = 'high';
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          imageQuality = 'low';
        } else if (effectiveType === '3g') {
          imageQuality = 'medium';
        }
      }

      const saveData = navigator.connection?.saveData;
      if (saveData) {
        imageQuality = 'low';
      }

      window.imageQualityPreference = imageQuality;
    };

    loadImages();
  }, []);

  // Lazy load images with intersection observer
  useEffect(() => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src && !img.src) {
            img.src = src;
            img.classList.add('loaded');
            setImagesLoaded(prev => ({ ...prev, [src]: true }));
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, [expandedProject]);

  const portfolioData = {
    name: "Daniel Alexandru",
    title: "Python Developer | Software Engineering Intern",
    tagline: "Crafting elegant solutions to complex problems",
    email: "aalexandrua62@gmail.com",
    github: "https://github.com/04lex",
    linkedin: "https://www.linkedin.com/in/daniel-alexandru-105712180/",
    resume: "#",
    
    about: {
      description: "I'm a Computer Science student with a passion for backend development and data engineering. I specialize in building scalable Python applications and RESTful APIs. My approach combines clean code principles with practical problem-solving to deliver solutions that make a real impact. Currently seeking internship opportunities where I can contribute to meaningful projects and grow as a developer.",
      education: "B.S. Computer Science | Tech University | Expected May 2026",
      gpa: "3.8 GPA"
    },
    
    skills: {
      languages: ["Python", "JavaScript", "SQL", "HTML/CSS"],
      frameworks: ["Django", "Flask", "FastAPI", "React"],
      tools: ["Git", "Docker", "PostgreSQL", "MongoDB"],
      concepts: ["REST APIs", "Microservices", "CI/CD", "Testing", "Data Structures", "Algorithms"]
    },
    
    projects: [
      {
        id: 1,
        title: "E-Commerce API Platform",
        shortDesc: "Scalable REST API with payment integration and real-time inventory",
        fullDesc: "Built a comprehensive e-commerce backend supporting 10,000+ concurrent users. Implemented secure payment processing with Stripe, real-time inventory management, and order tracking system.",
        tech: ["Python", "Django", "PostgreSQL", "Redis", "Celery"],
        features: [
          "JWT authentication with role-based access control",
          "Stripe payment integration with webhook handling",
          "Real-time inventory updates using Redis cache",
          "Asynchronous task processing with Celery",
          "RESTful API with comprehensive documentation"
        ],
        challenges: "Optimized database queries reducing response time by 70%. Implemented Redis caching strategy for frequently accessed product data.",
        liveUrl: "https://ecommerce-api-demo.vercel.app",
        githubUrl: "https://github.com/alexrivera/ecommerce-api",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=250&fit=crop&q=30"
      },
      {
        id: 2,
        title: "AI Code Review Assistant",
        shortDesc: "ML-powered tool that analyzes code quality and suggests improvements",
        fullDesc: "Developed an intelligent code review system using natural language processing to analyze Python code. Provides automated suggestions for code improvements, detects potential bugs, and enforces style guidelines.",
        tech: ["Python", "FastAPI", "OpenAI API", "React", "Docker"],
        features: [
          "Automated code quality analysis",
          "AI-powered improvement suggestions",
          "Integration with GitHub webhooks",
          "Real-time code review dashboard",
          "Custom rule configuration"
        ],
        challenges: "Integrated OpenAI API with custom prompts for accurate code analysis. Implemented efficient rate limiting and caching.",
        liveUrl: "https://code-review-ai.vercel.app",
        githubUrl: "https://github.com/alexrivera/ai-code-review",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&q=30"
      },
      {
        id: 3,
        title: "Real-Time Analytics Dashboard",
        shortDesc: "Interactive dashboard for monitoring application metrics and logs",
        fullDesc: "Created a real-time analytics platform that processes and visualizes application metrics. Features live data streaming, custom alert configurations, and historical data analysis.",
        tech: ["Python", "Flask", "React", "WebSocket", "MongoDB"],
        features: [
          "Real-time data streaming with WebSockets",
          "Interactive data visualizations",
          "Custom alert and notification system",
          "Historical data analysis and reporting",
          "Multi-tenant architecture"
        ],
        challenges: "Handled high-frequency data streams efficiently. Implemented aggregation pipeline in MongoDB for complex analytics queries.",
        liveUrl: "https://analytics-dash.vercel.app",
        githubUrl: "https://github.com/alexrivera/analytics-dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&q=30"
      },
      {
        id: 4,
        title: "Automated Testing Framework",
        shortDesc: "Python framework for end-to-end API testing with CI/CD integration",
        fullDesc: "Designed a comprehensive testing framework for REST APIs with automatic test generation, parallel execution, and detailed reporting. Integrated with popular CI/CD platforms.",
        tech: ["Python", "Pytest", "Docker", "GitHub Actions"],
        features: [
          "Automatic test case generation from OpenAPI specs",
          "Parallel test execution for faster runs",
          "Detailed HTML test reports",
          "CI/CD pipeline integration",
          "Mock server for isolated testing"
        ],
        challenges: "Designed flexible architecture supporting multiple API specifications. Achieved 95% code coverage with automated tests.",
        githubUrl: "https://github.com/alexrivera/api-test-framework",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop&q=30"
      },
      {
        id: 5,
        title: "Task Automation CLI Tool",
        shortDesc: "Command-line utility for automating repetitive development tasks",
        fullDesc: "Built a powerful CLI tool that automates common development workflows including project scaffolding, dependency management, and deployment processes.",
        tech: ["Python", "Click", "Jinja2", "Docker"],
        features: [
          "Interactive project initialization",
          "Template-based code generation",
          "Dependency analysis and updates",
          "One-command deployment",
          "Plugin system for extensibility"
        ],
        challenges: "Created intuitive CLI interface with comprehensive help system. Implemented plugin architecture for community extensions.",
        githubUrl: "https://github.com/alexrivera/dev-cli-tool",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop&q=30"
      },
      {
        id: 6,
        title: "Social Media Sentiment Analyzer",
        shortDesc: "NLP application for analyzing sentiment in social media posts",
        fullDesc: "Developed a sentiment analysis tool that processes social media data in real-time, identifying trends and generating insights using natural language processing.",
        tech: ["Python", "Pandas", "NLTK", "Flask", "Chart.js"],
        features: [
          "Real-time sentiment classification",
          "Trend detection and visualization",
          "Multi-language support",
          "Export reports in multiple formats",
          "RESTful API for integration"
        ],
        challenges: "Optimized NLP model for real-time processing. Handled multiple languages with 85% accuracy.",
        githubUrl: "https://github.com/alexrivera/sentiment-analyzer",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
        imageLowRes: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop&q=30"
      }
    ],
    
    experience: [
      {
        title: "Software Engineering Intern",
        company: "TechCorp Solutions",
        duration: "Jun 2024 - Aug 2024",
        achievements: [
          "Developed Python microservices processing 50,000+ daily transactions",
          "Reduced API response time by 45% through database optimization and caching",
          "Implemented automated testing suite achieving 90% code coverage",
          "Collaborated with 8-person team using Agile methodologies and Git workflow"
        ],
        tech: ["Python", "Django", "PostgreSQL", "Redis", "Docker"]
      },
      {
        title: "Backend Developer",
        company: "University Research Lab",
        duration: "Jan 2024 - May 2024",
        achievements: [
          "Built data processing pipeline for analyzing 100GB+ research datasets",
          "Automated data collection reducing manual work by 80%",
          "Created REST API serving research data to 200+ student users",
          "Documented codebase and created technical guides for future developers"
        ],
        tech: ["Python", "FastAPI", "MongoDB", "Pandas"]
      }
    ]
  };

  // Preload image function
  const preloadImage = (src) => {
    if (!src || preloadedImages.has(src)) return;
    
    const img = new Image();
    img.src = src;
    setPreloadedImages(prev => new Set([...prev, src]));
  };

  // Preload section content
  const preloadSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const images = section.querySelectorAll('img[data-src]');
      images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) preloadImage(src);
      });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Optimized image component with ForesightJS principles
  const OptimizedImage = ({ src, lowResSrc, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageQuality = window.imageQualityPreference || 'high';
    
    const imageSrc = imageQuality === 'low' ? lowResSrc : src;

    return (
      <div className={`relative ${className}`}>
        <img
          data-src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          style={{ backgroundColor: '#e5e7eb' }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
        )}
      </div>
    );
  };

  const ProjectCard = ({ project }) => {
    const isExpanded = expandedProject === project.id;
    
    // ForesightJS hook for predictive preloading
    const { elementRef } = useForesight({
      onPredict: () => {
        // Preload project image when user hovers
        preloadImage(project.image);
        preloadImage(project.imageLowRes);
      }
    });
    
    return (
      <div 
        ref={elementRef}
        className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
      >
        <div className="relative overflow-hidden group h-56">
          <OptimizedImage
            src={project.image}
            lowResSrc={project.imageLowRes}
            alt={project.title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {project.shortDesc}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                {tech}
              </span>
            ))}
          </div>
          
          {isExpanded && (
            <div className={`mb-4 space-y-4 border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                {project.fullDesc}
              </p>
              
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Key Features
                </h4>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Challenges & Solutions
                </h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {project.challenges}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${darkMode ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <Github size={16} />
              Code
            </a>
            <button
              onClick={() => setExpandedProject(isExpanded ? null : project.id)}
              className={`ml-auto px-4 py-2 font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Navigation button with ForesightJS
  const NavButton = ({ section, children }) => {
    const { elementRef } = useForesight({
      onPredict: () => {
        preloadSection(section);
      }
    });

    return (
      <button
        ref={elementRef}
        onClick={() => scrollToSection(section)}
        className={`capitalize transition-colors font-medium hover:text-blue-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {children}
      </button>
    );
  };

  // Link with ForesightJS
  const PredictiveLink = ({ href, children, className, external = false, onPredict }) => {
    const { elementRef } = useForesight({
      onPredict: onPredict || (() => {})
    });

    return (
      <a
        ref={elementRef}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${darkMode ? 'bg-gray-900/90 shadow-gray-800/50' : 'bg-white/90 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
            
            <div className="hidden md:flex items-center gap-8">
              {['about', 'projects', 'experience', 'contact'].map((section) => (
                <NavButton key={section} section={section}>
                  {section}
                </NavButton>
              ))}
              <a
                href={portfolioData.resume}
                download
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <Download size={16} />
                Resume
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={darkMode ? 'text-gray-300' : 'text-gray-600'}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['about', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {section}
                </button>
              ))}
              <a
                href={portfolioData.resume}
                download
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 w-full justify-center font-medium"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 flex justify-center gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <Code2 className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={32} />
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
              <Database className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={32} />
            </div>
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <Terminal className={darkMode ? 'text-green-400' : 'text-green-600'} size={32} />
            </div>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {portfolioData.name}
          </h2>
          <p className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
            {portfolioData.title}
          </p>
          <p className={`text-lg md:text-xl mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {portfolioData.tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => preloadSection('projects')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-lg"
            >
              View Projects
            </button>
            <a
              href={portfolioData.resume}
              download
              className={`px-8 py-3.5 rounded-lg transition-all duration-300 font-medium text-lg ${darkMode ? 'border-2 border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Download Resume
            </a>
          </div>
          
          <div className="flex justify-center gap-6 mb-12">
            <PredictiveLink 
              href={portfolioData.github} 
              external
              className={`transition-all duration-300 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Github size={28} />
            </PredictiveLink>
            <PredictiveLink 
              href={portfolioData.linkedin} 
              external
              className={`transition-all duration-300 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Linkedin size={28} />
            </PredictiveLink>
            <PredictiveLink 
              href={`mailto:${portfolioData.email}`}
              className={`transition-all duration-300 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Mail size={28} />
            </PredictiveLink>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown size={36} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
          </div>
        </div>
      </section>

      <section id="about" className={`py-24 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-10 rounded-full"></div>
          
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {portfolioData.about.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {portfolioData.about.education}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                {portfolioData.about.gpa}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(portfolioData.skills).map(([category, skills]) => (
              <div key={category} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold mb-4 capitalize text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={`py-24 px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-16 rounded-full"></div>
          
          <div className="space-y-12">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className={`relative pl-8 border-l-2 ${darkMode ? 'border-blue-500' : 'border-blue-600'}`}>
                <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {exp.title}
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {exp.company} | {exp.duration}
                </p>
                <ul className="space-y-3 mb-5">
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-blue-500 mr-3 mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, j) => (
                    <span key={j} className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          
          <p className={`text-lg mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm actively seeking internship opportunities for Summer 2025. Let's build something amazing together!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <PredictiveLink
              href={`mailto:${portfolioData.email}`}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              Email Me
            </PredictiveLink>
            <PredictiveLink
              href={portfolioData.linkedin}
              external
              className={`flex items-center gap-2 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium ${darkMode ? 'border-2 border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <Linkedin size={20} />
              LinkedIn
            </PredictiveLink>
            <PredictiveLink
              href={portfolioData.github}
              external
              className={`flex items-center gap-2 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium ${darkMode ? 'border-2 border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <Github size={20} />
              GitHub
            </PredictiveLink>
          </div>
        </div>
      </section>

      <footer className={`py-10 px-6 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 {portfolioData.name}. Built with React & Tailwind CSS.
          </p>
          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Optimized with ForesightJS-inspired predictive preloading for better performance
          </p>
          <PredictiveLink 
            href="https://github.com/alexrivera/portfolio" 
            external
            className={`inline-flex items-center gap-2 transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <Github size={18} />
            View Source Code
          </PredictiveLink>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;