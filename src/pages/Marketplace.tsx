
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, BookOpen, Edit, Code, Camera, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/HeroSection';
import ServiceCard from '@/components/ui/ServiceCard';

const categories = [
  { name: 'Todos', icon: Briefcase, active: true },
  { name: 'Tutoría', icon: BookOpen, active: false },
  { name: 'Redacción', icon: Edit, active: false },
  { name: 'Programación', icon: Code, active: false },
  { name: 'Diseño', icon: Camera, active: false },
];

const services = [
  {
    id: 1,
    title: "Tutoría en Matemáticas Avanzadas",
    description: "Clases personalizadas para estudiantes de ingeniería, física y matemáticas. Especialidad en cálculo multivariable, ecuaciones diferenciales y álgebra lineal.",
    price: 25,
    rating: 4.8,
    reviewCount: 56,
    sellerName: "Roberto García",
    sellerUniversity: "Universidad Nacional - Matemáticas",
    estimatedHours: 2,
    tags: ["Matemáticas", "Tutoría", "Ingeniería"],
    verified: true,
    imageUrl: "https://placehold.co/600x400?text=Math+Tutoring"
  },
  {
    id: 2,
    title: "Redacción y Corrección de Tesis",
    description: "Servicio profesional de redacción, corrección y edición de tesis y trabajos académicos. Garantizo coherencia, cohesión y adecuación a las normas APA.",
    price: 40,
    rating: 4.9,
    reviewCount: 32,
    sellerName: "Laura Sánchez",
    sellerUniversity: "Universidad Central - Literatura",
    estimatedHours: 5,
    tags: ["Redacción", "Tesis", "APA"],
    verified: true,
    imageUrl: "https://placehold.co/600x400?text=Thesis+Editing"
  },
  {
    id: 3,
    title: "Diseño de Presentaciones Profesionales",
    description: "Creación de presentaciones visualmente atractivas y profesionales para exposiciones académicas, proyectos y defensas de tesis.",
    price: 30,
    rating: 4.6,
    reviewCount: 28,
    sellerName: "Carlos Mendoza",
    sellerUniversity: "Universidad Técnica - Diseño Gráfico",
    estimatedHours: 3,
    tags: ["Diseño", "Presentaciones", "PowerPoint"],
    verified: false,
    imageUrl: "https://placehold.co/600x400?text=Presentation+Design"
  },
  {
    id: 4,
    title: "Desarrollo de Aplicaciones Web para Proyectos",
    description: "Desarrollo de aplicaciones web para proyectos universitarios. Especializado en React, Node.js y bases de datos SQL/NoSQL.",
    price: 50,
    rating: 4.7,
    reviewCount: 19,
    sellerName: "Ana Torres",
    sellerUniversity: "Universidad Tecnológica - Ingeniería de Software",
    estimatedHours: 8,
    tags: ["Programación", "Web", "React"],
    verified: true,
    imageUrl: "https://placehold.co/600x400?text=Web+Development"
  },
  {
    id: 5,
    title: "Tutoría de Idioma Inglés - Nivel Académico",
    description: "Clases de inglés enfocadas en mejorar habilidades académicas. Preparación para exámenes TOEFL, IELTS y presentaciones en inglés.",
    price: 20,
    rating: 4.9,
    reviewCount: 41,
    sellerName: "Miguel Blanco",
    sellerUniversity: "Universidad de Idiomas - Filología Inglesa",
    estimatedHours: 1.5,
    tags: ["Idiomas", "Inglés", "Tutoría"],
    verified: true,
    imageUrl: "https://placehold.co/600x400?text=English+Tutoring"
  },
  {
    id: 6,
    title: "Análisis Estadístico para Investigaciones",
    description: "Análisis estadístico para tesis e investigaciones. Manejo de SPSS, R y Excel avanzado. Interpretación de resultados incluida.",
    price: 35,
    rating: 4.8,
    reviewCount: 22,
    sellerName: "Patricia Rojas",
    sellerUniversity: "Universidad Nacional - Estadística",
    estimatedHours: 4,
    tags: ["Estadística", "Investigación", "SPSS"],
    verified: false,
    imageUrl: "https://placehold.co/600x400?text=Statistical+Analysis"
  },
];

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchValue, setSearchValue] = useState('');

  const filteredServices = services.filter(service => {
    if (activeCategory !== 'Todos') {
      const categoryMap: { [key: string]: string[] } = {
        'Tutoría': ['Tutoría', 'Idiomas', 'Matemáticas'],
        'Redacción': ['Redacción', 'Tesis', 'APA'],
        'Programación': ['Programación', 'Web', 'React'],
        'Diseño': ['Diseño', 'Presentaciones'],
      };
      
      if (!service.tags.some(tag => categoryMap[activeCategory]?.includes(tag))) {
        return false;
      }
    }
    
    if (searchValue && !service.title.toLowerCase().includes(searchValue.toLowerCase())) {
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
        title="Marketplace Universitario"
        subtitle="Encuentra y ofrece servicios académicos de calidad. Tutorías, edición de trabajos, diseño, programación y mucho más."
        ctaText="Ofrecer Servicio"
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
                placeholder="Buscar servicios académicos..."
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
      
      {/* Featured Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Servicios Destacados</h2>
              <p className="text-gray-600">Servicios mejor calificados por estudiantes como tú</p>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-medium">Top Rated</span>
            </div>
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  rating={service.rating}
                  reviewCount={service.reviewCount}
                  sellerName={service.sellerName}
                  sellerUniversity={service.sellerUniversity}
                  estimatedHours={service.estimatedHours}
                  tags={service.tags}
                  verified={service.verified}
                  imageUrl={service.imageUrl}
                  onClick={() => console.log(`Contratar: ${service.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No hay servicios que coincidan con tu búsqueda</h3>
              <p className="text-gray-600 mb-6">Intenta con otros términos o categorías.</p>
              <Button onClick={() => {setActiveCategory('Todos'); setSearchValue('')}}>
                Ver todos los servicios
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Offer Service CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Tienes habilidades para compartir?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Gana dinero ofreciendo tus servicios académicos a otros estudiantes.
            </p>
            <Button className="bg-cluber-600 hover:bg-cluber-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-base">
              Ofrecer un Servicio
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Marketplace;
