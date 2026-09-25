import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  LogOut, 
  Gauge, 
  Flame, 
  Timer, 
  Award,
  Layers,
  Search
} from 'lucide-react';

export interface AthleteProfile {
  id: string;
  name: string;
  discipline: 'Sprint (100m/200m)' | 'NFL Combine (40yd)' | 'Premier League Speed' | 'Olympic Decathlon';
  team: string;
  topSpeedMph: number;
  tenYardSplit: string;
  reactiveStrengthIndex: number;
  status: 'In Testing' | 'Active Cycle' | 'Recovery' | 'PR Verified';
  coach: string;
}

export interface LabBooking {
  id: string;
  ticketId: string;
  athlete: string;
  protocol: string;
  date: string;
  timeSlot: string;
  status: 'Force Plate Audit' | 'Laser Timing Run' | 'Kinetic Analysis' | 'Report Certified';
  fee: number;
}

interface AdminDashboardProps {
  onExit: () => void;
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'roster' | 'telemetry' | 'billing'>('roster');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [athletes, setAthletes] = useState<AthleteProfile[]>([
    {
      id: 'ATH-101',
      name: 'Christian Coleman Jr.',
      discipline: 'Sprint (100m/200m)',
      team: 'Team USA Track',
      topSpeedMph: 27.4,
      tenYardSplit: '1.42s',
      reactiveStrengthIndex: 3.42,
      status: 'PR Verified',
      coach: 'Coach Vince Tyler'
    },
    {
      id: 'ATH-102',
      name: 'DeMarcus Vance',
      discipline: 'NFL Combine (40yd)',
      team: 'Ohio State WR',
      topSpeedMph: 24.8,
      tenYardSplit: '1.48s',
      reactiveStrengthIndex: 3.18,
      status: 'Active Cycle',
      coach: 'Dr. Aris Thorne'
    },
    {
      id: 'ATH-103',
      name: 'Kylian Ward',
      discipline: 'Premier League Speed',
      team: 'Arsenal FC Academy',
      topSpeedMph: 25.1,
      tenYardSplit: '1.46s',
      reactiveStrengthIndex: 3.25,
      status: 'In Testing',
      coach: 'Elena Rostova'
    },
    {
      id: 'ATH-104',
      name: 'Mateo Silva',
      discipline: 'Olympic Decathlon',
      team: 'Federal Athletics',
      topSpeedMph: 23.9,
      tenYardSplit: '1.54s',
      reactiveStrengthIndex: 2.95,
      status: 'Recovery',
      coach: 'Coach Vince Tyler'
    }
  ]);

  const [bookings] = useState<LabBooking[]>([
    {
      id: 'BK-901',
      ticketId: 'KNT-9502',
      athlete: 'Christian Coleman Jr.',
      protocol: 'Dual Force Plate Asymmetry & Ground Contact Scan',
      date: '2026-09-24',
      timeSlot: '09:00 AM',
      status: 'Laser Timing Run',
      fee: 650
    },
    {
      id: 'BK-902',
      ticketId: 'KNT-4108',
      athlete: 'DeMarcus Vance',
      protocol: 'Combine 40-Yard Laser Split & Acceleration Vectoring',
      date: '2026-09-24',
      timeSlot: '11:30 AM',
      status: 'Force Plate Audit',
      fee: 850
    },
    {
      id: 'BK-903',
      ticketId: 'KNT-7721',
      athlete: 'Kylian Ward',
      protocol: 'High-Speed Markerless Biomechanics Kinematics',
      date: '2026-09-25',
      timeSlot: '02:00 PM',
      status: 'Kinetic Analysis',
      fee: 1200
    },
    {
      id: 'BK-904',
      ticketId: 'KNT-1092',
      athlete: 'Mateo Silva',
      protocol: 'Elastic Energy Return & Reactive Strength Index (RSI)',
      date: '2026-09-26',
      timeSlot: '10:00 AM',
      status: 'Report Certified',
      fee: 450
    }
  ]);

