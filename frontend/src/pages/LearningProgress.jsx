import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, BookOpen, Flame, TrendingUp } from 'lucide-react';

const progressData = [
  { week: 'Week 1', score: 20 },
  { week: 'Week 2', score: 45 },
  { week: 'Week 3', score: 60 },
  { week: 'Week 4', score: 85 },
];

const LearningProgress = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Learning Progress</h1>
        <p className="text-slate-500 text-sm mt-1">Track your growth and celebrate your milestones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Modules Completed', value: '14', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Learning Streak', value: '12 Days', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
          { title: 'Skill Points', value: '2,450', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Certificates', value: '2', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Growth Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Achievements</h3>
          <div className="space-y-6">
            {[
              { title: 'React Master', desc: 'Completed Advanced React module', time: '2 days ago' },
              { title: '7-Day Streak', desc: 'Learned for 7 consecutive days', time: '5 days ago' },
              { title: 'First Project', desc: 'Deployed your first web app', time: '1 week ago' },
            ].map((achievement, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm z-10 relative">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  {idx !== 2 && <div className="absolute top-10 left-1/2 -ml-px w-0.5 h-10 bg-slate-200"></div>}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{achievement.title}</h4>
                  <p className="text-sm text-slate-600 mt-0.5">{achievement.desc}</p>
                  <p className="text-xs text-slate-400 mt-1">{achievement.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningProgress;
