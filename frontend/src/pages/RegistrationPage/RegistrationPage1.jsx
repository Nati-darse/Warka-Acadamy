import React, { useState } from "react";
import { Link } from "react-router-dom";
import warkaLogo from "/warkalogo.png";

const RegistrationPage = () => {
  const [isNewStudent, setIsNewStudent] = useState(null); // State for new or returning student

  const handleNext = (e) => {
    e.preventDefault();
    // Add validation logic here if needed
    // Redirect to the next page or handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f2f4ef] text-black px-20">
      {" "}
      {/* Increased horizontal padding */}
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <img
          src={warkaLogo}
          alt="Warka Academy Logo"
          className="h-20 w-20 object-cover"
        />
        <h1 className="text-4xl font-bold ml-4">Warka Academy</h1>
      </div>
      {/* Registration Box */}
      <div className="bg-[#f2f4ef] shadow-2xl rounded-lg mb-40 p-10 w-11/12 md:w-3/4 lg:w-1/2">
        <form className="space-y-6" onSubmit={handleNext}>
          <p className="text-3xl ">Registration Form </p>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter your first name"
            />
          </div>

          {/* Middle Name Field */}
          <div>
            <label
              htmlFor="middleName"
              className="block text-sm font-medium mb-2"
            >
              Middle Name *
            </label>
            <input
              type="text"
              id="middleName"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter your middle name"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter your last name"
            />
          </div>

          {/* Gender Dropdown */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender *
            </label>
            <select
              id="gender"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter your age"
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* New or Returning Student Radio Buttons */}
          <div>
            <span className="block text-sm font-medium mb-2">
              Are you a new or returning student? *
            </span>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="new"
                checked={isNewStudent === "new"}
                onChange={() => setIsNewStudent("new")}
                required
                className="mr-2"
              />
              New
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="returning"
                checked={isNewStudent === "returning"}
                onChange={() => setIsNewStudent("returning")}
                required
                className="mr-2"
              />
              Returning
            </label>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Student Photo Upload */}
          <div>
            <label
              htmlFor="studentPhoto"
              className="block text-sm font-medium mb-2"
            >
              Student Photo *
            </label>
            <input
              type="file"
              id="studentPhoto"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
          </div>

          {/* Birth Certificate Upload */}
          <div>
            <label
              htmlFor="birthCertificate"
              className="block text-sm font-medium mb-2"
            >
              Birth Certificate *
            </label>
            <input
              type="file"
              id="birthCertificate"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
          </div>

          {/* Last Class Certificate Upload */}
          <div>
            <label
              htmlFor="lastClassCertificate"
              className="block text-sm font-medium mb-2"
            >
              Last Class Certificate *
            </label>
            <input
              type="file"
              id="lastClassCertificate"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <Link to="/livingStatus">
            <div>
              <button
                type="submit"
                className="w-full bg-[#fd360d] text-white font-bold py-3 rounded-md hover:bg-[#b92b0d] transition duration-200"
              >
                Next
              </button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
