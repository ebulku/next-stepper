import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Project Setup Wizard',
  description: 'Choose your project type, framework, and deployment platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'bg-background antialiased'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
