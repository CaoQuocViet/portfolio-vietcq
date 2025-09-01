"use client";

import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';

export default function SamplePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex items-center justify-center min-h-screen p-8">
        {/* Main Card */}
        <div className="relative w-96 h-96 bg-slate-800 rounded-lg shadow-2xl border border-blue-200/20 overflow-hidden">
          {/* Top Scroll Bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-blue-950 border-b border-blue-700/50 flex items-center justify-center z-10">
            <div className="w-24 h-3 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-inner border border-blue-200/30"></div>
            <div className="absolute left-3 right-3 top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-600/40 rounded-full"></div>
          </div>

          {/* Bottom Scroll Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-950 border-t border-blue-700/50 flex items-center justify-center z-10">
            <div className="w-24 h-3 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full shadow-inner border border-blue-200/30"></div>
            <div className="absolute left-3 right-3 top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-600/40 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative h-full pt-8 pb-8 overflow-hidden">
            <div className="animate-scroll-up px-6 py-4 space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-white mb-4">Passionate about creating digital solutions</h1>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>I'm a dedicated full-stack developer with a passion for creating innovative web applications. With expertise in modern technologies and a keen eye for design, I transform ideas into reality.</p>
                  <p>My journey in tech started with curiosity and has evolved into a career focused on building scalable, user-friendly applications that make a difference.</p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-400">3+ Years</div>
                  <div className="text-sm text-gray-300">Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">15+</div>
                  <div className="text-sm text-gray-300">Technologies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">25+</div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technical Skills</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong className="text-blue-400">Frontend:</strong> HTML5, CSS3, JavaScript ES6+</p>
                  <p><strong className="text-blue-400">Frameworks:</strong> React, Vue.js, Angular</p>
                  <p><strong className="text-blue-400">Styling:</strong> Tailwind, Bootstrap, SASS</p>
                  <p><strong className="text-blue-400">State Management:</strong> Redux, Zustand, Context API</p>
                </div>
              </div>

              {/* Recent Projects */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Recent Projects</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong className="text-blue-400">E-commerce Platform:</strong> React + Node.js + MongoDB</p>
                  <p><strong className="text-blue-400">Task Management App:</strong> Next.js + Prisma + PostgreSQL</p>
                  <p><strong className="text-blue-400">Portfolio Website:</strong> React + Three.js + Framer Motion</p>
                  <p><strong className="text-blue-400">API Service:</strong> Python + FastAPI + Redis</p>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white mb-4">Passionate about creating digital solutions</h1>
                <p className="text-sm text-gray-400">Scroll to see more information...</p>
              </div>
            </div>
          </div>

          {/* Texture Lines Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-lines animate-scroll-up"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-lines {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(96, 165, 250, 0.1) 0px,
            rgba(96, 165, 250, 0.1) 1px,
            transparent 1px,
            transparent 20px
          );
          background-size: 100% 20px;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scroll-up {
          animation: scroll-up 25s linear infinite;
        }

        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}