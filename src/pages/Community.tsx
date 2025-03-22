
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Ticket, Megaphone, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/ui/EventCard';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock events data
const upcomingEvents = [
  {
    title: "Feria de Ingeniería 2023",
    date: "15 de Octubre, 2023",
    time: "10:00 - 18:00",
    location: "Pabellón Central",
    attendees: 320,
    maxAttendees: 500,
    imageUrl: "https://placehold.co/600x400?text=Feria+de+Ingeniería",
    organizerName: "Facultad de Ingeniería",
    organizerAvatarUrl: "https://placehold.co/100x100?text=FI",
    tags: ["Académico", "Networking"]
  },
  {
    title: "Torneo Interfacultades de Fútbol",
    date: "20 de Octubre, 2023",
    time: "14:00 - 19:00",
    location: "Cancha Principal",
    attendees: 210,
    maxAttendees: 300,
    imageUrl: "https://placehold.co/600x400?text=Torneo+de+Fútbol",
    organizerName: "Deportes Universitarios",
    organizerAvatarUrl: "https://placehold.co/100x100?text=DU",
    tags: ["Deportivo", "Competencia"]
  },
  {
    title: "Festival Cultural Internacional",
    date: "5 de Noviembre, 2023",
    time: "16:00 - 22:00",
    location: "Plaza Central",
    attendees: 450,
    maxAttendees: 800,
    imageUrl: "https://placehold.co/600x400?text=Festival+Cultural",
    organizerName: "Asuntos Estudiantiles",
    tags: ["Cultural", "Internacional"]
  }
];

const myEvents = [
  {
    title: "Seminario de Investigación Científica",
    date: "12 de Octubre, 2023",
    time: "15:00 - 17:30",
    location: "Auditorio B",
    attendees: 45,
    maxAttendees: 100,
    imageUrl: "https://placehold.co/600x400?text=Seminario+Científico",
    organizerName: "Tú",
    organizerAvatarUrl: "https://placehold.co/100x100?text=Me",
    tags: ["Académico", "Investigación"]
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos Universitarios</h1>
          <p className="text-gray-600 mt-1">Organiza, gestiona y descubre eventos en tu campus</p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-cluber-600 hover:bg-cluber-700">
              <Calendar className="mr-2 h-4 w-4" />
              Crear evento
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Crear nuevo evento</SheetTitle>
              <SheetDescription>
                Completa la información para tu evento universitario
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <p className="text-center text-gray-500 py-8">
                Formulario de creación de evento aquí
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
          <TabsTrigger value="myevents">Mis Eventos</TabsTrigger>
          <TabsTrigger value="invitations">Invitaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                {...event}
                onRegister={() => console.log(`Registrarse a ${event.title}`)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="myevents" className="mt-0">
          {myEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event, index) => (
                <EventCard
                  key={index}
                  {...event}
                  onRegister={() => console.log(`Gestionar ${event.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No tienes eventos creados aún</p>
              <Button className="mt-4">Crear mi primer evento</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="invitations" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Seminario de Desarrollo Sostenible</CardTitle>
                <CardDescription>Invitación de: Facultad de Ciencias Ambientales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  <Calendar className="inline mr-2 h-4 w-4" />
                  18 de Octubre, 2023 • 16:00 - 18:30
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <Users className="inline mr-2 h-4 w-4" />
                  45 confirmados
                </p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Rechazar</Button>
                <Button className="bg-cluber-600 hover:bg-cluber-700">Confirmar Asistencia</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {activeTab === "upcoming" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Gestión de Eventos</CardTitle>
              <Calendar className="h-5 w-5 text-cluber-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Organiza eventos académicos, sociales o deportivos dentro del campus.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Inscripciones</CardTitle>
              <Check className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Confirmaciones de asistencia y networking integrado para tus eventos.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Venta de Entradas</CardTitle>
              <Ticket className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Vende entradas para eventos pagos y gestiona el acceso fácilmente.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Invitaciones</CardTitle>
              <Mail className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Envía invitaciones digitales con seguimiento de confirmaciones.</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "upcoming" && (
        <Card className="bg-gradient-to-r from-cluber-50 to-white border-cluber-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Megaphone className="h-5 w-5 mr-2 text-cluber-600" />
              Promociona tu marca en eventos universitarios
            </CardTitle>
            <CardDescription>
              Conecta con el público universitario a través de patrocinios y colaboraciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Las marcas interesadas en el público universitario pueden promocionarse en eventos populares.
              Alcanza a miles de estudiantes y profesionales en formación.
            </p>
            <Button variant="outline" className="border-cluber-200 text-cluber-700 hover:bg-cluber-50">
              Conocer más sobre opciones de publicidad
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default Community;
