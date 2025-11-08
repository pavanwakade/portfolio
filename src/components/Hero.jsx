import { useEffect, useState } from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { BsArrowDown } from 'react-icons/bs'
import { FaCode } from 'react-icons/fa6'
import pavanwakade from "../assets/pavanfull.jpg"

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const roles = ['Full Stack Developer', 'Java Expert', 'Problem Solver', 'Tech Enthusiast']
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex((roleIndex + 1) % roles.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10 animate-float"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="mb-8 inline-block">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 animate-pulse-slow">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img
                  src={pavanwakade}
                  alt="Pavan Wakade"
                  className="w-full h-full object-cover rounded-full"
                />


              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Pavan Wakade
          </h1>

          <div className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-6 h-12">
            <span className="font-semibold">{displayText}</span>
            <span className="animate-blink">|</span>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Crafting elegant solutions with code. Transforming ideas into powerful, scalable applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              View Projects
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            {[
              { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
              { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
              { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
              { icon: HiMail, href: 'mailto:pavan@example.com', label: 'Email', color: 'hover:text-red-500' },
            ].map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="text-2xl" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <BsArrowDown className="text-4xl" />
        </a>
      </div>
    </section>
  )
}

export default Hero
