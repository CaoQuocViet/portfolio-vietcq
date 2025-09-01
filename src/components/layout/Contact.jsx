"use client";

import React from "react";
import { GoMail } from "react-icons/go";
import { useState } from "react";
import { info } from "../../utils/info";

export default function Contact({ theme }) {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');


    const email = info.email;

    return (
        <section id="contact" className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Connect with me
                    </h2>
                    <p
                        className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Have a question about Tech, need technical advice, or want to discuss opportunities?
                        I'm here to help with any technology-related topics.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* ======= ORBITING ICONS ======= */}
                        <div className="text-center">
                            <div className="relative w-96 h-96 mx-auto">
                                {/* Center Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                                        Contact Me
                                    </div>
                                </div>

                                {/* Orbit layer (rotate whole ring) */}
                                <div className="absolute inset-0 spin-orbit">
                                    {/* GitHub - Top */}
                                    <a href={info.social.github} target="_blank" rel="noopener noreferrer"
                                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-gray-700">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>

                                    {/* LinkedIn - Top Right */}
                                    <a href={info.social.linkedin} target="_blank" rel="noopener noreferrer"
                                        className="absolute top-8 right-8 w-18 h-18 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-blue-500">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.012-3.047-1.012 0-1.166.991-1.166 3.047v5.569h-3.554V9h3.554v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>

                                    {/* YouTube - Right */}
                                    <a href={info.social.youtube} target="_blank" rel="noopener noreferrer"
                                        className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-18 h-18 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-red-500">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>

                                    {/* Discord - Bottom Right */}
                                    <a href={info.social.discord} target="_blank" rel="noopener noreferrer"
                                        className="absolute bottom-8 right-8 w-18 h-18 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-purple-500">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.0777.0777 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019.6679-.5485 1.4189-1.1568 1.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 .6679-.5485 1.4189-1.1568 1.4189z" />
                                        </svg>
                                    </a>

                                    {/* Facebook - Bottom */}
                                    <a href={info.social.facebook} target="_blank" rel="noopener noreferrer"
                                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-blue-600">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>

                                    {/* Twitter - Bottom Left */}
                                    <a href={info.social.twitter} target="_blank" rel="noopener noreferrer"
                                        className="absolute bottom-8 left-8 w-18 h-18 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-sky-400">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>

                                    {/* Daily.dev - Top Left */}
                                    <a aria-label="Daily.dev" href="https://app.daily.dev/" target="_blank" rel="noopener noreferrer"
                                        className="absolute top-8 left-8 w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-gray-300">
                                        <svg className="w-9 h-9" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fillRule="evenodd">
                                                <g transform="translate(4,11)" fill="#151618">
                                                    <g opacity="0.56" transform="translate(21,.93)">
                                                        <path d="M6.479 8.014L2.947 4.481 4.712.95l5.74 5.74a1.5 1.5 0 010 2.122l-7.065 7.064a1.5 1.5 0 01-2.122 0 1.5 1.5 0 010-2.122L6.479 8.014z" />
                                                    </g>
                                                    <path d="M21.74.548a1.5 1.5 0 012.649 1.325L10.26 17.325a1.5 1.5 0 01-2.648 0L6.288 16 21.74.548zM15.118 5.405L12.469 8.054 8.936 4.521 4.52 8.937l3.532 3.532-1.765 3.532L.548 10.26a1.5 1.5 0 010-2.648L7.613.549a1.5 1.5 0 012.648 0l4.857 4.856z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </a>


                                    {/* Website - Left */}
                                    <a href="https://portfolio-vietcq.vercel.app/" target="_blank" rel="noopener noreferrer"
                                        className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-18 h-18 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-emerald-400">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1.08-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-xl'
                            }`}>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
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
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
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
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
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
                                    <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-700'
                                        }`}>
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
        .spin-orbit > a svg {
          animation: orbit-spin 30s linear infinite reverse;
          transform-origin: 50% 50%;
          display: block;
        }
      `}</style>
        </section>
    );
}
