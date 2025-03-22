
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Briefcase, Code, Edit, Camera, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/HeroSection';
import JobCard from '@/components/ui/JobCard';

const categories = [
  { name: 'Todos', icon: Briefcase, active: true },
  { name: 'Programación', icon: Code, active: false },
  { name: 'Redacción', icon: Edit, active: false },
  { name: 'Diseño', icon: Camera, active: false },
];

const jobs = [
  {
    id: 1,
    title: "Desarrollo de landing page para proyecto estudiantil",
    description: "Necesito desarrollar una landing page responsive para un proyecto de emprendimiento universitario. Debe tener formulario de contacto, sección de testimonios y galería.",
    budget: { min: 80, max: 150 },
    duration: "1-2 semanas",
    deadline: "15 de junio",
    category: "Programación",
    skills: ["HTML", "CSS", "JavaScript", "Responsive"],
    clientName: "Departamento de Emprendimiento",
    clientUniversity: "Universidad Nacional",
    published: "Hace 2 días",
    applications: 5,
  },
  {
    id: 2,
    title: "Edición de video para presentación de tesis",
    description: "Busco alguien que pueda editar un video de 5-7 minutos para mi presentación de tesis. Incluye clips de entrevistas, gráficos animados y efectos básicos.",
    budget: 60,
    duration: "3-5 días",
    deadline: "10 de junio",
    category: "Diseño",
    skills: ["Edición de Video", "After Effects", "Premiere Pro"],
    clientName: "Alejandra Morales",
    clientUniversity: "Universidad Central - Sociología",
    published: "Hace 3 días",
    applications: 3,
  },
  {
    id: 3,
    title: "Redacción de artículos para revista universitaria",
    description: "La revista estudiantil de la facultad necesita 5 artículos de 800-1000 palabras sobre innovación tecnológica y su impacto en diferentes carreras.",
    budget: { min: 50, max: 75 },
    duration: "1 semana",
    deadline: "20 de junio",
    category: "Redacción",
    skills: ["Redacción", "Investigación", "SEO básico"],
    clientName: "Revista Campus",
    clientUniversity: "Universidad Tecnológica",
    published: "Hace 1 día",
    applications: 8,
  },
  {
    id: 4,
    title: "Diseño de logotipo para grupo estudiantil",
    description: "Necesitamos un logotipo para nuestro grupo de investigación de energías renovables. Debe ser moderno, representar innovación y ser adaptable a diferentes formatos.",
    budget: 40,
    duration: "3 días",
    deadline: "12 de junio",
    category: "Diseño",
    skills: ["Diseño Gráfico", "Illustrator", "Branding"],
    clientName: "Grupo EcoInnovación",
    clientUniversity: "Universidad de Ciencias",
    published: "Hace 5 días",
    applications: 10,
  },
  {
    id: 5,
    title: "Desarrollo de chatbot para asistencia estudiantil",
    description: "Buscamos desarrollar un chatbot básico para resolver dudas frecuentes sobre trámites universitarios. Debe integrarse con nuestra página web actual.",
    budget: { min: 120, max: 200 },
    duration: "2-3 semanas",
    deadline: "30 de junio",
    category: "Programación",
    skills: ["JavaScript", "Python", "APIs", "Desarrollo de Chatbots"],
    clientName: "Secretaría Académica",
    clientUniversity: "Universidad Nacional",
    published: "Hace 4 días",
    applications: 4,
  },
  {
    id: 6,
    title: "Transcripción de entrevistas para investigación",
    description: "Necesito transcribir 5 entrevistas de aproximadamente 30 minutos cada una. El audio es claro y en español. Formato Word con timestamps cada 5 minutos.",
    budget: 45,
    duration: "1 semana",
    deadline: "18 de junio",
    category: "Redacción",
    skills: ["Transcripción", "Word", "Atención al detalle"],
    clientName: "Martín Gutiérrez",
    clientUniversity: "Universidad Central - Antropología",
    published: "Hace 2 días",
    applications: 6,
  },
];

const Microjobs = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchValue, setSearchValue] = useState('');

  const filteredJobs = jobs.filter(job => {
    if (activeCategory !== 'Todos' && job.category !== activeCategory) {
      return false;
    }
    
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
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
        title="UniGigs - Microtrabajos para Estudiantes"
        subtitle="Encuentra oportunidades flexibles para ganar dinero mientras estudias. Ofrece tus habilidades o contrata a otros estudiantes para proyectos puntuales."
        ctaText="Publicar Trabajo"
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
                placeholder="Buscar trabajos por título, descripción o habilidades..."
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
      
      {/* Jobs Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trabajos Disponibles</h2>
              <p className="text-gray-600">Trabajos flexibles y adecuados para estudiantes</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                <span className="font-medium">Mejor Pagados</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-1" />
                <span className="font-medium">Recientes</span>
              </div>
            </div>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  description={job.description}
                  budget={job.budget}
                  duration={job.duration}
                  deadline={job.deadline}
                  category={job.category}
                  skills={job.skills}
                  clientName={job.clientName}
                  clientUniversity={job.clientUniversity}
                  published={job.published}
                  applications={job.applications}
                  onClick={() => console.log(`Aplicar a: ${job.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No hay trabajos que coincidan con tu búsqueda</h3>
              <p className="text-gray-600 mb-6">Intenta con otros términos o categorías.</p>
              <Button onClick={() => {setActiveCategory('Todos'); setSearchValue('')}}>
                Ver todos los trabajos
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Post Job CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Necesitas ayuda con algún proyecto?
              </h2>
              <p className="text-gray-600 mb-6">
                Publica tu proyecto y conecta con estudiantes talentosos dispuestos a ayudarte. Define tu presupuesto, plazos y requisitos específicos.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cluber-100 text-cluber-600">1</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Describe tu proyecto</h3>
                    <p className="text-gray-600">Detalla qué necesitas y establece el presupuesto disponible.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cluber-100 text-cluber-600">2</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Recibe propuestas</h3>
                    <p className="text-gray-600">Selecciona al estudiante ideal entre los interesados.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cluber-100 text-cluber-600">3</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Pago seguro</h3>
                    <p className="text-gray-600">Solo pagas cuando estés 100% satisfecho con el resultado.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-cluber-600 hover:bg-cluber-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-base">
                  Publicar Trabajo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Vista previa de publicación</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título del trabajo</label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                      Diseño de presentación para proyecto de marketing
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                      Diseño
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto</label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                      $50 - $80
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plazo de entrega</label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                      5 días
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Microjobs;
