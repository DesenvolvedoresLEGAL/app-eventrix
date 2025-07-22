
import React from 'react';
import { Zap, Star, CheckCircle, TrendingUp, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PlansHeroProps {
  billingCycle: 'annual' | 'monthly';
  setBillingCycle: (cycle: 'annual' | 'monthly') => void;
}

const PlansHero: React.FC<PlansHeroProps> = ({ billingCycle, setBillingCycle }) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-background py-6 md:py-12 px-4">
      {/* Back to Login Button - Mobile: top left, Desktop: top right */}
      <div className="container mx-auto mb-4 md:mb-6">
        <div className="flex justify-start md:justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-3 py-2"
            aria-label="Voltar para a página de login"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Voltar ao login</span>
          </Button>
        </div>
      </div>

      {/* Billing Toggle Section - Centered */}
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex flex-col items-center gap-3 md:gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-foreground px-4 text-center">Escolha seu plano ideal</h3>
          
          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 bg-muted rounded-xl sm:rounded-2xl p-1 sm:p-2 w-full max-w-sm sm:max-w-none">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                billingCycle === 'monthly' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                billingCycle === 'annual' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Cobrança Anual
              <Badge className="bg-secondary text-white border-0 text-xs">
                Economize 25%
              </Badge>
            </button>
          </div>
          
          {billingCycle === 'annual' && (
            <div className="flex items-center gap-2 animate-pulse px-4">
              <span className="text-xl sm:text-2xl">💰</span>
              <p className="text-secondary font-bold text-sm sm:text-lg text-center">
                Economize até 25% com o plano anual!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansHero;
