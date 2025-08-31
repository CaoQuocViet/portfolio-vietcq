import { 
    HomeIcon,
    UserIcon, 
    CogIcon,
    BriefcaseIcon,
    EnvelopeIcon,
    DocumentTextIcon,
    PhotoIcon,
    CodeBracketIcon
} from "@heroicons/react/24/solid";

// Navigation config cho trang Home
export const HOME_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'hero', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'about', label: 'About', icon: UserIcon, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 'services', label: 'Services', icon: CogIcon, color: 'text-white', bg: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    { id: 'projects', label: 'Projects', icon: BriefcaseIcon, color: 'text-white', bg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'contact', label: 'Contact', icon: EnvelopeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-red-600' }
];

// Navigation config cho trang Gallery
export const GALLERY_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'home', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600', link: '/' },
    { id: 'gallery', label: 'Gallery', icon: PhotoIcon, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { id: 'categories', label: 'Categories', icon: DocumentTextIcon, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600' }
];

// Navigation config cho trang Project detail
export const PROJECT_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'home', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600', link: '/' },
    { id: 'overview', label: 'Overview', icon: DocumentTextIcon, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 'demo', label: 'Demo', icon: CodeBracketIcon, color: 'text-white', bg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'gallery', label: 'Gallery', icon: PhotoIcon, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-purple-600' }
];

// Default navigation nếu không specify
export const DEFAULT_NAVIGATION_ITEMS = HOME_NAVIGATION_ITEMS;
