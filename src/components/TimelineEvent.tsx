import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  progress: number;
  index: number;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  year,
  title,
  description,
  progress,
  index,
}) => {
  const threshold = index / 8; // 8 is the number of events
  const opacity = Math.max(0, Math.min(1, (progress - threshold) * 5));
  
  return (
    <motion.div
      className="absolute left-0 right-0 p-6"
      style={{
        opacity,
        y: `${(1 - progress) * 100}vh`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {year}: {title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;
