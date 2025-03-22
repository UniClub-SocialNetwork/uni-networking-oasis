
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, PenTool, Briefcase, Calendar, BadgePercent, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/HeroSection';
import FeatureCard from '@/components/ui/FeatureCard';

const features = [
  {
    icon: Users,
    title: 'Comunidad Exclusiva',
    description: 'Conecta con otros estudiantes de tu universidad en un espacio privado y seguro.',
    href: '/community',
    iconColor: 'text-orange-600'
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Ofrece y contrata servicios académicos entre estudiantes con sistema de reputación.',
    href: '/marketplace',
    iconColor: 'text-teal-600'
  },
  {
    icon: PenTool,
    title: 'Intercambio de Habilidades',
    description: 'Enseña lo que sabes y aprende lo que te interesa sin necesidad de dinero.',
    href: '/skills-exchange',
    iconColor: 'text-purple-600'
  },
  {
    icon: Briefcase,
    title: 'UniGigs',
    description: 'Encuentra microtrabajos y oportunidades para ganar dinero compatible con tus estudios.',
    href: '/microjobs',
    iconColor: 'text-cluber-600'
  },
  {
    icon: Calendar,
    title: 'Eventos Universitarios',
    description: 'Organiza y participa en eventos académicos, sociales o deportivos en tu campus.',
    href: '/community',
    iconColor: 'text-pink-600'
  },
  {
    icon: BadgePercent,
    title: 'Beneficios Exclusivos',
    description: 'Obtén descuentos en negocios cercanos a tu campus con nuestra plataforma de cupones.',
    href: '/marketplace',
    iconColor: 'text-green-600'
  }
];

const testimonials = [
  {
    quote: "Cluber transformó mi experiencia universitaria por completo. Ahora consigo trabajos freelance y he formado una red increíble de contactos.",
    author: "María López",
    role: "Estudiante de Diseño",
    university: "Universidad Nacional",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "Las oportunidades de intercambio de habilidades son geniales. Enseño programación y aprendo diseño sin gastar dinero.",
    author: "Carlos Mendoza",
    role: "Estudiante de Ingeniería",
    university: "Universidad Autónoma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "Los descuentos en negocios cercanos han salvado mi presupuesto de estudiante más de una vez. ¡Amo esta app!",
    author: "Ana Ramírez",
    role: "Estudiante de Medicina",
    university: "Universidad Central",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const universities = [
  { name: 'Universidad Nacional', logo: 'https://placehold.co/100x60?text=UNI' },
  { name: 'Universidad Autónoma', logo: 'https://placehold.co/100x60?text=UAM' },
  { name: 'Universidad Central', logo: 'https://placehold.co/100x60?text=UC' },
  { name: 'Universidad Técnica', logo: 'https://placehold.co/100x60?text=UT' },
  { name: 'Universidad del Valle', logo: 'https://placehold.co/100x60?text=UV' },
  { name: 'Universidad Estatal', logo: 'https://placehold.co/100x60?text=UE' },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
        title="Potencia tu vida universitaria"
        subtitle="Conecta con otros estudiantes, encuentra oportunidades y accede a beneficios exclusivos en la plataforma definitiva para universitarios."
        ctaText="Crear cuenta"
        secondaryCtaText="Conocer más"
        imageUrl="https://placehold.co/800x600?text=Cluber+Student+App"
      />
      
      {/* Universities */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-sm font-medium text-gray-500 tracking-wide uppercase">Ya confían en nosotros</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="h-8 md:h-10"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-xs font-medium text-cluber-600 tracking-wide uppercase mb-3">
                Características Principales
              </h2>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Todo lo que necesitas en un solo lugar
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600"
            >
              Diseñado exclusivamente para mejorar la experiencia universitaria
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                iconColor={feature.iconColor}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xs font-medium text-cluber-600 tracking-wide uppercase mb-3">
                    Testimonios
                  </h2>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                    Qué dicen los estudiantes
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Descubre cómo Cluber ha mejorado la experiencia universitaria de miles de estudiantes.
                  </p>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          i === currentTestimonial ? 'bg-cluber-600' : 'bg-gray-300'
                        }`}
                        aria-label={`Ver testimonio ${i + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-2">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <Sparkles className="text-yellow-400 h-5 w-5 mr-2" />
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-xl text-gray-800 mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].author}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-cluber-100"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].university}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cluber-800 to-cluber-600 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Únete a la comunidad universitaria definitiva
            </h2>
            <p className="text-xl text-cluber-100 mb-8 max-w-3xl mx-auto">
              Potencia tu experiencia universitaria con Cluber y desbloquea un mundo de oportunidades.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-cluber-700 hover:bg-cluber-50 hover:text-cluber-800 font-medium px-8"
              >
                Registrarse con email institucional
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-medium px-8"
              >
                Conocer más
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
