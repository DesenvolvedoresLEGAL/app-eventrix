import EnterpriseOnboardWizardPage from "@/features/Onboarding/pages/EnterpriseOnboardWizard";
import { Zap } from "lucide-react";
import React from "react";

const Teste = () => (
  <div className="min-h-screen gap-5 grid grid-cols-5 items-center justify-center bg-muted">
    <div className="legal-gradient-bg h-full w-full text-white p-8 flex flex-col justify-between relative overflow-hidden col-span-2">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 tech-float"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-black">EVENTRIX™</h1>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <Zap />
          <span className="text-sm font-semibold text-white/90">
            Powered by LEGAL AI
          </span>
        </div>
        <p className="text-white/80 text-lg">
          Plataforma completa para gestão de eventos
        </p>
      </div>
      <div className="hidden md:block relative z-10">
        <h2 className="text-2xl font-bold mb-6">Tudo em uma só plataforma</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="tech-badge bg-white/20 border-white/30 text-white">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            <p className="text-white/90">
              Gerencie todo o ciclo de vida dos seus eventos
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="tech-badge bg-white/20 border-white/30 text-white">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            <p className="text-white/90">
              Ferramentas avançadas de IA integradas
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="tech-badge bg-white/20 border-white/30 text-white">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            <p className="text-white/90">Dados e insights em tempo real</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block text-sm text-white/70 relative z-10">
        © 2025 Eventrix™. Todos os direitos reservados.
      </div>
    </div>

    <div className="w-full h-full col-span-3">
      <EnterpriseOnboardWizardPage />
    </div>
  </div>
);

export default Teste;
