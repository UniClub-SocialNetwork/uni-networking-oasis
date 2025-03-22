
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const contacts = [
    { id: '1', name: 'Victor Meneses', avatar: 'https://placehold.co/100x100?text=VM', online: true },
    { id: '2', name: 'Matías Lucas Fuentes Rivera', avatar: 'https://placehold.co/100x100?text=MF', online: true },
    { id: '3', name: 'Diego Bustos', avatar: 'https://placehold.co/100x100?text=DB', online: true },
    { id: '4', name: 'Jamil Pérez Castillo', avatar: 'https://placehold.co/100x100?text=JP', online: false },
    { id: '5', name: 'Fabrizio Andre Rengifo Zevallos', avatar: 'https://placehold.co/100x100?text=FR', online: false },
    { id: '6', name: 'Adriana Paredes', avatar: 'https://placehold.co/100x100?text=AP', online: false },
    { id: '7', name: 'Gian Pierre', avatar: 'https://placehold.co/100x100?text=GP', online: true },
    { id: '8', name: 'Gian Solis', avatar: 'https://placehold.co/100x100?text=GS', online: false },
    { id: '9', name: 'Jason David Portalatino', avatar: 'https://placehold.co/100x100?text=JP', online: true },
    { id: '10', name: 'Owen Palomino de la Cruz', avatar: 'https://placehold.co/100x100?text=OP', online: false },
    { id: '11', name: 'Rebeca Vargas', avatar: 'https://placehold.co/100x100?text=RV', online: true },
  ];
  
  const filteredContacts = searchTerm
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : contacts;

  return (
    <div className="fb-contacts rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Contactos</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-sidebar-accent">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-sidebar-accent">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Buscar contactos"
          className="bg-sidebar-accent border-sidebar-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-1">
        {filteredContacts.map((contact) => (
          <Link
            key={contact.id}
            to={`/chat/${contact.id}`}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent"
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {contact.online && <div className="status-dot" />}
            </div>
            <span>{contact.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
