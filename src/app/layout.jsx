import "../../global.css";
import LocalFont from "next/font/local";
import { ThemeProvider } from "next-themes";

/** @type {import('next').Metadata} */
export const metadata = {
    title: "vietcq",
    description: "Portfolio of VietCQ",
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
			<body className={`${process.env.NODE_ENV === "development" ? "debug-screens" : ''}`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
