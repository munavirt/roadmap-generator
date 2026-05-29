import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, FileText, Target, Map, Zap, CheckCircle2, Award } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const dummyChartData = [
  { name: 'W1', score: 20 },
  { name: 'W2', score: 45 },
  { name: 'W3', score: 55 },
  { name: 'W4', score: 85 },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden text-slate-800 font-sans selection:bg-blue-100 flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-blue-400/20 rounded-full blur-3xl z-0 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-400/15 rounded-full blur-3xl z-0 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[25%] w-[50rem] h-[50rem] bg-sky-300/20 rounded-full blur-3xl z-0 pointer-events-none"
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 bg-blue-400 rounded-full blur-[1px] pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Minimal Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-blue-600 font-extrabold text-2xl tracking-tight"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">SkillForge</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => navigate('/roadmap')}
            className="group px-6 py-2.5 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-700 font-bold rounded-full shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center gap-2"
          >
            Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Floating Preview Cards (Hidden on Mobile) */}
        
        {/* Card 1: Resume Score */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="absolute top-[15%] left-[5%] xl:left-[10%] z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-64 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] rounded-3xl p-6 cursor-default relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-5 relative z-10">
              <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" /> ATS Score
              </span>
            </div>
            <div className="text-4xl font-extrabold text-slate-800 mb-1 relative z-10">85<span className="text-lg font-bold text-slate-400">/100</span></div>
            <p className="text-sm text-slate-500 font-medium relative z-10">Excellent match for React Dev</p>
          </motion.div>
        </motion.div>

        {/* Card 2: Learning Progress */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="absolute bottom-[20%] left-[8%] xl:left-[12%] z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-72 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] rounded-3xl p-5 cursor-default relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Learning Progress
              </h4>
              <span className="text-blue-600 text-[10px] font-extrabold bg-blue-50 border border-blue-100 px-2 py-1 rounded-md">+42%</span>
            </div>
            <div className="h-20 w-full mt-2 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyChartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Card 3: Skill Gap */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="absolute top-[20%] right-[5%] xl:right-[10%] z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-64 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] rounded-3xl p-6 cursor-default relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            <div className="mb-5 relative z-10">
              <h4 className="font-extrabold text-slate-800 flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-500" />
                Skill Gap Analysis
              </h4>
              <p className="text-xs font-medium text-slate-500">Missing requirements</p>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Docker</span>
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-md uppercase tracking-wide">High Priority</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">TypeScript</span>
                <span className="text-[10px] font-extrabold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-md uppercase tracking-wide">Medium</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Card 4: Roadmap Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="absolute bottom-[15%] right-[8%] xl:right-[12%] z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-72 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] rounded-3xl p-6 cursor-default relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Roadmap Timeline</h4>
                <p className="text-xs font-medium text-slate-500 mt-0.5">React Mastery Path</p>
              </div>
            </div>
            <div className="relative z-10 ml-2 border-l-2 border-blue-100 pl-5 space-y-4">
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                <p className="text-xs font-bold text-slate-700">Week 1: Foundations</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-indigo-400 border-4 border-white shadow-sm"></div>
                <p className="text-xs font-bold text-slate-700">Week 2: Advanced Hooks</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
                <p className="text-xs font-bold text-slate-500">Week 3: State Management</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Central Hero Content */}
        <div className="max-w-4xl mx-auto text-center z-30 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-100 text-blue-600 text-xs font-extrabold mx-auto shadow-sm shadow-blue-500/5 uppercase tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            SkillForge Intelligence Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm"
          >
            Build Your Career <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 bg-blue-100 blur-3xl opacity-50 rounded-full"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 filter drop-shadow-lg">
                Roadmap with AI
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Generate personalized learning roadmaps, analyze skill gaps, and accelerate your learning journey using AI-powered recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/roadmap')}
              className="relative w-full sm:w-auto group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 border border-white/10">
                <Map className="w-5 h-5" />
                Generate Roadmap
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/resume')}
              className="relative w-full sm:w-auto group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-blue-100 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-8 py-4 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-700 rounded-full font-bold shadow-lg shadow-slate-200/50 flex items-center justify-center gap-3 hover:text-blue-600 transition-colors">
                <FileText className="w-5 h-5" />
                Resume Analyzer
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
