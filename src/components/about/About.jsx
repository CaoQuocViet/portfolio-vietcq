import PCModel from './PCModel';

export default function About({ theme }) {
    return (
        <section id="about" className={`relative py-24 min-h-screen ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            {/* 3D Model positioned to the right with higher z-index */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-auto">
                <PCModel />
            </div>
            
            {/* Content overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white drop-shadow-lg' : 'text-gray-900 drop-shadow-lg'
                    }`}>
                        About Me
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className={`backdrop-blur-lg rounded-2xl p-8 max-w-lg ${
                        theme === 'dark' ? 'bg-gray-900/80 border border-gray-700/50' : 'bg-white/90 border border-gray-300/50'
                    } shadow-2xl`}>
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

                    {/* Placeholder để giữ layout, model sẽ hiển thị ở background */}
                    <div className="lg:block hidden"></div>
                </div>
            </div>
        </section>
    );
}
