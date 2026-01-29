import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ThreatEvent, 
  CountryThreatStats, 
  generateThreatEvent, 
  calculateCountryStats 
} from '@/lib/threatSimulation';

interface ThreatSimulationState {
  events: ThreatEvent[];
  activeAttacks: ThreatEvent[];
  countryStats: CountryThreatStats[];
  totalBlocked: number;
  totalDetected: number;
  criticalAlerts: number;
  isRunning: boolean;
}

interface UseThreatSimulationReturn extends ThreatSimulationState {
  start: () => void;
  stop: () => void;
  toggle: () => void;
  clearEvents: () => void;
  setAttackRate: (rate: number) => void;
  attackRate: number;
}

const MAX_EVENTS = 500;
const MAX_ACTIVE_ATTACKS = 15;
const ATTACK_DURATION = 3000; // How long an attack stays "active" on map

export function useThreatSimulation(initialRate = 1500): UseThreatSimulationReturn {
  const [state, setState] = useState<ThreatSimulationState>({
    events: [],
    activeAttacks: [],
    countryStats: [],
    totalBlocked: 0,
    totalDetected: 0,
    criticalAlerts: 0,
    isRunning: false,
  });
  
  const [attackRate, setAttackRate] = useState(initialRate);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const addEvent = useCallback(() => {
    const newEvent = generateThreatEvent();
    
    setState(prev => {
      const updatedEvents = [newEvent, ...prev.events].slice(0, MAX_EVENTS);
      const updatedActive = [newEvent, ...prev.activeAttacks].slice(0, MAX_ACTIVE_ATTACKS);
      
      return {
        ...prev,
        events: updatedEvents,
        activeAttacks: updatedActive,
        countryStats: calculateCountryStats(updatedEvents),
        totalDetected: prev.totalDetected + 1,
        totalBlocked: prev.totalBlocked + (newEvent.blocked ? 1 : 0),
        criticalAlerts: prev.criticalAlerts + (newEvent.severity === 'critical' ? 1 : 0),
      };
    });
    
    // Remove from active attacks after duration
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        activeAttacks: prev.activeAttacks.filter(a => a.id !== newEvent.id),
      }));
    }, ATTACK_DURATION);
  }, []);
  
  const start = useCallback(() => {
    if (intervalRef.current) return;
    
    setState(prev => ({ ...prev, isRunning: true }));
    
    // Generate initial batch of events
    for (let i = 0; i < 10; i++) {
      setTimeout(() => addEvent(), i * 200);
    }
    
    intervalRef.current = setInterval(() => {
      // Random variation in attack frequency
      const variation = Math.random() * 0.5 + 0.75;
      const count = Math.random() > 0.8 ? 2 : 1; // Occasionally generate burst
      
      for (let i = 0; i < count; i++) {
        setTimeout(() => addEvent(), i * 100 * variation);
      }
    }, attackRate);
  }, [addEvent, attackRate]);
  
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);
  
  const toggle = useCallback(() => {
    if (state.isRunning) {
      stop();
    } else {
      start();
    }
  }, [state.isRunning, start, stop]);
  
  const clearEvents = useCallback(() => {
    setState({
      events: [],
      activeAttacks: [],
      countryStats: [],
      totalBlocked: 0,
      totalDetected: 0,
      criticalAlerts: 0,
      isRunning: state.isRunning,
    });
  }, [state.isRunning]);
  
  // Update interval when attack rate changes
  useEffect(() => {
    if (state.isRunning) {
      stop();
      start();
    }
  }, [attackRate]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return {
    ...state,
    start,
    stop,
    toggle,
    clearEvents,
    setAttackRate,
    attackRate,
  };
}
