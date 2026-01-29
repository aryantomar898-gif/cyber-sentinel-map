import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  suffix?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  variant = 'default',
  suffix 
}) => {
  const variants = {
    default: 'border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/5 to-transparent',
    success: 'border-cyber-green/30 bg-gradient-to-br from-cyber-green/5 to-transparent',
    warning: 'border-cyber-yellow/30 bg-gradient-to-br from-cyber-yellow/5 to-transparent',
    danger: 'border-cyber-red/30 bg-gradient-to-br from-cyber-red/5 to-transparent',
  };

  const iconColors = {
    default: 'text-cyber-cyan',
    success: 'text-cyber-green',
    warning: 'text-cyber-yellow',
    danger: 'text-cyber-red',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative cyber-card p-4 ${variants[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-cyber font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {suffix && (
              <span className="text-sm font-mono text-muted-foreground">{suffix}</span>
            )}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-mono ${
              trend >= 0 ? 'text-cyber-red' : 'text-cyber-green'
            }`}>
              <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span>{Math.abs(trend)}% from last hour</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-muted/50 ${iconColors[variant]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardMetricsProps {
  totalDetected: number;
  totalBlocked: number;
  criticalAlerts: number;
  activeThreats: number;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  totalDetected,
  totalBlocked,
  criticalAlerts,
  activeThreats,
}) => {
  const blockRate = totalDetected > 0 
    ? Math.round((totalBlocked / totalDetected) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Threats Detected"
        value={totalDetected}
        icon={<Activity className="w-5 h-5" />}
        trend={12}
        variant="default"
      />
      <MetricCard
        title="Attacks Blocked"
        value={totalBlocked}
        icon={<Shield className="w-5 h-5" />}
        variant="success"
        suffix={`(${blockRate}%)`}
      />
      <MetricCard
        title="Critical Alerts"
        value={criticalAlerts}
        icon={<AlertTriangle className="w-5 h-5" />}
        variant="danger"
      />
      <MetricCard
        title="Active Threats"
        value={activeThreats}
        icon={<Zap className="w-5 h-5" />}
        variant="warning"
      />
    </div>
  );
};

export default DashboardMetrics;
