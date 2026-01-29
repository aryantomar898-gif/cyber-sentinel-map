import React from 'react';
import { motion } from 'framer-motion';
import { 
  ThreatEvent, 
  getSeverityColor, 
  getThreatTypeIcon 
} from '@/lib/threatSimulation';
import { Shield, ShieldOff, Clock, MapPin, Zap } from 'lucide-react';

interface ThreatCardProps {
  threat: ThreatEvent;
  isNew?: boolean;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, isNew = false }) => {
  const severityColor = getSeverityColor(threat.severity);
  const icon = getThreatTypeIcon(threat.type);

  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -20, scale: 0.95 } : false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative cyber-card p-3 ${
        threat.severity === 'critical' ? 'border-cyber-red/50' : ''
      }`}
    >
      {/* Severity indicator bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
        style={{ backgroundColor: severityColor }}
      />

      {/* Critical pulse effect */}
      {threat.severity === 'critical' && (
        <div className="absolute inset-0 rounded-lg border border-cyber-red/30 pulse-threat pointer-events-none" />
      )}

      <div className="pl-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <div>
              <h4 className="font-cyber text-sm text-foreground">{threat.type}</h4>
              <span 
                className="inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase rounded"
                style={{ 
                  backgroundColor: `${severityColor}20`,
                  color: severityColor,
                }}
              >
                {threat.severity}
              </span>
            </div>
          </div>
          
          {/* Blocked/Allowed indicator */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono ${
            threat.blocked 
              ? 'bg-cyber-green/20 text-cyber-green' 
              : 'bg-cyber-red/20 text-cyber-red'
          }`}>
            {threat.blocked ? (
              <>
                <Shield className="w-3 h-3" />
                <span>BLOCKED</span>
              </>
            ) : (
              <>
                <ShieldOff className="w-3 h-3" />
                <span>DETECTED</span>
              </>
            )}
          </div>
        </div>

        {/* Location info */}
        <div className="flex items-center gap-4 mb-2 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyber-red" />
            <span>{threat.source.city}, {threat.source.countryCode}</span>
          </div>
          <span className="text-cyber-cyan">→</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyber-cyan" />
            <span>{threat.target.city}, {threat.target.countryCode}</span>
          </div>
        </div>

        {/* Technical details */}
        <div className="flex flex-wrap gap-2 mb-2 text-[10px] font-mono">
          <span className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
            {threat.protocol}:{threat.port}
          </span>
          <span className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
            {threat.attackVector}
          </span>
          {threat.malwareFamily && (
            <span className="px-1.5 py-0.5 bg-cyber-purple/20 rounded text-cyber-purple">
              {threat.malwareFamily}
            </span>
          )}
          {threat.cveId && (
            <span className="px-1.5 py-0.5 bg-cyber-red/20 rounded text-cyber-red">
              {threat.cveId}
            </span>
          )}
        </div>

        {/* Payload preview */}
        <div className="p-2 mb-2 bg-cyber-darker rounded text-[10px] font-mono text-muted-foreground overflow-hidden">
          <div className="flex items-center gap-1 mb-1 text-cyber-yellow">
            <Zap className="w-3 h-3" />
            <span>PAYLOAD</span>
          </div>
          <p className="truncate">{threat.payload}</p>
        </div>

        {/* AI Analysis */}
        <div className="p-2 bg-gradient-to-r from-cyber-cyan/5 to-transparent rounded border-l-2 border-cyber-cyan/50">
          <div className="flex items-center gap-1 mb-1 text-[10px] font-mono text-cyber-cyan">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>AI ANALYSIS</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {threat.aiAnalysis}
          </p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 mt-2 text-[10px] font-mono text-muted-foreground/60">
          <Clock className="w-3 h-3" />
          <span>{threat.timestamp.toLocaleTimeString()}</span>
          <span className="ml-2 text-cyber-cyan/60">{threat.id}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreatCard;
