import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Gauge, 
  Volume2, 
  Bell,
  Shield,
  Eye
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ControlPanelProps {
  isRunning: boolean;
  attackRate: number;
  onToggle: () => void;
  onClear: () => void;
  onRateChange: (rate: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  attackRate,
  onToggle,
  onClear,
  onRateChange,
}) => {
  // Convert rate (ms) to speed (inverse relationship)
  const speedValue = Math.round((3000 - attackRate) / 25); // 0-100 scale
  
  const handleSpeedChange = (value: number[]) => {
    const newRate = 3000 - (value[0] * 25);
    onRateChange(Math.max(200, Math.min(3000, newRate)));
  };

  return (
    <div className="cyber-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-cyber-cyan" />
        <h3 className="font-cyber text-sm text-foreground">CONTROL PANEL</h3>
      </div>

      <div className="space-y-4">
        {/* Main controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onToggle}
            variant="outline"
            className={`flex-1 h-12 font-mono transition-all ${
              isRunning 
                ? 'border-cyber-yellow/50 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 text-cyber-yellow' 
                : 'border-cyber-green/50 bg-cyber-green/10 hover:bg-cyber-green/20 text-cyber-green'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                PAUSE SIMULATION
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                START SIMULATION
              </>
            )}
          </Button>
          
          <Button
            onClick={onClear}
            variant="outline"
            className="h-12 px-4 border-cyber-red/30 hover:bg-cyber-red/10 hover:text-cyber-red text-muted-foreground"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Attack rate slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>ATTACK FREQUENCY</span>
            <span className="text-cyber-cyan">
              {(1000 / attackRate).toFixed(1)} attacks/sec
            </span>
          </div>
          <Slider
            value={[speedValue]}
            onValueChange={handleSpeedChange}
            max={100}
            step={5}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
            <span>LOW</span>
            <span>HIGH</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">Alert Sounds</span>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">Auto Block</span>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">AI Analysis</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
