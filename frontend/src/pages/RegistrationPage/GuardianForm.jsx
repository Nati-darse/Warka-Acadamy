import React, { useState } from "react";
import warkaLogo from "../../assets/warka_logo.jpeg"; 
const GuardianForm = () => {
  const [guardianInfo, setGuardianInfo] = useState({});

  const handleChange = (e) => {
    setGuardianInfo({
      ...guardianInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setGuardianInfo({
      ...guardianInfo,
      [e.target.name]: e.target.files[0], 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardian Info:", guardianInfo);
    // Handle the submission logic here
  };

  return (
    <div className="min-h-screen pb-8 flex flex-col items-center  shadow justify-center bg-[#f2f4ef]">
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <img
          src={warkaLogo}
          alt="Warka Academy Logo"
          className="h-20 w-20 object-cover"
        />
        <h1 className="text-4xl font-bold ml-4">Warka Academy</h1>
      </div>

      {/* Guardian Form */}
      <div className="bg-white shadow-md rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className="text-3xl">Guardian Registration</p>
          {/* Guardian Fields */}
          {[
            "firstName",
            "middleName",
            "lastName",
            "phoneNumber",
            "address",
            "email",
          ].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                type="text"
                id={field}
                name={field}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div>
            <label htmlFor="id" className="block text-sm font-medium mb-2">
              ID *
            </label>
            <input
              type="file"
              id="id"
              name="id"
              onChange={handleFileChange} // Use handleFileChange for file input
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#fd360d] text-white font-bold py-3 rounded-md hover:bg-[#b92b0d] transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuardianForm;
