import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrganizerDataForm } from '@/components/settings/OrganizerDataForm';
import { Building, Shield, Settings } from 'lucide-react';

const OrganizerSettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Building className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Configurações da Organização
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os dados e configurações da sua organização
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4 text-primary" />
                  Segurança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Todas as alterações são auditadas e registradas por segurança
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-gradient-to-r from-secondary/5 to-secondary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Settings className="w-4 h-4 text-secondary" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Mantenha os dados da organização sempre atualizados
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Form Card */}
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-t-lg">
              <CardTitle className="text-xl">Dados da Organização</CardTitle>
              <CardDescription>
                Atualize as informações básicas, endereço, contatos e identidade visual
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <OrganizerDataForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSettings;