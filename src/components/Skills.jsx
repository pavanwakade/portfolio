import { useEffect, useRef, useState } from 'react'
import { FaServer, FaPalette, FaDatabase, FaTools, FaCode, FaJava, FaReact, FaNodeJs, FaJs, FaDocker, FaGitAlt, FaAws, FaLeaf } from 'react-icons/fa'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsData, setSkillsData] = useState([])
  const [technologies, setTechnologies] = useState([])
  const sectionRef = useRef(null)

  // Extended icon map for the new API
  const iconMap = {
    FaServer: FaServer,
    FaPalette: FaPalette,
    FaDatabase: FaDatabase,
    FaTools: FaTools,
    FaCode: FaCode,
    FaJava: FaJava,
    FaReact: FaReact,
    FaNodeJs: FaNodeJs,
    FaJs: FaJs,
    FaDocker: FaDocker,
    FaGitAlt: FaGitAlt,
    FaAws: FaAws,
    FaLeaf: FaLeaf,
  }

  // API URLs for separate skills and technologies scripts
  const API_URLS = {
    skills: 'https://script.google.com/macros/s/AKfycbwvLPj_Psb8EAWp6b5oyAuhhFSG1KAzBSjNJSgrgGDdZSm-VDxjsUJg4PRVkdISQ2vbrA/exec',
    technologies: 'https://script.google.com/macros/s/AKfycbxmQq4ZSGjvvpBkw6hBEA2XYh0H9y129yIJo0EwX7sfwOFZRpUSXQcSBwdHPzXGs057/exec'
  }
    
  // ===============================
  // INTERSECTION OBSERVER
  // ===============================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // ===============================
  // FETCH FROM GOOGLE SHEETS (SEPARATE APIs)
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch skills from skills API
        const skillsResponse = await fetch(`${API_URLS.skills}?action=list`)
        const skillsData = await skillsResponse.json()
        
        console.log('Skills API Response:', skillsData) // Debug log
        
        if (skillsData.success) {
          // Process skills data
          const skills = skillsData.skills || []
          
          // Group skills by level (Expert, Advanced, Intermediate)
          const grouped = {
            'Expert Level': { title: 'Expert Level', icon: FaServer, skills: [] },
            'Advanced Level': { title: 'Advanced Level', icon: FaPalette, skills: [] },
            'Intermediate Level': { title: 'Intermediate Level', icon: FaDatabase, skills: [] },
            'Other Skills': { title: 'Other Skills', icon: FaTools, skills: [] }
          }
          
          skills.forEach(skill => {
            const levelKey = skill.level === 'Expert' ? 'Expert Level' :
                            skill.level === 'Advanced' ? 'Advanced Level' :
                            skill.level === 'Intermediate' ? 'Intermediate Level' :
                            'Other Skills'
            
            grouped[levelKey].skills.push({
              name: skill.name,
              level: skill.percentage,
              icon: skill.icon,
              color: skill.color
            })
          })
          
          // Filter out empty categories and convert to array
          const groupedArray = Object.values(grouped).filter(category => category.skills.length > 0)
          setSkillsData(groupedArray)
        } else {
          console.error('Skills API returned error:', skillsData.message)
        }

        // Fetch technologies from technologies API
        const techResponse = await fetch(`${API_URLS.technologies}?action=list`)
        const techData = await techResponse.json()
        
        console.log('Technologies API Response:', techData) // Debug log
        
        if (techData.success) {
          // Process technologies data
          const techs = techData.technologies || []
          setTechnologies(techs.map(t => t.name))
        } else {
          console.error('Technologies API returned error:', techData.message)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  // ===============================
  // RENDER SECTION
  // ===============================
  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="mb-4 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 mx-auto mb-12 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {skillsData.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading skills...</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {skillsData.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 200}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <category.icon className="mr-4 text-4xl text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
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
          )}

          <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Technologies I Work With</h3>
            {technologies.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">Loading technologies...</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 font-medium text-gray-700 transition-all duration-300 border rounded-full cursor-default bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500/20 dark:text-gray-300 hover:scale-110 hover:shadow-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills