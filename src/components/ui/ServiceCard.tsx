
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  sellerName: string;
  sellerAvatar?: string;
  sellerUniversity: string;
  estimatedHours?: number;
  tags?: string[];
  verified?: boolean;
  imageUrl?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  rating,
  reviewCount,
  sellerName,
  sellerAvatar,
  sellerUniversity,
  estimatedHours,
  tags = [],
  verified = false,
  imageUrl,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-5 flex-grow flex flex-col">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-cluber-50 text-cluber-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount} reseñas)</span>
          
          {estimatedHours && (
            <div className="flex items-center ml-3">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{estimatedHours} horas</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-auto">
          {sellerAvatar ? (
            <img
              src={sellerAvatar}
              alt={sellerName}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-cluber-100 text-cluber-600 flex items-center justify-center mr-2">
              {sellerName.charAt(0)}
            </div>
          )}
          <div className="mr-2">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-900">{sellerName}</p>
              {verified && (
                <Award className="h-4 w-4 text-cluber-600 ml-1" title="Verificado" />
              )}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 text-gray-400 mr-1" />
              <p className="text-xs text-gray-500">{sellerUniversity}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Precio</p>
            <p className="text-lg font-bold text-gray-900">${price}</p>
          </div>
          
          <Button
            onClick={onClick}
            className="bg-cluber-600 hover:bg-cluber-700 text-white"
            size="sm"
          >
            Contratar
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
