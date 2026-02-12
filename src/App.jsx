import React, { useState } from 'react';
import {
  Activity, Heart, FileText, Apple, AlertTriangle, Settings,
  Menu, X, TrendingUp, Calendar, Plus, MapPin, Navigation, Clock,
  Phone, AlertCircle, CheckCircle, ChevronRight, Sparkles, Zap, User
} from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock Data
const userData = {
  name: 'Priya Sharma'
};

const healthData = {
  bloodSugar: { current: 142, unit: 'mg/dL', normal: '70-140', trend: 'up' },
  bloodPressure: { systolic: 138, diastolic: 88, normal: '120/80', trend: 'stable' },
  riskScore: 68,
  nextAppointment: 'Feb 15, 2026'
};

const trendData = [
  { date: 'Feb 5', sugar: 120, systolic: 125, diastolic: 82 },
  { date: 'Feb 6', sugar: 135, systolic: 130, diastolic: 85 },
  { date: 'Feb 7', sugar: 128, systolic: 128, diastolic: 83 },
  { date: 'Feb 8', sugar: 145, systolic: 135, diastolic: 87 },
  { date: 'Feb 9', sugar: 138, systolic: 132, diastolic: 86 },
  { date: 'Feb 10', sugar: 142, systolic: 138, diastolic: 88 }
];

const healthLogs = [
  { id: 1, date: '2026-02-10', time: '08:30', sugar: 142, systolic: 138, diastolic: 88, symptom: 'Headache', notes: 'Mild headache after breakfast' },
  { id: 2, date: '2026-02-09', time: '09:15', sugar: 138, systolic: 132, diastolic: 86, symptom: 'None', notes: 'Feeling good' },
  { id: 3, date: '2026-02-08', time: '07:45', sugar: 145, systolic: 135, diastolic: 87, symptom: 'Dizziness', notes: 'Slight dizziness in morning' }
];

const hospitals = [
  { id: 1, name: 'City General Hospital', distance: '1.2 km', beds: 12, specialty: 'Emergency Care' },
  { id: 2, name: 'Apollo Clinic', distance: '2.5 km', beds: 5, specialty: 'Multi-specialty' },
  { id: 3, name: 'Fortis Healthcare', distance: '3.8 km', beds: 8, specialty: 'Cardiac Care' },
  { id: 4, name: 'Max Hospital', distance: '4.2 km', beds: 15, specialty: 'Emergency & Trauma' }
];
const bloodBanks = [
  {
    id: 1,
    name: 'Red Cross Blood Bank',
    distance: '1.5 km',
    available: ['A+', 'O+', 'B+'],
    contact: '📞 1800 123 456'
  },
  {
    id: 2,
    name: 'City Blood Center',
    distance: '2.8 km',
    available: ['O-', 'AB+', 'A-'],
    contact: '📞 1800 987 654'
  },
  {
    id: 3,
    name: 'LifeSaver Blood Bank',
    distance: '3.6 km',
    available: ['B-', 'O+', 'AB-'],
    contact: '📞 1800 456 789'
  }
];

const vaccines = [
  { name: 'BCG', ageMonths: 0, status: 'completed', dueDate: 'At Birth' },
  { name: 'Hepatitis B', ageMonths: 0, status: 'completed', dueDate: 'At Birth' },
  { name: 'DTaP (1st dose)', ageMonths: 2, status: 'completed', dueDate: '2 months' },
  { name: 'IPV (1st dose)', ageMonths: 2, status: 'completed', dueDate: '2 months' },
  { name: 'DTaP (2nd dose)', ageMonths: 4, status: 'pending', dueDate: '4 months' },
  { name: 'IPV (2nd dose)', ageMonths: 4, status: 'pending', dueDate: '4 months' }
];

