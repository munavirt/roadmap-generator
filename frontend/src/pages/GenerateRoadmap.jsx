import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Sparkles,
  BookOpen,
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';


const GenerateRoadmap = () => {

  // FORM STATES
  const [goal, setGoal] = useState('');

  const [skills, setSkills] = useState('');

  const [level, setLevel] = useState('Beginner');

  const [duration, setDuration] = useState('1 Month');

  // ROADMAP DATA
  const [roadmap, setRoadmap] = useState([]);

  // UI STATES
  const [isGenerating, setIsGenerating] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const [step, setStep] = useState(0);


  const steps = [
    'Understanding your career goal...',
    'Matching industry skills...',
    'Detecting skill gaps...',
    'Building personalized roadmap...',
    'Preparing recommendations...'
  ];


  // API CALL
  const handleGenerate = async (e) => {

    e.preventDefault();

    setIsGenerating(true);

    setShowResult(false);

    let currentStep = 0;

    const interval = setInterval(() => {

      currentStep++;

      if (currentStep < steps.length) {

        setStep(currentStep);

      }

    }, 800);

    try {

      const response = await fetch(

        'http://127.0.0.1:8000/api/roadmap/generate/',

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            goal: goal,

            skills: skills
              .split(',')
              .map(skill => skill.trim()),

            level: level,

            duration: duration
          })
        }
      );

      const data = await response.json();

      console.log(data);

      let parsedRoadmap = [];

      // AI RESPONSE
      if (data.source === 'AI') {

        try {

          const cleaned = data.roadmap
            .replace(/```json/g, '')
            .replace(/```/g, '');

          const parsed = JSON.parse(cleaned);

          parsedRoadmap = parsed.weeks || [];

        } catch (error) {

          console.error(
            'JSON Parse Error:',
            error
          );
        }
      }

      // FALLBACK RESPONSE
      else {

        parsedRoadmap = data.roadmap;
      }

      clearInterval(interval);

      setRoadmap(parsedRoadmap);

      setIsGenerating(false);

      setShowResult(true);

      setStep(0);

    } catch (error) {

      clearInterval(interval);

      console.error(error);

      setIsGenerating(false);

      alert(
        'Failed to generate roadmap'
      );
    }
  };


  return (

    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Generate Learning Roadmap
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Let AI build a custom path for your career goals.
        </p>

      </div>


      {/* FORM */}
      {!showResult && !isGenerating && (

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm"
        >

          <form
            onSubmit={handleGenerate}
            className="space-y-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* GOAL */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  Career Goal
                </label>

                <input

                  type="text"

                  value={goal}

                  onChange={(e) =>
                    setGoal(e.target.value)
                  }

                  placeholder="e.g. Frontend Developer"

                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"

                  required
                />

              </div>


              {/* SKILLS */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  Current Skills
                </label>

                <input

                  type="text"

                  value={skills}

                  onChange={(e) =>
                    setSkills(e.target.value)
                  }

                  placeholder="e.g. HTML, CSS, JavaScript"

                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />

              </div>


              {/* LEVEL */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  Experience Level
                </label>

                <select

                  value={level}

                  onChange={(e) =>
                    setLevel(e.target.value)
                  }

                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-700"
                >

                  <option>Beginner</option>

                  <option>Intermediate</option>

                  <option>Advanced</option>

                </select>

              </div>


              {/* DURATION */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  Target Duration
                </label>

                <select

                  value={duration}

                  onChange={(e) =>
                    setDuration(e.target.value)
                  }

                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-700"
                >

                  <option>1 Month</option>

                  <option>3 Months</option>

                  <option>6 Months</option>

                </select>

              </div>

            </div>


            {/* BUTTON */}
            <button

              type="submit"

              className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-primary-500/25 transition-all flex items-center justify-center gap-2 group"
            >

              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />

              Generate My Roadmap

            </button>

          </form>

        </motion.div>
      )}


      {/* LOADING */}
      {isGenerating && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="flex flex-col items-center justify-center py-20"
        >

          <div className="relative w-24 h-24 mb-8">

            <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>

            <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center text-primary-600">

              <Sparkles className="w-8 h-8 animate-pulse" />

            </div>

          </div>


          <div className="h-8">

            <AnimatePresence mode="wait">

              <motion.p

                key={step}

                initial={{ opacity: 0, y: 10 }}

                animate={{ opacity: 1, y: 0 }}

                exit={{ opacity: 0, y: -10 }}

                className="text-lg font-medium text-slate-700"
              >

                {steps[step]}

              </motion.p>

            </AnimatePresence>

          </div>

        </motion.div>
      )}


      {/* RESULT */}
      {showResult && (

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          className="space-y-6"
        >

          <div className="flex justify-end">

            <button

              onClick={() =>
                setShowResult(false)
              }

              className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >

              Start Over

            </button>

          </div>


          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-8">

            {roadmap.map((item, idx) => (

              <div
                key={idx}
                className="relative pl-8 md:pl-12"
              >

                <div className="absolute -left-[11px] top-2 w-5 h-5 bg-white border-4 border-primary-500 rounded-full" />


                <motion.div

                  initial={{ opacity: 0, x: -20 }}

                  animate={{ opacity: 1, x: 0 }}

                  transition={{ delay: idx * 0.1 }}

                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                    <div>

                      <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase">

                        Week {item.week}

                      </span>

                      <h3 className="text-xl font-bold text-slate-900 mt-1">

                        {item.title}

                      </h3>

                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-50 px-3 py-1.5 rounded-lg w-fit">

                      <Clock className="w-4 h-4" />

                      {item.time || 'Flexible'}

                    </div>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* TOPICS */}
                    <div>

                      <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-2">

                        <BookOpen className="w-4 h-4 text-primary-500" />

                        Topics to Learn

                      </h4>

                      <ul className="space-y-2">

                        {item.topics?.map((t, i) => (

                          <li
                            key={i}
                            className="flex items-start gap-2 text-slate-600 text-sm"
                          >

                            <CheckCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />

                            {t}

                          </li>
                        ))}

                      </ul>

                    </div>


                    {/* TOOLS + PROJECT */}
                    <div>

                      <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-2">

                        <Wrench className="w-4 h-4 text-indigo-500" />

                        Recommended Tools

                      </h4>

                      <div className="flex flex-wrap gap-2">

                        {item.tools?.map((tool, i) => (

                          <span

                            key={i}

                            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                          >

                            {tool}

                          </span>
                        ))}

                      </div>


                      <div className="pt-4">

                        <h4 className="font-semibold text-slate-900 text-sm mb-1">

                          Mini Project

                        </h4>

                        <p className="text-sm text-slate-600">

                          {item.project}

                        </p>

                      </div>

                    </div>

                  </div>

                </motion.div>

              </div>
            ))}

          </div>

        </motion.div>
      )}

    </div>
  );
};

export default GenerateRoadmap;