import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Edit, Eye } from 'lucide-react';

const ExhibitorManual = () => {
  return (
    <DashboardLayout title="Manual do Expositor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Manual do Expositor</h2>
            <p className="text-muted-foreground">
              Gerencie e distribua o manual com todas as informações para expositores
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Editar Manual
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Informações Gerais</span>
              </CardTitle>
              <CardDescription>
                Dados básicos do evento e cronograma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                • Datas e horários<br/>
                • Local do evento<br/>
                • Contatos importantes<br/>
                • Regulamento geral
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Montagem de Stand</span>
              </CardTitle>
              <CardDescription>
                Instruções para montagem e desmontagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                • Horários de montagem<br/>
                • Especificações técnicas<br/>
                • Material permitido<br/>
                • Regras de segurança
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Serviços Disponíveis</span>
              </CardTitle>
              <CardDescription>
                Lista de serviços e fornecedores credenciados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                • Energia elétrica<br/>
                • Internet e telefonia<br/>
                • Limpeza e segurança<br/>
                • Catering e mobiliário
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documentos do Manual</CardTitle>
            <CardDescription>
              Versões e seções do manual do expositor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Manual Completo v2.1</h4>
                  <p className="text-sm text-muted-foreground">Última atualização: 15/03/2024</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
              
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  Sistema de gerenciamento de documentos será implementado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ExhibitorManual;