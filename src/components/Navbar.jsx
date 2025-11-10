// import { useState, useEffect } from "react";
// import pavanwakade from "../assets/pavanfull.jpg";
// import { HiSun, HiMoon } from "react-icons/hi";

// const Navbar = ({ darkMode, setDarkMode }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);

//       const sections = ["home", "about", "skills", "projects", "experience", "contact"];
//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "#home", id: "home" },
//     { name: "About", href: "#about", id: "about" },
//     { name: "Skills", href: "#skills", id: "skills" },
//     { name: "Projects", href: "#projects", id: "projects" },
//     { name: "Experience", href: "#experience", id: "experience" },
//     { name: "Contact", href: "#contact", id: "contact" },
//   ];

//   const firstHalf = navLinks.slice(0, 3);
//   const secondHalf = navLinks.slice(3);

//   return (
//     <>
//       <nav
//         className={`fixed w-full z-50 transition-all duration-500 bg-transparent pointer-events-none z-50`}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
//           <div className="flex justify-between items-center h-20">

//             {/* 🔹 Logo Section (MOBILE ONLY) */}
//             <div className="flex-shrink-0 md:hidden">
//               <a href="#home">
//                 <img
//                   src={pavanwakade}
//                   alt="Pavan Wakade"
//                   className="w-12 h-12 rounded-full border-2 border-blue-600 shadow-md hover:scale-110 transition-transform duration-300 hover:shadow-blue-500/40"
//                 />
//               </a>
//             </div>

//             {/* 🔹 Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 mx-auto">
              
//               {/* First Half */}
//               {firstHalf.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                     activeSection === link.id
//                       ? "text-white"
//                       : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   }`}
//                 >
//                   {activeSection === link.id && (
//                     <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 animate-gradient bg-[length:200%_auto]"></span>
//                   )}
//                   {link.name}
//                 </a>
//               ))}

//               {/* Center Profile Image */}
//               <a href="#home">
//                 <img
//                   src={pavanwakade}
//                   alt="Pavan Wakade"
//                   className="w-12 h-12 rounded-full border-2 border-blue-600 shadow-md hover:scale-110 transition-transform duration-300 hover:shadow-blue-500/40"
//                 />
//               </a>

//               {/* Second Half */}
//               {secondHalf.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                     activeSection === link.id
//                       ? "text-white"
//                       : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   }`}
//                 >
//                   {activeSection === link.id && (
//                     <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 animate-gradient bg-[length:200%_auto]"></span>
//                   )}
//                   {link.name}
//                 </a>
//               ))}
//             </div>

//             {/* 🔹 Right Section */}
//             <div className="flex items-center space-x-3">
//               {/* Theme Toggle */}
//               <button
//   onClick={() => setDarkMode(!darkMode)}
//   className="relative p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden"
// >
//   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/20 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//   <div className="relative text-xl text-gray-800 dark:text-yellow-300">
//     {darkMode ? <HiSun /> : <HiMoon />}
//   </div>
// </button>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden relative p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:scale-110 transition-all duration-300 shadow-lg"
//               >
//                 <div className="w-5 h-4 flex flex-col justify-between">
//                   <span
//                     className={`w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
//                       isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
//                     }`}
//                   ></span>
//                   <span
//                     className={`w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300 ${
//                       isMobileMenuOpen ? "opacity-0 scale-0" : ""
//                     }`}
//                   ></span>
//                   <span
//                     className={`w-full h-0.5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full transition-all duration-300 ${
//                       isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
//                     }`}
//                   ></span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 🔹 Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-500 ${
//             isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="px-6 py-4 space-y-2 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50">
//             {navLinks.map((link, index) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={`block px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
//                   activeSection === link.id
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
//                     : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
//                 }`}
//                 style={{
//                   animationDelay: `${index * 50}ms`,
//                   animation: isMobileMenuOpen
//                     ? "slideIn 0.3s ease-out forwards"
//                     : "none",
//                 }}
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       <style>{`
//         @keyframes gradient {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-gradient {
//           background-size: 200% auto;
//           animation: gradient 3s ease infinite;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;







import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const offset = window.innerHeight / 3; // Better mobile detection
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const firstHalf = navLinks.slice(0, 3);
  const secondHalf = navLinks.slice(3);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo Section (MOBILE ONLY) */}
            <div className="flex-shrink-0 md:hidden">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, "#home")}
                className="block"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md hover:scale-110 transition-transform duration-300">
                  PW
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 mx-auto">
              
              {/* First Half */}
              {firstHalf.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeSection === link.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 animate-gradient bg-[length:200%_auto]"></span>
                  )}
                  {link.name}
                </a>
              ))}

              {/* Center Profile Image */}
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, "#home")}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md hover:scale-110 transition-transform duration-300">
                  PW
                </div>
              </a>

              {/* Second Half */}
              {secondHalf.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeSection === link.id && (
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 animate-gradient bg-[length:200%_auto]"></span>
                  )}
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative p-2 sm:p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/20 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-lg sm:text-xl text-gray-800 dark:text-yellow-300">
                  {darkMode ? <Sun /> : <Moon />}
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden relative p-2 sm:p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:scale-110 transition-all duration-300 shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0 scale-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-16 sm:top-20 transition-all duration-300 ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Content */}
          <div
            className={`relative bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transform transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="px-4 sm:px-6 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px] flex items-center ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen
                      ? "slideIn 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;