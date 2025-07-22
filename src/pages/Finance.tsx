
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { DollarSign, ArrowRight, Download, CheckSquare, FileText, ChevronDown } from 'lucide-react';

const Finance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  
  // Sample revenue data
  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Fev', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Abr', value: 61000 },
    { name: 'Mai', value: 55000 },
    { name: 'Jun', value: 67000 },
    { name: 'Jul', value: 72000 },
  ];
  
  // Sample distribution data
  const distributionData = [
    { name: 'Stands', value: 65, color: '#4D2BFB' },
    { name: 'Ingressos', value: 25, color: '#03F9FF' },
    { name: 'Patrocínios', value: 10, color: '#020CBC' },
  ];
  
  // Sample invoices
  const invoices = [
    { id: 'INV-2345', company: 'TechCorp Solutions', amount: 15000, date: '10/07/2024', status: 'paid' },
    { id: 'INV-2344', company: 'CloudSys Pro', amount: 8500, date: '08/07/2024', status: 'paid' },
    { id: 'INV-2343', company: 'DataViz Analytics', amount: 12000, date: '05/07/2024', status: 'pending' },
    { id: 'INV-2342', company: 'SecureNet Defenses', amount: 7000, date: '03/07/2024', status: 'pending' },
    { id: 'INV-2341', company: 'EduTech Platforms', amount: 9500, date: '01/07/2024', status: 'overdue' },
  ];
  
  const getInvoiceStatus = (status: string) => {
    switch(status) {
      case 'paid':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Pago</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pendente</span>;
      case 'overdue':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Atrasado</span>;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout title="Financeiro">
      <div className="space-y-6">
        <div>
          <h2>Gestão Financeira</h2>
          <p className="text-muted-foreground">Acompanhe as finanças do seu evento</p>
        </div>
        
        {/* Financial Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Receita Total</p>
            <h3 className="text-2xl font-bold mt-1">R$ 842.500</h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
              <span>+8.5% mês anterior</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Recebido</p>
            <h3 className="text-2xl font-bold mt-1">R$ 725.300</h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <span>86% da receita total</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">A Receber</p>
            <h3 className="text-2xl font-bold mt-1">R$ 117.200</h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <span>14% da receita total</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">ROI Médio</p>
            <h3 className="text-2xl font-bold mt-1">342%</h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
              <span>+12% vs. último evento</span>
            </div>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-card border rounded-lg p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h3 className="font-semibold">Receita por Período</h3>
            <div className="mt-2 sm:mt-0 flex gap-2">
              <button
                onClick={() => setSelectedPeriod('monthly')}
                className={`text-xs px-3 py-1 rounded-md ${
                  selectedPeriod === 'monthly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setSelectedPeriod('quarterly')}
                className={`text-xs px-3 py-1 rounded-md ${
                  selectedPeriod === 'quarterly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}
              >
                Trimestral
              </button>
              <button
                onClick={() => setSelectedPeriod('yearly')}
                className={`text-xs px-3 py-1 rounded-md ${
                  selectedPeriod === 'yearly' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}
              >
                Anual
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Receita']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4D2BFB" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Distribution and Recent Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Distribution */}
          <div className="bg-card border rounded-lg p-5">
            <h3 className="font-semibold mb-4">Distribuição de Receita</h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentagem']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-2">
              {distributionData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-lg font-semibold">{item.value}%</div>
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Invoices */}
          <div className="bg-card border rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Faturas Recentes</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                Ver todas <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between border-b last:border-0 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{invoice.company}</p>
                        <span className="text-xs text-muted-foreground">{invoice.id}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">R$ {invoice.amount.toLocaleString()}</p>
                      {getInvoiceStatus(invoice.status)}
                    </div>
                    <button className="p-1 rounded-md hover:bg-muted">
                      <Download size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Smart Contracts Section */}
        <div className="bg-card border rounded-lg p-5">
          <h3 className="font-semibold mb-4">Smart Contracts</h3>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-3">
                <div className="bg-tertiary/10 p-2 rounded-md">
                  <CheckSquare size={18} className="text-tertiary" />
                </div>
                <div>
                  <h4 className="font-medium">Contratos Automatizados com Blockchain</h4>
                  <p className="text-sm text-muted-foreground">Garanta segurança e automação em pagamentos e acordos.</p>
                </div>
              </div>
              <button className="mt-3 sm:mt-0 bg-tertiary text-tertiary-foreground text-sm px-4 py-2 rounded-md hover:bg-tertiary/80 transition-colors">
                Configurar Smart Contracts
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-medium">Status dos Smart Contracts</span>
              <button className="flex items-center gap-1 text-sm text-muted-foreground">
                Ethereum Mainnet <ChevronDown size={14} />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-md p-3">
                <p className="text-sm font-medium">Contratos Ativos</p>
                <p className="text-xl font-semibold mt-1">0 / 0</p>
                <p className="text-xs text-muted-foreground mt-1">Nenhum contrato configurado</p>
              </div>
              
              <div className="border rounded-md p-3">
                <p className="text-sm font-medium">Transações Automáticas</p>
                <p className="text-xl font-semibold mt-1">0</p>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </div>
              
              <div className="border rounded-md p-3">
                <p className="text-sm font-medium">Taxa de Gas Economizada</p>
                <p className="text-xl font-semibold mt-1">0 ETH</p>
                <p className="text-xs text-muted-foreground mt-1">Comparado com transações padrão</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
