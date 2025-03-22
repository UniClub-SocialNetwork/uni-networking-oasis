
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  imageUrl: string;
  organizerName: string;
  organizerAvatarUrl?: string;
  tags?: string[];
  onRegister?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  imageUrl,
  organizerName,
  organizerAvatarUrl,
  tags = [],
  onRegister,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-white/90 text-cluber-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {attendees} {maxAttendees ? `/ ${maxAttendees}` : ''} Asistentes
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            {organizerAvatarUrl ? (
              <img
                src={organizerAvatarUrl}
                alt={organizerName}
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-cluber-100 text-cluber-600 flex items-center justify-center mr-2">
                {organizerName.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500">Organizado por</p>
              <p className="text-sm font-medium text-gray-700">{organizerName}</p>
            </div>
          </div>
          
          <Button
            onClick={onRegister}
            className="bg-cluber-600 hover:bg-cluber-700 text-white"
            size="sm"
          >
            Registrarse
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
