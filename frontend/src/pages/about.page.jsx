import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const AboutPage = () => {
  return (
    <div className="py-16 bg-[#f2f4e1]">
      <Navbar />
      <div className="px-20">
        <section className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">
            Our mission is to streamline the management of school data, making
            it easier for educators, students, and administrators to stay
            organized and connected.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                User-friendly Dashboard
              </h3>
              <p className="text-muted-foreground">
                Easily manage school data with our intuitive dashboard.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                Exam Management
              </h3>
              <p className="text-muted-foreground">
                Create and manage exams, track results, and analyze performance.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-primary">
                Real-time Communication
              </h3>
              <p className="text-muted-foreground">
                Stay connected with students and teachers through built-in
                messaging tools.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="font-semibold text-primary text-xl">
                Step 1:
              </span>
              <p className="ml-4 text-muted-foreground">
                Register and create a user account to get started.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-primary text-xl">
                Step 2:
              </span>
              <p className="ml-4 text-muted-foreground">
                Set up classes, students, and teachers to organize your system.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-primary text-xl">
                Step 3:
              </span>
              <p className="ml-4 text-muted-foreground">
                Start managing exams, attendance, and grades with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Vision/Future Plans Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Vision for the Future
          </h2>
          <p className="text-muted-foreground">
            We plan to continuously improve the system by adding new features
            such as AI-driven analytics, enhanced messaging tools, and better
            reporting systems to ensure the success of educators and students.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground mb-4">
            Have any questions or suggestions? Feel free to reach out!
          </p>
          <Link to="/contact" className="text-primary underline">
            Contact Form
          </Link>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Get Started Today!
          </h2>
          <p className="text-muted-foreground mb-6">
            Join us in making education more organized and efficient.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 transition"
          >
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
