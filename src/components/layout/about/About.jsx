import PCModel from "./PCModel";
import { info } from "../../../utils/info";

const About = ({ theme }) => {
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
              ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 130, 246, 0.15)'} 0px,
              ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 130, 246, 0.15)'} 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              to bottom,
              ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.25)'} 0px,
              ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.25)'} 1px,
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
          theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
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
            <div className={`relative max-w-xl h-160 rounded-lg shadow-2xl border overflow-hidden group ${
              theme === 'dark' 
                ? 'bg-slate-800 border-blue-200/20' 
                : 'bg-white border-blue-300/40'
            }`}>
              {/* Top Scroll Bar */}
              <div className={`absolute top-0 left-0 right-0 h-8 border-b flex items-center justify-center z-10 ${
                theme === 'dark' 
                  ? 'bg-blue-950 border-blue-700/50' 
                  : 'bg-blue-100 border-blue-300/50'
              }`}>
                <div className={`w-24 h-3 rounded-full shadow-inner border ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-300 border-blue-200/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-400 border-blue-300/50'
                }`}></div>
                <div className={`absolute left-3 right-3 top-1/2 transform -translate-y-1/2 h-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-blue-600/40' : 'bg-blue-500/60'
                }`}></div>
              </div>

              {/* Bottom Scroll Bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-8 border-t flex items-center justify-center z-10 ${
                theme === 'dark' 
                  ? 'bg-blue-950 border-blue-700/50' 
                  : 'bg-blue-100 border-blue-300/50'
              }`}>
                <div className={`w-24 h-3 rounded-full shadow-inner border ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-300 border-blue-200/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-400 border-blue-300/50'
                }`}></div>
                <div className={`absolute left-3 right-3 top-1/2 transform -translate-y-1/2 h-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-blue-600/40' : 'bg-blue-500/60'
                }`}></div>
              </div>

              {/* Scrollable Content */}
              <div className="relative pt-8 pb-8 overflow-hidden lined-background">
                                 <div className="scrolling-text">
                   {/* Nội dung nhân đôi để scroll vô tận */}
                   <ContentBlock theme={theme} />
                   <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                   <ContentBlock theme={theme} />
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
function ContentBlock({ theme }) {
  return (
    <>
      <div className="px-8 py-4 text-left relative z-10">
        <h1 className={`text-2xl font-bold mb-4 text-center ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Hi 👋, I'm Viet
        </h1>
        <h3 className={`text-lg font-semibold mb-4 text-center ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          Fullstack developer from Vietnam
        </h3>
        
        <div className={`space-y-3 text-sm mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p>
            🔭 I'm currently working on <strong className="text-blue-500">giveback</strong>, <strong className="text-blue-500">ByteBridge</strong>, <strong className="text-blue-500">abap-rap-flight-booking</strong> and <strong className="text-blue-500">StormPC</strong>
          </p>
          <p>
            🚀 I'm passionate about entrepreneurship in IT applications, commerce, and open to collaborating on innovative startup projects
          </p>
          <p>
            📫 How to reach me: <strong className="text-blue-500">vietcao10@gmail.com</strong>
          </p>
          <p>
            ⚡ Fun fact: <strong className="text-blue-500">I think i am funny. I am the kind of person who embraces learning and tackling anything new with passion and determination. As long as it sparks my interest, I am fearless and unstoppable.</strong>
          </p>
        </div>
      </div>

      {/* Connect with me */}
      <div className="px-8 py-4">
        <h3 className={`text-lg font-semibold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Connect with me:
        </h3>
        <div className="flex gap-4 mb-4">
          <a href={info.social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">
            Facebook
          </a>
          <a href={info.social.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
            YouTube
          </a>
        </div>
      </div>

      {/* Languages and Tools */}
      <div className="px-8 py-4">
        <h3 className={`text-lg font-semibold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Languages and Tools:
        </h3>
        <div className={`text-sm space-y-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p><strong className="text-blue-500">Programming:</strong> C++, Python, JavaScript, ABAP</p>
          <p><strong className="text-blue-500">Web Development:</strong> React, Node.js, HTML/CSS</p>
          <p><strong className="text-blue-500">Database:</strong> PostgreSQL, MongoDB</p>
          <p><strong className="text-blue-500">DevOps:</strong> Docker, Git, Linux, Nginx</p>
          <p><strong className="text-blue-500">Game Development:</strong> Unity</p>
        </div>
      </div>

      {/* GitHub Stats */}
      <div className="px-8 py-4">
        <h3 className={`text-lg font-semibold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          GitHub Activity
        </h3>
        <div className={`text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p>Check out my GitHub profile for detailed stats and activity graphs!</p>
          <p className="mt-2">
            <a href={info.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">
              @{info.githubUsername}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
