'use client'

import { ClipboardCheck, ClipboardList, MoonStar } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 flex items-center">
      <div className="max-w-lg mx-auto space-y-6 w-full">
        <Link href="/minimal" className="block">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <ClipboardList className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Minimal Form</CardTitle>
                  <CardDescription>
                    Try our basic multi-step form with essential features.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/extended" className="block">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <ClipboardCheck className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Extended Form</CardTitle>
                  <CardDescription>
                    Experience our advanced multi-step form with additional
                    features.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <CardHeader>
            <div className="flex items-center space-x-4">
              <MoonStar className="w-8 h-8 text-primary" />
              <div>
                <CardTitle>Theme Mode</CardTitle>
                <CardDescription>Change theme mode</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </main>
  )
}
