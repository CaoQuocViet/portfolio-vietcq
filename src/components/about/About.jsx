import PCModel from "./PCModel";

export default function About({ theme }) {
  return (
    <>
      <style jsx>{`
        /* Scroll text mượt vô tận */
        @keyframes scrollTextInfinite {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        /* Scroll line nền đồng bộ */
        @keyframes scrollLinesInfinite {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 0 -200px, 0 -200px;
          }
        }

        .scrolling-text {
          animation: scrollTextInfinite 12s linear infinite;
        }

        .lined-background {
          position: relative;
          background-image: 
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.08) 0px,
              rgba(255, 255, 255, 0.08) 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.15) 0px,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px,
              transparent 100px
            );
          background-size: 100% 20px, 100% 100px;
          animation: scrollLinesInfinite 2.85s linear infinite;
        }

        /* Hover: pause cả text và line */
        .group:hover .scrolling-text,
        .group:hover .lined-background {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="about"
        className={`relative py-24 min-h-screen ${
          theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                theme === "dark"
                  ? "text-white drop-shadow-lg"
                  : "text-gray-900 drop-shadow-lg"
              }`}
            >
              About Me
            </h2>
            <div
              className={`w-24 h-1 mx-auto rounded-full ${
                theme === "dark" ? "bg-blue-400" : "bg-blue-600"
              }`}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Scrolling Card */}
            <div className="relative max-w-xl h-160 bg-slate-800 rounded-lg shadow-2xl border border-blue-200/20 overflow-hidden group">
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

              {/* Scrollable Content */}
              <div className="relative pt-8 pb-8 overflow-hidden lined-background">
                <div className="scrolling-text">
                  {/* Nội dung nhân đôi để scroll vô tận */}
                  <ContentBlock />
                  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                  <ContentBlock />
                </div>
              </div>
            </div>

            {/* 3D Model */}
            <div className="relative h-full flex items-center justify-center">
              <PCModel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Tách phần nội dung ra để reuse */
function ContentBlock() {
  return (
    <>
      <div className="px-8 py-4 text-left relative z-10">
        <h1 className="text-2xl font-bold text-white mb-4">
          Passionate about creating digital solutions
        </h1>
        <div className="space-y-3 text-sm text-gray-300 mb-6">
          <p>
            I'm a dedicated full-stack developer with a passion for
            creating innovative web applications. With expertise in
            modern technologies and a keen eye for design, I
            transform ideas into reality.
          </p>
          <p>
            My journey in tech started with curiosity and has evolved
            into a career focused on building scalable, user-friendly
            applications that make a difference.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 py-4 grid grid-cols-2 gap-6">
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

      {/* Skills */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          Technical Skills
        </h3>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Frontend:</strong> HTML5,
          CSS3, JavaScript ES6+
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Frameworks:</strong> React, Vue.js, Angular
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Styling:</strong> Tailwind, Bootstrap, SASS
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">State Management:</strong> Redux, Zustand, Context API
        </p>
      </div>

      {/* Projects */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold text-white mb-3">
          Recent Projects
        </h3>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">E-commerce Platform:</strong> React + Node.js + MongoDB
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Task Management App:</strong> Next.js + Prisma + PostgreSQL
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Portfolio Website:</strong> React + Three.js + Framer Motion
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">API Service:</strong> Python + FastAPI + Redis
        </p>
      </div>
    </>
  );
}
