import { useEffect, useRef, useState } from 'react'
import {
  FaServer,
  FaLaptopCode,
  FaDatabase,
  FaTools,
  FaWrench,
  FaCogs,
  FaCode,
  FaJava,
  FaReact,
  FaNodeJs,
  FaJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaLeaf,
} from 'react-icons/fa'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsData, setSkillsData] = useState([])
  const [technologies, setTechnologies] = useState([])
  const sectionRef = useRef(null)

  // Icon map (for API-driven dynamic skills)
  const iconMap = {
    FaServer,
    FaLaptopCode,
    FaDatabase,
    FaTools,
    FaWrench,
    FaCogs,
    FaCode,
    FaJava,
    FaReact,
    FaNodeJs,
    FaJs,
    FaDocker,
    FaGitAlt,
    FaAws,
    FaLeaf,
  }

  const API_URLS = {
    skills: 'https://script.google.com/macros/s/AKfycbzlSuUUFMhsMndp2BdN8x_4m9z2ym-u2LMofsfcM3c0D98kPxppEfCfoSn0OdxOktv6PA/exec',
    technologies: 'https://script.google.com/macros/s/AKfycbxOciCQmF731K-g8eNBDblAlyravEB5HFdSVeKhqqN85CDBI-27DMzbl9ewGWFoWhbZGQ/exec',
  }

  // INTERSECTION OBSERVER (scroll animation)
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

  // FETCH DATA (skills + technologies)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Skills
        const skillsResponse = await fetch(`${API_URLS.skills}?action=list`)
        const skillsData = await skillsResponse.json()

        if (skillsData.success) {
          const skills = skillsData.skills || []

          // Grouping logic with fixed icons
          const grouped = {
            Backend: { title: 'Backend', icon: FaServer, skills: [] },
            Frontend: { title: 'Frontend', icon: FaLaptopCode, skills: [] },
            Database: { title: 'Database', icon: FaDatabase, skills: [] },
            Tools: { title: 'Tools', icon: FaWrench, skills: [] },
            IDE: { title: 'IDE', icon: FaCode, skills: [] },
            'Other Skills': { title: 'Other Skills', icon: FaCogs, skills: [] },
          }

          // Push data into relevant category
          skills.forEach((skill) => {
            const key =
              grouped[skill.level] ? skill.level : 'Other Skills'

            grouped[key].skills.push({
              name: skill.name,
              level: skill.percentage,
              icon: iconMap[skill.icon] || FaCode,
              color: skill.color,
            })
          })

          const groupedArray = Object.values(grouped).filter(
            (cat) => cat.skills.length > 0
          )
          setSkillsData(groupedArray)
        } else {
          console.error('Skills API returned error:', skillsData.message)
        }

        // Fetch Technologies
        const techResponse = await fetch(`${API_URLS.technologies}?action=list`)
        const techData = await techResponse.json()

        if (techData.success) {
          const techs = techData.technologies || []
          setTechnologies(techs.map((t) => t.name))
        } else {
          console.error('Technologies API returned error:', techData.message)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 mx-auto mb-12 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {skillsData.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading skills...
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {skillsData.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 200}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <category.icon className="mr-4 text-4xl text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${
                                categoryIndex * 200 + skillIndex * 100
                              }ms`,
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

          <div
            className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Technologies I Work With
            </h3>
            {technologies.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                Loading technologies...
              </p>
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
