
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
  href?: string;
  iconColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  index = 0,
  href,
  iconColor = 'text-cluber-600',
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: index * 0.1,
      },
    },
  };

  const Card = () => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300"
    >
      <div className={`p-3 rounded-xl ${iconColor.includes('bg-') ? iconColor : 'bg-cluber-50'} w-fit mb-4 transition-colors`}>
        <Icon className={`${iconColor.includes('bg-') ? 'text-white' : iconColor} h-6 w-6`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-cluber-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mt-auto mb-4">{description}</p>
      {href && (
        <div className="mt-auto">
          <motion.a
            href={href}
            className="inline-flex items-center text-cluber-600 hover:text-cluber-700 font-medium"
            whileHover={{ x: 5 }}
          >
            Conocer más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full no-underline">
        <Card />
      </a>
    );
  }

  return <Card />;
};

export default FeatureCard;
