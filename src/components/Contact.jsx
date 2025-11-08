import { useEffect, useRef, useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaLightbulb, FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      value: 'pavanwakade143@gmail.com',
      link: 'mailto:pavanwakade143',
    },
    {
      icon: HiPhone,
      title: 'Phone',
      value: '+91 8317277608',
      link: 'tel:+918317277608',
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'pune, India',
      link: '#',
    },
  ]

  const socialLinks = [
    { icon: FaLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/pavan-w/', color: 'from-blue-600 to-blue-700' },
    { icon: FaGithub, name: 'GitHub', url: 'https://github.com/pavanwakade/QSpiders-Full-Stack-Java', color: 'from-gray-700 to-gray-900' },
    // { icon: FaTwitter, name: 'Twitter', url: 'https://twitter.com', color: 'from-blue-400 to-blue-600' },
    // { icon: FaInstagram, name: 'Instagram', url: 'https://instagram.com', color: 'from-pink-500 to-purple-600' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const InfoIcon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <InfoIcon className="text-2xl text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.title}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>

              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const SocialIcon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center p-4 bg-gradient-to-r ${social.color} text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold`}
                    >
                      <SocialIcon className="text-2xl mr-2" />
                      {social.name}
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-2 flex items-center">
                  <FaLightbulb className="mr-2" /> Let's Build Something Amazing!
                </h4>
                <p className="text-sm opacity-90">
                  I'm currently available for freelance work and full-time opportunities. 
                  Let's turn your ideas into reality!
                </p>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Send Me a Message
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message <FaPaperPlane className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact


