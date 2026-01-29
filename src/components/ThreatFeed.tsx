import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThreatEvent } from '@/lib/threatSimulation';
import ThreatCard from './ThreatCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Filter, Pause, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThreatFeedProps {
  events: ThreatEvent[];
  isRunning: boolean;
  onToggle: () => void;
  onClear: () => void;
  maxItems?: number;
}

const ThreatFeed: React.FC<ThreatFeedProps> = ({
  events,
  isRunning,
  onToggle,
  onClear,
  maxItems = 50,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayEvents = events.slice(0, maxItems);

  return (
    <div className="cyber-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-cyber-red" />
          <h3 className="font-cyber text-sm text-foreground">LIVE THREAT FEED</h3>
          <div className="flex items-center gap-1 ml-2">
            <div className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-cyber-green animate-pulse' : 'bg-cyber-yellow'
            }`} />
            <span className="text-[10px] font-mono text-muted-foreground">
              {isRunning ? 'MONITORING' : 'PAUSED'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 px-3 text-xs font-mono hover:bg-muted"
          >
            {isRunning ? (
              <>
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-3 h-3 mr-1" />
                Resume
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 px-3 text-xs font-mono hover:bg-destructive/20 hover:text-destructive"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Event count */}
      <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
        <p className="text-xs font-mono text-muted-foreground">
          Showing {displayEvents.length} of {events.length} events
        </p>
      </div>

      {/* Scrollable feed */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {displayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">No threats detected</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {isRunning ? 'Monitoring for threats...' : 'Click Resume to start monitoring'}
              </p>
            </div>
          ) : (
            displayEvents.map((event, index) => (
              <ThreatCard 
                key={event.id} 
                threat={event} 
                isNew={index === 0}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThreatFeed;
