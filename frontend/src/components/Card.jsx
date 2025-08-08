import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Counseling from '../assets/Cardimages/Counseling.png';
import ExtraCurricular from '../assets/cardImages/football-svgrepo-com.svg';
import HightQualityEducation from '../assets/cardImages/graduation-cap-svgrepo-com.svg';
import Wellness from '../assets/cardImages/muscles-muscle-svgrepo-com.svg';

const Card = () => {
  const providedServices = [
    {
      title: "High Quality Education",
      description: "Our curriculum is designed to foster critical thinking, creativity, and academic excellence. We offer advanced courses such as honors, AP, and IB that challenge students and prepare them for success in higher education and their careers. Additionally, we emphasize personalized learning to support individual academic growth, helping each student unlock their full potential.",
      icon: HightQualityEducation,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      title: "Extracurricular Activities",
      description: "Our school offers a wide variety of extracurricular activities ranging from sports teams to arts programs, leadership opportunities, and clubs. These activities allow students to explore their interests and passions outside the classroom while building essential life skills such as teamwork, leadership, and time management. Students are encouraged to participate in a range of activities to enhance their personal development.",
      icon: ExtraCurricular,
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      title: "College and Career Counseling",
      description: "Our dedicated college and career counselors assist students throughout their academic journey, helping them navigate the college application process, from selecting the right universities to preparing application materials. We also offer career counseling and internships to give students a head start in their professional lives. With personalized guidance, our counselors ensure that each student is well-prepared for the future.",
      icon: Counseling,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      title: "Student Wellness and Support Services",
      description: "At our school, we prioritize the physical and emotional well-being of our students. We offer a range of wellness programs, including mental health support, counseling, and stress management workshops. Our counselors are always available to support students with personal challenges, ensuring they have the resources and assistance needed to thrive both inside and outside the classroom.",
      icon: Wellness,
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    }
  ];

  const [expand, setExpand] = useState(null);

  const handleExpand = (index) => {
    if (expand === index) {
      setExpand(null);
    } else {
      setExpand(index);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {providedServices.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="group relative"
        >
          <div className={`${service.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 h-full relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Icon */}
            <div className="relative mb-6">
              <div className={`${service.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 h-10 object-contain"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              {service.title}
            </h3>

            <div className="relative">
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {expand === index
                  ? service.description
                  : `${service.description.substring(0, 120)}...`
                }
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExpand(index)}
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm`}
              >
                <span className="mr-2">
                  {expand === index ? "📖" : "👁️"}
                </span>
                {expand === index ? "Show Less" : "Learn More"}
              </motion.button>
            </div>

            {/* Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
