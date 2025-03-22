
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLists = [
    {
      title: 'Plataforma',
      links: [
        { name: 'Comunidad', href: '/community' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Intercambio de Habilidades', href: '/skills-exchange' },
        { name: 'UniGigs', href: '/microjobs' },
        { name: 'Eventos', href: '/events' },
      ],
    },
    {
      title: 'Compañía',
      links: [
        { name: 'Acerca de', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Universidades Asociadas', href: '#' },
        { name: 'Prensa', href: '#' },
        { name: 'Empleos', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Centro de Ayuda', href: '#' },
        { name: 'Contacto', href: '#' },
        { name: 'Términos de Servicio', href: '#' },
        { name: 'Privacidad', href: '#' },
        { name: 'Cookies', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Logo + description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <span className="text-xl font-display font-bold text-cluber-700">
                Cluber
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              La plataforma definitiva para estudiantes universitarios. Conecta, aprende y crece dentro de tu comunidad universitaria.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-cluber-500"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-cluber-500"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-cluber-500"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-cluber-500"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
          
          {/* Lists */}
          {footerLists.map((list) => (
            <div key={list.title}>
              <h3 className="font-semibold text-gray-900">{list.title}</h3>
              <ul className="mt-4 space-y-2">
                {list.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-gray-600 hover:text-cluber-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900">Newsletter</h3>
            <p className="mt-4 text-gray-600 text-sm">
              Suscríbete para obtener las últimas novedades
            </p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="tu@email.edu"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cluber-500 focus:border-transparent"
              />
              <button className="mt-2 w-full bg-cluber-600 hover:bg-cluber-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Cluber. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="#" className="text-gray-500 hover:text-cluber-600 text-sm mr-4">
                Privacidad
              </Link>
              <Link to="#" className="text-gray-500 hover:text-cluber-600 text-sm mr-4">
                Términos
              </Link>
              <Link to="#" className="text-gray-500 hover:text-cluber-600 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
