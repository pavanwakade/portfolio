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
  FaCloud,
} from 'react-icons/fa'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsData, setSkillsData] = useState([])
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
    FaCloud,
  }

  const API_URLS = {
    skills: 'https://script.google.com/macros/s/AKfycbzlSuUUFMhsMndp2BdN8x_4m9z2ym-u2LMofsfcM3c0D98kPxppEfCfoSn0OdxOktv6PA/exec',
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

  // Fallback Skills
  const getFallbackSkills = () => [
    {
      title: 'Backend Development',
      icon: FaServer,
      skills: [
        { name: 'Java (8/11/17)' },
        { name: 'Spring Boot' },
        { name: 'Spring MVC' },
        { name: 'Microservices' },
        { name: 'Hibernate & JPA' },
        { name: 'RESTful APIs' },
        { name: 'JDBC' }
      ]
    },
    {
      title: 'Frontend Development',
      icon: FaLaptopCode,
      skills: [
        { name: 'React.js' },
        { name: 'Angular 14' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'HTML5 & CSS3' },
        { name: 'Bootstrap' }
      ]
    },
    {
      title: 'Databases & Caching',
      icon: FaDatabase,
      skills: [
        { name: 'MySQL' },
        { name: 'PostgreSQL' },
        { name: 'Oracle' },
        { name: 'MongoDB' },
        { name: 'Apache Kafka' },
        { name: 'Redis' }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: FaCloud,
      skills: [
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'AWS EC2' },
        { name: 'AWS Elastic Beanstalk' },
        { name: 'Jenkins' },
        { name: 'CI/CD Pipelines' }
      ]
    },
    {
      title: 'Testing & Tools',
      icon: FaTools,
      skills: [
        { name: 'JUnit' },
        { name: 'Postman' },
        { name: 'Swagger' },
        { name: 'Git & Bitbucket' },
        { name: 'Maven' },
        { name: 'Jira' },
        { name: 'Datadog' },
        { name: 'ServiceNow' }
      ]
    },
    {
      title: 'Servers & Concepts',
      icon: FaCode,
      skills: [
        { name: 'Apache Tomcat' },
        { name: 'JBoss' },
        { name: 'OOP & Design Patterns' },
        { name: 'Multithreading' },
        { name: 'Collections Framework' },
        { name: 'Agile & Scrum' }
      ]
    }
  ]

  // FETCH DATA (skills only)
  useEffect(() => {
    const fetchData = async () => {
      let skillsFetched = false

      try {
        // Fetch Skills
        const skillsResponse = await fetch(`${API_URLS.skills}?action=list`)
        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json()
          if (skillsData.success && skillsData.skills && skillsData.skills.length > 0) {
            const skills = skillsData.skills || []

            // Grouping logic with fixed icons
            const grouped = {
              Backend: { title: 'Backend Development', icon: FaServer, skills: [] },
              Frontend: { title: 'Frontend Development', icon: FaLaptopCode, skills: [] },
              Database: { title: 'Databases & Caching', icon: FaDatabase, skills: [] },
              Cloud: { title: 'DevOps & Cloud', icon: FaCloud, skills: [] },
              Tools: { title: 'Testing & Tools', icon: FaTools, skills: [] },
              IDE: { title: 'Servers & Concepts', icon: FaCode, skills: [] },
              'Other Skills': { title: 'Other Skills', icon: FaCogs, skills: [] },
            }

            // Push data into relevant category
            skills.forEach((skill) => {
              const key =
                grouped[skill.level] ? skill.level : 'Other Skills'

              grouped[key].skills.push({
                name: skill.name,
                icon: iconMap[skill.icon] || FaCode,
                color: skill.color,
              })
            })

            const groupedArray = Object.values(grouped).filter(
              (cat) => cat.skills.length > 0
            )
            setSkillsData(groupedArray)
            skillsFetched = true
          }
        }
      } catch (err) {
        console.error('Error fetching skills from API:', err)
      }

      // If API skills load failed or was empty, use fallback
      if (!skillsFetched) {
        setSkillsData(getFallbackSkills())
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

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200/60 rounded-xl shadow-sm dark:bg-gray-900/60 dark:border-gray-700/60 dark:text-gray-200 hover:scale-105 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 flex items-center gap-2 cursor-default select-none"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Removed Technologies I Work With section */}
        </div>
      </div>
    </section>
  )
}

export default Skills
