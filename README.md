# 🛡️ CyberShield AI - Real-Time Cyberthreat Detection System

<div align="center">

![CyberShield AI](https://img.shields.io/badge/CyberShield-AI%20Powered-00ff88?style=for-the-badge&logo=shield&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A cutting-edge, real-time cyberthreat detection and visualization dashboard that simulates global cyber attacks with AI-powered analysis.**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Screenshots](#-screenshots) • [Tech Stack](#-tech-stack)

</div>

---

## 🎯 Overview

CyberShield AI is a sophisticated Security Operations Center (SOC) dashboard that provides real-time visualization and analysis of simulated cyber threats across the globe. Built with modern web technologies, it demonstrates how enterprise-grade threat detection systems work, featuring:

- **Live Global Attack Map** with animated attack paths
- **AI-Powered Threat Analysis** with intelligent insights
- **Real-time Metrics & Statistics** updated every second
- **Interactive Control Panel** for simulation management

## ✨ Features

### 🗺️ Global Threat Visualization
- **Interactive World Map** - SVG-based map showing real-time attack paths
- **Animated Attack Arcs** - Visual representation of attacks from source to target
- **Pulse Indicators** - Glowing markers for attack origins and targets
- **Geographic Intelligence** - Track attacks by country with risk level assessment

### 🤖 AI-Powered Analysis
- **Neural Network Detection** - Simulated 98.7% confidence threat identification
- **Behavioral Analysis** - Pattern recognition for attack methodologies
- **Threat Intelligence Correlation** - Links to known threat actors and campaigns
- **Automated Response Recommendations** - Smart blocking suggestions

### 📊 Comprehensive Analytics
- **Attack Type Distribution** - Bar charts showing DDoS, SQL Injection, Ransomware, etc.
- **Severity Breakdown** - Pie charts for Low/Medium/High/Critical threats
- **Country Statistics** - Attacks originated vs received by nation
- **Real-time Metrics** - Total detected, blocked, and active threats

### 🎮 Interactive Controls
- **Attack Rate Slider** - Adjust simulation speed (100ms - 5000ms intervals)
- **Play/Pause Toggle** - Control the threat simulation
- **Clear Events** - Reset the threat feed
- **AI Analysis Toggle** - Enable/disable AI insights
- **Auto-Block Toggle** - Simulate automated threat response

## 🔐 Simulated Attack Types

| Attack Type | Description | Severity Range |
|------------|-------------|----------------|
| 🌊 DDoS | Distributed Denial of Service floods | Medium - Critical |
| 💉 SQL Injection | Database manipulation attempts | High - Critical |
| 📜 XSS | Cross-site scripting attacks | Low - High |
| 🔒 Ransomware | Encryption-based extortion | Critical |
| 🎣 Phishing | Credential harvesting attempts | Medium - High |
| 🔨 Brute Force | Password cracking attacks | Low - Medium |
| 💀 Zero-Day | Unknown vulnerability exploits | Critical |
| 👤 Man-in-the-Middle | Traffic interception | High - Critical |
| ⛏️ Cryptojacking | Unauthorized crypto mining | Low - Medium |
| 🎯 APT | Advanced Persistent Threats | High - Critical |
| 🦠 Malware | Malicious software deployment | Medium - Critical |
| 📤 Data Exfiltration | Unauthorized data transfer | High - Critical |

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/aryantomar898-gif/cybershield-ai.git

# Navigate to project directory
cd cybershield-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🖼️ Screenshots

### Main Dashboard
The central command center featuring the global threat map, real-time metrics, and threat feed.

### Attack Visualization
Animated arcs show attack paths from source to target countries with severity-based coloring.

### Analytics Panel
Comprehensive charts showing attack type distribution and severity breakdown.

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Component-based UI architecture
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library

### Data Visualization
- **Recharts** - Responsive chart library
- **Custom SVG Map** - Hand-crafted world map component

### State Management
- **React Hooks** - useState, useEffect, useCallback
- **Custom Hooks** - useThreatSimulation for attack logic

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Dashboard.tsx       # Main dashboard layout
│   ├── WorldMap.tsx        # Interactive threat map
│   ├── ThreatFeed.tsx      # Real-time attack feed
│   ├── ThreatCard.tsx      # Individual threat display
│   ├── DashboardMetrics.tsx # Key metrics display
│   ├── CountryStats.tsx    # Country-based statistics
│   ├── AttackTypesChart.tsx # Analytics charts
│   ├── ControlPanel.tsx    # Simulation controls
│   └── Header.tsx          # Navigation header
├── hooks/
│   └── useThreatSimulation.ts # Threat generation logic
├── lib/
│   ├── threatSimulation.ts  # Attack simulation engine
│   └── utils.ts             # Utility functions
├── pages/
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
└── index.css               # Global styles & theme
```

## 🎨 Design System

CyberShield uses a custom cyberpunk-inspired design system:

### Color Palette
- **Cyber Green** `#00ff88` - Success, positive indicators
- **Cyber Red** `#ff3366` - Critical alerts, dangers
- **Cyber Blue** `#00d4ff` - Information, links
- **Cyber Yellow** `#ffaa00` - Warnings
- **Cyber Purple** `#9945ff` - Accent highlights

### Typography
- **Orbitron** - Futuristic display font for headers
- **JetBrains Mono** - Monospace for technical data

## 🔧 Configuration

### Adjusting Simulation Parameters

Edit `src/lib/threatSimulation.ts` to customize:

- Attack source/target locations
- Threat type weights and probabilities
- Severity distributions
- Malware families and attack vectors

### Customizing the Map

The world map in `WorldMap.tsx` uses SVG paths. You can:
- Add new country paths
- Modify attack arc animations
- Adjust pulse indicator styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aryan Tomar**
- GitHub: [@aryantomar898-gif](https://github.com/aryantomar898-gif)

## 🙏 Acknowledgments

- Inspired by real-world SOC dashboards
- Attack data patterns based on MITRE ATT&CK framework
- Icons provided by Lucide React
- UI components from shadcn/ui

---

<div align="center">

**⚡ Built with [Lovable](https://lovable.dev) ⚡**

*"Protecting the digital frontier, one threat at a time."*

</div>
