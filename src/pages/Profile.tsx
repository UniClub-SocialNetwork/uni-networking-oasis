
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { UserPlus, MessageCircle, Calendar, Book, Briefcase, Heart, MapPin, Link2, Edit, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { id } = useParams();
  const [isFriend, setIsFriend] = useState(false);
  
  // Mock user data - in a real app this would come from an API
  const user = {
    id: id,
    name: 'Alex Rodríguez',
    username: 'alex.rodriguez',
    avatar: 'https://placehold.co/200x200?text=AR',
    cover: 'https://placehold.co/1200x400?text=Cover+Photo',
    university: 'Universidad Nacional Autónoma',
    faculty: 'Ingeniería Informática',
    year: '3er año',
    location: 'Ciudad Universitaria',
    website: 'alexr.dev',
    friends: 234,
    bio: 'Estudiante de informática apasionado por el desarrollo web y la inteligencia artificial. Buscando constantemente nuevos desafíos y oportunidades de aprendizaje.',
    joined: 'Octubre 2022'
  };

  const handleAddFriend = () => {
    setIsFriend(true);
    toast({
      title: "Solicitud enviada",
      description: `Has enviado una solicitud de amistad a ${user.name}`,
    });
  };

  const handleMessage = () => {
    window.location.href = `/chat/${user.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-16"
    >
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 bg-dark-800 w-full overflow-hidden">
        <img 
          src={user.cover} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
      </div>
      
      {/* Profile Header */}
      <div className="container relative -mt-24 z-10">
        <div className="bg-background rounded-xl shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-end">
            <Avatar className="w-32 h-32 rounded-full border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl bg-cluber-600 text-white">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
              <div className="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Book className="mr-1 h-4 w-4" />
                  {user.university}
                </span>
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {user.faculty}
                </span>
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {user.year}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {!isFriend ? (
                <Button 
                  onClick={handleAddFriend}
                  className="bg-cluber-600 hover:bg-cluber-700 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              ) : (
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2 text-cluber-600" />
                  Amigos
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={handleMessage}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Mensaje
              </Button>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> {user.location}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Link2 className="h-4 w-4 mr-2" /> {user.website}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="container mt-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Publicaciones</TabsTrigger>
            <TabsTrigger value="about">Acerca de</TabsTrigger>
            <TabsTrigger value="friends">Amigos ({user.friends})</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Sidebar */}
              <div className="md:col-span-1">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Sobre {user.name.split(' ')[0]}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {user.bio}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-muted-foreground">
                      <Book className="h-4 w-4 mr-2" />
                      Estudia en {user.university}
                    </p>
                    <p className="flex items-center text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {user.faculty}
                    </p>
                    <p className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Se unió en {user.joined}
                    </p>
                  </div>
                </Card>
                
                <Card className="p-4 mt-4">
                  <h3 className="font-semibold mb-3">Amigos ({user.friends})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="text-center">
                        <Avatar className="w-full h-auto aspect-square">
                          <AvatarImage src={`https://placehold.co/100x100?text=Friend${i+1}`} />
                          <AvatarFallback className="text-xs">F{i+1}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs mt-1 truncate">Amigo {i+1}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-cluber-600">
                    Ver todos
                  </Button>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <Card className="p-4 mb-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted rounded-full px-4 flex items-center cursor-pointer hover:bg-muted/80 transition-colors">
                      <span className="text-muted-foreground">¿Qué estás pensando?</span>
                    </div>
                  </div>
                </Card>
                
                {/* Posts would go here - mocked for now */}
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <Card key={post} className="p-4">
                      <div className="flex gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-xs text-muted-foreground">Hace {post} hora{post > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <p className="mb-4">Este es un ejemplo de publicación en el muro. Aquí los estudiantes pueden compartir sus pensamientos, logros académicos o pedir recomendaciones a sus amigos.</p>
                      {post % 2 === 0 && (
                        <div className="mb-4 bg-muted rounded-md overflow-hidden">
                          <img 
                            src={`https://placehold.co/600x400?text=Post+Image+${post}`}
                            alt="Post image"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex justify-between border-t pt-3 text-sm">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-1" /> Me gusta
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" /> Comentar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Compartir
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información de {user.name}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Educación</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{user.university}</p>
                        <p className="text-sm text-muted-foreground">{user.faculty}, {user.year}</p>
                        <p className="text-sm text-muted-foreground">2021 - Presente</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Información básica</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <p className="text-muted-foreground w-24">Ubicación:</p>
                        <p>{user.location}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <p className="text-muted-foreground w-24">Sitio web:</p>
                        <p>{user.website}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <p className="text-muted-foreground w-24">Se unió:</p>
                        <p>{user.joined}</p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Intereses</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Desarrollo Web</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Inteligencia Artificial</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Diseño UX/UI</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Fotografía</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Música</span>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Edit className="h-3 w-3 mr-1" /> Editar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="friends">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Amigos ({user.friends})</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" /> Gestionar
                  </Button>
                  <Button className="bg-cluber-600 hover:bg-cluber-700 text-white" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" /> Encontrar amigos
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="rounded-lg border p-3 hover:shadow-md transition-shadow">
                    <div className="flex gap-3 items-center">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`https://placehold.co/100x100?text=Friend${i+1}`} />
                        <AvatarFallback>F{i+1}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Amigo {i+1}</h4>
                        <p className="text-xs text-muted-foreground">13 amigos en común</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3">
                      <Button className="flex-1 bg-cluber-600 hover:bg-cluber-700 text-white" size="sm">
                        Mensaje
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Perfil
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="photos">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Fotos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-md overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity">
                    <img 
                      src={`https://placehold.co/300x300?text=Photo${i+1}`} 
                      alt={`Photo ${i+1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 mx-auto block text-cluber-600">
                Ver todas las fotos
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Profile;
