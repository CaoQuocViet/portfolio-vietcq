"use client";

import { useEffect, useRef, useState } from "react";
import SocialList from "../share/SocialList";
import RepositoriesList from "../share/RepositoriesList";
import ProjectsList from "../share/ProjectsList";
import NavigationList from "../share/NavigationList";

// Props: isOpen, onClose, theme, dockRect (DOMRect), logoRect (DOMRect)
const Modal = ({ isOpen, onClose, theme, dockRect, logoRect }) => {
  const modalRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, originX: 50, originY: 100 });

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const width = 480;   // giữ 1.5x
      const height = 680;  // Tăng từ 580px lên 680px để chứa Ideas section
      const isMobile = window.innerWidth < 640;
      
      const dockTop =
        dockRect?.top ??
        (window.innerHeight - 56 /*fallback dockH*/ - 24 /*bottom-6*/);

      let left, top;
      
      if (isMobile) {
        // Mobile: center horizontally, vertically
        left = (window.innerWidth - Math.min(320, window.innerWidth - 32)) / 2;
        top = (window.innerHeight - Math.min(500, window.innerHeight - 120)) / 2;
      } else {
        // Desktop/Tablet: keep existing logic
        if (logoRect) {
          // Căn giữa theo logo Vietcq
          left = logoRect.left + (logoRect.width / 2) - (width / 2);
        } else {
          // Fallback: căn giữa màn hình
          left = (window.innerWidth - width) / 2;
        }
        
        // Đảm bảo modal không bị tràn ra ngoài màn hình
        left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
        top = dockTop - 32 /*gap cố định*/ - height;
      }

      setPos({ top, left, originX: 50, originY: isMobile ? 50 : 100 });
    };

    requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen, dockRect, logoRect]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Background phù hợp cho modal - không quá trong suốt
  const modalBgClass = theme === "dark" 
    ? "bg-gray-900/95" 
    : "bg-white/95";

  return (
    <>
      {/* Backdrop: đen mờ 60%, KHÔNG blur */}
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} aria-label="Close modal backdrop" />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`fixed z-50 rounded-xl shadow-2xl transition-all duration-200 transform scale-100 animate-popover-in ${modalBgClass}
          w-80 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]
          sm:w-[480px] sm:h-[680px] sm:max-w-none sm:max-h-none
        `}
        style={{
          left: pos.left,
          top: pos.top,
          boxShadow:
            theme === "dark"
              ? "0 20px 60px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.1)",
          transformOrigin: `${pos.originX}% ${pos.originY}%`,
          overflow: "hidden",
        }}
      >
        {/* Mũi tên trỏ xuống dock (cùng tông màu, opacity-50)
        <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)" }}>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path
              d="M16 16L0 0H32L16 16Z"
              fill={theme === "dark" ? "rgba(23,37,84,0.5)" : "rgba(255,255,255,0.5)"}   // blue-950/50 hoặc white/50
              stroke={theme === "dark" ? "rgba(30,58,138,0.5)" : "rgba(229,231,235,0.5)"} // blue-800/50 hoặc gray-200/50
            />
          </svg>
        </div> */}

        {/* Content responsive */}
        <div className="flex flex-col p-4 sm:p-6 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Navigation Section */}
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Navigation</div>
            <NavigationList theme={theme} />
          </div>
          
          {/* Connect Section */}
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Connect</div>
            <SocialList theme={theme} />
          </div>
          
          {/* Repositories Section */}
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Repositories</div>
            <RepositoriesList theme={theme} />
          </div>

          {/* Projects Section */}
          <div className="mb-4 sm:mb-6 mt-2 sm:mt-4">
            <div className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Projects</div>
            <ProjectsList theme={theme} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes popover-in {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popover-in { animation: popover-in 0.22s cubic-bezier(.4,1.4,.6,1) both; }
      `}</style>
    </>
  );
};

export default Modal;
