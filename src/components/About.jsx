export default function About({ theme }) {
    return (
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
                        <div className={`rounded-2xl p-8 enhanced-card ${
                            theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                        }`}>
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
    );
}
