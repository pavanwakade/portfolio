import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Github, Sparkles, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)

  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyv-i2c3o5fQ8MomRmgP8f9plMAdIjwB4NCBpWWy0griuBbWgzg6Qq54dnufH8_347rIw/exec"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => sectionRef.current && observer.unobserve(sectionRef.current)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        body: new URLSearchParams(formData),
      })

      const result = await response.json()
      if (result.result === 'success') {
        setSubmitted(true)
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' })
          setSubmitted(false)
        }, 3000)
      } else {
        alert('⚠️ Failed to send message. Please try again later.')
        console.error(result.error)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('❌ Network or script error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'pavanwakade33@gmail.com',
      link: 'mailto:pavanwakade33@gmail.com',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8802896767',
      link: 'tel:+918802896767',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Pune, India',
      link: '#',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pavan-w/',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
    },
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/pavanwakade',
      gradient: 'from-gray-800 via-gray-700 to-gray-900',
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-purple-300 rounded-full -top-40 -right-40 w-80 h-80 dark:bg-purple-900 mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-blue-300 rounded-full -bottom-40 -left-40 w-80 h-80 dark:bg-blue-900 mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-pink-300 rounded-full top-1/2 left-1/2 w-80 h-80 dark:bg-pink-900 mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border-blue-500/20">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Let's Connect</span>
            </div>
            <h2 className="mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Get In Touch
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Have an exciting project in mind? Let's collaborate and create something extraordinary together.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Info - Left Side */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const InfoIcon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="relative block p-6 overflow-hidden transition-all duration-500 border border-gray-200 shadow-lg group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl dark:border-gray-700 hover:border-transparent hover:shadow-2xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      <div className="relative flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <InfoIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{info.title}</p>
                          <p className="font-semibold text-gray-900 transition-all duration-300 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text">{info.value}</p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Connect With Me</h3>
                <div className="grid gap-4">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex items-center justify-center gap-3 p-4 bg-gradient-to-r ${social.gradient} text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden`}
                      >
                        <div className="absolute inset-0 transition-opacity duration-300 bg-white opacity-0 group-hover:opacity-20"></div>
                        <SocialIcon className="relative z-10 w-5 h-5" />
                        <span className="relative z-10 font-semibold">{social.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* CTA Card */}
              <div className="relative p-8 overflow-hidden text-white shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
                <Sparkles className="relative z-10 w-8 h-8 mb-4" />
                <h4 className="relative z-10 mb-3 text-2xl font-bold">Let's Build Something Amazing!</h4>
                <p className="relative z-10 leading-relaxed text-blue-100">
                  I'm currently available for freelance work and full-time opportunities. Let's turn your ideas into reality!
                </p>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative p-8 border border-gray-200 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl md:p-10 dark:border-gray-700">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 duration-500 animate-in fade-in">
                    <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                    <p className="max-w-md text-center text-gray-600 dark:text-gray-400">
                      Thanks for reaching out! I'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                      Send Me a Message
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                        // placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                        // placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                      // placeholder="Project Inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                      // placeholder="Tell me about your project..."
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`group relative w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                    >
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 group-hover:opacity-100"></div>
                      {isSubmitting ? (
                        <span className="relative flex items-center justify-center gap-3">
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="relative flex items-center justify-center gap-3">
                          Send Message
                          <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Contact