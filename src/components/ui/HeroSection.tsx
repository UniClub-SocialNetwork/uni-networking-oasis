
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaAction?: () => void;
  secondaryCtaText?: string;
  secondaryCtaAction?: () => void;
  imageUrl?: string;
  reversed?: boolean;
  gradient?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaAction,
  secondaryCtaText,
  secondaryCtaAction,
  imageUrl,
  reversed = false,
  gradient = true,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      )}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-80 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-8 lg:gap-16 items-center`}>
          {/* Content */}
          <motion.div 
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex px-3 py-1 text-xs font-medium bg-cluber-100 text-cluber-800 rounded-full mb-6">
              Exclusivo para universitarios
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            >
              {title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-2xl"
            >
              {subtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {ctaText && (
                <Button 
                  onClick={ctaAction}
                  className="bg-cluber-600 hover:bg-cluber-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-base"
                >
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && (
                <Button 
                  variant="outline"
                  onClick={secondaryCtaAction}
                  className="px-8 py-6 h-auto rounded-xl font-medium text-base"
                >
                  {secondaryCtaText}
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Image */}
          {imageUrl && (
            <motion.div 
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <img 
                  src={imageUrl} 
                  alt="Hero illustration" 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cluber-600/10 to-transparent"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
