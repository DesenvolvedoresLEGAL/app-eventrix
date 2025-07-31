import React, { useState } from 'react';
import UserRegistration, { UserData } from '@/features/userRegistration/UserRegistration';
import TenantRegistration, { TenantData } from '@/features/tenantRegistration/TenantRegistration';
import PlanSelection from '@/features/planSelection/PlanSelection';
import TenantDashboard from '@/features/tenantDashboard/TenantDashboard';

const AuthOnboarding: React.FC = () => {
  const [step, setStep] = useState<'user' | 'tenant' | 'plan' | 'done'>('user');
  const [tenantId] = useState<string>('1');

  const handleUserSubmit = (data: UserData) => {
    console.log('User registration', data);
    setStep('tenant');
  };

  const handleTenantSubmit = (data: TenantData) => {
    console.log('Tenant registration', data);
    setStep('plan');
  };

  const handlePlanSelect = (planId: string) => {
    console.log('Plan selected', planId);
    setStep('done');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted">
      {step === 'user' && <UserRegistration onSubmit={handleUserSubmit} />}
      {step === 'tenant' && <TenantRegistration onSubmit={handleTenantSubmit} />}
      {step === 'plan' && <PlanSelection onSelect={handlePlanSelect} />}
      {step === 'done' && <TenantDashboard tenantId={tenantId} />}
    </div>
  );
};

export default AuthOnboarding;
