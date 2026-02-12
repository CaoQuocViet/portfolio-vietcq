"use client";

import { FaSun, FaMoon } from "react-icons/fa6";
import { DEFAULT_NAVIGATION_ITEMS } from "../../config/navigation";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import SystemIcons from "./SystemIcons";

const NavigationItem = ({
  item, activeSection, theme, scrollToSection,
  scale, onLogoClick, logoRef, isMobile
}) => {
  const IconComponent = item.icon;
  const isActive = activeSection === item.id;
  const isHovered = scale > 1.05;
  const iconSize = isMobile ? 16 : Math.round(20 * scale);

  if (item.isLogo) {
    return (
      <button
        ref={logoRef}
        onClick={onLogoClick}
        className={`relative group flex items-center justify-center w-10 h-10 sm:w-auto sm:h-12 sm:px-4 rounded-xl sm:rounded-2xl cursor-pointer bg-blue-600/20 hover:bg-blue-600/30 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 ${
          activeSection === "hero" ? "shadow-lg" : ""
        }`}
        style={{ transform: `scale(${scale})`, transition: "transform 150ms ease-out" }}
        title="Open Vietcq Modal"
      >
        <span
          className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-600 dark:via-purple-600 dark:to-blue-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {isMobile ? "V" : "Vietcq"}
        </span>
        {!isMobile && (
          <span
            className="inline-block ml-1 text-sm sm:text-base text-purple-600 dark:text-purple-400"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            .
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => (item.link ? (window.location.href = item.link) : scrollToSection(item.id))}
      className={`relative group flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl cursor-pointer ${item.bg} ${
        isActive ? "shadow-lg" : "shadow-lg active:scale-95"
      }`}
      style={{ transform: `scale(${scale})`, transition: "transform 150ms ease-out" }}
      title={item.label}
    >
      <IconComponent
        size={iconSize}
        className={`transition-colors duration-200 ${isHovered ? "text-gray-800 dark:text-gray-200" : item.color}`}
      />
      <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-white scale-100" : "bg-transparent scale-0"}`} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block">
        {item.label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </button>
  );
};

const ThemeToggle = ({ theme, setTheme, scale, isMobile }) => {
  const isHovered = scale > 1.05;
  const iconSize = isMobile ? 16 : Math.round(18 * scale);
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl cursor-pointer ${
        theme === "dark"
          ? "bg-yellow-600/20 hover:bg-yellow-600/30"
          : "bg-slate-600/20 hover:bg-slate-600/30"
      } active:scale-95`}
      style={{ transform: `scale(${scale})`, transition: "transform 150ms ease-out" }}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {isHovered ? (
        theme === "dark" ? (
          <FaMoon size={iconSize} className="text-slate-600 transition-colors duration-200" />
        ) : (
          <FaSun size={iconSize} className="text-yellow-600 transition-colors duration-200" />
        )
      ) : (
        theme === "dark" ? (
          <FaSun size={iconSize} className="text-yellow-600 transition-colors duration-200" />
        ) : (
          <FaMoon size={iconSize} className="text-slate-600 transition-colors duration-200" />
        )
      )}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block">
        {theme === "dark" ? "Light mode" : "Dark mode"}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </button>
  );
};

// Calculate magnification scale based on distance from mouse cursor.
// Items closer to the mouse scale up more (macOS dock behavior).
const MAX_SCALE = 1.2;
const MAGNIFY_RANGE = 80; // px — how far the magnification effect reaches

function getScale(distance, isOnDock) {
  if (!isOnDock || distance > MAGNIFY_RANGE) return 1;
  // Cosine falloff for smooth magnification
  return 1 + (MAX_SCALE - 1) * Math.cos((distance / MAGNIFY_RANGE) * (Math.PI / 2));
}

const Dock = ({ theme, setTheme, activeSection, scrollToSection, navigationItems = DEFAULT_NAVIGATION_ITEMS }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dockRect, setDockRect] = useState(null);
  const [logoRect, setLogoRect] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [isOnDock, setIsOnDock] = useState(false);

  const logoBtnRef = useRef(null);
  const dockRef = useRef(null);
  const itemRefs = useRef({});

  const handleLogoClick = () => setIsModalOpen((prev) => !prev);

  const dockBgClass = "bg-black/15 dark:bg-white/15 backdrop-blur-2xl shadow-2xl shadow-black/20 dark:shadow-white/10";

  // Mouse tracking on dock — the key to jitter-free magnification
  const handleDockMouseMove = (e) => {
    setMouseX(e.clientX);
    setIsOnDock(true);
  };
  const handleDockMouseLeave = () => {
    setIsOnDock(false);
    setMouseX(null);
  };

  // Get scale for an item based on mouse distance
  const getItemScale = (id) => {
    if (isMobile || !isOnDock || mouseX === null) return 1;
    const el = itemRefs.current[id];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    return getScale(Math.abs(mouseX - itemCenter), isOnDock);
  };

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const update = () => {
      if (dockRef.current) setDockRect(dockRef.current.getBoundingClientRect());
      if (logoBtnRef.current) setLogoRect(logoBtnRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const update = () => {
      if (dockRef.current) setDockRect(dockRef.current.getBoundingClientRect());
      if (logoBtnRef.current) setLogoRect(logoBtnRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isModalOpen]);

  // Build all interactive items: nav items + theme toggle
  const allItems = [...navigationItems, { id: "theme", isTheme: true }];

  return (
    <>
      <nav
        ref={dockRef}
        onMouseMove={handleDockMouseMove}
        onMouseLeave={handleDockMouseLeave}
        className={`fixed z-50 shadow-2xl ${dockBgClass}
          bottom-6 right-6 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto
          rounded-2xl
          flex flex-col sm:flex-row items-center justify-center
          ${isMobile ? 'scale-75' : 'scale-100'}
        `}
        style={{
          padding: isMobile ? '20px 12px' : isOnDock ? '16px 24px' : '12px 20px',
          transition: 'padding 200ms ease-out',
        }}
      >
        <div className="flex flex-col sm:flex-row items-end justify-center">
          {navigationItems.map((item, index) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center">
              <div
                ref={(el) => { itemRefs.current[item.id] = el; }}
                className="flex flex-col sm:flex-row items-center sm:mx-2.5 my-1.5 sm:my-0"
              >
                <NavigationItem
                  item={item}
                  activeSection={activeSection}
                  theme={theme}
                  scrollToSection={scrollToSection}
                  scale={getItemScale(item.id)}
                  onLogoClick={item.isLogo ? handleLogoClick : undefined}
                  logoRef={item.isLogo ? logoBtnRef : undefined}
                  isMobile={isMobile}
                />
              </div>
              {item.isLogo && (
                <div className="sm:mx-3 my-2 sm:my-0 bg-gray-300/50 dark:bg-gray-600/50 w-6 h-0.5 sm:w-0.5 sm:h-6" />
              )}
            </div>
          ))}

          {/* Separator before theme toggle */}
          <div className="sm:mx-3 my-2 sm:my-0 bg-gray-300/50 dark:bg-gray-600/50 w-6 h-0.5 sm:w-0.5 sm:h-6" />

          <div
            ref={(el) => { itemRefs.current["theme"] = el; }}
            className="sm:mx-2.5 my-1.5 sm:my-0"
          >
            <ThemeToggle
              theme={theme}
              setTheme={setTheme}
              scale={getItemScale("theme")}
              isMobile={isMobile}
            />
          </div>

          {/* System Icons - desktop only */}
          {!isMobile && (
            <>
              <div className="sm:mx-3 my-2 sm:my-0 bg-gray-300/50 dark:bg-gray-600/50 w-6 h-0.5 sm:w-0.5 sm:h-6" />
              <div className="sm:mx-2.5 my-1.5 sm:my-0">
                <SystemIcons />
              </div>
            </>
          )}
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} theme={theme} dockRect={dockRect} logoRect={logoRect} />
    </>
  );
};

export default Dock;
