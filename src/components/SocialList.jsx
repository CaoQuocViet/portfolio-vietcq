import { SOCIAL_PLATFORMS } from "../data/socialPlatforms";

export default function SocialList({ className = "", showLabel = true, theme = "dark" }) {
  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {SOCIAL_PLATFORMS.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800/30 transition-all duration-200 cursor-pointer"
        >
          {/* Circular icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.color} shadow-lg hover:shadow-xl transition-all duration-200`}>
            <div className="w-6 h-6 text-white flex items-center justify-center">
              {item.icon}
            </div>
          </div>
          {/* Text written directly on modal background */}
          {showLabel && (
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.label}</span>
          )}
        </a>
      ))}
    </div>
  );
}
