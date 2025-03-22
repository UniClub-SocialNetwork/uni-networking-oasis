
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Phone, Video, Image, File, Paperclip, MoreVertical, Info } from 'lucide-react';

// Mock data
const contacts = [...Array(15)].map((_, i) => ({
  id: `contact-${i}`,
  name: `Contacto ${i+1}`,
  avatar: `https://placehold.co/100x100?text=C${i+1}`,
  online: Math.random() > 0.5,
  lastMessage: i % 3 === 0 ? "Hola! ¿Cómo estás?" : (i % 3 === 1 ? "¿Tienes los apuntes de la clase?" : "Gracias por la ayuda!"),
  timestamp: i % 3 === 0 ? "Ahora" : (i % 3 === 1 ? "10m" : "2h"),
  unread: i % 4 === 0 ? Math.floor(Math.random() * 5) + 1 : 0
}));

interface Message {
  id: string;
  text: string;
  timestamp: string;
  from: 'me' | 'other';
  read?: boolean;
}

const mockMessages = (count: number): Message[] => {
  return [...Array(count)].map((_, i) => ({
    id: `msg-${i}`,
    text: i % 5 === 0 
      ? "Hola! ¿Cómo estás? Espero que todo esté bien. Quería preguntarte si tienes los apuntes de la clase de ayer." 
      : (i % 5 === 1 
        ? "Sí, claro! Te los puedo enviar ahora mismo." 
        : (i % 5 === 2 
          ? "Genial, muchas gracias! Me salvaste." 
          : (i % 5 === 3 
            ? "No hay problema. Por cierto, ¿vas a ir al evento del viernes?" 
            : "Aún no estoy seguro, te aviso pronto.")
        )
      ),
    timestamp: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    from: i % 2 === 0 ? 'other' : 'me',
    read: i % 2 !== 0 || Math.random() > 0.3
  }));
};

const Chat = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages(15));
  const [activeChat, setActiveChat] = useState<string | undefined>(id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeContact = contacts.find(contact => contact.id === activeChat);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    setMessages([...messages, {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      from: 'me',
      read: false
    }]);
    
    setNewMessage('');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <div className="container py-8">
        <Card className="flex h-[calc(100vh-12rem)] overflow-hidden border">
          {/* Sidebar / Contacts */}
          <div className="w-full max-w-xs border-r bg-muted/30">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">Mensajes</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="text"
                  placeholder="Buscar mensajes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="p-2">
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      activeChat === contact.id 
                        ? 'bg-cluber-600 text-white' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveChat(contact.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className={activeChat === contact.id ? 'bg-white text-cluber-600' : 'bg-cluber-600 text-white'}>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className={`font-medium truncate ${activeChat === contact.id ? 'text-white' : ''}`}>
                          {contact.name}
                        </p>
                        <span className={`text-xs ${activeChat === contact.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {contact.timestamp}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-sm truncate ${
                          activeChat === contact.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {contact.lastMessage}
                        </p>
                        {contact.unread > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            activeChat === contact.id 
                              ? 'bg-white text-cluber-600' 
                              : 'bg-cluber-600 text-white'
                          }`}>
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat Area */}
          {activeChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeContact?.avatar} />
                    <AvatarFallback className="bg-cluber-600 text-white">
                      {activeContact?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeContact?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeContact?.online ? (
                        <span className="text-green-500 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> En línea
                        </span>
                      ) : 'Desconectado'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Llamada">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Videollamada">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Información">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex gap-2 max-w-[70%]">
                        {message.from === 'other' && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activeContact?.avatar} />
                            <AvatarFallback className="bg-cluber-600 text-white text-xs">
                              {activeContact?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.from === 'me' 
                            ? 'bg-cluber-600 text-white' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                            message.from === 'me' ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                            {message.from === 'me' && (
                              <span className="ml-1">
                                {message.read ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 7 17l-5-5" />
                                    <path d="m22 10-7.5 7.5L13 16" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="bg-cluber-600 hover:bg-cluber-700"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ''}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md p-8">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Tus mensajes</h3>
                <p className="text-muted-foreground mb-6">
                  Envía mensajes privados a tus compañeros de universidad para organizar trabajos, compartir materiales o simplemente mantenerte en contacto.
                </p>
                <Button className="bg-cluber-600 hover:bg-cluber-700">
                  Iniciar nuevo mensaje
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default Chat;
