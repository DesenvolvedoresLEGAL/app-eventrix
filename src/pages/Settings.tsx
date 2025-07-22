import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { User, Users, Lock, Globe, Webhook, Shield, Settings as SettingsIcon, Check, Zap } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <DashboardLayout title="Configurações">
      <div className="space-y-8 legal-tech-grid min-h-full">
        {/* Header with LEGAL branding */}
        <div className="legal-card p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 legal-gradient-bg opacity-10 rounded-full -mr-16 -mt-16 legal-animate-float"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Configurações
              </h1>
              <div className="legal-powered-badge legal-animate-pulse">
                <Zap size={14} />
                <span>Powered by LEGAL AI</span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Gerencie suas preferências e configurações do sistema EVENTRIX
            </p>
          </div>
        </div>
        
        {/* Settings Tabs and Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Tabs */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'profile' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <User size={20} />
              <span>Perfil</span>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'team' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <Users size={20} />
              <span>Equipe</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'security' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <Lock size={20} />
              <span>Segurança</span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'integrations' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <Webhook size={20} />
              <span>Integrações</span>
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'tenants' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <Globe size={20} />
              <span>Multi-tenant</span>
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'privacy' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <Shield size={20} />
              <span>LGPD</span>
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left font-semibold transition-all duration-300 ${
                activeTab === 'general' 
                  ? 'legal-gradient-bg text-white shadow-lg scale-105' 
                  : 'legal-card hover:scale-105'
              }`}
            >
              <SettingsIcon size={20} />
              <span>Geral</span>
            </button>
          </div>
          
          {/* Enhanced Content */}
          <div className="md:col-span-3">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="legal-card p-8">
                <h3 className="text-2xl font-bold text-tertiary mb-6">Informações do Perfil</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl legal-gradient-bg flex items-center justify-center text-white text-2xl font-black shadow-lg">
                      A
                    </div>
                    <button className="legal-gradient-button px-6 py-3 font-semibold">
                      Alterar Foto
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3 text-tertiary">Nome</label>
                      <input 
                        type="text" 
                        className="legal-input w-full"
                        defaultValue="Admin"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-3 text-tertiary">Sobrenome</label>
                      <input 
                        type="text" 
                        className="legal-input w-full"
                        defaultValue="LEGAL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-3 text-tertiary">Email</label>
                      <input 
                        type="email" 
                        className="legal-input w-full"
                        defaultValue="admin@eventrix.legal"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-3 text-tertiary">Telefone</label>
                      <input 
                        type="tel" 
                        className="legal-input w-full"
                        defaultValue="+55 11 99999-8888"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-3 text-tertiary">Cargo</label>
                      <input 
                        type="text" 
                        className="legal-input w-full"
                        defaultValue="Administrador do Sistema EVENTRIX"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="legal-gradient-button px-8 py-4 text-lg font-bold">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Team Settings */}
            {activeTab === 'team' && (
              <div className="legal-card p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-tertiary">Membros da Equipe</h3>
                  <button className="legal-gradient-button px-6 py-3 font-bold">
                    + Adicionar Membro
                  </button>
                </div>
                
                <div className="space-y-6">
                  {[
                    { name: 'Admin LEGAL', email: 'admin@eventrix.legal', role: 'Administrador', status: 'active' },
                    { name: 'João Silva', email: 'joao@eventrix.legal', role: 'Gerente de Eventos', status: 'active' },
                    { name: 'Maria Oliveira', email: 'maria@eventrix.legal', role: 'Coordenadora', status: 'active' },
                    { name: 'Pedro Santos', email: 'pedro@eventrix.legal', role: 'Analista', status: 'invited' },
                  ].map((member, index) => (
                    <div key={index} className="flex justify-between items-center border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl legal-gradient-bg flex items-center justify-center text-white font-black text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{member.role}</span>
                        {member.status === 'active' ? (
                          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            <Check size={14} /> Ativo
                          </div>
                        ) : (
                          <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">Convidado</div>
                        )}
                        <button className="text-primary hover:text-tertiary font-semibold transition-colors">Editar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Multi-tenant Settings */}
            {activeTab === 'tenants' && (
              <div className="space-y-8">
                <div className="legal-card p-8">
                  <h3 className="text-2xl font-bold text-tertiary mb-6">Configurações Multi-tenant</h3>
                  
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      Configure e gerencie múltiplas organizações (tenants) na sua plataforma EVENTRIX™.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold mb-3 text-tertiary">Nome da Organização Principal</label>
                        <input 
                          type="text" 
                          className="legal-input w-full"
                          defaultValue="EVENTRIX Eventos"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold mb-3 text-tertiary">Domínio</label>
                        <input 
                          type="text" 
                          className="legal-input w-full"
                          defaultValue="eventos.eventrix.legal"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-3 text-tertiary">Isolamento de Dados</label>
                      <select className="legal-input w-full">
                        <option>Database por Tenant</option>
                        <option>Schema por Tenant</option>
                        <option>Tabelas Compartilhadas</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="legal-gradient-button px-8 py-4 text-lg font-bold">
                        Salvar Configurações
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="legal-card p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-tertiary">Organizações (Tenants)</h3>
                    <button className="legal-gradient-button px-6 py-3 font-bold">
                      + Nova Organização
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'EVENTRIX Eventos', domain: 'eventos.eventrix.legal', users: 15, active: true },
                      { name: 'Tech Summit', domain: 'techsummit.eventos.com', users: 8, active: true },
                      { name: 'Expo Business', domain: 'expobusiness.eventos.com', users: 5, active: false },
                    ].map((tenant, index) => (
                      <div key={index} className="flex justify-between items-center border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div>
                          <p className="font-bold text-lg">{tenant.name}</p>
                          <p className="text-sm text-muted-foreground">{tenant.domain}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold">{tenant.users} usuários</span>
                          {tenant.active ? (
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Ativo</div>
                          ) : (
                            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Inativo</div>
                          )}
                          <button className="text-primary hover:text-tertiary font-semibold transition-colors">Gerenciar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy/LGPD Settings */}
            {activeTab === 'privacy' && (
              <div className="legal-card p-8">
                <h3 className="text-2xl font-bold text-tertiary mb-6">Configurações LGPD</h3>
                
                <div className="space-y-8">
                  <p className="text-muted-foreground">
                    Configure as políticas de privacidade e conformidade com a Lei Geral de Proteção de Dados.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Política de Privacidade", desc: "Exibir e configurar a política de privacidade" },
                      { title: "Termos de Uso", desc: "Exibir e configurar os termos de uso" },
                      { title: "Consentimento de Cookies", desc: "Configurar banner e opções de cookies" },
                      { title: "Encarregado de Dados (DPO)", desc: "Definir responsável LGPD" },
                      { title: "Relatório de Impacto (RIPD)", desc: "Gerar relatório de impacto à proteção de dados" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div>
                          <p className="font-bold text-lg">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <button className="text-primary hover:text-tertiary font-semibold transition-colors">
                          {item.title.includes('Relatório') ? 'Gerar' : 'Editar'}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-tertiary">Retenção de Dados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold mb-3 text-tertiary">Dados de Visitantes</label>
                        <select className="legal-input w-full">
                          <option>6 meses após o evento</option>
                          <option>1 ano após o evento</option>
                          <option>2 anos após o evento</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-3 text-tertiary">Dados de Reconhecimento Facial</label>
                        <select className="legal-input w-full">
                          <option>Imediatamente após o evento</option>
                          <option>30 dias após o evento</option>
                          <option>90 dias após o evento</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="legal-gradient-button px-8 py-4 text-lg font-bold">
                      Salvar Configurações
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {!['profile', 'team', 'tenants', 'privacy'].includes(activeTab) && (
              <div className="legal-card p-12 flex flex-col items-center justify-center text-center">
                <div className="legal-gradient-bg w-20 h-20 rounded-2xl flex items-center justify-center mb-6 legal-animate-float">
                  <SettingsIcon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-tertiary">Configurações {activeTab}</h3>
                <p className="text-muted-foreground text-lg">
                  Esta seção está em desenvolvimento. Em breve estará disponível!
                </p>
                <div className="legal-powered-badge mt-6">
                  <Zap size={12} />
                  <span>Powered by LEGAL AI</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
