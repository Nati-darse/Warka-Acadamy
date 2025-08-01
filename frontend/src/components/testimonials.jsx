import React, { useState } from "react";
import { motion } from "framer-motion";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image5 from "../assets/5.png";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Alexander Morgan",
      role: "Grade 12 Student",
      image: image1,
      text: "A perfect blend of academic excellence and character building, creating future-ready and responsible individuals. The teachers here truly care about our success.",
      rating: 5,
      subject: "Computer Science"
    },
    {
      id: 2,
      name: "Ethan James",
      role: "Grade 11 Student",
      image: image2,
      text: "This school fosters a nurturing environment, empowering its students to excel academically and grow personally. I've grown so much here!",
      rating: 5,
      subject: "Mathematics"
    },
    {
      id: 3,
      name: "Sophia Isabelle",
      role: "Grade 10 Student",
      image: image3,
      text: "The teachers are dedicated, the facilities are top-notch, and the learning experience is unparalleled. I love the interactive learning approach.",
      rating: 5,
      subject: "Biology"
    },
    {
      id: 4,
      name: "James Rodrigo",
      role: "Grade 12 Student",
      image: image5,
      text: "Encouraging creativity, collaboration, and critical thinking, this school truly brings out the best in students. The extracurricular activities are amazing!",
      rating: 5,
      subject: "Arts"
    },
  ];

  const stats = [
    { number: "1,500+", label: "Happy Students", icon: "👨‍🎓" },
    { number: "98%", label: "Success Rate", icon: "🏆" },
    { number: "50+", label: "Expert Teachers", icon: "👩‍🏫" },
    { number: "25+", label: "Years Experience", icon: "📚" }
  ];
  return (
    <div id="testimonials" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-blue-600">Students</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our amazing students who are transforming their futures through quality education
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Main Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-blue-100"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div>
                  <div className="font-bold text-xl text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {testimonials[activeTestimonial].role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Specializing in {testimonials[activeTestimonial].subject}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4 mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'border-blue-500 scale-110 shadow-lg'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Start your journey towards academic excellence today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Apply Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Schedule Visit
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
