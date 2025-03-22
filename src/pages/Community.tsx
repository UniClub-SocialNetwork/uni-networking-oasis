
import { motion } from 'framer-motion';
import StatusInput from '@/components/ui/StatusInput';
import PostCard from '@/components/ui/PostCard';

// Mock posts data
const posts = [
  {
    id: 'p1',
    author: {
      name: 'Carlos Ramírez',
      avatar: 'https://placehold.co/100x100?text=CR',
      faculty: 'Facultad de Ingeniería'
    },
    content: 'Alguien tiene los apuntes de la clase de Estructuras de Datos del profesor Martínez? Me los perdí por estar enfermo.',
    timeAgo: 'Hace 15 minutos',
    likes: 23,
    comments: 5,
    shares: 1,
    isLiked: false
  },
  {
    id: 'p2',
    author: {
      name: 'María Fernanda López',
      avatar: 'https://placehold.co/100x100?text=ML',
      faculty: 'Facultad de Arquitectura'
    },
    content: 'Increíble proyectos de fin de semestre. Estoy muy orgullosa del trabajo que hemos logrado como equipo!',
    image: 'https://placehold.co/600x400?text=Proyecto+de+Arquitectura',
    timeAgo: 'Hace 2 horas',
    likes: 47,
    comments: 12,
    shares: 3,
    isLiked: true
  },
  {
    id: 'p3',
    author: {
      name: 'Club de Debate',
      avatar: 'https://placehold.co/100x100?text=CD'
    },
    content: '¡Atención a todos los interesados en mejorar sus habilidades de oratoria! Este viernes tendremos un taller abierto en el auditorio principal. No necesitas experiencia previa, solo ganas de aprender. ¡Te esperamos!',
    timeAgo: 'Hace 3 horas',
    likes: 31,
    comments: 8,
    shares: 15,
    isLiked: false
  },
  {
    id: 'p4',
    author: {
      name: 'Facultad de Ciencias',
      avatar: 'https://placehold.co/100x100?text=FC'
    },
    content: 'Recordatorio: La fecha límite para postular a las becas de investigación es este viernes. No olviden adjuntar todos los documentos requeridos. Para consultas, contactar a la oficina de asuntos estudiantiles.',
    timeAgo: 'Hace 5 horas',
    likes: 19,
    comments: 4,
    shares: 7,
    isLiked: false
  }
];

const Community = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <StatusInput />
        
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </motion.div>
  );
};

export default Community;