// Maternal tracking data by trimester
const maternalTracking = {
  '1st': [
    { week: 'Week 4', weight: 58, bp_sys: 110, bp_dia: 70, notes: 'Initial checkup' },
    { week: 'Week 6', weight: 58.5, bp_sys: 112, bp_dia: 72, notes: 'Morning sickness' },
    { week: 'Week 8', weight: 59, bp_sys: 115, bp_dia: 73, notes: 'Feeling better' },
    { week: 'Week 10', weight: 59.5, bp_sys: 113, bp_dia: 71, notes: 'Energy improving' },
    { week: 'Week 12', weight: 60, bp_sys: 114, bp_dia: 72, notes: 'End of 1st trimester' }
  ],
  '2nd': [
    { week: 'Week 14', weight: 61, bp_sys: 118, bp_dia: 75, notes: 'Feeling great' },
    { week: 'Week 16', weight: 62.5, bp_sys: 120, bp_dia: 76, notes: 'Baby movements' },
    { week: 'Week 18', weight: 64, bp_sys: 122, bp_dia: 78, notes: 'Regular checkup' },
    { week: 'Week 20', weight: 65.5, bp_sys: 125, bp_dia: 80, notes: 'Mid-pregnancy scan' },
    { week: 'Week 22', weight: 67, bp_sys: 123, bp_dia: 79, notes: 'All good' },
    { week: 'Week 24', weight: 68.5, bp_sys: 126, bp_dia: 81, notes: 'Glucose test done' }
  ],
  '3rd': [
    { week: 'Week 28', weight: 70, bp_sys: 128, bp_dia: 82, notes: 'Third trimester begins' },
    { week: 'Week 30', weight: 71.5, bp_sys: 130, bp_dia: 84, notes: 'Regular monitoring' },
    { week: 'Week 32', weight: 73, bp_sys: 132, bp_dia: 85, notes: 'More frequent visits' },
    { week: 'Week 34', weight: 74.5, bp_sys: 135, bp_dia: 86, notes: 'Baby growing well' },
    { week: 'Week 36', weight: 76, bp_sys: 138, bp_dia: 88, notes: 'Almost there' }
  ]
};

// Child growth tracking data
const childGrowthData = [
  { age: '0 months', weight: 3.2, height: 50 },
  { age: '2 months', weight: 5.1, height: 57 },
  { age: '4 months', weight: 6.5, height: 62 },
  { age: '6 months', weight: 7.8, height: 67 },
  { age: '9 months', weight: 8.9, height: 72 },
  { age: '12 months', weight: 9.8, height: 76 }
];

