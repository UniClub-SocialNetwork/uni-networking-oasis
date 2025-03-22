
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, Briefcase, Lightbulb, Zap, PenTool, Languages, Music, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/HeroSection';
import SkillCard from '@/components/ui/SkillCard';

const categories = [
  { name: 'Todos', icon: Briefcase, active: true },
  { name: 'Idiomas', icon: Languages, active: false },
  { name: 'Tecnología', icon: Code, active: false },
  { name: 'Arte', icon: PenTool, active: false },
  { name: 'Música', icon: Music, active: false },
];

const skills = [
  {
    id: 1,
    teachSkill: "Inglés Avanzado",
    learnSkill: "Programación Python",
    description: "Soy estudiante de Traducción e Interpretación, con certificado C1 en inglés. Ofrezco enseñar inglés conversacional y académico a cambio de aprender programación en Python para análisis de datos.",
    userName: "Martina López",
    userUniversity: "Universidad de Idiomas",
    userRating: 4.9,
    reviewCount: 12,
    sessionsDone: 24,
  },
  {
    id: 2,
    teachSkill: "Diseño Gráfico (Adobe)",
    learnSkill: "Contabilidad Básica",
    description: "Estudiante de último año de Diseño Gráfico. Puedo enseñar Photoshop, Illustrator y After Effects a nivel profesional. Busco aprender conceptos básicos de contabilidad para mi emprendimiento.",
    userName: "Daniel Torres",
    userUniversity: "Universidad de Artes",
    userRating: 4.7,
    reviewCount: 18,
    sessionsDone: 15,
  },
  {
    id: 3,
    teachSkill: "Desarrollo Web (React)",
    learnSkill: "Oratoria y Presentaciones",
    description: "Ingeniero de software con experiencia en React y desarrollo frontend. Quiero intercambiar clases de programación web por técnicas de oratoria y presentaciones efectivas para mejorar mis habilidades de comunicación profesional.",
    userName: "Carolina Núñez",
    userUniversity: "Universidad Tecnológica",
    userRating: 4.8,
    reviewCount: 23,
    sessionsDone: 31,
  },
  {
    id: 4,
    teachSkill: "Piano y Teoría Musical",
    learnSkill: "Francés Básico",
    description: "Estudiante de 4º año de Conservatorio, especialidad en piano. Ofrezco clases de piano y teoría musical para todos los niveles. Busco aprender francés básico para un intercambio académico próximo.",
    userName: "Jorge Méndez",
    userUniversity: "Conservatorio Nacional",
    userRating: 5.0,
    reviewCount: 16,
    sessionsDone: 28,
  },
  {
    id: 5,
    teachSkill: "Estadística Aplicada",
    learnSkill: "Fotografía Digital",
    description: "Doctorando en Estadística con buen manejo de R, SPSS y análisis de datos. Puedo enseñar estadística aplicada a investigaciones. Me interesa aprender fotografía digital a nivel intermedio.",
    userName: "Laura Fernández",
    userUniversity: "Universidad Nacional",
    userRating: 4.6,
    reviewCount: 9,
    sessionsDone: 12,
  },
  {
    id: 6,
    teachSkill: "Marketing Digital",
    learnSkill: "Guitarra",
    description: "Especialista en marketing digital, SEO y redes sociales. Trabajo para una agencia mientras termino mis estudios. Intercambio conocimientos en marketing por clases de guitarra (nivel principiante/intermedio).",
    userName: "Miguel Soto",
    userUniversity: "Universidad de Negocios",
    userRating: 4.8,
    reviewCount: 14,
    sessionsDone: 19,
  },
];

const SkillsExchange = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchValue, setSearchValue] = useState('');

  const filteredSkills = skills.filter(skill => {
    if (activeCategory !== 'Todos') {
      const categoryMap: { [key: string]: string[] } = {
        'Idiomas': ['Inglés', 'Francés', 'Español', 'Alemán'],
        'Tecnología': ['Programación', 'Python', 'React', 'Desarrollo Web'],
        'Arte': ['Diseño', 'Fotografía'],
        'Música': ['Piano', 'Guitarra', 'Teoría Musical'],
      };
      
      const teachMatches = categoryMap[activeCategory]?.some(keyword => 
        skill.teachSkill.toLowerCase().includes(keyword.toLowerCase())
      );
      
      const learnMatches = categoryMap[activeCategory]?.some(keyword => 
        skill.learnSkill.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!teachMatches && !learnMatches) {
        return false;
      }
    }
    
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        skill.teachSkill.toLowerCase().includes(searchLower) ||
        skill.learnSkill.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower)
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
        title="Intercambio de Habilidades"
        subtitle="Enseña lo que sabes y aprende lo que te interesa. Conecta con otros estudiantes para intercambiar conocimientos sin dinero de por medio."
        ctaText="Crear Intercambio"
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
                placeholder="Buscar habilidades para aprender o enseñar..."
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
              <h2 className="text-2xl font-bold text-gray-900">Intercambios Disponibles</h2>
              <p className="text-gray-600">Encuentra el intercambio perfecto para tus habilidades</p>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-cluber-500 mr-1" />
              <span className="font-medium">Destacados</span>
            </div>
          </div>
          
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  teachSkill={skill.teachSkill}
                  learnSkill={skill.learnSkill}
                  description={skill.description}
                  userName={skill.userName}
                  userUniversity={skill.userUniversity}
                  userRating={skill.userRating}
                  reviewCount={skill.reviewCount}
                  sessionsDone={skill.sessionsDone}
                  onClick={() => console.log(`Contactando a: ${skill.userName}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No hay intercambios que coincidan con tu búsqueda</h3>
              <p className="text-gray-600 mb-6">Intenta con otros términos o categorías.</p>
              <Button onClick={() => {setActiveCategory('Todos'); setSearchValue('')}}>
                Ver todos los intercambios
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona el intercambio?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Aprende y enseña sin gastar dinero, solo invirtiendo tu tiempo y conocimiento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-cluber-100 text-cluber-600 rounded-full mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-3">Crea tu perfil de intercambio</h3>
              <p className="text-gray-600">Define qué habilidades puedes enseñar y cuáles te interesa aprender. Sé específico para mejores coincidencias.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-cluber-100 text-cluber-600 rounded-full mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-3">Encuentra coincidencias</h3>
              <p className="text-gray-600">Busca estudiantes que ofrezcan lo que quieres aprender y que les interese lo que tú puedes enseñar.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-cluber-100 text-cluber-600 rounded-full mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-3">Coordina y evalúa</h3>
              <p className="text-gray-600">Agenda sesiones de intercambio y después de cada una, califica tu experiencia para construir reputación.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-cluber-600 hover:bg-cluber-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-base">
              Crear mi Intercambio
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SkillsExchange;
