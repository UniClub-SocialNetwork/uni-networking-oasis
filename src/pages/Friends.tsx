
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, UserPlus, Users, UserCheck, Clock, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

// Mock data
const friendsList = [...Array(20)].map((_, i) => ({
  id: `friend-${i}`,
  name: `Amigo ${i + 1}`,
  username: `amigo.${i + 1}`,
  avatar: `https://placehold.co/100x100?text=F${i+1}`,
  mutualFriends: Math.floor(Math.random() * 15),
  faculty: ['Ingeniería', 'Medicina', 'Derecho', 'Economía', 'Ciencias Sociales'][Math.floor(Math.random() * 5)],
}));

const pendingRequests = [...Array(5)].map((_, i) => ({
  id: `pending-${i}`,
  name: `Usuario ${i + 1}`,
  username: `usuario.${i + 1}`,
  avatar: `https://placehold.co/100x100?text=U${i+1}`,
  timeAgo: `${i + 1} ${i === 0 ? 'hora' : 'horas'}`,
  mutualFriends: Math.floor(Math.random() * 8),
}));

const suggestedFriends = [...Array(12)].map((_, i) => ({
  id: `suggested-${i}`,
  name: `Sugerencia ${i + 1}`,
  username: `sugerencia.${i + 1}`,
  avatar: `https://placehold.co/100x100?text=S${i+1}`,
  mutualFriends: Math.floor(Math.random() * 5),
  faculty: ['Ingeniería', 'Medicina', 'Derecho', 'Economía', 'Ciencias Sociales'][Math.floor(Math.random() * 5)],
}));

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [pendingList, setPendingList] = useState(pendingRequests);
  const [friendsData, setFriendsData] = useState(friendsList);
  
  const filteredFriends = friendsData.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAcceptRequest = (id: string) => {
    const friend = pendingList.find(req => req.id === id);
    if (friend) {
      setFriendsData([...friendsData, {
        ...friend,
        id: `friend-${friendsData.length + 1}`,
        mutualFriends: friend.mutualFriends
      }]);
      
      setPendingList(pendingList.filter(req => req.id !== id));
      
      toast({
        title: "Solicitud aceptada",
        description: `Ahora eres amigo de ${friend.name}`,
      });
    }
  };
  
  const handleRejectRequest = (id: string) => {
    setPendingList(pendingList.filter(req => req.id !== id));
    
    toast({
      title: "Solicitud rechazada",
      description: `Has rechazado la solicitud de amistad`,
    });
  };
  
  const handleAddFriend = (id: string) => {
    toast({
      title: "Solicitud enviada",
      description: `Tu solicitud de amistad ha sido enviada`,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-16"
    >
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Amigos</h1>
            <p className="text-muted-foreground">Conecta con otros estudiantes universitarios</p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Buscar amigos..."
                className="pl-10 w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="relative">
              <Users className="h-4 w-4 mr-2" />
              Todos los amigos
              {filteredFriends.length > 0 && (
                <span className="ml-2 bg-cluber-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {filteredFriends.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="requests" className="relative">
              <Clock className="h-4 w-4 mr-2" />
              Solicitudes
              {pendingList.length > 0 && (
                <span className="ml-2 bg-cluber-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {pendingList.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <UserPlus className="h-4 w-4 mr-2" />
              Sugerencias
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredFriends.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="p-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-cluber-600 text-white">{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground">@{friend.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.faculty} • {friend.mutualFriends} amigos en común
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        className="bg-cluber-600 hover:bg-cluber-700 w-full"
                        onClick={() => window.location.href = `/profile/${friend.id}`}
                      >
                        Ver perfil
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/chat/${friend.id}`}
                      >
                        Mensaje
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-background border rounded-lg">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No se encontraron amigos</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {searchQuery ? 
                    `No hay resultados para "${searchQuery}". Intenta con otro término.` : 
                    "Aún no tienes amigos. Comienza a conectar con otros estudiantes."}
                </p>
                <Button className="bg-cluber-600 hover:bg-cluber-700" onClick={() => setActiveTab('suggestions')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Encontrar amigos
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="requests">
            {pendingList.length > 0 ? (
              <div className="space-y-4">
                {pendingList.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback className="bg-cluber-600 text-white">{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{request.name}</h3>
                        <p className="text-sm text-muted-foreground">@{request.username}</p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-xs text-muted-foreground">
                            Hace {request.timeAgo}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {request.mutualFriends} amigos en común
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="bg-cluber-600 hover:bg-cluber-700" 
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Aceptar
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-background border rounded-lg">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No hay solicitudes pendientes</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  No tienes solicitudes de amistad pendientes en este momento.
                </p>
                <Button className="bg-cluber-600 hover:bg-cluber-700" onClick={() => setActiveTab('suggestions')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Encontrar amigos
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Personas que quizás conozcas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedFriends.map((suggestion) => (
                  <Card key={suggestion.id} className="p-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={suggestion.avatar} />
                      <AvatarFallback className="bg-cluber-600 text-white">{suggestion.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{suggestion.name}</h3>
                      <p className="text-sm text-muted-foreground">@{suggestion.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.faculty} • {suggestion.mutualFriends} amigos en común
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        className="bg-cluber-600 hover:bg-cluber-700 w-full"
                        onClick={() => handleAddFriend(suggestion.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Agregar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/profile/${suggestion.id}`}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Estudiantes de tu facultad</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {suggestedFriends.slice(0, 8).map((suggestion, index) => (
                  <Card key={`faculty-${index}`} className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={`https://placehold.co/200x200?text=S${index+1}`} />
                      <AvatarFallback className="bg-cluber-600 text-white text-2xl">{suggestion.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-medium">{suggestion.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.faculty}</p>
                    <p className="text-xs text-muted-foreground mb-4">{suggestion.mutualFriends} amigos en común</p>
                    
                    <Button 
                      className="bg-cluber-600 hover:bg-cluber-700 w-full mb-2"
                      onClick={() => handleAddFriend(`faculty-${suggestion.id}`)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Agregar
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Friends;
