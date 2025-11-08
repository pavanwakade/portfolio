import { useEffect, useRef, useState } from 'react'
import { FaCode } from 'react-icons/fa6'
import pavanwakade from "../assets/pavanfull.jpg"
import { BiBorderRadius } from 'react-icons/bi'


const About = () => {
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

  const stats = [
    // { number: '1.5+', label: 'Years Experience' },
    // { number: '50+', label: 'Projects Completed' },
    // { number: '30+', label: 'Happy Clients' },
    // { number: '100%', label: 'Success Rate' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    {/* <FaCode className="text-9xl text-blue-600 dark:text-blue-400" /> */}

                    <img
                      src={pavanwakade}
                      alt="Pavan Wakade"
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '15px' }}
                    />

                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse delay-300"></div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Full Stack Java Developer
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Hi, I'm <b>Pavan Wakade</b> — a passionate Full Stack Java Developer who loves crafting efficient, scalable, and secure applications.
                I specialize in Core Java, Spring Boot, Hibernate (JPA), and RESTful API development using modern software practices.
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                My expertise spans backend development with Java and database integration using Oracle, MySQL, and PostgreSQL,
                combined with a strong command of frontend technologies like HTML, CSS, JavaScript, and responsive UI design.
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                I enjoy building real-world projects — from API-driven systems to full-stack web apps — with a focus on clean code,
                performance optimization, and seamless user experiences powered by Spring, JDBC, and JSP.
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Beyond coding, I’m deeply curious about new technologies, love contributing to innovative ideas,
                and enjoy mentoring others to grow as developers in the world of Java and web development.
              </p>


              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Hire Me
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1Kan1NIHjEDnytGzDGkvyebdrgBbUc3bT?usp=drive_link"
                  download
                  className="px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
