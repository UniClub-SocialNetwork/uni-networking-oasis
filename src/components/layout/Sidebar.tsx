import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  Briefcase, 
  Exchange, 
  Bookmark, 
  Calendar, 
  Video, 
  Clock, 
  ChevronDown,
  ArrowLeftRight as Exchange
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = () => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  
  const mainLinks = [
    { name: 'Amigos', path: '/friends', icon: Users },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Intercambio', path: '/skills-exchange', icon: Exchange },
    { name: 'UniGigs', path: '/microjobs', icon: Briefcase },
  ];
  
  const extraLinks = [
    { name: 'Guardado', path: '/saved', icon: Bookmark },
    { name: 'Eventos', path: '/events', icon: Calendar },
    { name: 'Videos', path: '/videos', icon: Video },
    { name: 'Recuerdos', path: '/memories', icon: Clock },
  ];

  const links = showMore ? [...mainLinks, ...extraLinks] : mainLinks;

  return (
    <div className="fb-sidebar">
      <div className="px-4 pt-4">
        <Link to="/profile/me" className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100?text=Me" />
            <AvatarFallback className="bg-cluber-600 text-white">Me</AvatarFallback>
          </Avatar>
          <span className="font-medium lg:block hidden">Rodrigo López</span>
        </Link>
        
        <nav className="mt-4">
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-sidebar-accent text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  <span className="lg:block hidden">{item.name}</span>
                </Link>
              </li>
            ))}
            
            <li>
              <button 
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-3 p-2 rounded-md w-full text-left text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <div className="h-6 w-6 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
                  <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </div>
                <span className="lg:block hidden">{showMore ? 'Ver menos' : 'Ver más'}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="mt-6 px-4 lg:block hidden">
        <div className="text-sm font-medium text-muted-foreground mb-2">Tus accesos directos</div>
        <div className="space-y-1">
          <Link to="/groups/monster-legends" className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
            <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold">ML</span>
            </div>
            <span>Monster Legends</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
