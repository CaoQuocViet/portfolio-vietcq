"use client";

import Dock from "../dock/Dock";
import { HOME_NAVIGATION_ITEMS } from "../../config/navigation";

export default function Navigation({ theme, setTheme, activeSection, scrollToSection }) {
    return (
        <>
            {/* Dock Component - Reusable với navigation items riêng */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                navigationItems={HOME_NAVIGATION_ITEMS}
            />
        </>
    );
}
