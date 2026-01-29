import React from 'react';
import { motion } from 'framer-motion';
import { CountryThreatStats, getSeverityColor } from '@/lib/threatSimulation';
import { Globe, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface CountryStatsProps {
  stats: CountryThreatStats[];
  maxItems?: number;
}

// Country flag emojis
const countryFlags: Record<string, string> = {
  US: '🇺🇸', RU: '🇷🇺', CN: '🇨🇳', KP: '🇰🇵', JP: '🇯🇵', 
  GB: '🇬🇧', FR: '🇫🇷', DE: '🇩🇪', AU: '🇦🇺', SG: '🇸🇬',
  IN: '🇮🇳', IR: '🇮🇷', BR: '🇧🇷', MX: '🇲🇽', NG: '🇳🇬',
  TR: '🇹🇷', UA: '🇺🇦', PL: '🇵🇱', HK: '🇭🇰', KR: '🇰🇷',
  CA: '🇨🇦', AE: '🇦🇪', DK: '🇩🇰',
};

const CountryStats: React.FC<CountryStatsProps> = ({ stats, maxItems = 8 }) => {
  const topCountries = stats.slice(0, maxItems);

  return (
    <div className="cyber-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyber-cyan" />
          <h3 className="font-cyber text-sm text-foreground">THREAT GEOGRAPHY</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {stats.length} countries involved
        </span>
      </div>

      <div className="space-y-2">
        {topCountries.map((country, index) => {
          const totalActivity = country.attacksOriginated + country.attacksReceived;
          const maxActivity = topCountries[0] 
            ? topCountries[0].attacksOriginated + topCountries[0].attacksReceived 
            : 1;
          const percentage = (totalActivity / maxActivity) * 100;
          const color = getSeverityColor(country.riskLevel);
          const flag = countryFlags[country.countryCode] || '🏳️';

          return (
            <motion.div
              key={country.countryCode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <div className="flex items-center gap-3 p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors">
                {/* Rank */}
                <span className="w-5 text-xs font-mono text-muted-foreground">
                  #{index + 1}
                </span>

                {/* Flag & Country */}
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-lg">{flag}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[80px]">
                      {country.country}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {country.countryCode}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <TrendingUp className="w-3 h-3 text-cyber-red" />
                    <span className="text-cyber-red">{country.attacksOriginated}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <TrendingDown className="w-3 h-3 text-cyber-cyan" />
                    <span className="text-cyber-cyan">{country.attacksReceived}</span>
                  </div>
                </div>

                {/* Risk level */}
                <div 
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase"
                  style={{ 
                    backgroundColor: `${color}20`,
                    color: color,
                  }}
                >
                  {country.riskLevel === 'critical' && (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {country.riskLevel}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <TrendingUp className="w-3 h-3 text-cyber-red" />
          <span>Attacks Sent</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <TrendingDown className="w-3 h-3 text-cyber-cyan" />
          <span>Attacks Received</span>
        </div>
      </div>
    </div>
  );
};

export default CountryStats;
