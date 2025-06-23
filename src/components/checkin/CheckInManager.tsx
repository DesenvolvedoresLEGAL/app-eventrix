
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scan, 
  Search, 
  Clock, 
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Camera,
  QrCode,
  UserCheck,
  UserX,
  Timer
} from 'lucide-react';

const CheckInManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('scanner');
  const [scannerActive, setScannerActive] = useState(false);

  // Sample check-in data
  const checkInStats = {
    totalRegistered: 1250,
    checkedIn: 890,
    checkedOut: 120,
    currentlyInside: 770,
    averageStayTime: '4h 25m'
  };

  const recentActivity = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      type: 'checkin',
      time: '14:23',
      method: 'qr-code',
      location: 'Entrada Principal'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      type: 'checkout',
      time: '14:20',
      method: 'facial',
      location: 'Saída Sul'
    },
    {
      id: 3,
      name: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      type: 'checkin',
      time: '14:18',
      method: 'qr-code',
      location: 'Entrada Principal'
    },
    {
      id: 4,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      type: 'checkin',
      time: '14:15',
      method: 'facial',
      location: 'Entrada VIP'
    }
  ];

  const currentParticipants = [
    {
      id: 1,
      name: 'Pedro Silva',
      email: 'pedro.silva@email.com',
      checkInTime: '09:30',
      duration: '4h 53m',
      location: 'Auditório A',
      type: 'Palestrante'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      checkInTime: '10:15',
      duration: '4h 08m',
      location: 'Área de Networking',
      type: 'Visitante'
    },
    {
      id: 3,
      name: 'Roberto Lima',
      email: 'roberto.lima@email.com',
      checkInTime: '08:45',
      duration: '5h 38m',
      location: 'Stand 12',
      type: 'Expositor'
    }
  ];

  const handleStartScanner = () => {
    setScannerActive(true);
    // Simular escaneamento
    setTimeout(() => {
      setScannerActive(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Check-in/Check-out</h2>
          <p className="text-muted-foreground">Gerencie entradas e saídas do evento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Gerar QR Code
          </Button>
          <Button>
            <UserCheck className="w-4 h-4 mr-2" />
            Check-in Manual
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Registrados</p>
                <p className="text-2xl font-bold">{checkInStats.totalRegistered.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Check-ins</p>
                <p className="text-2xl font-bold">{checkInStats.checkedIn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Check-outs</p>
                <p className="text-2xl font-bold">{checkInStats.checkedOut}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Atualmente Dentro</p>
                <p className="text-2xl font-bold">{checkInStats.currentlyInside}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold">{checkInStats.averageStayTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
          <TabsTrigger value="current">Participantes Atuais</TabsTrigger>
        </TabsList>

        {/* Scanner Tab */}
        <TabsContent value="scanner" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Scanner */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Scanner QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center">
                  {scannerActive ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-muted-foreground">Escaneando...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Scan className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Posicione o QR Code na câmera</p>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleStartScanner} 
                  disabled={scannerActive}
                  className="w-full"
                >
                  {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
                </Button>
              </CardContent>
            </Card>

            {/* Manual Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Busca Manual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input
                    placeholder="Nome do participante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Input placeholder="Email ou CPF..." />
                  <Input placeholder="Número do crachá..." />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Check-in
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <UserX className="w-4 h-4 mr-2" />
                    Check-out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {activity.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge className={activity.type === 'checkin' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {activity.type === 'checkin' ? 'Check-in' : 'Check-out'}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{activity.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.method === 'qr-code' ? 'QR Code' : 'Facial'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Current Participants Tab */}
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Participantes Atualmente no Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Check-in: {participant.checkInTime}</p>
                        <p className="text-sm text-muted-foreground">Duração: {participant.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{participant.location}</p>
                        <Badge variant="outline">{participant.type}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <UserX className="w-4 h-4 mr-2" />
                        Check-out
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheckInManager;
