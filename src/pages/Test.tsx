import CompanyBasicInfo from "@/features/Onboarding/components/CompanyBasicInfoStep";
import ContactInfoStep from "@/features/Onboarding/components/ContactInfoStep";
import LocationStep from "@/features/Onboarding/components/LocationStep";
import UserRegister from "@/features/Onboarding/components/UserRegisterStep";
import EnterpriseOnboardWizard from "@/features/Onboarding/pages/EnterpriseOnboardWizard";
import React from "react";

const Teste = () => (
  <div className="min-h-screen gap-5 p-10 flex flex-col items-center justify-center bg-muted">
    <h1>Área de testes de desenvolvimento</h1>
    <EnterpriseOnboardWizard />
  </div>
);

export default Teste;
