
import React from 'react';
import { Check, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Plan {
  name: string;
  description: string;
  price: { annual: number; monthly: number };
  popular: boolean;
  features: {
    events: string;
    visitors: string;
    exhibitors: string;
    admins: string;
    support: string;
  };
  highlights: string[];
}

interface PlanCardProps {
  plan: Plan;
  billingCycle: 'annual' | 'monthly';
  formatPrice: (price: number) => string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, billingCycle, formatPrice }) => {
  const currentPrice = billingCycle === 'annual' ? plan.price.annual : plan.price.monthly;
  const monthlyEquivalent = billingCycle === 'annual' ? plan.price.annual / 12 : plan.price.monthly;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[600px] flex flex-col ${
      plan.popular 
        ? 'border-2 border-primary shadow-2xl lg:scale-[1.02] bg-gradient-to-b from-primary/5 to-secondary/5' 
        : 'tech-card hover:border-primary/30'
    }`}>
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary via-secondary to-primary text-white text-center py-3 text-sm font-bold">
          <Star size={16} className="inline mr-2" />
          MAIS POPULAR
          <Crown size={16} className="inline ml-2" />
        </div>
      )}
      
      <CardHeader className={`text-center ${plan.popular ? 'pt-16' : 'pt-8'} pb-4 flex-shrink-0`}>
        <h3 className="text-3xl font-bold text-foreground">{plan.name}</h3>
        <p className="text-muted-foreground text-lg">{plan.description}</p>
        
        <div className="py-6">
          {plan.name === 'Enterprise' ? (
            <div className="text-4xl font-bold text-primary">Sob consulta</div>
          ) : (
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">
                {formatPrice(currentPrice)}
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                por {billingCycle === 'annual' ? 'ano' : 'mês'}
              </div>
              {billingCycle === 'annual' && (
                <div className="text-sm text-secondary font-medium">
                  {formatPrice(monthlyEquivalent)}/mês
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-8 flex-grow flex flex-col">
        {/* Features Grid */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Eventos:</span>
              <div className="font-semibold">{plan.features.events}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Admins:</span>
              <div className="font-semibold">{plan.features.admins}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Visitantes:</span>
              <div className="font-semibold">{plan.features.visitors}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Expositores:</span>
              <div className="font-semibold">
                {plan.features.exhibitors === 'até 2.000' ? '+500' : plan.features.exhibitors}
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground text-sm">Suporte:</span>
            <div className="font-semibold text-sm">{plan.features.support}</div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-3 flex-grow">
          {plan.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>

        <Button 
          className={`w-full h-12 text-base font-semibold mt-auto flex-shrink-0 ${
            plan.popular 
              ? 'tech-button text-white' 
              : 'border-2 hover:border-primary hover:bg-primary hover:text-white'
          }`}
          variant={plan.popular ? 'default' : 'outline'}
          size="lg"
        >
          {plan.name === 'Enterprise' ? 'Falar com Vendas' : 'Começar Agora'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