// Glass Card Component
const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`backdrop-blur-md bg-white/80 rounded-2xl shadow-xl border border-white/40 ${hover ? 'hover:shadow-2xl hover:bg-white/90' : ''} transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// Sidebar Component with Glass Effect and Light Violet
const Sidebar = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'timeline', label: 'Dr. Cerebro', icon: TrendingUp, gradient: 'from-violet-400 to-purple-500' },
    { id: 'lab', label: 'ReportGhost', icon: FileText, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'maternal', label: 'MamaCare', icon: Heart, gradient: 'from-rose-400 to-pink-500' },
    { id: 'child', label: 'NutriNinja', icon: Apple, gradient: 'from-amber-500 to-orange-500' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-gray-500 to-gray-600' }
  ];


  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-violet-400/95 via-purple-600/95 to-indigo-800/95 backdrop-blur-2xl text-white border-r border-white/10 transform transition-transform duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-white/20 to-white/5 rounded-xl backdrop-blur-sm shadow-lg">
              <Heart className="w-6 h-6 drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ArogyaPath</h1>
              <p className="text-xs text-violet-200 font-medium">Track. Understand. Act.</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isEmergency = item.id === 'emergency';

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isEmergency
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 animate-pulse'
                  : isActive
                    ? 'bg-white/95 text-violet-600 shadow-xl shadow-violet-500/20 backdrop-blur-sm scale-105'
                    : 'hover:bg-white/10 text-violet-100 hover:text-white hover:scale-105'
                  }`}
              >
                {!isEmergency && !isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                )}
                <Icon className={`w-5 h-5 transition-transform duration-300 relative z-10 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-semibold text-sm relative z-10">{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 ml-auto animate-pulse relative z-10" />}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-900/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-20 -right-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </>
  );
};

// Header Component with Glass and User Name
const Header = ({
  setIsMobileMenuOpen,
  setCurrentPage,
  userName,
  sendEmergencyAlert,
  emergencyContacts
}) => {


  return (
    <header className="backdrop-blur-2xl bg-white/70 shadow-lg border-b border-white/20 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 p-2 rounded-xl transition-all backdrop-blur-sm"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome Back, {userName}

              </h2>
              <p className="text-sm text-gray-600 font-medium">Let's track your health today</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sendEmergencyAlert(emergencyContacts);
            setCurrentPage('emergency');
          }}



          className="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white rounded-xl font-bold transition-all duration-300 shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-600/50 transform hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <AlertTriangle className="w-5 h-5 relative z-10 animate-pulse" />
          <span className="hidden sm:inline relative z-10">Emergency</span>
        </button>
      </div>
    </header>
  );
};

// Risk Score Circle with Glass
const RiskScoreCircle = ({ score }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 40) return '#10b981';
    if (score < 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="relative w-36 h-36">
      <svg className="transform -rotate-90 w-36 h-36 drop-shadow-lg">
        <circle cx="72" cy="72" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
        <circle
          cx="72" cy="72" r={radius} stroke={getColor()} strokeWidth="10" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out drop-shadow-xl"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">{score}</span>
        <span className="text-xs text-gray-500 font-semibold">Risk Score</span>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = ({ setCurrentPage }) => {
  const hasAlert = healthData.bloodSugar.current > 140 || healthData.bloodPressure.systolic > 130;

  return (
    <div className="space-y-6 animate-fade-in">
      {hasAlert && (
        <div className="backdrop-blur-md bg-red-50/90 border-l-4 border-red-500 p-5 rounded-2xl shadow-xl animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-red-100/80 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-900 font-bold text-lg">Health Alert</h3>
              <p className="text-red-700 text-sm mt-1">Your blood sugar and blood pressure levels are above normal range. Please consult your doctor.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Activity, title: 'Blood Sugar', value: healthData.bloodSugar.current, unit: healthData.bloodSugar.unit, normal: healthData.bloodSugar.normal, gradient: 'from-violet-400/90 to-purple-600/90', shadow: 'shadow-violet-500/25' },
          { icon: Heart, title: 'Blood Pressure', value: `${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`, unit: 'mmHg', normal: healthData.bloodPressure.normal, gradient: 'from-pink-400/90 to-rose-600/90', shadow: 'shadow-pink-500/25' },
          { icon: null, title: 'Risk Score', value: null, unit: '', normal: '', gradient: '', shadow: '' },
          { icon: Calendar, title: 'Next Appointment', value: healthData.nextAppointment, unit: '', normal: '', gradient: 'from-teal-500/90 to-emerald-600/90', shadow: 'shadow-teal-500/25' }
        ].map((card, idx) => {
          if (card.title === 'Risk Score') {
            return (
              <div key={idx} className="backdrop-blur-md bg-white/90 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col items-center justify-center border border-white/50 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <RiskScoreCircle score={healthData.riskScore} />
                  <p className="text-sm text-gray-600 mt-4 font-semibold text-center">
                    {healthData.riskScore < 40 ? 'Low Risk ✓' : healthData.riskScore < 70 ? 'Moderate Risk ⚠' : 'High Risk ⚠'}
                  </p>
                </div>
              </div>
            );
          }

          const Icon = card.icon;
          return (
            <div key={idx} className={`group relative overflow-hidden backdrop-blur-md bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-xl ${card.shadow} hover:shadow-2xl transition-all duration-500 border border-white/20`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                    <Icon className="w-8 h-8 drop-shadow" />
                  </div>
                  {card.title !== 'Next Appointment' && (
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold shadow">
                      {card.title === 'Blood Sugar' && healthData.bloodSugar.trend === 'up' ? '↑' : '→'}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold opacity-90">{card.title}</h3>
                <p className="text-4xl font-bold mt-2 drop-shadow">{card.value}</p>
                {card.unit && <p className="text-sm opacity-90 mt-1 font-medium">{card.unit}</p>}
                {card.normal && <p className="text-xs mt-2 opacity-80 bg-white/10 inline-block px-2 py-1 rounded-lg">Normal: {card.normal}</p>}
                {card.title === 'Next Appointment' && (
                  <button className="mt-4 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                    View Details →
                  </button>
                )}
              </div>
              <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5" />
            </div>
          );
        })}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Health Trends (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.5} />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
            <Line type="monotone" dataKey="sugar" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="systolic" stroke="#ec4899" strokeWidth={3} dot={{ r: 6, fill: '#ec4899', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="diastolic" stroke="#14b8a6" strokeWidth={3} dot={{ r: 6, fill: '#14b8a6', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {[
            { color: 'bg-violet-500', label: 'Blood Sugar' },
            { color: 'bg-pink-500', label: 'Systolic BP' },
            { color: 'bg-teal-500', label: 'Diastolic BP' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 backdrop-blur-sm bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className={`w-3 h-3 ${item.color} rounded-full shadow-lg`}></div>
              <span className="text-sm text-gray-700 font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Plus, title: 'Log Health Data', desc: 'Record your vitals', gradient: 'from-violet-500/10 to-purple-500/10', page: 'timeline' },
          { icon: FileText, title: 'Upload Lab Report', desc: 'Analyze your results', gradient: 'from-pink-500/10 to-rose-500/10', page: 'lab' },
          { icon: Phone, title: 'Emergency Help', desc: 'Quick assistance', gradient: 'from-red-500/10 to-orange-500/10', page: 'emergency' }
        ].map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => setCurrentPage(action.page)}
              className="group backdrop-blur-md bg-white/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 text-left border border-white/50 relative overflow-hidden"
            >

              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <Icon className="w-12 h-12 text-violet-600 mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-lg" />
              <h4 className="font-bold text-gray-800 relative z-10 text-lg">{action.title}</h4>
              <p className="text-sm text-gray-600 mt-1 relative z-10 font-medium">{action.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Timeline Page
const TimelinePage = () => {
  const [formData, setFormData] = useState({ sugar: '', systolic: '', diastolic: '', symptom: 'None', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Health data logged successfully!');
    setFormData({ sugar: '', systolic: '', diastolic: '', symptom: 'None', notes: '' });
  };

  const getRiskStatus = () => {
    const avgSugar = healthLogs.reduce((sum, log) => sum + log.sugar, 0) / healthLogs.length;
    const avgSystolic = healthLogs.reduce((sum, log) => sum + log.systolic, 0) / healthLogs.length;

    if (avgSugar > 140 || avgSystolic > 130) return { label: 'High', color: 'red', bg: 'from-red-500 to-red-600' };
    if (avgSugar > 120 || avgSystolic > 120) return { label: 'Moderate', color: 'yellow', bg: 'from-yellow-500 to-amber-600' };
    return { label: 'Low', color: 'green', bg: 'from-green-500 to-emerald-600' };
  };

  const riskStatus = getRiskStatus();

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">Log Health Data</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['sugar', 'systolic', 'diastolic'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {field === 'sugar' ? 'Blood Sugar (mg/dL)' : field === 'systolic' ? 'Systolic BP' : 'Diastolic BP'}
                </label>
                <input
                  type="number"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-semibold"
                  placeholder={field === 'sugar' ? '120' : field === 'systolic' ? '120' : '80'}
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Symptoms</label>
              <select
                value={formData.symptom}
                onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition-all font-semibold"
              >
                {['None', 'Headache', 'Dizziness', 'Fatigue', 'Nausea', 'Chest Pain'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition-all font-semibold"
                placeholder="Any additional notes..."
              />
            </div>
          </div>

          <button type="submit" className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-600/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Plus className="w-5 h-5 inline mr-2 relative z-10" />
            <span className="relative z-10">Log Entry</span>
          </button>
        </form>
      </GlassCard>

      <div className="flex justify-center">
        <div className={`backdrop-blur-md inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold shadow-xl border-2 bg-gradient-to-r ${riskStatus.bg} text-white`}>
          <Zap className="w-6 h-6" />
          <span>Overall Risk: {riskStatus.label}</span>
        </div>
      </div>

      <GlassCard className="p-6 overflow-x-auto">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">Recent Health Logs</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {['Date & Time', 'Blood Sugar', 'BP', 'Symptom', 'Notes'].map((h, idx) => (
                <th key={idx} className="text-left py-3 px-4 text-sm font-bold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {healthLogs.map(log => (
              <tr key={log.id} className="border-b border-gray-100 hover:bg-violet-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="text-sm font-semibold text-gray-800">{log.date}</div>
                  <div className="text-xs text-gray-500 font-medium">{log.time}</div>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-gray-800">{log.sugar} mg/dL</td>
                <td className="py-4 px-4 text-sm font-bold text-gray-800">{log.systolic}/{log.diastolic}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-semibold ${log.symptom === 'None' ? 'bg-green-100/80 text-green-800' : 'bg-yellow-100/80 text-yellow-800'
                    }`}>{log.symptom}</span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 font-medium">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">Health Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.5} />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px' }} />
            <Line type="monotone" dataKey="sugar" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="systolic" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
};

