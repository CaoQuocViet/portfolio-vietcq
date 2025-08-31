"use client";

import { FaSun, FaMoon } from "react-icons/fa6";
import { DEFAULT_NAVIGATION_ITEMS } from "../../../config/navigation";
import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

const NavigationItem = ({
  item, activeSection, theme, scrollToSection,
  isHovered, onHover, onLeave, onLogoClick, logoRef
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
        className={`relative group flex items-center justify-center h-12 px-4 rounded-2xl transition-all duration-300 ease-out transform ${
          isHovered ? "scale-125" : "hover:scale-110"
        } ${
          activeSection === "hero"
            ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 shadow-lg"
            : "hover:bg-gray-100/30 dark:hover:bg-gray-800/30"
        }`}
        title="Open VietCQ Modal"
      >
        <span
          className={`text-lg font-bold transition-all duration-300 bg-gradient-to-r ${
            theme === "dark"
              ? "from-blue-400 via-purple-400 to-blue-400"
              : "from-blue-600 via-purple-600 to-blue-600"
          } bg-clip-text text-transparent`}
          style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          vietcq
        </span>
        <span
          className={`inline-block ml-1 text-base transition-all duration-300 ${
            theme === "dark" ? "text-purple-400" : "text-purple-600"
          }`}
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          .
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => (item.link ? (window.location.href = item.link) : scrollToSection(item.id))}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ease-out transform ${
        isHovered
          ? "scale-125"
          : isActive
          ? `scale-110 ${item.bg} shadow-lg`
          : `${item.bg} hover:scale-110 active:scale-95 shadow-lg`
      }`}
      title={item.label}
    >
      <IconComponent size={isHovered ? 24 : 20} className={`transition-all duration-300 ease-out ${item.color}`} />
      <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-white scale-100" : "bg-transparent scale-0"}`} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block">
        {item.label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </button>
  );
};

const ThemeToggle = ({ theme, setTheme, isHovered, onHover, onLeave }) => (
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={`relative group flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ease-out transform ${
      isHovered ? "scale-125" : "hover:scale-110"
    } hover:bg-gray-100/60 dark:hover:bg-gray-800/60 active:scale-95`}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    {theme === "dark" ? (
      <FaSun size={isHovered ? 22 : 18} className="text-yellow-600 group-hover:text-yellow-500 transition-all duration-300 ease-out" />
    ) : (
      <FaMoon size={isHovered ? 22 : 18} className="text-slate-600 group-hover:text-slate-500 transition-all duration-300 ease-out" />
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

  const logoBtnRef = useRef(null);
  const dockRef = useRef(null);

  const handleItemHover = (id) => setHoveredItem(id);
  const handleItemLeave = () => setHoveredItem(null);
  const handleLogoClick = () => setIsModalOpen((prev) => !prev);

  // Sử dụng class từ global.css
  const dockBgClass = "glass-effect";

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
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-2xl px-5 py-3 ${dockBgClass} shadow-2xl`}
      >
        <div className="flex items-center justify-center">
          {navigationItems.map((item, index) => (
            <div key={item.id} className={`flex items-center transition-all duration-300 ease-out ${hoveredItem === item.id ? "mx-4" : "mx-1.5"}`}>
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
              />
              {index === 0 && (
                <div className={`w-px h-6 transition-all duration-300 ease-out ${hoveredItem === item.id || hoveredItem === navigationItems[index + 1]?.id ? "mx-5" : "mx-4"} ${theme === "dark" ? "bg-gray-600/50" : "bg-gray-300/50"}`} />
              )}
            </div>
          ))}
          <div className={`w-px h-6 transition-all duration-300 ease-out ${hoveredItem === navigationItems[navigationItems.length - 1]?.id || hoveredItem === "theme" ? "mx-5" : "mx-4"} ${theme === "dark" ? "bg-gray-600/50" : "bg-gray-300/50"}`} />
          <div className={`transition-all duration-300 ease-out ${hoveredItem === "theme" ? "mx-4" : "mx-1.5"}`}>
            <ThemeToggle
              theme={theme}
              setTheme={setTheme}
              isHovered={hoveredItem === "theme"}
              onHover={() => handleItemHover("theme")}
              onLeave={handleItemLeave}
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
