/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/utils/supabase/client";
import { Tables, TablesInsert } from "@/utils/supabase/types";
import { signUp } from "@/services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCNPJ } from "@/hooks/use-cnpj";

// Supabase table type aliases
export type BrazilianState = Tables<"brazilian_states">;
export type BusinessSegment = Tables<"business_segments">;
export type SubscriptionPlan = Tables<"subscription_plans">;
export type TenantInsert = TablesInsert<"tenants">;
export type ProfileInsert = TablesInsert<"profiles">;

export interface FormData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual?: string;
  cnaePrincipal: string;
  segmentoId: string;
  contactEmail: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cep: string;
  estadoId: string;
  cidade: string;
}
interface OnboardingContextValue {
  currentStep: number;
  isSubmitting: boolean;
  states: BrazilianState[];
  segments: BusinessSegment[];
  plans: SubscriptionPlan[];
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (field: keyof FormData, value: string) => void;
  submit: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState<BrazilianState[]>([]);
  const [segments, setSegments] = useState<BusinessSegment[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [defaultPlanId, setDefaultPlanId] = useState<string>();
  const [defaultStatusId, setDefaultStatusId] = useState<string>();
  const navigate = useNavigate();
  const { getCompanyByCNPJ } = useCNPJ();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    inscricaoEstadual: "",
    cnaePrincipal: "",
    segmentoId: "",
    contactEmail: "",
    phone: "",
    whatsapp: "",
    website: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    estadoId: "",
    cidade: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: statesData } = await supabase
          .from("brazilian_states")
          .select("*")
          .eq("is_active", true)
          .order("name");
        if (statesData) setStates(statesData);

        const { data: segmentsData } = await supabase
          .from("business_segments")
          .select("*")
          .eq("is_active", true)
          .order("sort_order");
        if (segmentsData) setSegments(segmentsData);

        const { data: plansData } = await supabase
          .from("subscription_plans")
          .select("*")
          .eq("is_active", true)
          .order("price_monthly", { ascending: true });
        if (plansData) {
          setPlans(plansData);
          const trialPlan = plansData.find(
            (p) => p.code === "trial" || p.code === "free"
          );
          if (trialPlan) setDefaultPlanId(trialPlan.id);
        }
        const { data: statusData } = await supabase
          .from("tenant_statuses")
          .select("id")
          .eq("code", "ativo")
          .single();
        if (statusData) setDefaultStatusId(statusData.id);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Retira formatação para contar dígitos
    const onlyDigits = formData.cnpj.replace(/\D/g, "");
    if (onlyDigits.length === 14) {
      getCompanyByCNPJ(formData.cnpj)
        .then((data) => {
          // Preenche automaticamnte campos de endereço e empresa
          updateFormData("logradouro", data.logradouro);
          updateFormData("numero", data.numero);
          updateFormData("bairro", data.bairro);
          updateFormData("cidade", data.cidade);
          updateFormData("estadoId", states.find(s => s.code === data.uf).id);
          updateFormData("cep", data.cep.replace('.', ''));
          updateFormData("razaoSocial", data.razao_social);
          updateFormData("nomeFantasia", data.nome_fantasia);
          updateFormData("contactEmail", data.email_contato);
          updateFormData("phone", data.telefone);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do CNPJ:", err);
        });
    }
  }, [formData.cnpj, getCompanyByCNPJ, states]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateSlug = (razaoSocial: string): string => {
    return razaoSocial
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const user = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        whatsapp: formData.whatsapp || undefined,
      });

      console.log(user);

      const slug = generateSlug(formData.razaoSocial);

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);

      const tenantData: TenantInsert = {
        slug,
        cnpj: formData.cnpj,
        razao_social: formData.razaoSocial,
        nome_fantasia: formData.nomeFantasia || null,
        inscricao_estadual: formData.inscricaoEstadual || null,
        cnae_principal: formData.cnaePrincipal || null,
        primary_segment_id: formData.segmentoId,
        email_domain: formData.contactEmail.split("@")[1] || null,
        status_id: defaultStatusId,
        plan_id: defaultPlanId,
        trial_ends_at: trialEndsAt.toISOString(),
        contact_email: formData.contactEmail,
        contact_phone: formData.phone || null,
        whatsapp_number: formData.whatsapp || null,
        website_url: formData.website || null,
        endereco_logradouro: formData.logradouro,
        endereco_numero: formData.numero || null,
        endereco_complemento: formData.complemento || null,
        endereco_bairro: formData.bairro,
        endereco_cidade: formData.cidade,
        state_id: formData.estadoId,
        cep: formData.cep,
        created_by: user?.id || null,
        onboarding_current_step: "dados_empresa",
        lgpd_acceptance_date: new Date().toISOString(),
        primary_color: "#4D2BFB",
        secondary_color: "#03F9FF",
        font_family: "Neue Haas Unica",
        timezone: "America/Sao_Paulo",
        locale: "pt-BR",
        payment_method: "pix",
        domain_validated: false,
        current_events_count: 0,
        current_admins_count: 0,
        max_events_allowed: 1,
        max_admins_allowed: 1,
        max_visitors_allowed: 100,
        max_exhibitors_allowed: 10,
        onboarding_completed: false,
        setup_wizard_completed: false,
        first_event_created: false,
        features_enabled: {},
        integrations_config: {},
        data_retention_months: 24,
        optante_simples_nacional: false,
        total_events_created: 0,
        total_revenue_brl: 0,
      };

      const { data: tenantResult, error: tenantError } = await supabase
        .from("tenants")
        .insert([tenantData])
        .select()
        .single();

      if (tenantError) throw tenantError;

      toast.success(
        "Cadastro realizado com sucesso! Verifique seu email para confirmar a conta."
      );
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erro ao realizar cadastro. Verifique os dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isSubmitting,
        states,
        segments,
        plans,
        formData,
        nextStep,
        prevStep,
        updateFormData,
        submit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export default OnboardingContext;
