import PCModel from "./PCModel";
import { info } from "../../../utils/info";
import { useTranslation } from "../../../hooks/useTranslation";

const About = ({ theme }) => {
  const { t } = useTranslation();
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
          animation: scrollTextInfinite 23.5s linear infinite;
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
        className="relative py-24 min-h-screen bg-[var(--bg-section-alt)]"
      >
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-heading)] drop-shadow-lg"
            >
              {t('about.sectionTitle')}
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full bg-[var(--btn-primary)]"
            />
          </div>

          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Scrolling Card */}
            <div className={`relative max-w-xl lg:max-w-none mx-auto h-96 sm:h-120 lg:h-160 rounded-lg shadow-2xl border overflow-hidden group bg-[var(--bg-card)] ${
              theme === 'dark'
                ? 'border-blue-200/20'
                : 'border-blue-300/40'
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
                   <ContentBlock theme={theme} t={t} />
                   <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                   <ContentBlock theme={theme} t={t} />
                 </div>
              </div>
            </div>

            {/* 3D Model - Responsive sizes */}
            <div className="relative flex items-center justify-center mt-8 lg:mt-0 h-96 sm:h-120 md:h-144 lg:h-full w-full">
              <PCModel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Tách phần nội dung ra để reuse */
function ContentBlock({ theme, t }) {
  return (
    <>
      <div className="px-8 py-4 text-left relative z-10">
        <h1 className="text-2xl font-bold mb-4 text-center text-[var(--text-heading)]">
          {t('about.greeting')} <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('about.name')}</span>
        </h1>
        <h3 className="text-lg font-semibold mb-6 text-center text-[var(--text-link)]">
          {t('about.role')}
        </h3>
        
        <div className="space-y-4 text-sm mb-6 text-[var(--text-secondary)]">
          {/* Location & Work */}
          <div className="bg-gradient-to-r from-blue-50/10 to-cyan-50/10 rounded-lg p-3 border border-blue-200/20">
            <p className="mb-2">
              📍 <strong className="text-blue-500">{t('about.location')}</strong> {t('about.locationValue')}
            </p>
            <p>
              💼 <strong className="text-blue-500">{t('about.workStyle')}</strong> {t('about.workStyleValue')}
            </p>
          </div>

          {/* Education */}
          <div className="bg-gradient-to-r from-purple-50/10 to-blue-50/10 rounded-lg p-3 border border-purple-200/20">
            <p className="mb-2">
              🎓 <strong className="text-purple-500">{t('about.currentStudy')}</strong> {t('about.currentStudyValue')}
            </p>
            <p>
              🚀 <strong className="text-purple-500">{t('about.codingJourney')}</strong> {t('about.codingJourneyValue')}
            </p>
          </div>

          {/* Passion & Skills */}
          <div className="bg-gradient-to-r from-green-50/10 to-blue-50/10 rounded-lg p-3 border border-green-200/20">
            <p className="mb-2">
              💻 <strong className="text-green-500">{t('about.techPassion')}</strong> {t('about.techPassionValue')}
            </p>
            <p>
              🔧 <strong className="text-green-500">{t('about.mainFocus')}</strong> {t('about.mainFocusValue')}
            </p>
          </div>

          {/* Personality & Goals */}
          <div className="bg-gradient-to-r from-orange-50/10 to-red-50/10 rounded-lg p-3 border border-orange-200/20">
            <p className="mb-2">
              🚀 <strong className="text-orange-500">{t('about.seriousAbout')}</strong> {t('about.seriousAboutValue')}
            </p>
            <p className="mb-2">
              ✨ <strong className="text-orange-500">{t('about.personality')}</strong> {t('about.personalityValue')}
            </p>
            <p>
              💡 <strong className="text-orange-500">{t('about.alwaysSeeking')}</strong> {t('about.alwaysSeekingValue')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold mb-4 text-[var(--text-heading)]">
          📞 {t('about.contactInfo')}
        </h3>
        <div className="space-y-3 text-sm mb-6 text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <strong className="text-blue-500">{t('about.phone')}</strong>
            <a href="tel:+84367252854" className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors">
              +84 367 252 854
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>✉️</span>
            <strong className="text-blue-500">{t('about.email')}</strong>
            <a href="mailto:vietcao10@gmail.com" className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors">
              vietcao10@gmail.com
            </a>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3 text-[var(--text-heading)]">
          🌐 {t('about.connectWithMe')}
        </h3>
        {/* Social Links sẽ được render từ SocialList component */}
        <div className="text-sm">
          <p className="text-[var(--text-muted)]">
            {t('about.socialLinks')}
            <span className="text-[var(--text-link)]"> {t('about.socialLinksAction')}</span>
          </p>
        </div>
      </div>

      {/* Current Projects */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold mb-3 text-[var(--text-heading)]">
          🔭 {t('about.currentProjects')}
        </h3>
        <div className="text-sm space-y-2 text-[var(--text-secondary)]">
          <p><span className="text-blue-500 font-semibold">• Giveback:</span> Social impact platform</p>
          <p><span className="text-purple-500 font-semibold">• ByteBridge:</span> Development tools</p>
          <p><span className="text-green-500 font-semibold">• ABAP RAP Flight:</span> Enterprise booking system</p>
          <p><span className="text-orange-500 font-semibold">• StormPC:</span> Hardware/software solution</p>
        </div>
      </div>

      {/* Languages and Tools */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold mb-3 text-[var(--text-heading)]">
          🛠️ {t('about.languagesTools')}
        </h3>
        <div className="text-sm space-y-2 text-[var(--text-secondary)]">
          <p><strong className="text-blue-500">{t('about.programming')}</strong> {t('about.programmingValue')}</p>
          <p><strong className="text-cyan-500">{t('about.webDevelopment')}</strong> {t('about.webDevelopmentValue')}</p>
          <p><strong className="text-green-500">{t('about.database')}</strong> {t('about.databaseValue')}</p>
          <p><strong className="text-purple-500">{t('about.devops')}</strong> {t('about.devopsValue')}</p>
          <p><strong className="text-orange-500">{t('about.gameDevelopment')}</strong> {t('about.gameDevelopmentValue')}</p>
        </div>
      </div>

      {/* GitHub Stats */}
      <div className="px-8 py-4">
        <h3 className="text-lg font-semibold mb-3 text-[var(--text-heading)]">
          📊 {t('about.githubActivity')}
        </h3>
        <div className="text-sm text-[var(--text-secondary)]">
          <p>{t('about.githubActivityText')}</p>
          <p className="mt-2">
            <a href={info.social.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-link)] hover:text-[var(--text-link-hover)] transition-colors font-semibold">
              🔗 @{info.githubUsername}
            </a>
          </p>
        </div>
      </div>

      {/* Fun Fact */}
      <div className="px-8 py-4">
        <div className="bg-gradient-to-r from-yellow-50/10 to-orange-50/10 rounded-lg p-4 border border-yellow-200/20">
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-warning)]">
            ⚡ {t('about.funFact')}
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            {t('about.funFactText')}
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
