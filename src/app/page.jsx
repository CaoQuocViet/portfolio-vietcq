"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaGithub, FaLinkedin, FaXTwitter, FaSun, FaMoon, FaArrowDown, FaCode, FaLaptopCode, FaMobile } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";
import data from "../../data.json";

export default function HomePage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Fetch GitHub repos
        async function fetchRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${data.githubUsername}/repos?sort=updated&per_page=6`);
                const allRepos = await response.json();
                const filteredRepos = allRepos
                    .filter(repo => !repo.fork && repo.stargazers_count >= 0)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setRepos(filteredRepos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setLoading(false);
            }
        }

        fetchRepos();

        // Scroll spy for navigation
        const handleScroll = () => {
            const sections = ['hero', 'about', 'services', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    if (!mounted) return null;

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            {/* Fixed Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                theme === 'dark' 
                    ? 'bg-gray-950/80 backdrop-blur-md border-gray-800/50' 
                    : 'bg-white/80 backdrop-blur-md border-gray-200/50'
            } border-b`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => scrollToSection('hero')}
                                className={`text-2xl font-bold transition-colors ${
                                    theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                                }`}
                                style={{
                                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                                }}
                            >
                                VC
                                <span className="inline-block ml-1" style={{
                                    animation: 'float 3s ease-in-out infinite'
                                }}>.</span>
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {[
                                    { id: 'hero', label: 'Home' },
                                    { id: 'about', label: 'About' },
                                    { id: 'services', label: 'Services' },
                                    { id: 'projects', label: 'Projects' },
                                    { id: 'contact', label: 'Contact' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
                                            activeSection === item.id
                                                ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
                                                : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                                        }`}
                                    >
                                        {item.label}
                                        {activeSection === item.id && (
                                            <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                                theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                            }`} style={{
                                                animation: 'slideIn 0.3s ease-out'
                                            }} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Theme Toggle & Mobile Menu */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    theme === 'dark' 
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                                    theme === 'dark' 
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <div className="w-5 h-5 flex flex-col justify-around">
                                    <span className={`block h-0.5 w-full transition-all duration-300 ${
                                        theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                                    } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                    <span className={`block h-0.5 w-full transition-all duration-300 ${
                                        theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                                    } ${isMenuOpen ? 'opacity-0' : ''}`} />
                                    <span className={`block h-0.5 w-full transition-all duration-300 ${
                                        theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
                                    } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className={`md:hidden transition-all duration-300 ${
                            theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
                        } backdrop-blur-md border-t ${
                            theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200/50'
                        }`}>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {[
                                    { id: 'hero', label: 'Home' },
                                    { id: 'about', label: 'About' },
                                    { id: 'services', label: 'Services' },
                                    { id: 'projects', label: 'Projects' },
                                    { id: 'contact', label: 'Contact' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-200 ${
                                            activeSection === item.id
                                                ? (theme === 'dark' ? 'text-blue-400 bg-gray-800/50' : 'text-blue-600 bg-blue-50')
                                                : (theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${
                        theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-200/30'
                    }`} style={{
                        filter: 'blur(100px)',
                        animation: 'float 6s ease-in-out infinite'
                    }} />
                    <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full ${
                        theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-200/30'
                    }`} style={{
                        filter: 'blur(100px)',
                        animation: 'float 8s ease-in-out infinite reverse'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center relative z-10">
                    <div style={{ animation: 'fadeInUp 1s ease-out' }}>
                        <p className={`text-lg font-medium mb-6 ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`} style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                            Hello, I'm Viet Cao
                        </p>
                        
                        <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`} style={{ 
                            animation: 'fadeInUp 1s ease-out 0.4s both',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            Full Stack
                            <br />
                            <span className={`bg-gradient-to-r ${
                                theme === 'dark' 
                                    ? 'from-blue-400 via-purple-400 to-blue-400' 
                                    : 'from-blue-600 via-purple-600 to-blue-600'
                            } bg-clip-text text-transparent`} style={{
                                backgroundSize: '200% 200%',
                                animation: 'gradientMove 3s ease-in-out infinite'
                            }}>
                                Developer
                            </span>
                        </h1>
                        
                        <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`} style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                            I create exceptional digital experiences through clean code, 
                            modern design, and innovative solutions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" 
                             style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    theme === 'dark'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                                }`}
                            >
                                View My Work
                            </button>
                            
                            <button
                                onClick={() => scrollToSection('contact')}
                                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border-2 hover:scale-105 ${
                                    theme === 'dark'
                                        ? 'border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                                        : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                                }`}
                            >
                                Get In Touch
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-6 mb-16" 
                             style={{ animation: 'fadeInUp 1s ease-out 1s both' }}>
                            {[
                                { Icon: FaGithub, href: `https://github.com/${data.githubUsername}`, label: 'GitHub' },
                                { Icon: FaLinkedin, href: data.social.linkedin, label: 'LinkedIn' },
                                { Icon: FaXTwitter, href: data.social.twitter, label: 'Twitter' },
                                { Icon: GoMail, href: `mailto:${data.email}`, label: 'Email' }
                            ].map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                        theme === 'dark'
                                            ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                    aria-label={label}
                                >
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>

                        {/* Scroll Indicator */}
                        <div className="flex justify-center" style={{ animation: 'fadeInUp 1s ease-out 1.2s both' }}>
                            <button
                                onClick={() => scrollToSection('about')}
                                className={`p-2 rounded-full transition-all duration-300 ${
                                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                                style={{ animation: 'bounce 2s infinite' }}
                            >
                                <FaArrowDown size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            About Me
                        </h2>
                        <div className={`w-24 h-1 mx-auto rounded-full ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                Passionate about creating digital solutions
                            </h3>
                            
                            <p className={`text-lg leading-relaxed mb-6 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                I'm a dedicated full-stack developer with a passion for creating 
                                innovative web applications. With expertise in modern technologies 
                                and a keen eye for design, I transform ideas into reality.
                            </p>
                            
                            <p className={`text-lg leading-relaxed mb-8 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                My journey in tech started with curiosity and has evolved into 
                                a career focused on building scalable, user-friendly applications 
                                that make a difference.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { label: 'Experience', value: '3+ Years' },
                                    { label: 'Projects', value: '50+' },
                                    { label: 'Technologies', value: '15+' },
                                    { label: 'Happy Clients', value: '25+' }
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className={`text-2xl font-bold mb-2 ${
                                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                        }`}>
                                            {stat.value}
                                        </div>
                                        <div className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`rounded-2xl p-8 ${
                                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                            } shadow-xl`}>
                                <h4 className={`text-xl font-bold mb-6 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Tech Stack
                                </h4>
                                
                                <div className="space-y-6">
                                    {[
                                        { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                                        { category: 'Backend', skills: ['Node.js', 'Express', 'Python', 'PostgreSQL'] },
                                        { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma'] }
                                    ].map((group) => (
                                        <div key={group.category}>
                                            <h5 className={`font-semibold mb-3 ${
                                                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                            }`}>
                                                {group.category}
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {group.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-700 text-gray-300'
                                                                : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className={`py-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            What I Do
                        </h2>
                        <div className={`w-24 h-1 mx-auto rounded-full ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                Icon: FaCode,
                                title: 'Web Development',
                                description: 'Building responsive and scalable web applications using modern frameworks and best practices.'
                            },
                            {
                                Icon: FaLaptopCode,
                                title: 'Frontend Development',
                                description: 'Creating beautiful and intuitive user interfaces with attention to detail and user experience.'
                            },
                            {
                                Icon: FaMobile,
                                title: 'Mobile-First Design',
                                description: 'Designing and developing mobile-responsive applications that work seamlessly across all devices.'
                            }
                        ].map((service, index) => (
                            <div
                                key={service.title}
                                className={`p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                                    theme === 'dark'
                                        ? 'bg-gray-900/50 hover:bg-gray-800/50'
                                        : 'bg-gray-50 hover:bg-white shadow-lg hover:shadow-xl'
                                }`}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                                }}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                                    theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                                }`}>
                                    <service.Icon className={`text-2xl ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                
                                <h3 className={`text-xl font-bold mb-4 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {service.title}
                                </h3>
                                
                                <p className={`leading-relaxed ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            Featured Projects
                        </h2>
                        <div className={`w-24 h-1 mx-auto rounded-full ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                        <p className={`text-lg mt-6 max-w-2xl mx-auto ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Here are some of my recent projects that showcase my skills and creativity.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                                theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
                            }`} />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {repos.map((repo, index) => (
                                <Link
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    className="group block"
                                    style={{
                                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className={`h-full p-8 rounded-2xl transition-all duration-300 transform group-hover:-translate-y-2 ${
                                        theme === 'dark'
                                            ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/50'
                                            : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200'
                                    }`}>
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`p-3 rounded-xl ${
                                                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                                            }`}>
                                                <FaCode className={`text-xl ${
                                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                                }`} />
                                            </div>
                                            
                                            <HiOutlineExternalLink className={`text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                                                theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'
                                            }`} />
                                        </div>

                                        {/* Project Content */}
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold mb-3 transition-colors group-hover:${
                                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                            } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </h3>
                                            
                                            <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
                                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                                {repo.description || 'A showcase project demonstrating modern web development techniques and best practices.'}
                                            </p>

                                            {/* Project Meta */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {repo.language && (
                                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-700 text-gray-300'
                                                                : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    
                                                    <div className={`flex items-center space-x-1 text-sm ${
                                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        <span>⭐</span>
                                                        <span>{repo.stargazers_count}</span>
                                                    </div>
                                                </div>
                                                
                                                <span className={`text-xs ${
                                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                }`}>
                                                    {new Date(repo.updated_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href={`https://github.com/${data.githubUsername}`}
                            target="_blank"
                            className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                theme === 'dark'
                                    ? 'border-2 border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                                    : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            View All Projects
                            <HiOutlineExternalLink className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section - Clean Circular Animation */}
            <section id="contact" className={`py-32 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} relative overflow-hidden`}>
                <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Let's Connect
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded-full mb-12 ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                    
                    <p className={`text-xl leading-relaxed mb-20 max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Ready to build something amazing together? Let's start the conversation.
                    </p>

                    {/* Clean Circular Contact Animation */}
                    <div className="relative mx-auto mb-20 flex items-center justify-center" style={{ width: '560px', height: '560px' }}>
                        
                        {/* Subtle Background Circle */}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full ${
                            theme === 'dark' 
                                ? 'bg-gradient-radial from-blue-500/5 via-transparent to-transparent' 
                                : 'bg-gradient-radial from-blue-400/5 via-transparent to-transparent'
                        }`} style={{
                            animation: 'pulse 4s ease-in-out infinite'
                        }} />

                        {/* Center Logo */}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-3 ${
                            theme === 'dark' ? 'border-blue-400/80 bg-gray-900' : 'border-blue-600/80 bg-white'
                        } flex items-center justify-center text-2xl font-black z-20 transition-all duration-300 hover:scale-110`} style={{
                            boxShadow: theme === 'dark' 
                                ? '0 8px 32px rgba(59, 130, 246, 0.3)' 
                                : '0 8px 32px rgba(59, 130, 246, 0.2)'
                        }}>
                            <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>VC</span>
                        </div>

                        {/* Orbiting Contact Cards */}
                        {[
                            {
                                icon: <GoMail size={24} />,
                                title: "Email",
                                subtitle: "vietcao.dev@gmail.com",
                                href: `mailto:${data.email}`,
                                bg: theme === 'dark' ? '#ef4444' : '#f87171',
                                angle: 0,
                                delay: 0
                            },
                            {
                                icon: <FaGithub size={24} />,
                                title: "GitHub", 
                                subtitle: "Check out my code",
                                href: `https://github.com/${data.githubUsername}`,
                                bg: theme === 'dark' ? '#6b7280' : '#9ca3af',
                                angle: 120,
                                delay: 8
                            },
                            {
                                icon: <FaLinkedin size={24} />,
                                title: "LinkedIn",
                                subtitle: "Professional network", 
                                href: data.social.linkedin,
                                bg: theme === 'dark' ? '#3b82f6' : '#60a5fa',
                                angle: 240,
                                delay: 16
                            }
                        ].map((contact, index) => (
                            <Link
                                key={contact.title}
                                href={contact.href}
                                target="_blank"
                                className="absolute group"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${contact.angle}deg) translateY(-200px) rotate(-${contact.angle}deg)`,
                                    animation: `orbitRotate 30s linear infinite ${contact.delay}s`
                                }}
                            >
                                <div className={`relative w-32 h-32 rounded-2xl ${
                                    theme === 'dark' 
                                        ? 'bg-gray-800/90 border border-gray-700/50 hover:border-gray-600' 
                                        : 'bg-white border border-gray-200 hover:border-gray-300'
                                } backdrop-blur-sm transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 shadow-lg group-hover:shadow-xl`}>
                                    
                                    {/* Icon Circle */}
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110" style={{
                                        backgroundColor: contact.bg,
                                        boxShadow: `0 4px 16px ${contact.bg}40`
                                    }}>
                                        {contact.icon}
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="absolute bottom-4 left-0 right-0 px-3 text-center">
                                        <h3 className={`text-sm font-bold mb-1 ${
                                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {contact.title}
                                        </h3>
                                        <p className={`text-xs ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {contact.subtitle}
                                        </p>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} style={{
                                        background: `radial-gradient(circle, ${contact.bg}40, transparent 70%)`,
                                        filter: 'blur(8px)'
                                    }} />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Clean Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                        <Link
                            href={`mailto:${data.email}`}
                            className={`flex-1 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                                theme === 'dark'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            } shadow-lg hover:shadow-xl`}
                        >
                            Get In Touch
                        </Link>
                        
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={`flex-1 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 border-2 hover:scale-105 ${
                                theme === 'dark'
                                    ? 'border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                                    : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 border-t ${
                theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className={`text-sm mb-4 md:mb-0 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            © 2025 Viet Cao. All rights reserved.
                        </div>
                        
                        <div className="flex space-x-6">
                            {[
                                { Icon: FaGithub, href: `https://github.com/${data.githubUsername}`, label: 'GitHub' },
                                { Icon: FaLinkedin, href: data.social.linkedin, label: 'LinkedIn' },
                                { Icon: FaXTwitter, href: data.social.twitter, label: 'Twitter' }
                            ].map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    className={`transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                    aria-label={label}
                                >
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Inline Styles for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes gradientMove {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes slideIn {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-10px); }
                    70% { transform: translateY(-5px); }
                    90% { transform: translateY(-2px); }
                }

                @keyframes orbitRotate {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg) translateY(-200px) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg) translateY(-200px) rotate(-360deg);
                    }
                }

                @keyframes ringRotate {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
