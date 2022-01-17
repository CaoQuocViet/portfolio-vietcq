import { Navigation } from "@/components/shared/nav";
import { ContactSection } from "@/components/contact/contact-section";

export default function Contact() {
    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))]">
            <Navigation />
            <ContactSection />
        </div>
    );
}
