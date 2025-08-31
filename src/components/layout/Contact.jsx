"use client";

import { FaGithub, FaLinkedin, FaYoutube, FaDiscord, FaFacebook } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/Button";
import { info } from "../../utils/info";

export default function Contact({ theme }) {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    
    const socialLinks = [
        { Icon: FaGithub, href: info.social.github, label: 'GitHub' },
        { Icon: FaLinkedin, href: info.social.linkedin, label: 'LinkedIn' },
        { Icon: FaYoutube, href: info.social.youtube, label: 'YouTube' },
        { Icon: FaDiscord, href: info.social.discord, label: 'Discord' },
        { Icon: FaFacebook, href: info.social.facebook, label: 'Facebook' }
    ];
    const email = info.email;

    return (
        <section id="contact" className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Let's Work Together
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className={`text-2xl font-bold mb-6 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                        theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                                    }`}>
                                        <GoMail size={20} />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            Email
                                        </p>
                                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {email || 'Loading...'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className={`text-lg font-semibold mb-4 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Contact Me
                                </h4>
                                <div className="flex gap-4">
                                    {socialLinks.map(({ Icon, href, label }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                                                theme === 'dark'
                                                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                                                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-sm'
                                            }`}
                                            aria-label={label}
                                        >
                                            <Icon size={20} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`p-8 rounded-2xl ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-xl'
                        }`}>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                            theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                            theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Email subject"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                            theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                                        formData.name && formData.subject && formData.message && !isSubmitting
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
                                    <div className={`text-center p-3 rounded-lg ${
                                        theme === 'dark' ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-700'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
