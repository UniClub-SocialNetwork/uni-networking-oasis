
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Users, Calendar, Briefcase, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/HeroSection';
import EventCard from '@/components/ui/EventCard';

const categories = [
  { name: 'Todos', icon: Users, active: true },
  { name: 'Académicos', icon: BookOpen, active: false },
  { name: 'Networking', icon: Briefcase, active: false },
  { name: 'Sociales', icon: Calendar, active: false },
];

const events = [
  {
    id: 1,
    title: "Seminario de Innovación Tecnológica",
    date: "25 de mayo, 2023",
    time: "15:00 - 17:30",
    location: "Auditorio Principal",
    attendees: 45,
    maxAttendees: 100,
    imageUrl: "https://placehold.co/600x400?text=Tech+Seminar",
    organizerName: "Facultad de Ingeniería",
    tags: ["Académico", "Tecnología"],
  },
  {
    id: 2,
    title: "Fiesta de Bienvenida Semestre",
    date: "28 de mayo, 2023",
    time: "21:00 - 03:00",
    location: "Club Universitario",
    attendees: 120,
    maxAttendees: 200,
    imageUrl: "https://placehold.co/600x400?text=Welcome+Party",
    organizerName: "Asociación de Estudiantes",
    tags: ["Social", "Fiesta"],
  },
  {
    id: 3,
    title: "Feria de Emprendimiento Estudiantil",
    date: "3 de junio, 2023",
    time: "10:00 - 18:00",
    location: "Plaza Central",
    attendees: 75,
    maxAttendees: 150,
    imageUrl: "https://placehold.co/600x400?text=Startup+Fair",
    organizerName: "Centro de Emprendimiento",
    tags: ["Negocios", "Networking"],
  },
  {
    id: 4,
    title: "Taller de Liderazgo y Comunicación",
    date: "10 de junio, 2023",
    time: "14:00 - 17:00",
    location: "Sala de Conferencias B",
    attendees: 30,
    maxAttendees: 40,
    imageUrl: "https://placehold.co/600x400?text=Leadership+Workshop",
    organizerName: "Departamento de Psicología",
    tags: ["Desarrollo Personal", "Taller"],
  },
  {
    id: 5,
    title: "Torneo de Fútbol Interfacultades",
    date: "15-20 de junio, 2023",
    time: "Varios horarios",
    location: "Campo Deportivo",
    attendees: 160,
    maxAttendees: 200,
    imageUrl: "https://placehold.co/600x400?text=Soccer+Tournament",
    organizerName: "Deportes Universitarios",
    tags: ["Deportes", "Competencia"],
  },
  {
    id: 6,
    title: "Conferencia: Futuro de la Inteligencia Artificial",
    date: "22 de junio, 2023",
    time: "16:00 - 18:00",
    location: "Auditorio de Ciencias",
    attendees: 85,
    maxAttendees: 120,
    imageUrl: "https://placehold.co/600x400?text=AI+Conference",
    organizerName: "Facultad de Computación",
    tags: ["Académico", "Tecnología"],
  },
];

const Community = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchValue, setSearchValue] = useState('');

  const filteredEvents = events.filter(event => {
    if (activeCategory !== 'Todos' && !event.tags.includes(activeCategory)) {
      return false;
    }
    if (searchValue && !event.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection
        title="Comunidad Universitaria"
        subtitle="Conecta con otros estudiantes, descubre eventos y participa en actividades exclusivas de tu universidad."
        ctaText="Crear Evento"
        secondaryCtaText="Explorar"
        gradient={true}
      />
      
      {/* Search & Filter */}
      <section className="py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar eventos, grupos o publicaciones..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cluber-500 focus:border-transparent"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "default" : "outline"}
                  className={`whitespace-nowrap ${
                    activeCategory === category.name 
                      ? "bg-cluber-600 text-white" 
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              ))}
              
              <Button variant="outline" className="text-gray-700">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Grid */}
      <section className="py-8 pb-16">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
            <Button variant="link" className="text-cluber-600">
              Ver todos
            </Button>
          </div>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                  imageUrl={event.imageUrl}
                  organizerName={event.organizerName}
                  tags={event.tags}
                  onRegister={() => console.log(`Registrarse a: ${event.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No hay eventos que coincidan con tu búsqueda</h3>
              <p className="text-gray-600 mb-6">Intenta con otros términos o categorías.</p>
              <Button onClick={() => {setActiveCategory('Todos'); setSearchValue('')}}>
                Ver todos los eventos
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Create Event CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Tienes un evento para compartir?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Organiza eventos académicos, sociales o deportivos y conéctate con otros estudiantes interesados.
            </p>
            <Button className="bg-cluber-600 hover:bg-cluber-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-base">
              Crear un Evento
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Community;
