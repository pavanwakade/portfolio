// import { useEffect, useState } from 'react'
// import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
// import { HiMail } from 'react-icons/hi'
// import { BsArrowDown } from 'react-icons/bs'
// import { FaCode } from 'react-icons/fa6'
// import pavanwakade from "../assets/pavanfull.jpg"

// const Hero = () => {
//   const [displayText, setDisplayText] = useState('')
//   const roles = ['Full Stack Developer', 'Java Expert', 'Problem Solver', 'Tech Enthusiast']
//   const [roleIndex, setRoleIndex] = useState(0)
//   const [charIndex, setCharIndex] = useState(0)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     const currentRole = roles[roleIndex]
//     const timeout = setTimeout(() => {
//       if (!isDeleting && charIndex < currentRole.length) {
//         setDisplayText(currentRole.substring(0, charIndex + 1))
//         setCharIndex(charIndex + 1)
//       } else if (isDeleting && charIndex > 0) {
//         setDisplayText(currentRole.substring(0, charIndex - 1))
//         setCharIndex(charIndex - 1)
//       } else if (!isDeleting && charIndex === currentRole.length) {
//         setTimeout(() => setIsDeleting(true), 2000)
//       } else if (isDeleting && charIndex === 0) {
//         setIsDeleting(false)
//         setRoleIndex((roleIndex + 1) % roles.length)
//       }
//     }, isDeleting ? 50 : 100)

//     return () => clearTimeout(timeout)
//   }, [charIndex, isDeleting, roleIndex])

//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>

//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10 animate-float"
//             style={{
//               width: `${Math.random() * 300 + 50}px`,
//               height: `${Math.random() * 300 + 50}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 10 + 10}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="animate-fade-in-up">
//           <div className="mb-8 inline-block">
//             <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 animate-pulse-slow">
//               <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
//                 <img
//                   src={pavanwakade}
//                   alt="Pavan Wakade"
//                   className="w-full h-full object-cover rounded-full"
//                 />


//               </div>
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
//             Pavan Wakade
//           </h1>

//           <div className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-6 h-12">
//             <span className="font-semibold">{displayText}</span>
//             <span className="animate-blink">|</span>
//           </div>

//           <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
//             Crafting elegant solutions with code. Transforming ideas into powerful, scalable applications.
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             <a
//               href="#contact"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
//             >
//               Get In Touch
//             </a>
//             <a
//               href="#projects"
//               className="px-8 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
//             >
//               View Projects
//             </a>
//           </div>

//           <div className="flex justify-center space-x-6">
//             {[
//               { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
//               { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
//               { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
//               { icon: HiMail, href: 'mailto:pavan@example.com', label: 'Email', color: 'hover:text-red-500' },
//             ].map((social) => {
//               const Icon = social.icon
//               return (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 ${social.color}`}
//                   aria-label={social.label}
//                 >
//                   <Icon className="text-2xl" />
//                 </a>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
//           <BsArrowDown className="text-4xl" />
//         </a>
//       </div>
//     </section>
//   )
// }

// export default Hero





import { useEffect, useState } from 'react'
import { Linkedin, Github, Twitter, Mail, Download, ChevronDown } from 'lucide-react'
import pavanwakade from "../assets/pavanfull.jpg"

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const roles = ['Java Full Stack Developer', 'Spring Boot & Microservices', 'RESTful API Specialist', 'DevOps & Cloud Enthusiast']
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 w-full transition-colors duration-300">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg uppercase tracking-wider font-semibold">Java Full Stack Developer</p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Hello I'm<br />
                <span className="text-emerald-500 dark:text-emerald-400 animate-pulse-slow">Pavan Wakade</span>
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Java Full Stack Developer with 4+ years of experience in designing, developing, and deploying scalable enterprise microservices using Spring Boot, Kafka, and React.js.
              </p>
            </div>

            {/* Role Animation */}
            <div className="text-xl sm:text-2xl text-emerald-500 dark:text-emerald-400 font-mono h-8">
              <span>{displayText}</span>
              <span className="animate-pulse">|</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-semibold rounded-md transition-all duration-300 hover:scale-105 text-sm sm:text-base shadow-lg hover:shadow-emerald-500/20"
              >
                Hire Me
              </a>

              <a
                href="https://drive.google.com/file/d/1FimyxwlBtIEBdqrBE_Ss56BYOYL081HM/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-semibold rounded-md transition-all duration-300 hover:scale-105 text-sm sm:text-base shadow-lg hover:shadow-emerald-500/20"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                DOWNLOAD CV
              </a>

              {/* Social Icons */}
              <div className="flex gap-2 sm:gap-3">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/pavan-w/', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/pavanwakade', label: 'GitHub' },
                  { icon: Mail, href: 'mailto:pavanwakade33@gmail.com', label: 'Email' },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-md text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated dashed circle border */}
              <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s' }}>
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle
                    cx="200"
                    cy="200"
                    r="198"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="3"
                    strokeDasharray="15 20"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 shadow-2xl">
                <img
                  src={pavanwakade}
                  alt="Pavan Wakade"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 lg:mt-20">
          {[
            { value: '4+', label: 'Years of', sublabel: 'Experience' },
            { value: '2+', label: 'Enterprise', sublabel: 'Projects' },
            { value: '15+', label: 'Technologies', sublabel: 'Mastered' },
            { value: '100%', label: 'Production-Grade', sublabel: 'Delivery' },
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-1 p-4 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-medium">
                <div>{stat.label}</div>
                <div>{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50 pointer-events-auto">
        <a href="#about" className="block p-2 text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors cursor-pointer">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
