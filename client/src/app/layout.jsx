import "../../global.css";
import LocalFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LanguageProvider } from "../contexts/LanguageContext";
import QueryProvider from "../providers/query-provider";

/** @type {import('next').Metadata} */
export const metadata = {
    title: "Vietcq",
    description: "Portfolio of Vietcq",
};

const calSans = LocalFont({
	src: "../../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en" className={calSans.variable} suppressHydrationWarning>
			<body suppressHydrationWarning>
				<script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=localStorage.getItem('portfolio-palette');if(p)document.documentElement.setAttribute('data-palette',p)}catch(e){}})()` }} />
				<a href="#main-content" className="skip-to-content">Skip to content</a>
				<QueryProvider>
					<LanguageProvider>
						<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
							{children}
							<Toaster position="top-right" richColors closeButton duration={3000} />
						</ThemeProvider>
					</LanguageProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
