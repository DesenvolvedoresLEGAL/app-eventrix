import CompanyBasicInfo from "@/features/Onboarding/pages/CompanyBasicInfo";
import UserRegister from "@/features/Onboarding/pages/UserRegister";
import React from "react";

const Teste = () => (
  <div className="min-h-screen gap-5 flex flex-col items-center justify-center bg-muted">
    <h1>Área de testes de desenvolvimento</h1>
    <UserRegister />
    <CompanyBasicInfo />
  </div>
);

export default Teste;
