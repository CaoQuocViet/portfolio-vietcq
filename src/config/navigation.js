import { 
    HomeIcon,
    UserIcon, 
    CogIcon,
    BriefcaseIcon,
    EnvelopeIcon,
    PhotoIcon
} from "@heroicons/react/24/solid";

// Navigation config cho trang Home - full navigation
export const HOME_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'hero', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'about', label: 'About', icon: UserIcon, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 'services', label: 'Services', icon: CogIcon, color: 'text-white', bg: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    { id: 'projects', label: 'Projects', icon: BriefcaseIcon, color: 'text-white', bg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'contact', label: 'Contact', icon: EnvelopeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-red-600' }
];

// Navigation config cho trang Gallery - chỉ logo + home + theme
export const GALLERY_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'home', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600', link: '/' }
];

// Navigation config cho trang Project detail - logo + home + gallery + theme  
export const PROJECT_NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'home', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600', link: '/' },
    { id: 'gallery', label: 'Gallery', icon: PhotoIcon, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-purple-600', link: '/gallery' }
];

// Default navigation nếu không specify
export const DEFAULT_NAVIGATION_ITEMS = HOME_NAVIGATION_ITEMS;
