import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/warkalogo.png";

const Navbar = ({ isStudentPage = false, isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Features', path: '/features', icon: '⚡', showOn: isHomePage },
    { name: 'Dashboard', path: '/dashboard', icon: '📊', showOn: isStudentPage },
    { name: 'About', path: '/about', icon: '📖' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              
              <div className="w-40 h-10 ">  
                <img src={logo} alt="warka accadamy logo"/>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              if (item.showOn === false) return null;
              
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : scrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-gray-900 hover:text-blue-600 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-100 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                      : 'text-gray-900 border-2 border-gray-900/30 hover:border-blue-600 hover:text-blue-600 hover:bg-white/10 backdrop-blur-sm'
                  }`}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-900 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          height: isOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => {
              if (item.showOn === false) return null;
              
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
