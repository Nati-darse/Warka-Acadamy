import React, { useState } from "react";
import { Link } from "react-router-dom";
import warkaLogo from '../../assets/warkalogo.png';

const LivingSituationPage = ({ onChoice }) => {
  const [livingWith, setLivingWith] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    onChoice(livingWith); // Pass the choice to the parent component
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f2f4ef] text-black px-20">
      <div className="flex items-center mb-8">
        <img src={warkaLogo} alt="Warka Academy Logo" className="h-20 w-20 object-cover" />
        <h1 className="text-4xl font-bold ml-4">Warka Academy</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-10 w-11/12 md:w-3/4 lg:w-1/2">
        <form className="space-y-6" onSubmit={handleContinue}>
          <h2 className="text-xl font-bold mb-4">Are you living with:</h2>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="parents"
                checked={livingWith === 'parents'}
                onChange={() => setLivingWith('parents')}
                required
                className="mr-2"
              />
              Parents
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="guardian"
                checked={livingWith === 'guardian'}
                onChange={() => setLivingWith('guardian')}
                required
                className="mr-2"
              />
              Guardian
            </label>
          </div>
          <div>
            <button type="submit" className="w-full bg-[#fd360d] text-white font-bold py-3 rounded-md hover:bg-[#b92b0d] transition duration-200">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivingSituationPage;