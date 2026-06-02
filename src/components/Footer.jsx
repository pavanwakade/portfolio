import {
  FaLinkedin, FaGithub, FaTwitter, FaGlobe,
  FaMobileAlt, FaServer, FaCloud, FaWrench,
  FaPalette, FaHeart, FaArrowRight, FaLaptopCode
} from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/pavan-wakade', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/pavanwakade', label: 'GitHub' },
    { icon: HiMail, url: 'mailto:pavanwakade33@gmail.com', label: 'Email' },
  ]
  const openTo = [
    { icon: FaGlobe, text: 'Full Stack Developer' },
    { icon: FaServer, text: 'Backend Developer' },
    { icon: FaLaptopCode, text: 'Frontend Developer' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Profile */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Pavan Wakade
            </h3>
            <p className="text-gray-400 mb-4">
              Full Stack Java Developer passionate about building scalable and efficient web applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 group"
                  >
                    <SocialIcon className="text-lg group-hover:text-white transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <FaArrowRight className="mr-2 group-hover:translate-x-1 transition-transform duration-300 text-sm" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Open to Work */}
          <div>
            <h4 className="text-lg font-bold mb-4">Open To Work</h4>
            <ul className="space-y-2 text-gray-400">
              {openTo.map((service, index) => {
                const ServiceIcon = service.icon
                return (
                  <li key={index} className="flex items-center">
                    <ServiceIcon className="mr-2 text-blue-400" />
                    {service.text}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center flex-wrap gap-1">
            © 2026 Pavan Wakade. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed & Developed by Pavan Wakade
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
