import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import data from "../../data.json";

export default function Footer({ theme }) {
    return (
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
    );
}
