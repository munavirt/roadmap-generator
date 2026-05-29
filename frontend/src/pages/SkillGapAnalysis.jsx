import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';

const skillData = [
  { subject: 'React', A: 45, fullMark: 100 },
  { subject: 'Node.js', A: 20, fullMark: 100 },
  { subject: 'TypeScript', A: 60, fullMark: 100 },
  { subject: 'Python', A: 80, fullMark: 100 },
  { subject: 'Docker', A: 10, fullMark: 100 },
  { subject: 'SQL', A: 50, fullMark: 100 },
];

const matchData = [
  { name: 'Python', user: 80, required: 70 },
  { name: 'React', user: 45, required: 80 },
  { name: 'Docker', user: 10, required: 60 },
  { name: 'TypeScript', user: 60, required: 75 },
];

const SkillGapAnalysis = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Skill Gap Analysis</h1>
        <p className="text-slate-500 text-sm mt-1">Visualize your current competencies against industry requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Skill Profile</h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">68% Match</span>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Required vs Current</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="required" name="Required" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="user" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Actionable Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Critical Gaps
          </h3>
          <div className="space-y-4">
            {[
              { skill: 'Docker', gap: '50%', priority: 'High' },
              { skill: 'React', gap: '35%', priority: 'High' },
              { skill: 'TypeScript', gap: '15%', priority: 'Medium' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="font-medium text-slate-900">{item.skill}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.gap} below requirement</p>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                  item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Strong Areas
          </h3>
          <div className="space-y-4">
            {[
              { skill: 'Python', level: 'Advanced', over: '+10%' },
              { skill: 'SQL', level: 'Intermediate', over: 'Met' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <h4 className="font-medium text-slate-900">{item.skill}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.level}</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-50 text-green-600">
                  {item.over}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
