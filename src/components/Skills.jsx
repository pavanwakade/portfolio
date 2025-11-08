import { useEffect, useRef, useState } from 'react'
import { FaServer, FaPalette, FaDatabase, FaTools } from 'react-icons/fa'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
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

  const skillCategories = [
    {
      title: 'Backend',
      icon: FaServer,
      skills: [
        { name: 'Java', level: 95 },
        { name: 'Spring Boot', level: 90 },
        { name: 'Node.js', level: 85 },
        // { name: 'Express.js', level: 85 },
        // { name: 'Python', level: 80 },/
      ],
    },
    {
      title: 'Frontend',
      icon: FaPalette,
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        // { name: 'TypeScript', level: 85 },
      ],
    },
    {
      title: 'Database',
      icon: FaDatabase,
      skills: [
        { name: 'MySQL', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        // { name: 'Redis', level: 75 },
        { name: 'Oracle', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: FaTools,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 85 },
        // { name: 'AWS', level: 80 },
        { name: 'REST APIs', level: 95 },
        // { name: 'Microservices', level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-12"></div>

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

          <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Java', 
                'Spring Boot', 
                'React', 'Node.js',
                 'MongoDB',
                  'MySQL',
                'Docker',
                //  'AWS', 
                 'Git', 
                 'REST API',
                  'Microservices', 
                  'JavaScript',
                // 'TypeScript',
                 'Tailwind CSS', 
                //  'Express.js',
                  'PostgreSQL',
              ].map((tech, index) => (
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
        </div>
      </div>
    </section>
  )
}

export default Skills
