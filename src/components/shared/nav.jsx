"use client";

import { GoArrowLeft, GoHome, GoCode, GoMail, GoSun, GoMoon } from 'react-icons/go';
import Link from "next/link";
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from './loading-indicator';
import { useTheme } from 'next-themes';
import data from '../../../data.json';

export const Navigation = () => {
	const ref = useRef(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const customUsername = searchParams.get('customUsername');
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const linkClass = (path) => {
		const isActive = pathname === path;
		return `duration-300 relative block group ${
			isActive 
				? "text-white" 
				: "text-zinc-400 hover:text-zinc-100"
		}`;
	};

	const navigation = [
		{
			href: "/",
			label: "Home",
			icon: <GoHome size={18} />,
		},
		{
			href: "/projects",
			label: "Projects",
			icon: <GoCode size={18} />,
		},
		{
			href: "/contact",
			label: "Contact", 
			icon: <GoMail size={18} />,
		}
	];

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl duration-300 border-b ${
					isIntersecting
						? "bg-black/20 border-transparent"
						: "bg-black/80 border-zinc-800"
				}`}
			>
				<div className="container flex items-center justify-between p-4 mx-auto">
					{/* Logo/Brand - Fixed Left */}
					<div className="flex items-center gap-3">
						<Link
							href={"/" + (customUsername ? `?customUsername=${customUsername}` : '')}
							className="duration-300 text-white hover:text-blue-400 group flex items-center gap-3"
						>
							<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
								<span className="text-white font-bold text-sm">
									{data.displayName.split(' ').map(n => n[0]).join('')}
								</span>
							</div>
							<span className="hidden md:block font-semibold text-lg">
								{data.displayName}
							</span>
						</Link>
					</div>

					{/* Center Navigation - Desktop */}
					<nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
						{navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href + (customUsername ? `?customUsername=${customUsername}` : '')}
								className={linkClass(item.href)}
							>
								<span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg relative transition-all duration-300 hover:bg-zinc-800/50 dark:hover:bg-zinc-800/50">
									{item.icon}
									{item.label}
									<LoadingIndicator />
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
								</span>
							</Link>
						))}
					</nav>

					{/* Right Side - Fixed */}
					<div className="flex items-center gap-3">
						{/* Theme Toggle */}
						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className="p-2 rounded-lg bg-zinc-800/50 dark:bg-zinc-800/50 border border-zinc-700 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 transition-all duration-300 text-zinc-400 hover:text-zinc-100"
						>
							{theme === 'dark' ? <GoSun size={18} /> : <GoMoon size={18} />}
						</button>
						
						{/* Back Button - Only show on non-home pages */}
						{pathname !== '/' && (
							<Link
								href={"/" + (customUsername ? `?customUsername=${customUsername}` : '')}
								className="duration-300 text-zinc-300 hover:text-zinc-100 group flex items-center gap-2"
							>
								<div className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700 group-hover:border-zinc-500 group-hover:bg-zinc-700/50 transition-all duration-300">
									<GoArrowLeft className="w-4 h-4" />
								</div>
								<span className="hidden sm:block text-sm">Back</span>
							</Link>
						)}

						{/* Mobile Navigation */}
						<nav className="flex md:hidden items-center gap-1">
							{navigation.filter(item => item.href !== pathname).slice(0, 2).map((item) => (
								<Link
									key={item.href}
									href={item.href + (customUsername ? `?customUsername=${customUsername}` : '')}
									className="duration-300 text-zinc-400 hover:text-zinc-100 group"
								>
									<div className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700 group-hover:border-zinc-500 group-hover:bg-zinc-700/50 transition-all duration-300">
										{item.icon}
									</div>
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};
