import { useEffect, useRef, useState } from 'react'
import { FaShoppingCart, FaTasks, FaChartLine, FaUniversity, FaComments, FaCloudSun, FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaMobile, FaRocket, FaGamepad, FaBrain } from 'react-icons/fa'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const sectionRef = useRef(null)

  // Google Apps Script Web App URL (replace with your deployed script URL)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCKedk2S2ItX6Xd8skIy2fcFOFoMGd79Hm-8LmQGeABtwdhPtlUlQAbpNVMa16wHi_Yw/exec';
// AKfycbxCKedk2S2ItX6Xd8skIy2fcFOFoMGd79Hm-8LmQGeABtwdhPtlUlQAbpNVMa16wHi_Yw
  // Icon mapping for different project types
  const iconMap = {
    'FaShoppingCart': FaShoppingCart,
    'FaTasks': FaTasks,
    'FaChartLine': FaChartLine,
    'FaUniversity': FaUniversity,
    'FaComments': FaComments,
    'FaCloudSun': FaCloudSun,
    'FaCode': FaCode,
    'FaDatabase': FaDatabase,
    'FaMobile': FaMobile,
    'FaRocket': FaRocket,
    'FaGamepad': FaGamepad,
    'FaBrain': FaBrain,
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
        const response = await fetch(GOOGLE_SCRIPT_URL)
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()
        
        if (data.result === 'success' && data.projects) {
          // Transform the data to include proper icon components
          const transformedProjects = data.projects.map(project => ({
            ...project,
            icon: iconMap[project.iconName] || FaCode,
            tech: Array.isArray(project.tech) ? project.tech : project.tech.split(',').map(t => t.trim())
          }))
          setProjects(transformedProjects)
        } else {
          throw new Error(data.message || 'Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err.message)
        // Fallback to empty array if fetch fails
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Handle image load errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }))
  }

  // Get unique categories from projects
  const filters = ['All', ...new Set(projects.map(p => p.category))]

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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">Failed to load projects</p>
              <p className="text-red-500 dark:text-red-500 text-sm">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
              <p className="text-blue-600 dark:text-blue-400 font-medium">No projects found</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Projects will appear here once added to the sheet</p>
            </div>
          ) : (
            <>
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
                {filteredProjects.map((project, index) => {
                  const IconComponent = project.icon
                  const hasImage = project.image && project.image.trim() !== '' && !imageErrors[index]
                  
                  return (
                    <div
                      key={index}
                      className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        {hasImage ? (
                          <>
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={() => handleImageError(index)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                          </>
                        ) : (
                          <>
                            <IconComponent className="text-8xl text-white group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                          </>
                        )}
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
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects