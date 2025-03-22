
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, User, UsersRound, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// Mock data
const friends = [
  { id: '1', name: 'Victor Meneses', username: '@vmeneses', avatar: 'https://placehold.co/100x100?text=VM', mutualFriends: 12, faculty: 'Ingeniería de Sistemas' },
  { id: '2', name: 'Matías Lucas', username: '@mlucas', avatar: 'https://placehold.co/100x100?text=ML', mutualFriends: 8, faculty: 'Arquitectura' },
  { id: '3', name: 'Diego Bustos', username: '@dbustos', avatar: 'https://placehold.co/100x100?text=DB', mutualFriends: 15, faculty: 'Ciencias de la Computación' },
];

const suggestions = [
  { id: '4', name: 'Jamil Pérez', username: '@jperez', avatar: 'https://placehold.co/100x100?text=JP', mutualFriends: 5, faculty: 'Derecho' },
  { id: '5', name: 'Fabrizio Andre', username: '@fandre', avatar: 'https://placehold.co/100x100?text=FA', mutualFriends: 3, faculty: 'Medicina' },
  { id: '6', name: 'Adriana Paredes', username: '@aparedes', avatar: 'https://placehold.co/100x100?text=AP', mutualFriends: 7, faculty: 'Psicología' },
];

const requests = [
  { id: '7', name: 'Gian Pierre', username: '@gpierre', avatar: 'https://placehold.co/100x100?text=GP', mutualFriends: 4, timeAgo: '3d', faculty: 'Economía' },
  { id: '8', name: 'Gian Solis', username: '@gsolis', avatar: 'https://placehold.co/100x100?text=GS', mutualFriends: 2, timeAgo: '1w', faculty: 'Administración' },
];

type FriendItem = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  faculty: string;
  timeAgo?: string;
};

const FriendCard = ({ friend, type }: { friend: FriendItem; type: 'friend' | 'suggestion' | 'request' }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={friend.avatar} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{friend.name}</h3>
              <p className="text-sm text-muted-foreground">{friend.username}</p>
              <p className="text-sm text-muted-foreground">{friend.faculty}</p>
              <div className="flex items-center mt-1">
                <UsersRound className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {friend.mutualFriends} amigos en común
                </span>
                {friend.timeAgo && (
                  <span className="text-xs text-muted-foreground ml-2">
                    · Solicitado hace {friend.timeAgo}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {type === 'friend' && (
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Ver perfil
                </Button>
              )}
              {type === 'suggestion' && (
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              )}
              {type === 'request' && (
                <>
                  <Button size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Aceptar
                  </Button>
                  <Button variant="outline" size="sm">
                    Rechazar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredFriends = searchTerm
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : friends;
  
  const filteredSuggestions = searchTerm
    ? suggestions.filter(suggestion => 
        suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suggestions;
  
  const filteredRequests = searchTerm
    ? requests.filter(request => 
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : requests;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Amigos</h1>
        
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar amigos" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="relative">
              Todos los amigos
              <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-xs px-1.5">
                {friends.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              Sugerencias
            </TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              Solicitudes
              {requests.length > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-xs px-1.5">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredFriends.length > 0 ? (
              filteredFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} type="friend" />
              ))
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No se encontraron amigos</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Intenta con otra búsqueda' : 'Agrega amigos para verlos aquí'}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-4">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map(suggestion => (
                <FriendCard key={suggestion.id} friend={suggestion} type="suggestion" />
              ))
            ) : (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No hay sugerencias disponibles</h3>
                <p className="text-muted-foreground">
                  Volveremos con más sugerencias pronto
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <FriendCard key={request.id} friend={request} type="request" />
              ))
            ) : (
              <div className="text-center py-12">
                <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No hay solicitudes pendientes</h3>
                <p className="text-muted-foreground">
                  Cuando alguien te envíe una solicitud de amistad, aparecerá aquí
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Friends;
