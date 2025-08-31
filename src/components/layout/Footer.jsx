import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import data from "../../../data.json";

const FOOTER_SOCIAL_LINKS = [
    { Icon: FaGithub, href: `https://github.com/${data.githubUsername}`, label: 'GitHub' },
    { Icon: FaLinkedin, href: data.social.linkedin, label: 'LinkedIn' },
    { Icon: FaXTwitter, href: data.social.twitter, label: 'Twitter' }
];

const FooterLogo = ({ theme }) => (
    <h3 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
        vietcq
    </h3>
);

const FooterSocialLinks = ({ theme }) => (
    <div className="flex justify-center space-x-8 mb-8">
        {FOOTER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <Link
                key={label}
                href={href}
                target="_blank"
                className={`transition-all duration-300 hover:scale-110 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label={label}
            >
                <Icon size={28} />
            </Link>
        ))}
    </div>
);

const FooterCopyright = ({ theme }) => (
    <div className={`text-center text-lg ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`}>
        © 2025 vietcq. All rights reserved.
    </div>
);

export default function Footer({ theme }) {
    return (
        <footer className={`py-16 border-t ${
            theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-8">
                    <FooterLogo theme={theme} />
                    <FooterSocialLinks theme={theme} />
                </div>
                <FooterCopyright theme={theme} />
            </div>
        </footer>
    );
}
