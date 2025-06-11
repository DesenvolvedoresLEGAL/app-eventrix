
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Check, Building, User, Mail, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Passo 1 - Dados pessoais
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Passo 2 - Dados da empresa
    companyName: '',
    companySize: '',
    position: '',
    website: '',
    
    // Passo 3 - Sobre os eventos
    eventTypes: '',
    eventsPerYear: '',
    avgVisitors: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simular criação de conta
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
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
                />
              </div>
              <div>
                <Label>Sobrenome *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Seu sobrenome"
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
              />
            </div>

            <div>
              <Label>Telefone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label>Senha *</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <Label>Confirmar Senha *</Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                placeholder="Digite a senha novamente"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building className="text-primary" size={20} />
                <h3 className="text-xl font-semibold">Dados da Empresa</h3>
              </div>
              <p className="text-muted-foreground">Conte-nos sobre sua organização</p>
            </div>

            <div>
              <Label>Nome da Empresa *</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <Label>Tamanho da Empresa *</Label>
              <Select onValueChange={(value) => updateFormData('companySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 funcionários</SelectItem>
                  <SelectItem value="11-50">11-50 funcionários</SelectItem>
                  <SelectItem value="51-200">51-200 funcionários</SelectItem>
                  <SelectItem value="201-500">201-500 funcionários</SelectItem>
                  <SelectItem value="500+">500+ funcionários</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Seu Cargo *</Label>
              <Input
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                placeholder="Ex: Gerente de Eventos"
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                placeholder="https://suaempresa.com"
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
                <h3 className="text-xl font-semibold">Sobre seus Eventos</h3>
              </div>
              <p className="text-muted-foreground">Ajude-nos a personalizar sua experiência</p>
            </div>

            <div>
              <Label>Tipos de Eventos *</Label>
              <Select onValueChange={(value) => updateFormData('eventTypes', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo principal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporativo">Eventos Corporativos</SelectItem>
                  <SelectItem value="feiras">Feiras e Exposições</SelectItem>
                  <SelectItem value="congressos">Congressos e Conferências</SelectItem>
                  <SelectItem value="workshops">Workshops e Treinamentos</SelectItem>
                  <SelectItem value="sociais">Eventos Sociais</SelectItem>
                  <SelectItem value="esportivos">Eventos Esportivos</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Eventos por Ano *</Label>
              <Select onValueChange={(value) => updateFormData('eventsPerYear', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Quantos eventos você organiza?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 eventos</SelectItem>
                  <SelectItem value="6-10">6-10 eventos</SelectItem>
                  <SelectItem value="11-20">11-20 eventos</SelectItem>
                  <SelectItem value="20+">Mais de 20 eventos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Média de Visitantes *</Label>
              <Select onValueChange={(value) => updateFormData('avgVisitors', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Média de participantes por evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100">Até 100 pessoas</SelectItem>
                  <SelectItem value="101-500">101-500 pessoas</SelectItem>
                  <SelectItem value="501-1000">501-1.000 pessoas</SelectItem>
                  <SelectItem value="1001-5000">1.001-5.000 pessoas</SelectItem>
                  <SelectItem value="5000+">Mais de 5.000 pessoas</SelectItem>
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
              { step: 1, title: "Dados Pessoais", desc: "Informações básicas" },
              { step: 2, title: "Empresa", desc: "Sobre sua organização" },
              { step: 3, title: "Eventos", desc: "Tipo de eventos que organiza" }
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
                Criar <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Conta</span>
              </h2>
              <p className="text-muted-foreground">Passo {currentStep} de 3</p>
              <div className="tech-badge tech-glow mt-4">
                <span>✨ 7 dias grátis</span>
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8 gap-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Voltar
                </Button>
              )}
              
              <div className="flex-1" />

              {currentStep < 3 ? (
                <Button onClick={nextStep} className="tech-button flex items-center gap-2">
                  Próximo
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
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
