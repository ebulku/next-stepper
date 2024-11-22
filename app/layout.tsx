import type { Metadata } from 'next'

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
    <html lang="en">
      <body className={'min-h-screen bg-background antialiased'}>
        {children}
      </body>
    </html>
  )
}
