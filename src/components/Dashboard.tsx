import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import WorldMap from '@/components/WorldMap';
import DashboardMetrics from '@/components/DashboardMetrics';
import ThreatFeed from '@/components/ThreatFeed';
import CountryStats from '@/components/CountryStats';
import AttackTypesChart, { SeverityChart } from '@/components/AttackTypesChart';
import ControlPanel from '@/components/ControlPanel';
import { useThreatSimulation } from '@/hooks/useThreatSimulation';

const Dashboard: React.FC = () => {
  const {
    events,
    activeAttacks,
    countryStats,
    totalBlocked,
    totalDetected,
    criticalAlerts,
    isRunning,
    start,
    stop,
    toggle,
    clearEvents,
    attackRate,
    setAttackRate,
  } = useThreatSimulation(1200);

  // Auto-start simulation on mount
  useEffect(() => {
    start();
    return () => stop();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header isConnected={true} systemStatus="online" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <DashboardMetrics
            totalDetected={totalDetected}
            totalBlocked={totalBlocked}
            criticalAlerts={criticalAlerts}
            activeThreats={activeAttacks.length}
          />
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left column - Map and charts */}
          <div className="xl:col-span-8 space-y-6">
            {/* World Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="cyber-card overflow-hidden"
            >
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-cyber text-lg text-foreground">
                      GLOBAL THREAT MAP
                    </h2>
                    <p className="text-xs font-mono text-muted-foreground">
                      Real-time attack visualization • Satellite tracking enabled
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-muted-foreground">Active attacks:</span>
                    <span className="text-cyber-red font-bold">{activeAttacks.length}</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] relative">
                <WorldMap activeAttacks={activeAttacks} />
              </div>
            </motion.div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AttackTypesChart events={events} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SeverityChart events={events} />
              </motion.div>
            </div>

            {/* Country stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CountryStats stats={countryStats} />
            </motion.div>
          </div>

          {/* Right column - Controls and feed */}
          <div className="xl:col-span-4 space-y-6">
            {/* Control Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ControlPanel
                isRunning={isRunning}
                attackRate={attackRate}
                onToggle={toggle}
                onClear={clearEvents}
                onRateChange={setAttackRate}
              />
            </motion.div>

            {/* Threat Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[600px]"
            >
              <ThreatFeed
                events={events}
                isRunning={isRunning}
                onToggle={toggle}
                onClear={clearEvents}
              />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 py-4 border-t border-border/30 text-center"
        >
          <p className="text-xs font-mono text-muted-foreground/60">
            CYBERSHIELD AI THREAT DETECTION SYSTEM • CLASSIFIED • AUTHORIZED PERSONNEL ONLY
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/40 mt-1">
            Powered by Neural Network Analysis • Real-time Satellite Tracking • Quantum-Encrypted Communications
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Dashboard;
