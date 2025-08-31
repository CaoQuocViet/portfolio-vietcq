// Navigation utilities

// Standard scroll behavior cho homepage sections
export const scrollToHomeSection = (sectionId, setActiveSection) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

// Cross-page navigation utility
export const navigateToPage = (sectionId) => {
    switch(sectionId) {
        case 'home':
        case 'hero':
            window.location.href = '/';
            break;
        case 'gallery':
            window.location.href = '/gallery';
            break;
        default:
            // For same-page sections, scroll normally
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
};

// Generic scroll function factory
export const createScrollFunction = (options = {}) => {
    const { setActiveSection, isHomePage = false } = options;
    
    return (sectionId) => {
        if (isHomePage && setActiveSection) {
            scrollToHomeSection(sectionId, setActiveSection);
        } else {
            navigateToPage(sectionId);
        }
    };
};
