import { useEffect, useRef, useState } from 'react'
import { FaShoppingCart, FaTasks, FaChartLine, FaUniversity, FaComments, FaCloudSun, FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaMobileAlt, FaDatabase, FaRocket, FaCog } from 'react-icons/fa'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [filters, setFilters] = useState(['All'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sectionRef = useRef(null)

  // Replace this with your Google Apps Script Web App URL
  const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbzFetZamg9a8U5uS-ITwhOiabYuEkuq5GissJTXcMsevwxhYOwRCnDsG_uuLrsgkqru/exec'

  // CRUD Operations - uncomment to use

  // Create new project
  const createProject = async (projectData) => {
    try {
      const response = await fetch(`${SHEETS_API_URL}?action=create`, {
        method: 'POST',
        body: JSON.stringify(projectData)
      })
      return await response.json()
    } catch (error) {
      console.error('Error creating project:', error)
      return { success: false, message: error.message }
    }
  }

  // Update project
  const updateProject = async (id, projectData) => {
    try {
      const response = await fetch(`${SHEETS_API_URL}?action=update`, {
        method: 'POST',
        body: JSON.stringify({ id, ...projectData })
      })
      return await response.json()
    } catch (error) {
      console.error('Error updating project:', error)
      return { success: false, message: error.message }
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${SHEETS_API_URL}?action=delete`, {
        method: 'POST',
        body: JSON.stringify({ id })
      })
      return await response.json()
    } catch (error) {
      console.error('Error deleting project:', error)
      return { success: false, message: error.message }
    }
  }

  // Icon mapping
  const iconMap = {
    FaShoppingCart,
    FaTasks,
    FaChartLine,
    FaUniversity,
    FaComments,
    FaCloudSun,
    FaCode,
    FaServer,
    FaMobileAlt,
    FaDatabase,
    FaRocket,
    FaCog,
  }

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

  // Fetch projects from Google Sheets
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${SHEETS_API_URL}?action=list`)

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()

        if (data.success && data.projects) {
          // Map icon strings to actual icon components
          const projectsWithIcons = data.projects.map(project => ({
            ...project,
            icon: iconMap[project.icon] || FaCode
          }))

          setProjects(projectsWithIcons)

          // Extract unique categories dynamically
          const categories = [...new Set(projectsWithIcons.map(p => p.category))].filter(Boolean)
          setFilters(['All', ...categories.sort()])

          setError(null)
        } else {
          throw new Error(data.message || 'Failed to load projects')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err.message)
        // Fallback to default projects if fetch fails
        const defaultProjects = getDefaultProjects()
        setProjects(defaultProjects)
        // Set default filters
        const defaultCategories = [...new Set(defaultProjects.map(p => p.category))]
        setFilters(['All', ...defaultCategories.sort()])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Default fallback projects
  const getDefaultProjects = () => [
    {
      title: 'Loan Management System (LMS)',
      description: 'An enterprise-grade web application designed to automate and manage the complete lifecycle of loan processing, EMI calculations, eligibility validation, and payment schedules for financial institutions.',
      tech: ['Java 17', 'Spring Boot', 'Microservices', 'Spring Security', 'JWT / RBAC', 'Apache Kafka', 'Hibernate/JPA', 'MySQL'],
      category: 'Full Stack',
      icon: FaUniversity,
      image: '',
      github: 'https://github.com/pavanwakade',
      demo: 'https://pavanwakade.netlify.app/',
    },
    {
      title: 'Online E-Commerce Platform',
      description: 'An enterprise-level online retail platform supporting product catalogs, shopping carts, order fulfillment, secure payments, shipment tracking, and real-time inventory synchronization.',
      tech: ['Java 17', 'Spring Boot', 'React.js', 'Microservices', 'Spring Security', 'JWT & OAuth2', 'Apache Kafka', 'MySQL'],
      category: 'Full Stack',
      icon: FaShoppingCart,
      image: '',
      github: 'https://github.com/pavanwakade',
      demo: 'https://pavanwakade.netlify.app/',
    },
  ]

  // const filters = ['All', 'Full Stack', 'Frontend', 'Backend'  ]

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="mb-4 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Featured Projects
          </h2>
          <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <p className="max-w-2xl mx-auto mb-12 text-center text-gray-600 dark:text-gray-400">
            Here are some of my recent projects that showcase my skills and expertise in full-stack development.
          </p>

          {error && (
            <div className="max-w-2xl p-4 mx-auto mb-8 text-center text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-300">
              Using default projects (Unable to connect to Google Sheets)
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 transition-all duration-300 bg-black/20 group-hover:bg-black/40"></div>
                      </>
                    ) : (
                      <>
                        <project.icon className="text-white transition-transform duration-300 text-8xl group-hover:scale-110" />
                        <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/20"></div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-blue-500">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-medium text-center text-white transition-all duration-300 bg-gray-900 rounded-lg dark:bg-gray-700 hover:scale-105"
                      >
                        <FaGithub /> GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-medium text-center text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
                      >
                        <FaExternalLinkAlt /> Demo
                      </a>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects