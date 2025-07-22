
import React from 'react';
import { CheckSquare, Plus, Users, Clock, AlertCircle, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TeamTasksManager = () => {
  const tasks = [
    {
      id: 1,
      title: 'Configurar sistema de som',
      description: 'Instalar e testar equipamentos de áudio no auditório principal',
      team: 'Equipe Técnica',
      assignee: 'Carlos Santos',
      priority: 'Alta',
      status: 'Em Progresso',
      dueDate: '2024-02-15',
      completed: false
    },
    {
      id: 2,
      title: 'Preparar material de credenciamento',
      description: 'Imprimir crachás e preparar kits para participantes',
      team: 'Equipe de Apoio',
      assignee: 'Ana Silva',
      priority: 'Média',
      status: 'Pendente',
      dueDate: '2024-02-16',
      completed: false
    },
    {
      id: 3,
      title: 'Testar plataforma de streaming',
      description: 'Validar transmissão ao vivo e qualidade de vídeo',
      team: 'Equipe de TI',
      assignee: 'Pedro Costa',
      priority: 'Alta',
      status: 'Concluído',
      dueDate: '2024-02-14',
      completed: true
    }
  ];

  const teams = [
    { name: 'Equipe Técnica', members: 8, tasks: 12, completed: 8 },
    { name: 'Equipe de Apoio', members: 6, tasks: 10, completed: 7 },
    { name: 'Equipe de TI', members: 4, tasks: 8, completed: 6 },
    { name: 'Equipe de Marketing', members: 5, tasks: 6, completed: 5 }
  ];

  return (
    <div className="space-y-6 tech-grid min-h-full p-6">
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tarefas por Equipe</h1>
            <p className="text-muted-foreground">Organize e acompanhe tarefas de cada equipe</p>
          </div>
          <Button className="tech-button">
            <Plus size={16} className="mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Teams Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teams.map((team) => (
          <div key={team.name} className="tech-kpi-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{team.name}</h3>
              <Users size={16} className="text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Membros:</span>
                <span className="font-medium">{team.members}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tarefas:</span>
                <span className="font-medium">{team.completed}/{team.tasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                  style={{ width: `${(team.completed / team.tasks) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar tarefas..." className="pl-10 tech-input" />
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tech-card p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 hover:border-primary'
                  }`}>
                    {task.completed && <CheckSquare size={14} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{task.team}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Responsável: {task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`tech-badge ${
                    task.priority === 'Alta' 
                      ? 'text-red-600 bg-red-50 border-red-200' 
                      : task.priority === 'Média'
                      ? 'text-yellow-600 bg-yellow-50 border-yellow-200'
                      : 'text-green-600 bg-green-50 border-green-200'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`tech-badge ${
                    task.status === 'Concluído' 
                      ? 'text-green-600 bg-green-50 border-green-200' 
                      : task.status === 'Em Progresso'
                      ? 'text-blue-600 bg-blue-50 border-blue-200'
                      : 'text-gray-600 bg-gray-50 border-gray-200'
                  }`}>
                    {task.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamTasksManager;
