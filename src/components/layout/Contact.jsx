"use client";

import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import { info } from "../../utils/info";
import { SOCIAL_PLATFORMS } from "../../data/socialPlatforms";

export default function Contact({ theme }) {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const socialOrbitItems = [
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "GitHub"), position: "absolute -top-6 left-1/2 transform -translate-x-1/2", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "LinkedIn"), position: "absolute top-8 right-8", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "YouTube"), position: "absolute top-1/2 -right-6 transform -translate-y-1/2", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "Discord"), position: "absolute bottom-8 right-8", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "Facebook"), position: "absolute -bottom-6 left-1/2 transform -translate-x-1/2", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "Twitter"), position: "absolute bottom-8 left-8", size: "w-18 h-18" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "Daily.dev"), position: "absolute top-8 left-8", size: "w-[72px] h-[72px]" },
        { platform: SOCIAL_PLATFORMS.find(p => p.label === "Website"), position: "absolute top-1/2 -left-6 transform -translate-y-1/2", size: "w-18 h-18" },
    ].filter(item => item.platform); // Lọc bỏ undefined

    const email = info.email;

    return (
        <section id="contact" className="py-24 bg-gray-200 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        Connect with me
                    </h2>
                    <p
                        className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                    >
                        Have a question about Tech, need technical advice, or want to discuss opportunities?
                        I'm here to help with any technology-related topics.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        {/* ======= ORBITING ICONS ======= */}
                        <div className="text-center">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
                                {/* Center Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm sm:text-lg md:text-xl shadow-xl">
                                        <span className="text-center leading-tight">Contact<br className="sm:hidden" /><span className="hidden sm:inline"> </span>Me</span>
                                    </div>
                                </div>

                                {/* Orbit layer (rotate whole ring) */}
                                <div className="absolute inset-0 spin-orbit">
                                    {socialOrbitItems.map((item, index) => (
                                        <a 
                                            key={item.platform.label}
                                            href={item.platform.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={item.platform.label}
                                            className={`${item.position} ${item.size.replace('w-18 h-18', 'w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18').replace('w-[72px] h-[72px]', 'w-12 h-12 sm:w-14 sm:h-14 md:w-[72px] md:h-[72px]')} ${item.platform.color} rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg border-2`}
                                        >
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 flex items-center justify-center">
                                                {item.platform.icon}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Email subject"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${theme === 'dark'
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${formData.name && formData.subject && formData.message && !isSubmitting
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                                        : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={!formData.name || !formData.subject || !formData.message || isSubmitting}
                                    onClick={() => {
                                        if (formData.name && formData.subject && formData.message) {
                                            setIsSubmitting(true);
                                            setSubmitMessage('');

                                            const formattedMessage = `Dear Quốc Việt,\n\n${formData.message}\n\nBest regards,\n${formData.name}`;
                                            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formattedMessage)}`;
                                            window.open(mailtoLink);

                                            setTimeout(() => {
                                                setIsSubmitting(false);
                                                setSubmitMessage('✅ Email client opened! Please send your message.');
                                                // Clear form after successful submission
                                                setFormData({ name: '', subject: '', message: '' });
                                            }, 1000);
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Opening Email...' : 'Send Message'}
                                </button>

                                {submitMessage && (
                                    <div className="text-center p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* CSS cho quỹ đạo quay + counter-rotate icon */}
            <style jsx global>{`
        @keyframes orbit-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .spin-orbit {
          animation: orbit-spin 30s linear infinite;
        }
        /* Giữ icon luôn thẳng bằng cách quay ngược lại đúng tốc độ */
        .spin-orbit > a div svg {
          animation: orbit-spin 30s linear infinite reverse;
          transform-origin: 50% 50%;
          display: block;
          transform: rotate(0deg); 
        }
      `}</style>
        </section>
    );
}
