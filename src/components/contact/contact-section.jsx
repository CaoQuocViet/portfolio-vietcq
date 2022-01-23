"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import Link from "next/link";
import data from "../../../data.json";

export function ContactSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCards, setActiveCards] = useState([]);
    
    const username = data.githubUsername;
    const email = data.email;
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger animation for contact cards
                        contacts.forEach((_, index) => {
                            setTimeout(() => {
                                setActiveCards(prev => [...prev, index]);
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        const target = document.getElementById('contact-section');
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);
    
    const contacts = [
        {
            icon: <GoMail size={28} />,
            href: "mailto:" + email,
            label: "Email",
            handle: email,
            description: "Drop me a line anytime",
            color: "from-orange-500 to-red-500",
            bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
        },
        {
            icon: <FaGithub size={28} />,
            href: "https://github.com/" + username,
            label: "GitHub", 
            handle: username,
            description: "Check out my code",
            color: "from-purple-500 to-indigo-600",
            bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
        },
        {
            icon: <FaLinkedin size={28} />,
            href: "https://linkedin.com/in/" + username,
            label: "LinkedIn",
            handle: username,
            description: "Professional network",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
        },
        {
            icon: <FaXTwitter size={28} />,
            href: "https://twitter.com/" + username,
            label: "Twitter",
            handle: "@" + username,
            description: "Follow my journey",
            color: "from-gray-600 to-slate-700",
            bgColor: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20"
        }
    ];

    return (
        <section id="contact-section" className="relative min-h-screen flex items-center justify-center py-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--color-border))_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
            
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                
                {/* Header Section */}
                <div 
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/25 mb-8">
                        <span className="text-white font-bold text-2xl">
                            {data.displayName.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold text-[rgb(var(--color-text-primary))] mb-6">
                        Let's Create
                        <span className="block bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                            Something Amazing
                        </span>
                    </h1>
                    
                    <p className="text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto leading-relaxed">
                        Ready to bring your ideas to life? I'm here to help you build 
                        extraordinary digital experiences.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contacts.map((contact, index) => (
                        <div
                            key={contact.label}
                            className={`transition-all duration-700 ${
                                activeCards.includes(index)
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-8 scale-95'
                            }`}
                            style={{ 
                                transitionDelay: `${index * 100}ms`,
                                transform: activeCards.includes(index) ? 'none' : 'translateY(30px) scale(0.95)'
                            }}
                        >
                            <Link
                                href={contact.href}
                                target="_blank"
                                className="group block h-full"
                            >
                                <div className={`relative h-full p-8 ${contact.bgColor} border border-[rgb(var(--color-border))]/20 rounded-3xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-2`}>
                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                    
                                    {/* Icon Container */}
                                    <div className="relative mb-6">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                                            <div className="text-white">
                                                {contact.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-2xl font-bold text-[rgb(var(--color-text-primary))] mb-3 group-hover:text-violet-600 transition-colors duration-300">
                                            {contact.label}
                                        </h3>
                                        
                                        <p className="text-[rgb(var(--color-text-secondary))] mb-4 leading-relaxed">
                                            {contact.description}
                                        </p>
                                        
                                        <div className="inline-flex items-center text-sm font-mono text-[rgb(var(--color-text-muted))] bg-[rgb(var(--color-surface-elevated))]/50 px-3 py-2 rounded-lg border border-[rgb(var(--color-border))]/20">
                                            {contact.handle}
                                        </div>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <div className="absolute top-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-[rgb(var(--color-text-secondary))]">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div 
                    className={`text-center mt-16 transition-all duration-1000 delay-500 ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <p className="text-[rgb(var(--color-text-secondary))] text-lg mb-8">
                        Prefer a different way to connect?
                    </p>
                    
                    <div className="inline-flex items-center gap-4 p-6 bg-[rgb(var(--color-surface))]/80 backdrop-blur-xl border border-[rgb(var(--color-border))]/20 rounded-2xl shadow-xl">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-[rgb(var(--color-text-primary))]">Schedule a Call</p>
                            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Let's discuss your project</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
