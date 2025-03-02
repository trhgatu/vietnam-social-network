import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/shared/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} font-medium antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster/>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
