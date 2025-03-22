
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  title: string;
  description: string;
  budget: number | { min: number; max: number };
  duration: string;
  deadline: string;
  category: string;
  skills: string[];
  clientName: string;
  clientAvatar?: string;
  clientUniversity: string;
  published: string;
  applications?: number;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  budget,
  duration,
  deadline,
  category,
  skills,
  clientName,
  clientAvatar,
  clientUniversity,
  published,
  applications = 0,
  onClick,
}) => {
  const budgetText = typeof budget === 'number' 
    ? `$${budget}` 
    : `$${budget.min} - $${budget.max}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="inline-flex px-3 py-1 text-xs font-medium bg-cluber-50 text-cluber-700 rounded-full mb-1">
            {category}
          </div>
          <div className="text-xs text-gray-500">
            Publicado: {published}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-700">{budgetText}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-700">{duration}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-700">{deadline}</span>
          </div>
          
          <div className="flex items-center">
            <Tag className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-700">{applications} aplicaciones</span>
          </div>
        </div>
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center mt-auto">
          {clientAvatar ? (
            <img
              src={clientAvatar}
              alt={clientName}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-cluber-100 text-cluber-600 flex items-center justify-center mr-2">
              {clientName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{clientName}</p>
            <p className="text-xs text-gray-500">{clientUniversity}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button
            onClick={onClick}
            className="w-full bg-cluber-600 hover:bg-cluber-700 text-white"
          >
            Aplicar ahora
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