  const filteredAthletes = athletes.filter(a => {
    const matchesFilter = filter === 'All' || a.status === filter;
    const matchesQuery = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans antialiased">
      {/* Top Telemetry Header */}
      <header className="border-b border-neutral-900 bg-[#0A0A0B]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold uppercase tracking-wider text-sm text-white">KINETIC LAB</span>
                <span className="text-zinc-600 text-xs">//</span>
                <span className="text-xs font-semibold font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  BIOMECHANICS COMMAND OS
                </span>
              </div>
              <p className="text-xs font-semibold tracking-wider font-mono text-zinc-300">
                Authorized Lab Director Session (Passkey Verified)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-neutral-950 px-3 py-1.5 rounded-full border border-neutral-800 text-xs font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>1000Hz SENSORS ONLINE</span>
            </div>
            <button 
              onClick={onExit}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-base font-semibold min-h-[44px] font-mono text-zinc-300 hover:text-white transition cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-300 text-xs font-mono uppercase">
              <span>Active Roster</span>
              <Users className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-3xl font-display font-extrabold text-white mt-2">48</div>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+14 Elite Recruits this Quarter</span>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-300 text-xs font-mono uppercase">
              <span>Peak Velocity Verified</span>
              <Gauge className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-3xl font-display font-extrabold text-white mt-2">27.4 <span className="text-base text-zinc-300">MPH</span></div>
            <div className="text-xs font-mono text-zinc-400 mt-1">
              <span>Laser Gate #4 • C. Coleman</span>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-300 text-xs font-mono uppercase">
              <span>Testing Sessions (MTD)</span>
              <Activity className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-3xl font-display font-extrabold text-white mt-2">184</div>
            <div className="text-xs font-mono text-emerald-400 mt-1">
              <span>99.8% Force Plate Calibration Accuracy</span>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-300 text-xs font-mono uppercase">
              <span>Escrow & Lab Billing</span>
              <DollarSign className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-3xl font-display font-extrabold text-white mt-2">$84,200</div>
            <div className="text-xs font-mono text-zinc-400 mt-1">
              <span>Pro Team Retainers & Combine Testing</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-neutral-950 text-zinc-400 hover:text-white border border-neutral-900'
              }`}
            >
              Athlete Roster ({athletes.length})
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-neutral-950 text-zinc-400 hover:text-white border border-neutral-900'
              }`}
            >
              Live Testing Protocol ({bookings.length})
            </button>
          </div>

          {activeTab === 'roster' && (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-3.5 w-3.5 text-zinc-300 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter athlete, team, or sport..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500 font-mono w-56 sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-red-500"
              >
                <option value="All">All Statuses</option>
                <option value="PR Verified">PR Verified</option>
                <option value="Active Cycle">Active Cycle</option>
                <option value="In Testing">In Testing</option>
                <option value="Recovery">Recovery</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Athlete Roster */}
        {activeTab === 'roster' && (
          <div className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#101115] text-zinc-300 uppercase border-b border-neutral-900">
                  <tr>
                    <th className="px-5 py-3.5">Athlete / Discipline</th>
                    <th className="px-5 py-3.5">Team / Program</th>
                    <th className="px-5 py-3.5">Top Velocity</th>
                    <th className="px-5 py-3.5">10yd Split</th>
                    <th className="px-5 py-3.5">RSI Index</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Lead Biomechanist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-zinc-300">
                  {filteredAthletes.map((athlete) => (
                    <tr key={athlete.id} className="hover:bg-neutral-900/40 transition">
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{athlete.name}</div>
                        <div className="text-xs font-semibold text-zinc-300">{athlete.discipline}</div>
                      </td>
                      <td className="px-5 py-4 text-zinc-400 font-medium">{athlete.team}</td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-red-400 text-sm">{athlete.topSpeedMph}</span>
                        <span className="text-xs font-semibold tracking-wider text-zinc-300 ml-1">MPH</span>
                      </td>
                      <td className="px-5 py-4 font-bold text-white">{athlete.tenYardSplit}</td>
                      <td className="px-5 py-4 text-amber-400 font-bold">{athlete.reactiveStrengthIndex}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-bold uppercase ${
                          athlete.status === 'PR Verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : athlete.status === 'Active Cycle'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : athlete.status === 'In Testing'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {athlete.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-400">{athlete.coach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Testing Protocols */}
        {activeTab === 'telemetry' && (
          <div className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#101115] text-zinc-300 uppercase border-b border-neutral-900">
                  <tr>
                    <th className="px-5 py-3.5">Ticket ID</th>
                    <th className="px-5 py-3.5">Athlete</th>
                    <th className="px-5 py-3.5">Assessment Protocol</th>
                    <th className="px-5 py-3.5">Schedule</th>
                    <th className="px-5 py-3.5">Status Phase</th>
                    <th className="px-5 py-3.5">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-zinc-300">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-900/40 transition">
                      <td className="px-5 py-4 font-bold text-red-400">{b.ticketId}</td>
                      <td className="px-5 py-4 font-bold text-white">{b.athlete}</td>
                      <td className="px-5 py-4 text-zinc-300">{b.protocol}</td>
                      <td className="px-5 py-4 text-zinc-400">{b.date} • {b.timeSlot}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-bold uppercase bg-neutral-900 text-zinc-300 border border-neutral-800">
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-emerald-400">${b.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
