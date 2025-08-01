import React, { useState } from "react";
import LivingSituationPage from "./LivingSituationPage";
import ParentForm from "./ParentForm";
import GuardianForm from "./GuardianForm";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [livingWith, setLivingWith] = useState("");

  const handleChoice = (choice) => {
    setLivingWith(choice);
    setCurrentStep(2); // Move to the next step
  };

  return (
    <div>
      {currentStep === 1 && <LivingSituationPage onChoice={handleChoice} />}
      {currentStep === 2 && livingWith === "parents" && <ParentForm />}
      {currentStep === 2 && livingWith === "guardian" && <GuardianForm />}
    </div>
  );
};

export default Registration;
