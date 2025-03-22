
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Bell, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Comunidad', path: '/community' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Intercambio', path: '/skills-exchange' },
    { name: 'UniGigs', path: '/microjobs' },
    { name: 'Amigos', path: '/friends' },
  ];
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-display font-bold text-cluber-600">
              Cluber
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-6"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`relative font-medium text-sm transition-colors duration-200 hover:text-cluber-600 ${
                    location.pathname === item.path
                      ? 'text-cluber-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cluber-500"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
              asChild
            >
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-cluber-600 text-white rounded-full text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Messages"
              asChild
            >
              <Link to="/chat">
                <MessageCircle className="h-5 w-5" />
                {messages > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-cluber-600 text-white rounded-full text-xs flex items-center justify-center">
                    {messages}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              aria-label="Friends"
              asChild
            >
              <Link to="/friends">
                <Users className="h-5 w-5" />
              </Link>
            </Button>
            
            <Link to="/profile/me" className="ml-2">
              <Avatar className="cursor-pointer h-8 w-8 border-2 border-cluber-600">
                <AvatarImage src="https://placehold.co/100x100?text=Me" />
                <AvatarFallback className="bg-cluber-600 text-white">
                  Me
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/chat" className="relative">
              <MessageCircle className="h-5 w-5" />
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cluber-600 text-white rounded-full text-xs flex items-center justify-center">
                  {messages}
                </span>
              )}
            </Link>
            
            <Link to="/profile/me" className="mr-2">
              <Avatar className="h-8 w-8 border-2 border-cluber-500">
                <AvatarImage src="https://placehold.co/100x100?text=Me" />
                <AvatarFallback className="bg-cluber-600 text-white">Me</AvatarFallback>
              </Avatar>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-b"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-2 font-medium text-base ${
                    location.pathname === item.path
                      ? 'text-cluber-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-cluber-600 text-white rounded-full text-xs flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  className="bg-cluber-600 hover:bg-cluber-700 text-white"
                >
                  Crear Publicación
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
