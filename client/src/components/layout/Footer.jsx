import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { info } from "../../utils/info";
import { useTranslation } from '../../hooks/useTranslation';

// Social links loaded from info.js

const FooterLogo = ({ theme }) => (
    <h3 className="text-2xl font-bold mb-6 text-[var(--text-heading)]">
        Vietcq
    </h3>
);

const FooterSocialLinks = ({ theme, socialLinks }) => (
    <div className="flex justify-center space-x-8 mb-8">
        {socialLinks.map(({ Icon, href, label }) => (
            <Link
                key={label}
                href={href}
                target="_blank"
                className="transition-all duration-300 hover:scale-110 
                          text-[var(--text-muted)] 
                          hover:text-[var(--text-heading)]"
                aria-label={label}
            >
                <Icon size={28} />
            </Link>
        ))}
    </div>
);

const FooterCopyright = ({ theme }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center text-lg mb-8 text-[var(--text-muted)]">
            {t('footer.copyright')}
        </div>
    );
};

export default function Footer({ theme }) {
    const socialLinks = [
        { Icon: FaGithub, href: info.social.github, label: 'GitHub' },
        { Icon: FaLinkedin, href: info.social.linkedin, label: 'LinkedIn' },
        { Icon: FaXTwitter, href: info.social.twitter, label: 'Twitter' }
    ];

    return (
        <footer className="py-16 bg-[var(--bg-section)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-8">
                    <FooterLogo theme={theme} />
                    <FooterSocialLinks theme={theme} socialLinks={socialLinks} />
                </div>
                <FooterCopyright theme={theme} />
            </div>
        </footer>
    );
}
