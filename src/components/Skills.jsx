import { useEffect, useRef, useState } from 'react'
import { FaServer, FaPalette, FaDatabase, FaTools, FaCode, FaMobile, FaCloud, FaCog } from 'react-icons/fa'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [skillCategories, setSkillCategories] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sectionRef = useRef(null)

  // Google Apps Script Web App URL (same as projects)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsg7nM-HvGz-YMS7kGNv-0J3fPxaWY2OCEVy5yV0nEBB5ZqDbmm947ZqPFhFzeyBo8hg/exec';
  // Icon mapping for skill categories
  const iconMap = {
    'FaServer': FaServer,
    'FaPalette': FaPalette,
    'FaDatabase': FaDatabase,
    'FaTools': FaTools,
    'FaCode': FaCode,
    'FaMobile': FaMobile,
    'FaCloud': FaCloud,
    'FaCog': FaCog,
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

  // Fetch skills from Google Sheets
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=skills`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }

        const data = await response.json()
        
        if (data.result === 'success') {
          // Transform skill categories
          if (data.skillCategories) {
            const transformedCategories = data.skillCategories.map(category => ({
              ...category,
              icon: iconMap[category.iconName] || FaCode,
              skills: category.skills || []
            }))
            setSkillCategories(transformedCategories)
          }

          // Set technologies list
          if (data.technologies) {
            setTechnologies(data.technologies)
          }
        } else {
          throw new Error(data.message || 'Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching skills:', err)
        setError(err.message)
        // Fallback to empty arrays if fetch fails
        setSkillCategories([])
        setTechnologies([])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-12"></div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">Failed to load skills</p>
              <p className="text-red-500 dark:text-red-500 text-sm">{error}</p>
            </div>
          ) : skillCategories.length === 0 ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
              <p className="text-blue-600 dark:text-blue-400 font-medium">No skills found</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Skills will appear here once added to the sheet</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {skillCategories.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${categoryIndex * 200}ms` }}
                  >
                    <div className="flex items-center mb-6">
                      <category.icon className="text-4xl mr-4 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {skill.name}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: isVisible ? `${skill.level}%` : '0%',
                                transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {technologies.length > 0 && (
                <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Technologies I Work With
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills