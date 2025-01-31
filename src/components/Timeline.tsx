import React from 'react';
import { useScroll } from '../hooks/useScroll';
import TimelineEvent from './TimelineEvent';
import { events } from '../data/events';

const Timeline: React.FC = () => {
  const scrollProgress = useScroll();
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start pt-8">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Indian History Travel
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Scroll to explore India's journey from 1757 to 2025
      </p>
      <div className="relative w-full max-w-2xl">
        {events.map((event, index) => (
          <TimelineEvent
            key={event.year}
            {...event}
            progress={scrollProgress}
            index={index}
          />
        ))}
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        Scroll to travel through time
      </div>
    </div>
  );
};

export default Timeline;
