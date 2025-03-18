"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/shared/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { HeroUIProvider } from "@heroui/system";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
