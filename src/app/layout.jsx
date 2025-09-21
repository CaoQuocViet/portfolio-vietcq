import "../../global.css";
import LocalFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "../contexts/LanguageContext";

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
				<LanguageProvider>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
						{children}
					</ThemeProvider>
				</LanguageProvider>
			</body>
		</html>
	);
}
