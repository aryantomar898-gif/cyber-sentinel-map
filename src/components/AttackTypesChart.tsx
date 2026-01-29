import React from 'react';
import { motion } from 'framer-motion';
import { ThreatType, ThreatEvent } from '@/lib/threatSimulation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Cell,
  Tooltip,
  PieChart,
  Pie
} from 'recharts';
import { PieChartIcon, BarChart3 } from 'lucide-react';

interface AttackTypesChartProps {
  events: ThreatEvent[];
}

const threatColors: Record<ThreatType, string> = {
  'DDoS': '#00d4ff',
  'SQL Injection': '#ff6b6b',
  'XSS': '#ffd93d',
  'Ransomware': '#ff4757',
  'Phishing': '#ffa502',
  'Brute Force': '#70a1ff',
  'Zero-Day Exploit': '#ff6348',
  'Man-in-the-Middle': '#a29bfe',
  'Cryptojacking': '#ff9ff3',
  'APT': '#ee5a24',
  'Malware': '#c44569',
  'Data Exfiltration': '#574b90',
};

const AttackTypesChart: React.FC<AttackTypesChartProps> = ({ events }) => {
  // Calculate attack type distribution
  const typeCounts = new Map<ThreatType, number>();
  events.forEach(event => {
    typeCounts.set(event.type, (typeCounts.get(event.type) || 0) + 1);
  });

  const data = Array.from(typeCounts.entries())
    .map(([type, count]) => ({
      name: type,
      value: count,
      color: threatColors[type] || '#888',
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="cyber-card p-2 border border-cyber-cyan/30">
          <p className="text-xs font-mono text-foreground">{payload[0].name}</p>
          <p className="text-sm font-bold text-cyber-cyan">{payload[0].value} attacks</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cyber-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-cyber-cyan" />
        <h3 className="font-cyber text-sm text-foreground">ATTACK TYPES</h3>
      </div>

      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
          No data available
        </div>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

interface SeverityChartProps {
  events: ThreatEvent[];
}

export const SeverityChart: React.FC<SeverityChartProps> = ({ events }) => {
  const severityCounts = {
    critical: events.filter(e => e.severity === 'critical').length,
    high: events.filter(e => e.severity === 'high').length,
    medium: events.filter(e => e.severity === 'medium').length,
    low: events.filter(e => e.severity === 'low').length,
  };

  const data = [
    { name: 'Critical', value: severityCounts.critical, color: '#ff4757' },
    { name: 'High', value: severityCounts.high, color: '#ff6b35' },
    { name: 'Medium', value: severityCounts.medium, color: '#ffd93d' },
    { name: 'Low', value: severityCounts.low, color: '#26de81' },
  ].filter(d => d.value > 0);

  const total = events.length;

  return (
    <div className="cyber-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <PieChartIcon className="w-5 h-5 text-cyber-cyan" />
        <h3 className="font-cyber text-sm text-foreground">SEVERITY DISTRIBUTION</h3>
      </div>

      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
          No data available
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground">
                    {item.value}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttackTypesChart;
