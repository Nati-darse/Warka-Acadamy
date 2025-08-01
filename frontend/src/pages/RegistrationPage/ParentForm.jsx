import React, { useState } from "react";

const ParentForm = () => {
  const [parentInfo, setParentInfo] = useState({ paternal: {}, maternal: {} });

  const handleChange = (e, parentType) => {
    setParentInfo({
      ...parentInfo,
      [parentType]: {
        ...parentInfo[parentType],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent Info:", parentInfo);
    // Handle the submission logic here
  };

  return (
    <div className=" py-10 min-h-screen flex items-center justify-center bg-[#f2f4ef] shadow-2xl">
      <div className="bg-white shadow-md rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Paternal Information</h2>
          {/* Paternal Fields */}
          {["firstName", "middleName", "lastName", "phoneNumber", "address", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                type="text"
                id={field}
                name={field}
                onChange={(e) => handleChange(e, "paternal")}
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
              onChange={(e) => handleChange(e, "paternal")}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            />
          </div>
          <h2 className="text-xl font-bold mb-4">Maternal Information</h2>
          {/* Maternal Fields */}
          {["firstName", "middleName", "lastName", "phoneNumber", "address", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                type="text"
                id={field}
                name={field}
                onChange={(e) => handleChange(e, "maternal")}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div>
            <label htmlFor="maternalId" className="block text-sm font-medium mb-2">
              ID *
            </label>
            <input
              type="file"
              id="maternalId"
              name="id"
              onChange={(e) => handleChange(e, "maternal")}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-[#fd360d] text-white font-bold py-3 rounded-md hover:bg-[#b92b0d] transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentForm;