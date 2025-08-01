import React from "react";
import Navbar from "../components/navbar.jsx";
import Banner from "../components/banner";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
import BackToTop from "../components/ui/backToTop";
import Card from "../components/Card";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzlDOTJBQyIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPgo8L2c+CjwvZz4KPC9zdmc+')]"></div>
      </div>

      <main className="flex-grow relative z-10">
        <Navbar isStudentPage={false} isHomePage={true} />

        {/* Enhanced Hero Section */}
        <Banner />

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Services Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive educational services designed to nurture and develop every student's potential
              </p>
            </div>
            <Card />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-blue-600">Community</span> Says
              </h2>
              <p className="text-xl text-gray-600">
                Hear from our students, parents, and teachers
              </p>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Call to Action */}
        <CTASection />
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default HomePage;
