
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle as MessageCircleIcon, Phone, Video, Info, Search, Paperclip, Image, Send, SmilePlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

// Mock data for chats
const chatList = [
  { id: '1', name: 'Victor Meneses', avatar: 'https://placehold.co/100x100?text=VM', lastMessage: 'Hola, ¿cómo estás?', time: '12:30 PM', unread: 2 },
  { id: '2', name: 'Matías Lucas', avatar: 'https://placehold.co/100x100?text=ML', lastMessage: 'Vi tu publicación, está genial!', time: 'Ayer', unread: 0 },
  { id: '3', name: 'Diego Bustos', avatar: 'https://placehold.co/100x100?text=DB', lastMessage: 'Nos vemos en la biblioteca', time: 'Ayer', unread: 0 },
  { id: '4', name: 'Jamil Pérez', avatar: 'https://placehold.co/100x100?text=JP', lastMessage: 'Envíame el documento cuando puedas', time: 'Lun', unread: 0 },
  { id: '5', name: 'Fabrizio Andre', avatar: 'https://placehold.co/100x100?text=FA', lastMessage: '¿Tienes los apuntes de la clase?', time: 'Dom', unread: 1 },
];

// Mock conversation data
const conversations = {
  '1': [
    { id: 'm1', sender: 'them', content: 'Hola, ¿cómo estás?', time: '12:30 PM' },
    { id: 'm2', sender: 'me', content: 'Bien, gracias. ¿Y tú?', time: '12:31 PM' },
    { id: 'm3', sender: 'them', content: 'Todo bien. ¿Asistirás al evento de mañana?', time: '12:32 PM' },
    { id: 'm4', sender: 'me', content: 'Sí, planeo ir. ¿A qué hora llegarás?', time: '12:33 PM' },
    { id: 'm5', sender: 'them', content: 'Probablemente alrededor de las 6. Podemos encontrarnos en la entrada principal.', time: '12:35 PM' },
  ],
  '2': [
    { id: 'm1', sender: 'them', content: 'Vi tu publicación, está genial!', time: 'Ayer 15:45' },
    { id: 'm2', sender: 'me', content: 'Gracias! Me tomó bastante tiempo hacerla.', time: 'Ayer 16:00' },
  ],
  '3': [
    { id: 'm1', sender: 'me', content: '¿Nos vemos en la biblioteca hoy?', time: 'Ayer 10:23' },
    { id: 'm2', sender: 'them', content: 'Sí, estaré allí a las 3 PM', time: 'Ayer 10:25' },
    { id: 'm3', sender: 'me', content: 'Perfecto, nos vemos entonces', time: 'Ayer 10:26' },
    { id: 'm4', sender: 'them', content: 'Nos vemos en la biblioteca', time: 'Ayer 14:58' },
  ],
};

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const chat = chatList.find(chat => chat.id === id);
      setSelectedChat(chat);
      setActiveConversation(conversations[id as keyof typeof conversations] || []);
    } else {
      setSelectedChat(null);
      setActiveConversation([]);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (!message.trim() || !id) return;

    const newMessage = {
      id: `m${activeConversation.length + 1}`,
      sender: 'me',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveConversation([...activeConversation, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100vh-5rem)] flex overflow-hidden"
    >
      {/* Chat list sidebar */}
      <div className="w-80 border-r border-border bg-card hidden md:block overflow-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Chats</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar en mensajes" 
              className="pl-10 bg-muted"
            />
          </div>
          <div className="space-y-1">
            {chatList.map((chat) => (
              <Link 
                key={chat.id}
                to={`/chat/${chat.id}`}
                className={`flex items-center p-2 rounded-md ${
                  selectedChat?.id === chat.id
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between">
                    <div className="font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground">{chat.time}</div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-border flex justify-between items-center bg-card">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{selectedChat.name}</div>
                  <div className="text-xs text-green-500">En línea</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {activeConversation.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender !== 'me' && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedChat.avatar} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[70%] rounded-2xl p-3 ${
                        msg.sender === 'me' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SmilePlus className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input 
                    placeholder="Aa" 
                    className="pr-10 bg-muted"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <Button 
                  className={message.trim() ? 'bg-primary' : 'bg-muted text-muted-foreground'} 
                  size="icon" 
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <MessageCircleIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold">Tus mensajes</h2>
            <p className="text-muted-foreground mt-2">Selecciona un chat para comenzar</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Chat;
