import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Wifi, 
  Radio, 
  Cpu, 
  HardDrive,
  Activity,
  Clock,
  Settings
} from 'lucide-react';

interface HeaderProps {
  isConnected?: boolean;
  systemStatus?: 'online' | 'warning' | 'offline';
}

const Header: React.FC<HeaderProps> = ({ 
  isConnected = true, 
  systemStatus = 'online' 
}) => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="relative border-b border-border/50 bg-gradient-to-r from-cyber-dark via-card to-cyber-dark">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-cyber-cyan/20 rounded-lg blur-xl" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-blue/10 border border-cyber-cyan/30">
                <Shield className="w-8 h-8 text-cyber-cyan" />
              </div>
            </motion.div>
            
            <div>
              <h1 className="font-cyber text-xl md:text-2xl font-bold text-foreground tracking-wider">
                CYBER<span className="text-cyber-cyan">SHIELD</span>
              </h1>
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground tracking-widest">
                AI THREAT DETECTION SYSTEM v2.4.1
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-6">
            {/* System modules */}
            <div className="flex items-center gap-3">
              <StatusIndicator 
                icon={<Cpu className="w-4 h-4" />} 
                label="AI Engine" 
                status="active"
              />
              <StatusIndicator 
                icon={<Radio className="w-4 h-4" />} 
                label="Satellite" 
                status="active"
              />
              <StatusIndicator 
                icon={<HardDrive className="w-4 h-4" />} 
                label="Database" 
                status="active"
              />
              <StatusIndicator 
                icon={<Activity className="w-4 h-4" />} 
                label="Monitor" 
                status="active"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-border/50" />

            {/* Date & Time */}
            <div className="text-right">
              <p className="font-mono text-lg text-cyber-cyan font-bold tracking-wider">
                {currentTime}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground">
                {currentDate}
              </p>
            </div>

            {/* Connection status */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
              isConnected 
                ? 'border-cyber-green/30 bg-cyber-green/10' 
                : 'border-cyber-red/30 bg-cyber-red/10'
            }`}>
              <Wifi className={`w-4 h-4 ${
                isConnected ? 'text-cyber-green' : 'text-cyber-red'
              }`} />
              <span className={`text-xs font-mono ${
                isConnected ? 'text-cyber-green' : 'text-cyber-red'
              }`}>
                {isConnected ? 'CONNECTED' : 'OFFLINE'}
              </span>
            </div>
          </div>

          {/* Mobile status */}
          <div className="md:hidden flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-cyber-green animate-pulse' : 'bg-cyber-red'
            }`} />
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  status: 'active' | 'warning' | 'error' | 'inactive';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ icon, label, status }) => {
  const colors = {
    active: 'text-cyber-green',
    warning: 'text-cyber-yellow',
    error: 'text-cyber-red',
    inactive: 'text-muted-foreground',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${colors[status]}`}>
        {icon}
      </div>
      <span className="text-[8px] font-mono text-muted-foreground uppercase">
        {label}
      </span>
      <div className={`w-1 h-1 rounded-full ${
        status === 'active' ? 'bg-cyber-green' :
        status === 'warning' ? 'bg-cyber-yellow' :
        status === 'error' ? 'bg-cyber-red' : 'bg-muted'
      }`} />
    </div>
  );
};

export default Header;
