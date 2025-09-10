"use client";

import { FaSun, FaMoon } from "react-icons/fa6";
import { DEFAULT_NAVIGATION_ITEMS } from "../../config/navigation";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

const NavigationItem = ({
  item, activeSection, theme, scrollToSection,
  isHovered, onHover, onLeave, onLogoClick, logoRef, isMobile
}) => {
  const IconComponent = item.icon;
  const isActive = activeSection === item.id;
  const isLogo = item.isLogo;

  if (isLogo) {
    return (
      <button
        ref={logoRef}
        onClick={onLogoClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={`relative group flex items-center justify-center w-10 h-10 sm:w-auto sm:h-12 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-500 ease-out transform cursor-pointer ${
          isHovered ? "scale-125" : "hover:scale-110"
        } ${
          activeSection === "hero"
            ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 shadow-lg"
            : "hover:bg-gray-100/30 dark:hover:bg-gray-800/30"
        }`}
        title="Open Vietcq Modal"
      >
        <span
          className={`text-base sm:text-lg font-bold transition-all duration-500 bg-gradient-to-r ${
            theme === "dark"
              ? "from-blue-400 via-purple-400 to-blue-400"
              : "from-blue-600 via-purple-600 to-blue-600"
          } bg-clip-text text-transparent`}
          style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {isMobile ? "V" : "Vietcq"}
        </span>
        {!isMobile && (
          <span
            className={`inline-block ml-1 text-sm sm:text-base transition-all duration-500 ${
              theme === "dark" ? "text-purple-400" : "text-purple-600"
            }`}
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
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-500 ease-out transform cursor-pointer ${
        isHovered
          ? "scale-125"
          : isActive
          ? `scale-110 ${item.bg} shadow-lg`
          : `${item.bg} hover:scale-110 active:scale-95 shadow-lg`
      }`}
      title={item.label}
    >
      <IconComponent 
        size={isHovered ? (isMobile ? 18 : 24) : (isMobile ? 16 : 20)} 
        className={`transition-all duration-500 ease-out ${
          isHovered 
            ? (theme === 'dark' ? 'text-gray-200' : 'text-gray-800') 
            : item.color
        }`} 
      />
      <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? "bg-white scale-100" : "bg-transparent scale-0"}`} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block">
        {item.label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </button>
  );
};

const ThemeToggle = ({ theme, setTheme, isHovered, onHover, onLeave, isMobile }) => (
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={`relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-500 ease-out transform cursor-pointer ${
      isHovered ? "scale-125" : "hover:scale-110"
    } ${
      theme === "dark"
        ? "bg-yellow-600/20 hover:bg-yellow-600/30"
        : "bg-slate-600/20 hover:bg-slate-600/30"
    } active:scale-95`}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    {/* Show opposite icon on hover to indicate what will happen on click */}
    {isHovered ? (
      theme === "dark" ? (
        <FaMoon size={isMobile ? 18 : 22} className="text-slate-600 transition-all duration-500 ease-out" />
      ) : (
        <FaSun size={isMobile ? 18 : 22} className="text-yellow-600 transition-all duration-500 ease-out" />
      )
    ) : (
      theme === "dark" ? (
        <FaSun size={isMobile ? 16 : 18} className="text-yellow-600 transition-all duration-500 ease-out" />
      ) : (
        <FaMoon size={isMobile ? 16 : 18} className="text-slate-600 transition-all duration-500 ease-out" />
      )
    )}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block">
      {theme === "dark" ? "Light mode" : "Dark mode"}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
    </div>
  </button>
);

const Dock = ({ theme, setTheme, activeSection, scrollToSection, navigationItems = DEFAULT_NAVIGATION_ITEMS }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dockRect, setDockRect] = useState(null);
  const [logoRect, setLogoRect] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const logoBtnRef = useRef(null);
  const dockRef = useRef(null);

  const handleItemHover = (id) => setHoveredItem(id);
  const handleItemLeave = () => setHoveredItem(null);
  const handleLogoClick = () => setIsModalOpen((prev) => !prev);

  // Sử dụng class từ global.css
  const dockBgClass = "glass-effect";

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // cập nhật dockRect để modal tính vị trí
  useEffect(() => {
    const updateDockRect = () => {
      if (dockRef.current) setDockRect(dockRef.current.getBoundingClientRect());
    };
    updateDockRect();
    window.addEventListener("resize", updateDockRect);
    return () => window.removeEventListener("resize", updateDockRect);
  }, []);

  // cập nhật logoRect để modal căn giữa theo logo
  useEffect(() => {
    const updateLogoRect = () => {
      if (logoBtnRef.current) setLogoRect(logoBtnRef.current.getBoundingClientRect());
    };
    updateLogoRect();
    window.addEventListener("resize", updateLogoRect);
    return () => window.removeEventListener("resize", updateLogoRect);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const updateDockRect = () => {
      if (dockRef.current) setDockRect(dockRef.current.getBoundingClientRect());
    };
    const updateLogoRect = () => {
      if (logoBtnRef.current) setLogoRect(logoBtnRef.current.getBoundingClientRect());
    };
    updateDockRect();
    updateLogoRect();
    window.addEventListener("resize", updateDockRect);
    window.addEventListener("resize", updateLogoRect);
    return () => {
      window.removeEventListener("resize", updateDockRect);
      window.removeEventListener("resize", updateLogoRect);
    };
  }, [isModalOpen]);

  return (
    <>
      <nav
        ref={dockRef}
        className={`fixed z-50 transition-all duration-300 shadow-2xl ${dockBgClass}
          bottom-6 right-6 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto
          rounded-2xl sm:px-5 sm:py-3 px-3 py-5
          flex flex-col sm:flex-row items-center justify-center
        `}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {navigationItems.map((item, index) => (
            <div key={item.id} className={`flex flex-col sm:flex-row items-center transition-all duration-300 ease-out ${
              hoveredItem === item.id 
                ? "sm:mx-4 my-2 sm:my-0" 
                : "sm:mx-2.5 my-1.5 sm:my-0"
            }`}>
              <NavigationItem
                item={item}
                activeSection={activeSection}
                theme={theme}
                scrollToSection={scrollToSection}
                isHovered={hoveredItem === item.id}
                onHover={() => handleItemHover(item.id)}
                onLeave={handleItemLeave}
                onLogoClick={item.isLogo ? handleLogoClick : undefined}
                logoRef={item.isLogo ? logoBtnRef : undefined}
                isMobile={isMobile}
              />
            </div>
          ))} 
          
          {/* Separator before theme toggle */}
          <div className={`transition-all duration-300 ease-out ${
            hoveredItem === navigationItems[navigationItems.length - 1]?.id || hoveredItem === "theme" 
              ? "sm:mx-5 my-3 sm:my-0" 
              : "sm:mx-4 my-2 sm:my-0"
          } ${theme === "dark" ? "bg-gray-600/50" : "bg-gray-300/50"}
            w-6 h-0.5 sm:w-0.5 sm:h-6
          `} />
          
          <div className={`transition-all duration-300 ease-out ${
            hoveredItem === "theme" ? "sm:mx-4 my-2 sm:my-0" : "sm:mx-2 my-1.5 sm:my-0"
          }`}>
            <ThemeToggle
              theme={theme}
              setTheme={setTheme}
              isHovered={hoveredItem === "theme"}
              onHover={() => handleItemHover("theme")}
              onLeave={handleItemLeave}
              isMobile={isMobile}
            />
          </div>
        </div>
      </nav>

      {/* Truyền dockRect cho Modal để luôn cách 32px */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} theme={theme} dockRect={dockRect} logoRect={logoRect} />
    </>
  );
};

export default Dock;
