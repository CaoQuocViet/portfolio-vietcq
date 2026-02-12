import {
    HomeIcon,
    UserIcon,
    CogIcon,
    BriefcaseIcon,
    EnvelopeIcon,
    PhotoIcon,
    LightBulbIcon,
    DocumentTextIcon
} from "@heroicons/react/24/solid";

// Navigation config cho trang Home - full navigation
export const HOME_NAVIGATION_ITEMS = [
    { id: "logo", label: "Vietcq", isLogo: true },
    {
        id: "hero",
        label: "Home",
        icon: HomeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
        id: "about",
        label: "About",
        icon: UserIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
        id: "services",
        label: "Services",
        icon: CogIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-gray-500 to-gray-600",
    },
    {
        id: "projects",
        label: "Projects",
        icon: BriefcaseIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
        id: "contact",
        label: "Contact",
        icon: EnvelopeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
        id: "gallery",
        label: "Gallery",
        icon: PhotoIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        link: "/gallery",
    },
    {
        id: "ideas",
        label: "Ideas",
        icon: LightBulbIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        link: "/ideas",
    },
    {
        id: "blog",
        label: "Blog",
        icon: DocumentTextIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        link: "/blog",
    },
];

// Navigation config cho trang Gallery - chỉ logo + home + ideas + theme
export const GALLERY_NAVIGATION_ITEMS = [
    { id: "logo", label: "Vietcq", isLogo: true },
    {
        id: "home",
        label: "Home",
        icon: HomeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        link: "/",
    },
    {
        id: "ideas",
        label: "Ideas",
        icon: LightBulbIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        link: "/ideas",
    },
    {
        id: "blog",
        label: "Blog",
        icon: DocumentTextIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        link: "/blog",
    },
];

// Navigation config cho trang Project detail - logo + home + gallery + theme
export const PROJECT_NAVIGATION_ITEMS = [
    { id: "logo", label: "Vietcq", isLogo: true },
    {
        id: "home",
        label: "Home",
        icon: HomeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        link: "/",
    },
    {
        id: "gallery",
        label: "Gallery",
        icon: PhotoIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        link: "/gallery",
    },
    {
        id: "ideas",
        label: "Ideas",
        icon: LightBulbIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        link: "/ideas",
    },
    {
        id: "blog",
        label: "Blog",
        icon: DocumentTextIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        link: "/blog",
    },
];

// Navigation config cho trang Blog - logo + home + gallery + ideas + theme
export const BLOG_NAVIGATION_ITEMS = [
    { id: "logo", label: "Vietcq", isLogo: true },
    {
        id: "home",
        label: "Home",
        icon: HomeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        link: "/",
    },
    {
        id: "gallery",
        label: "Gallery",
        icon: PhotoIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        link: "/gallery",
    },
    {
        id: "ideas",
        label: "Ideas",
        icon: LightBulbIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        link: "/ideas",
    },
];

// Navigation config cho trang Ideas - logo + home + gallery + theme
export const IDEAS_NAVIGATION_ITEMS = [
    { id: "logo", label: "Vietcq", isLogo: true },
    {
        id: "home",
        label: "Home",
        icon: HomeIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        link: "/",
    },
    {
        id: "gallery",
        label: "Gallery",
        icon: PhotoIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        link: "/gallery",
    },
    {
        id: "blog",
        label: "Blog",
        icon: DocumentTextIcon,
        color: "text-white",
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        link: "/blog",
    },
];

// Navigation config cho Modal - direct đến các trang
export const MODAL_NAVIGATION_ITEMS = [
    {
        id: "gallery",
        icon: PhotoIcon,
        title: "Gallery",
        description: "Project screenshots and visual demos",
        link: "/gallery",
        color: "text-white",
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
        id: "ideas",
        icon: LightBulbIcon,
        title: "Ideas",
        description: "Future project concepts and innovations",
        link: "/ideas",
        color: "text-white",
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    {
        id: "blog",
        icon: DocumentTextIcon,
        title: "Blog",
        description: "Technical articles and development thoughts",
        link: "/blog",
        color: "text-white",
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
];

// Default navigation nếu không specify
export const DEFAULT_NAVIGATION_ITEMS = HOME_NAVIGATION_ITEMS;
