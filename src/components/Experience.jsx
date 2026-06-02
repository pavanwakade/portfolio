import {
    useEffect,
    useRef,
    useState
} from 'react'

import {
    FaBriefcase,
    FaLaptopCode,
    FaCode,
    FaGraduationCap,
    FaUniversity,
    FaCertificate,
    FaGlobe,
    FaMobileAlt,
    FaCloud,
    FaWrench,
    FaCheckCircle
} from 'react-icons/fa'


const Experience = () => {
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

    const experiences = [
        {
            title: 'Java Full Stack Developer (Loan Management System)',
            company: 'SDK Infotech Pvt. Ltd.',
            period: 'Mar 2022 – Present',
            description:
                'Designed and developed an enterprise-grade web application to automate and manage the complete lifecycle of loan processing for banks and financial institutions.',
            achievements: [
                'Developed and maintained scalable RESTful APIs using Spring Boot and Java 17 for loan processing and repayment modules.',
                'Implemented business logic for loan eligibility validation, EMI calculation, interest computation, and repayment scheduling.',
                'Designed and integrated microservices architecture for customer, loan, payment, and notification services.',
                'Developed secure authentication and authorization mechanisms using JWT and Spring Security with Role-Based Access Control (RBAC).',
                'Integrated Apache Kafka for asynchronous event-driven communication between services.'
            ],
            icon: FaBriefcase,
        },
        {
            title: 'Java Full Stack Developer (Online E-Commerce Platform)',
            company: 'SDK Infotech Pvt. Ltd.',
            period: 'Mar 2022 – Present',
            description:
                'Built an enterprise-level e-commerce platform supporting vendor management, inventory tracking, order fulfillment, secure payments, and analytics dashboards.',
            achievements: [
                'Developed scalable RESTful APIs using Spring Boot and Java 17 for product catalog, cart, order management, inventory, and payment modules.',
                'Implemented microservices architecture for customer, product, order, payment, and notification services.',
                'Developed shopping cart, checkout, order processing, and shipment tracking functionalities.',
                'Integrated secure authentication and authorization using JWT, OAuth2, and Spring Security.',
                'Implemented asynchronous event-driven communication using Apache Kafka for order events, notifications, and inventory synchronization.'
            ],
            icon: FaLaptopCode,
        },
    ];

    const education = [
        {
            degree: 'Bachelor of Engineering',
            field: 'Electronics & Telecommunications Engineering',
            institution: 'Savitribai Phule Pune University',
            period: '',
            icon: FaGraduationCap,
        },
        {
            degree: 'Diploma of Engineering',
            field: 'Computer Technology',
            institution: 'MSBTE Mumbai',
            period: '',
            icon: FaUniversity,
        },
        {
            degree: 'Development - Certification',
            field: 'Full Stack Java Developer,',
            institution: 'QSpiders Deccen',
            period: '',
            icon: FaCertificate,
        },
        {
            degree: 'Development - Certification',
            field: 'Full Stack Java Developer',
            institution: 'Symbiosis',
            period: '',
            icon: FaCertificate,
        },

        {
            degree: 'Api Testing - Certification',
            field: 'Postman API Fundamentals',
            institution: 'Postman',
            period: '2024',
            icon: FaCertificate,
        }
    ];


    return (
        <section id="experience" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Experience & Education
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-16"></div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
                                <FaBriefcase className="mr-3 text-blue-600 dark:text-blue-400" />
                                Work Experience
                            </h3>

                            <div className="space-y-8">
                                {experiences.map((exp, index) => (
                                    <div
                                        key={index}
                                        className={`relative pl-8 border-l-2 border-blue-500 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                            }`}
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                    >
                                        <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                            <exp.icon className="text-sm" />
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            <div className="flex flex-wrap justify-between items-start mb-2">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {exp.title}
                                                </h4>
                                                <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                                                {exp.company}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {exp.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, achIndex) => (
                                                    <li
                                                        key={achIndex}
                                                        className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                                                    >
                                                        <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
                                <FaGraduationCap className="mr-3 text-purple-600 dark:text-purple-400" />
                                Education
                            </h3>

                            <div className="space-y-8">
                                {education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className={`relative pl-8 border-l-2 border-purple-500 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                                            }`}
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                    >
                                        <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                            <edu.icon className="text-sm" />
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            <div className="flex flex-wrap justify-between items-start mb-2">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {edu.degree}
                                                </h4>
                                                <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                                                    {edu.period}
                                                </span>
                                            </div>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                                                {edu.field}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {edu.institution}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className={`mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    <h4 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                        {/* Services I Offer */}
                                    </h4>
                                    <div className="space-y-4">
                                        {[
                                            // { icon: FaGlobe, title: 'Web Development', desc: 'Full-stack web applications' },
                                            // { icon: FaMobileAlt, title: 'API Development', desc: 'RESTful & GraphQL APIs' },
                                            // { icon: FaCloud, title: 'Cloud Solutions', desc: 'AWS & Azure deployment' },
                                            // { icon: FaWrench, title: 'Consulting', desc: 'Technical architecture & guidance' },
                                        ].map((service, index) => {
                                            const ServiceIcon = service.icon
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                                                >
                                                    <ServiceIcon className="text-3xl mr-4 text-blue-600 dark:text-blue-400" />
                                                    <div>
                                                        <h5 className="font-bold text-gray-900 dark:text-white">
                                                            {service.title}
                                                        </h5>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {service.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
