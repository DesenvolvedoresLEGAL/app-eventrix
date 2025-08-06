import React, { useMemo } from "react";
import { ChevronRight, Building2, User, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { cn } from "@/lib/utils";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/features/Onboarding/context/OnboardingContext";
import { useCNPJ } from "@/hooks/use-cnpj";

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  title: string;
  icon: React.ReactNode;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = React.memo(
  ({ step, currentStep, title, icon, totalSteps }) => {
    const isActive = currentStep === step;
    const isCompleted = currentStep > step;

    return (
      <div className="flex items-center">
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                : "",
              isCompleted ? "bg-green-500 text-white" : "",
              !isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""
            )}
          >
            {isCompleted ? <Check className="w-6 h-6" /> : icon}
          </div>
          <span
            className={cn(
              "absolute -bottom-6 text-xs font-medium whitespace-nowrap",
              isActive ? "text-primary" : "text-gray-500"
            )}
          >
            {title}
          </span>
        </div>
        {step < totalSteps && (
          <ChevronRight
            className={cn(
              "w-6 h-6 mx-6",
              currentStep > step ? "text-green-500" : "text-gray-300"
            )}
          />
        )}
      </div>
    );
  }
);

StepIndicator.displayName = "StepIndicator";

const EnterpriseOnboardWizard: React.FC = () => {
  const {
    currentStep,
    isSubmitting,
    states,
    segments,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    submit,
  } = useOnboarding();
  const { getCompanyByCNPJ: fetchCompanyByCnpj } = useCNPJ();

  const [confirmPassword, setConfirmPassword] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleNext = () => {
    if (currentStep < 2) {
      nextStep();
    } else {
      submit();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const formatCNPJ = useMemo(
    () => (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 18);
    },
    []
  );

  const formatCEP = useMemo(
    () => (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 9);
    },
    []
  );

  const formatPhone = useMemo(
    () => (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
    },
    []
  );

  const handleCnpjBlur = async () => {
    const digits = formData.cnpj.replace(/\D/g, "");
    if (digits.length !== 14) return;
    try {
      const data = await fetchCompanyByCnpj(formData.cnpj);
      updateFormData("razaoSocial", data.razao_social);
      updateFormData("nomeFantasia", data.nome_fantasia || "");
      updateFormData("cep", formatCEP(data.cep));
      updateFormData("logradouro", data.logradouro);
      updateFormData("numero", data.numero);
      updateFormData("bairro", data.bairro);
      updateFormData("cidade", data.cidade);
      const state = states.find((s) => s.code === data.uf);
      if (state) updateFormData("estadoId", state.id);
      updateFormData("contactEmail", data.email_contato);
      updateFormData("phone", data.telefone.split("/")[0]);
    } catch (error) {
      console.error("Erro ao buscar dados do CNPJ:", error);
    }
  };

  const steps = useMemo(
    () => [
      {
        number: 1,
        title: "Dados de usuário",
        icon: <User className="w-6 h-6" />,
      },
      {
        number: 2,
        title: "Dados da empresa",
        icon: <Building2 className="w-6 h-6" />,
      },
    ],
    []
  );

  const passwordsMatch = useMemo(() => {
    return (
      formData.password === confirmPassword && formData.password.length > 0
    );
  }, [formData.password, confirmPassword]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Primeiro Nome *
              </label>
              <Input
                type="text"
                id="first-name"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                required
                placeholder="Fulano"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Último Nome *
              </label>
              <Input
                type="text"
                id="last-name"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                required
                placeholder="De Tal"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
                placeholder="empresa@email.com"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Este será seu email de acesso ao sistema
              </p>
            </div>
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                WhatsApp
              </label>
              <Input
                type="text"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) =>
                  updateFormData("whatsapp", formatPhone(e.target.value))
                }
                placeholder="(00) 00000-0000"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha *
              </label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Senha *
              </label>
              <Input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Digite a senha novamente"
                className={cn(
                  "w-full",
                  confirmPassword.length > 0 && !passwordsMatch
                    ? "border-red-500"
                    : ""
                )}
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  As senhas não coincidem
                </p>
              )}
              {passwordsMatch && confirmPassword.length > 0 && (
                <p className="text-xs text-green-500 mt-1">
                  ✓ Senhas coincidem
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="razao-social"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Razão Social *
              </label>
              <Input
                type="text"
                id="razao-social"
                value={formData.razaoSocial}
                readOnly
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="segmento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Segmento principal *
              </label>
              <select
                id="segmento"
                value={formData.segmentoId}
                onChange={(e) => updateFormData("segmentoId", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Selecione o segmento</option>
                {segments.map((segment) => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cnpj"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CNPJ da Empresa *
              </label>
              <Input
                type="text"
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => updateFormData("cnpj", formatCNPJ(e.target.value))}
                onBlur={handleCnpjBlur}
                required
                placeholder="00.000.000/0000-00"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="nome-fantasia"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Fantasia
              </label>
              <Input
                type="text"
                id="nome-fantasia"
                value={formData.nomeFantasia}
                readOnly
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="cep"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CEP *
              </label>
              <Input
                type="text"
                id="cep"
                value={formData.cep}
                readOnly
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="logradouro"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Logradouro *
              </label>
              <Input
                type="text"
                id="logradouro"
                value={formData.logradouro}
                readOnly
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="numero"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número
              </label>
              <Input
                type="text"
                id="numero"
                value={formData.numero}
                readOnly
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="bairro"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bairro *
              </label>
              <Input
                type="text"
                id="bairro"
                value={formData.bairro}
                readOnly
                required
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cidade *
                </label>
                <Input
                  type="text"
                  id="cidade"
                  value={formData.cidade}
                  readOnly
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Estado *
                </label>
                <Select
                  value={formData.estadoId}
                  onValueChange={(value) => updateFormData("estadoId", value)}
                  disabled
                >
                  <SelectTrigger
                    id="estado"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                  >
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email de Contato *
              </label>
              <Input
                type="email"
                id="contact-email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                required
                placeholder="contato@empresa.com"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone de Contato
              </label>
              <Input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  updateFormData("phone", formatPhone(e.target.value))
                }
                placeholder="(00) 0000-0000"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <Input
                type="text"
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://www.empresa.com"
                className="w-full"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceedToNextStep = useMemo(() => {
    if (currentStep === 1) {
      return (
        passwordsMatch &&
        formData.password.length >= 6 &&
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== ""
      );
    }
    if (currentStep === 2) {
      const digits = formData.cnpj.replace(/\D/g, "");
      return digits.length === 14;
    }
    return true;
  }, [currentStep, formData, passwordsMatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Cadastro de Cliente
          </h1>
          <p className="text-gray-600">
            Complete todos os passos para criar sua conta empresarial
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center mb-12 px-8">
          {steps.map((step) => (
            <StepIndicator
              key={step.number}
              step={step.number}
              currentStep={currentStep}
              title={step.title}
              icon={step.icon}
              totalSteps={steps.length}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-xl p-8 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Passo {currentStep} de {steps.length}:{" "}
              {steps[currentStep - 1].title}
            </h2>
          </div>

          <form
            ref={formRef}
            onSubmit={(e) => {
              if (!formRef.current?.checkValidity()) {
                e.preventDefault();
                formRef.current?.reportValidity();
                return;
              }
              e.preventDefault();
              handleNext();
            }}
          >
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !canProceedToNextStep}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : currentStep === 2 ? (
                  "Finalizar Cadastro"
                ) : (
                  "Próximo"
                )}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já possui uma conta?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Fazer login
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Quer conhecer nossos planos?{" "}
              <a
                href="/plans"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Ver planos
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnterpriseOnboardWizardPage: React.FC = () => (
  <OnboardingProvider>
    <EnterpriseOnboardWizard />
  </OnboardingProvider>
);

export default EnterpriseOnboardWizardPage;
