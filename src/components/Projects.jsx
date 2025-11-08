import { useEffect, useRef, useState } from 'react'
import { FaShoppingCart, FaTasks, FaChartLine, FaUniversity, FaComments, FaCloudSun, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with payment integration, inventory management, and admin dashboard.',
      tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Stripe'],
      category: 'Full Stack',
      icon: FaShoppingCart,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
      tech: ['Node.js', 'React', 'MongoDB', 'Socket.io'],
      category: 'Full Stack',
      icon: FaTasks,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with data visualization and automated reporting.',
      tech: ['React', 'TypeScript', 'Chart.js', 'REST API'],
      category: 'Frontend',
      icon: FaChartLine,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Banking API Service',
      description: 'Secure RESTful API for banking operations with JWT authentication and transaction management.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT'],
      category: 'Backend',
      icon: FaUniversity,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Instant messaging platform with group chats, file sharing, and end-to-end encryption.',
      tech: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
      category: 'Full Stack',
      icon: FaComments,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      tech: ['React', 'Tailwind CSS', 'Weather API', 'Geolocation'],
      category: 'Frontend',
      icon: FaCloudSun,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ]

  const filters = ['All', 'Full Stack', 'Frontend', 'Backend']

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in full-stack development.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <project.icon className="text-8xl text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-center font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
