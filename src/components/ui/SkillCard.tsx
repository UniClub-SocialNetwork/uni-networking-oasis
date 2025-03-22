
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillCardProps {
  teachSkill: string;
  learnSkill: string;
  description: string;
  userAvatar?: string;
  userName: string;
  userUniversity: string;
  userRating: number;
  reviewCount: number;
  sessionsDone: number;
  onClick?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  teachSkill,
  learnSkill,
  description,
  userAvatar,
  userName,
  userUniversity,
  userRating,
  reviewCount,
  sessionsDone,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="mb-2 w-full sm:w-auto">
            <div className="inline-flex px-3 py-1 text-xs font-medium bg-cluber-100 text-cluber-700 rounded-full mb-1">
              Enseña: {teachSkill}
            </div>
          </div>
          <div className="mb-2 w-full sm:w-auto">
            <div className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-1">
              Aprende: {learnSkill}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="flex items-center mt-auto mb-4">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full mr-3 border-2 border-cluber-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-cluber-100 text-cluber-600 flex items-center justify-center mr-3 border-2 border-cluber-50">
              {userName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userUniversity}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{userRating.toFixed(1)} ({reviewCount} reseñas)</span>
          </div>
          
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-cluber-500 mr-1" />
            <span>{sessionsDone} intercambios</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <Button
            onClick={onClick}
            variant="outline"
            size="sm"
            className="text-cluber-600 border-cluber-200 hover:bg-cluber-50"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Contactar
          </Button>
          
          <Button
            onClick={onClick}
            className="bg-cluber-600 hover:bg-cluber-700 text-white"
            size="sm"
          >
            Proponer Intercambio
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
