import { FaCode, FaLaptopCode, FaMobile } from "react-icons/fa6";

export default function Services({ theme }) {
    return (
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
    );
}
