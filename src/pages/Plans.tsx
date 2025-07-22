
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import PlansHero from '@/components/plans/PlansHero';
import PlanCard from '@/components/plans/PlanCard';
import PlanComparison from '@/components/plans/PlanComparison';
import AddOnCard from '@/components/plans/AddOnCard';
import PlansCTA from '@/components/plans/PlansCTA';
import { mainPlans, addOnModules } from '@/data/plansData';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <PlansHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

      <div className="container mx-auto px-4 pb-6 md:pb-8">

        {/* Main Plans - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 md:mb-16">
          {mainPlans.map((plan) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              billingCycle={billingCycle} 
              formatPrice={formatPrice} 
            />
          ))}
        </div>

        {/* Plan Comparison Section */}
        <div className="mb-12 md:mb-16">
          <PlanComparison billingCycle={billingCycle} formatPrice={formatPrice} />
        </div>

        {/* Add-ons Section */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Módulos e Serviços Plugáveis</h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Expanda ainda mais as capacidades da plataforma com módulos especializados de IA e automação
            </p>
            <div className="tech-badge tech-glow mt-3 md:mt-4 text-xs md:text-sm inline-flex">
              <Sparkles size={14} className="md:w-4 md:h-4" />
              <span>Contratação à parte - Compatível com todos os planos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {addOnModules.map((module, index) => (
              <AddOnCard 
                key={index} 
                module={{
                  ...module,
                  icon: <module.icon className="text-primary" size={20} />
                }} 
              />
            ))}
          </div>
        </div>

        <PlansCTA />
      </div>
    </div>
  );
};

export default Plans;
