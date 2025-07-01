
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Check, Building, User, Mail, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { WizardFormData } from '@/types/profile';
import { usePlans } from "@/data/plansData";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { data: mainPlans = [] } = usePlans();

  const [formData, setFormData] = useState<WizardFormData>({
    // Step 1 - Account
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',

    // Step 2 - Organization
    orgName: '',
    documentId: '',
    contactEmail: '',
    contactPhone: '',
    position: '',

    // Step 3 - Plan
    planId: ''
  });

  const updateFormData = (field: keyof WizardFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          formData.password.trim() &&
          formData.confirmPassword.trim() &&
          formData.password === formData.confirmPassword &&
          formData.password.length >= 6
        );
      case 2:
        return !!(
          formData.orgName.trim() &&
          formData.documentId.trim() &&
          formData.contactEmail.trim() &&
          formData.position.trim()
        );
      case 3:
        return !!formData.planId;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      return;
    }

    try {
      // Map wizard data to register function expected format
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        orgName: formData.orgName,
        documentId: formData.documentId,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone || undefined,
        planId: formData.planId,
        position: formData.position
      });

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="text-primary" size={20} />
                <h3 className="text-xl font-semibold">Dados Pessoais</h3>
              </div>
              <p className="text-muted-foreground">Vamos começar com suas informações básicas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Seu nome"
                  disabled={loading}
                />
              </div>
              <div>
                <Label>Sobrenome *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Seu sobrenome"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Telefone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Senha *</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Mínimo 6 caracteres"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Confirmar Senha *</Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Digite a senha novamente"
                disabled={loading}
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">As senhas não coincidem</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building className="text-primary" size={20} />
                <h3 className="text-xl font-semibold">Organização</h3>
              </div>
              <p className="text-muted-foreground">Dados da sua empresa</p>
            </div>

            <div>
              <Label>Nome da Organização *</Label>
              <Input
                value={formData.orgName}
                onChange={(e) => updateFormData('orgName', e.target.value)}
                placeholder="Nome da organização"
                disabled={loading}
              />
            </div>

            <div>
              <Label>CNPJ/CPF *</Label>
              <Input
                value={formData.documentId}
                onChange={(e) => updateFormData('documentId', e.target.value)}
                placeholder="00.000.000/0000-00"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Seu cargo na empresa</Label>
              <Input
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                placeholder="Diretor de Marketing"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Email de Contato *</Label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                placeholder="contato@empresa.com"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Telefone de Contato</Label>
              <Input
                value={formData.contactPhone}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                placeholder="(11) 99999-9999"
                disabled={loading}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="text-primary" size={20} />
                <h3 className="text-xl font-semibold">Selecione um Plano</h3>
              </div>
              <p className="text-muted-foreground">Escolha o plano para sua organização</p>
            </div>

            <div>
              <Label>Plano *</Label>
              <Select onValueChange={(value) => updateFormData('planId', value)} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  {mainPlans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row tech-grid">
      {/* Left side - Brand */}
      <div className="legal-gradient-bg w-full md:w-2/5 text-white p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 tech-float"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-black">EVENTRIX™</h1>
          </div>
          <div className="flex items-center gap-1 mb-4">
            <Zap size={12} className="text-secondary" />
            <span className="text-sm font-semibold text-white/90">Powered by LEGAL AI</span>
          </div>
          <p className="text-white/80 text-lg mb-8">Comece seu teste gratuito de 7 dias</p>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {[
              { step: 1, title: "Conta", desc: "Seus dados" },
              { step: 2, title: "Organização", desc: "Dados da empresa" },
              { step: 3, title: "Plano", desc: "Escolha do plano" }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= item.step 
                    ? 'bg-secondary text-white' 
                    : 'bg-white/20 text-white/60'
                }`}>
                  {currentStep > item.step ? <Check size={16} /> : item.step}
                </div>
                <div>
                  <div className={`font-medium ${currentStep >= item.step ? 'text-white' : 'text-white/60'}`}>
                    {item.title}
                  </div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-lg">
          <div className="tech-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Criar <span className="bg-brand bg-clip-text text-transparent">Conta</span>
              </h2>
              <p className="text-muted-foreground">Passo {currentStep} de 3</p>
              <div className="tech-badge tech-glow mt-4">
                <span>✨ 7 dias grátis</span>
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8 gap-4">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={prevStep} 
                  className="flex items-center gap-2"
                  disabled={loading}
                >
                  <ArrowLeft size={16} />
                  Voltar
                </Button>
              )}
              
              <div className="flex-1" />

              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext} 
                  className="tech-button flex items-center gap-2"
                  disabled={!validateStep(currentStep) || loading}
                >
                  Próximo
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!validateStep(3) || loading}
                  className="tech-button flex items-center gap-2"
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                  {!loading && <ArrowRight size={16} />}
                </Button>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta? <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Fazer login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