// Lab Report Page
const LabReportPage = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);

  const analyzeImage = () => {
    // Simulated AI analysis
    setResults({
      hemoglobin: { value: 11.2, status: "Low", insight: "Hemoglobin slightly below normal. Consider iron-rich diet." },
      tsh: { value: 2.1, status: "Normal", insight: "TSH level is within healthy range." },
      sugar: { value: 152, status: "High", insight: "Blood sugar elevated. Monitor carbohydrate intake." }
    });
  };

  return (
    <div className="space-y-6">

      <GlassCard className="p-6 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          ReportGhost AI Analyzer
        </h3>

        <p className="text-gray-600 mb-6">
          Upload your lab report image. AI will extract values and give health insights.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          className="mb-4"
        />

        {image && (
          <div className="mb-6">
            <img src={image} alt="Report Preview" className="max-h-64 mx-auto rounded-xl shadow-lg" />
          </div>
        )}

        {image && (
          <button
            onClick={analyzeImage}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Analyze Report
          </button>
        )}
      </GlassCard>

      {results && (
        <div className="space-y-4">
          {Object.entries(results).map(([key, data]) => (
            <GlassCard key={key} className="p-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold capitalize">{key}</h4>
                <span className={`px-4 py-2 rounded-lg font-bold ${data.status === "Normal"
                  ? "bg-green-200 text-green-900"
                  : data.status === "Low"
                    ? "bg-yellow-200 text-yellow-900"
                    : "bg-red-200 text-red-900"
                  }`}>
                  {data.status}
                </span>
              </div>

              <p className="mt-3 text-gray-700 font-semibold">
                Value: {data.value}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                💡 {data.insight}
              </p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};


// Maternal Care Page with Trimester-wise tracking
const MaternalCarePage = () => {
  const [trimester, setTrimester] = useState('2nd');
  const [maternalData, setMaternalData] = useState({ bp_systolic: '', bp_diastolic: '', weight: '', kicks: 0 });
  const riskAlert = maternalData.bp_systolic > 140 || maternalData.bp_diastolic > 90;

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Select Trimester</h3>
        <div className="flex flex-wrap gap-3">
          {['1st', '2nd', '3rd'].map(tri => (
            <button
              key={tri}
              onClick={() => setTrimester(tri)}
              className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${trimester === tri
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-500/40 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
            >
              {tri} Trimester
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
          {trimester} Trimester Health Tracking
        </h3>

        {/* Weight Trend Chart */}
        <div className="mb-8">
          <h4 className="text-md font-bold text-gray-800 mb-4">Weight Progress</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={maternalTracking[trimester]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.5} />
              <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px' }} />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#ec4899" strokeWidth={3} dot={{ r: 6, fill: '#ec4899' }} name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Pressure Trend Chart */}
        <div className="mb-8">
          <h4 className="text-md font-bold text-gray-800 mb-4">Blood Pressure Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={maternalTracking[trimester]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.5} />
              <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px' }} />
              <Legend />
              <Line type="monotone" dataKey="bp_sys" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6, fill: '#8b5cf6' }} name="Systolic BP" />
              <Line type="monotone" dataKey="bp_dia" stroke="#14b8a6" strokeWidth={3} dot={{ r: 6, fill: '#14b8a6' }} name="Diastolic BP" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Tracking Table */}
        <div className="overflow-x-auto">
          <h4 className="text-md font-bold text-gray-800 mb-4">Detailed Health Logs</h4>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Week</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Weight (kg)</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">BP (Systolic)</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">BP (Diastolic)</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {maternalTracking[trimester].map((record, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-pink-50/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-bold text-gray-800">{record.week}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">{record.weight}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">{record.bp_sys}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-800">{record.bp_dia}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Track Current Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Blood Pressure</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maternalData.bp_systolic}
                  onChange={(e) => setMaternalData({ ...maternalData, bp_systolic: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all font-semibold"
                  placeholder="Systolic"
                />
                <span className="self-center text-gray-500 font-bold text-xl">/</span>
                <input
                  type="number"
                  value={maternalData.bp_diastolic}
                  onChange={(e) => setMaternalData({ ...maternalData, bp_diastolic: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all font-semibold"
                  placeholder="Diastolic"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={maternalData.weight}
                onChange={(e) => setMaternalData({ ...maternalData, weight: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 transition-all font-semibold"
                placeholder="e.g., 65.5"
              />
            </div>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-br from-pink-100/90 to-purple-100/90 rounded-2xl p-6 border border-pink-200/50 shadow-lg">
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Kick Counter</h4>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 drop-shadow">{maternalData.kicks}</div>
              <div className="space-x-2">
                <button
                  onClick={() => setMaternalData({ ...maternalData, kicks: maternalData.kicks + 1 })}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Count Kick
                </button>
                <button
                  onClick={() => setMaternalData({ ...maternalData, kicks: 0 })}
                  className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {riskAlert && (
        <div className="backdrop-blur-md bg-red-50/90 border-l-4 border-red-500 p-6 rounded-2xl shadow-xl">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-red-100/80 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-900 font-bold text-lg">High Blood Pressure Alert</h3>
              <p className="text-red-700 mt-2 font-medium">Your blood pressure is above the normal range for pregnancy. Please contact your healthcare provider immediately.</p>
            </div>
          </div>
        </div>
      )}

      <div className="backdrop-blur-md bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-2xl p-6 text-white shadow-xl border border-white/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Next Prenatal Visit</h3>
            <p className="text-xl font-bold">February 18, 2026 - 10:00 AM</p>
            <p className="text-sm opacity-90 mt-2 font-medium">Dr. Sarah Johnson - City Women's Hospital</p>
          </div>
          <Calendar className="w-14 h-14 opacity-80 drop-shadow-lg" />
        </div>
        <button className="mt-4 px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl font-bold transition-all duration-200 shadow-lg">
          Add to Calendar →
        </button>
      </div>
    </div>
  );
};

// Child Care Page with Age, Height, and Growth Charts
const ChildCarePage = () => {
  const [vitals, setVitals] = useState({
    sugar: '',
    hemoglobin: '',
    systolic: ''
  });

  const [dietPlan, setDietPlan] = useState(null);

  const generateDietPlan = () => {
    const sugar = parseFloat(vitals.sugar);
    const hb = parseFloat(vitals.hemoglobin);
    const bp = parseFloat(vitals.systolic);

    let plan = {
      title: "Balanced Diet Plan",
      breakfast: "Oats with fruits + boiled eggs",
      lunch: "Brown rice + dal + mixed vegetables",
      dinner: "Grilled paneer/chicken + salad",
      tips: "Stay hydrated and maintain regular exercise."
    };

    if (sugar > 140) {
      plan = {
        title: "Low Carb Anti-Diabetic Plan",
        breakfast: "Vegetable omelette + nuts",
        lunch: "Grilled chicken/paneer + sautéed vegetables",
        dinner: "Clear soup + salad",
        tips: "Avoid refined sugar & white rice. Monitor glucose daily."
      };
    }

    if (hb < 12) {
      plan = {
        title: "Iron-Rich Diet Plan",
        breakfast: "Spinach smoothie + dates",
        lunch: "Rajma/Chickpeas + roti + green veggies",
        dinner: "Beetroot salad + lentil soup",
        tips: "Include iron sources and vitamin C for absorption."
      };
    }

    if (bp > 140) {
      plan = {
        title: "Low Sodium Heart-Friendly Plan",
        breakfast: "Oats + banana",
        lunch: "Steamed vegetables + dal",
        dinner: "Grilled fish/paneer + leafy greens",
        tips: "Reduce salt intake. Avoid processed foods."
      };
    }

    setDietPlan(plan);
  };

  return (
    <div className="space-y-6">

      <GlassCard className="p-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
          NutriNinja Smart Diet Planner
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Blood Sugar (mg/dL)"
            value={vitals.sugar}
            onChange={(e) => setVitals({ ...vitals, sugar: e.target.value })}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl"
          />
          <input
            type="number"
            placeholder="Hemoglobin (g/dL)"
            value={vitals.hemoglobin}
            onChange={(e) => setVitals({ ...vitals, hemoglobin: e.target.value })}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl"
          />
          <input
            type="number"
            placeholder="Systolic BP"
            value={vitals.systolic}
            onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl"
          />
        </div>

        <button
          onClick={generateDietPlan}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Generate Diet Plan
        </button>
      </GlassCard>

      {dietPlan && (
        <GlassCard className="p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            {dietPlan.title}
          </h4>

          <div className="space-y-3 text-gray-700">
            <p><strong>🍳 Breakfast:</strong> {dietPlan.breakfast}</p>
            <p><strong>🍛 Lunch:</strong> {dietPlan.lunch}</p>
            <p><strong>🥗 Dinner:</strong> {dietPlan.dinner}</p>
            <p className="mt-4 text-sm text-gray-600">
              💡 {dietPlan.tips}
            </p>
          </div>
        </GlassCard>
      )}

    </div>
  );
};


// Emergency Page
const EmergencyPage = ({ contacts, setContacts }) => {
  return (
    <div className="space-y-6">
      <div className="backdrop-blur-md bg-gradient-to-r from-red-500/90 to-red-600/90 rounded-2xl p-8 text-white shadow-2xl border border-red-400/30 animate-pulse">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 bg-white/20 rounded-full">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Emergency Mode Activated</h2>
            <p className="text-red-100 mt-2 font-medium">Immediate assistance available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="tel:108" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
            <Phone className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-xl mb-2">Call Ambulance</h3>
            <p className="text-red-100 text-lg font-bold">📞 108</p>
          </a>

          <a href="tel:102" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
            <Phone className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-xl mb-2">Medical Helpline</h3>
            <p className="text-red-100 text-lg font-bold">📞 102</p>
          </a>
        </div>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-red-600" />
          Nearby Hospitals
        </h3>
        <div className="space-y-3">
          {hospitals.map(hospital => (
            <div key={hospital.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-violet-50/80 rounded-xl hover:shadow-lg transition-all duration-200 border border-blue-200/50">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{hospital.name}</h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Navigation className="w-4 h-4 mr-1 text-blue-600" />
                    {hospital.distance}
                  </span>
                  <span className="font-semibold">{hospital.beds} beds available</span>
                  <span className="text-violet-700 font-semibold">{hospital.specialty}</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl ml-4">
                Navigate →
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-600" />
          Nearby Blood Banks
        </h3>

        <div className="space-y-4">
          {bloodBanks.map(bank => (
            <div
              key={bank.id}
              className="p-4 rounded-xl bg-gradient-to-r from-red-50/80 to-pink-50/80 border border-red-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {bank.name}
                  </h4>

                  <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                    <span>📍 {bank.distance}</span>
                    <span>{bank.contact}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {bank.available.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-bold rounded-lg bg-red-200 text-red-900 shadow-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Navigate →
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>


      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Emergency Contacts
        </h3>

        {/* Add Contact Form */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Contact Name"
            className="flex-1 px-4 py-2 border rounded-xl"
            id="contactName"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="flex-1 px-4 py-2 border rounded-xl"
            id="contactPhone"
          />
          <button
            onClick={() => {
              const name = document.getElementById("contactName").value;
              const phone = document.getElementById("contactPhone").value;
              if (name && phone) {
                setContacts([...contacts, { name, phone }]);
                document.getElementById("contactName").value = "";
                document.getElementById("contactPhone").value = "";
              }
            }}
            className="px-6 py-2 bg-violet-600 text-white rounded-xl font-bold"
          >
            Add
          </button>
        </div>

        {/* Contact List */}
        <div className="space-y-3">
          {contacts.length === 0 && (
            <p className="text-gray-500">No emergency contacts added.</p>
          )}

          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl"
            >
              <div>
                <p className="font-bold">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
              </div>
            </div>
          ))}
                  </div>
      </GlassCard>
    </div>
  );
};
// Settings Page
const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Settings
        </h3>

        <p className="text-gray-600 mt-4">
          User preferences and account settings will appear here.
        </p>
      </GlassCard>
    </div>
  );
};

          // Main App Component
          const MainApp = ({userName, sendEmergencyAlert}) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
          const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
          const [emergencyContacts, setEmergencyContacts] = useState([
          {name: "Raj Kumar", phone: "+919876543210" }
          ]);


  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <DashboardPage setCurrentPage={setCurrentPage} />;
          case "timeline": return <TimelinePage />;
          case "lab": return <LabReportPage />;
          case "maternal": return <MaternalCarePage />;
          case "child": return <ChildCarePage />;
          case "settings": return <SettingsPage />;
          case "emergency":
          return (
          <EmergencyPage
            contacts={emergencyContacts}
            setContacts={setEmergencyContacts}
          />
          );

          default: return <DashboardPage />;
    }
  };

          return (
          <div className="flex min-h-screen">
            <Sidebar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <div className="flex-1 flex flex-col">
              <Header
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                setCurrentPage={setCurrentPage}
                userName={userName}
                sendEmergencyAlert={sendEmergencyAlert}
                emergencyContacts={emergencyContacts}
              />


              <main className="flex-1 overflow-y-auto p-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                  {renderPage()}
                </div>
              </main>
            </div>
          </div>
          );
};



          // ================= HOME SCREEN =================
          const HomeScreen = ({onContinue}) => {
  const [animate, setAnimate] = useState(false);

  const triggerSlide = () => {
    if (!animate) {
            setAnimate(true);
      setTimeout(() => {
            onContinue();
      }, 350);
    }
  };

  // Listen for ANY key press
  React.useEffect(() => {
    const handleKeyPress = () => {
            triggerSlide();
    };

          window.addEventListener("keydown", handleKeyPress);

    return () => {
            window.removeEventListener("keydown", handleKeyPress);
    };
  }, [animate]);

          return (
          <div
            onClick={triggerSlide}
            className={`flex items-center justify-center h-screen cursor-pointer
      bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900
      transition-all duration-500 ease-in-out
      ${animate ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
          >
            <div className="text-center px-6">
              <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white drop-shadow-2xl">
                <span className="bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent">
                  ArogyaPath
                </span>
              </h1>

              <p className="mt-6 text-violet-200 text-lg md:text-xl font-medium tracking-wide">
                Track. Understand. Act.
              </p>
            </div>
          </div>
          );
};

          // ================= SIGNUP PAGE =================
          const SignupPage = ({onLoginClick, onSuccess}) => {
  const [name, setName] = useState("");

  const handleSignup = (e) => {
            e.preventDefault();
          onSuccess(name);
  };

          return (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
            <div className="backdrop-blur-md bg-white/80 p-10 rounded-3xl shadow-2xl w-96">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </h2>

              <form onSubmit={handleSignup} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-violet-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={onLoginClick}
                  className="text-violet-600 font-semibold cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
          );
};
          // ================= LOGIN PAGE =================
          const LoginPage = ({onSignupClick, onSuccess}) => {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
            e.preventDefault();
          onSuccess(name);
  };

          return (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
            <div className="backdrop-blur-md bg-white/80 p-10 rounded-3xl shadow-2xl w-96">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Login
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-violet-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold"
                >
                  Login
                </button>
              </form>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <span
                  onClick={onSignupClick}
                  className="text-violet-600 font-semibold cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
          );
};
const App = () => {
  const [authScreen, setAuthScreen] = useState("home");
          const [userName, setUserName] = useState("");
          const [toast, setToast] = useState(null);
              React.useEffect(() => {
  if (toast) {
    const timer = setTimeout(() => {
            setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [toast]);

  const sendEmergencyAlert = (contacts) => {
  if (!contacts || contacts.length === 0) {
            setToast({
              message: "No emergency contacts added ⚠",
              type: "error"
            });
          return;
  }


          setToast({
            message: `🚨 Emergency Alert Sent to ${contacts.length} Contact${contacts.length > 1 ? "s" : ""}`,
          type: "success"
  });
};

          return (
          <>
            {authScreen === "home" && (
              <HomeScreen onContinue={() => setAuthScreen("signup")} />
            )}

            {authScreen === "signup" && (
              <SignupPage
                onLoginClick={() => setAuthScreen("login")}
                onSuccess={(name) => {
                  setUserName(name);
                  setAuthScreen("app");
                  setToast({
                    message: `Welcome ${name} 🎉`,
                    type: "success"
                  });
                }}
              />
            )}

            {authScreen === "login" && (
              <LoginPage
                onSignupClick={() => setAuthScreen("signup")}
                onSuccess={(name) => {
                  setUserName(name);
                  setAuthScreen("app");
                  setToast({
                    message: `Welcome Back ${name} 👋`,
                    type: "success"
                  });
                }}
              />
            )}

            {authScreen === "app" && (
              <MainApp
                userName={userName}
                sendEmergencyAlert={sendEmergencyAlert}
              />
            )}

            {/* GLOBAL TOAST */}
            {toast && (
              <div className={`fixed top-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-[999]
        ${toast.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                }`}>
                {toast.message}
              </div>
            )}
          </>
          );
          };



          export default App;
