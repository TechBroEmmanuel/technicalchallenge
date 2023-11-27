import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/ThemeProvider'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import {switchThemeDuration} from '../constants'

export const metadata: Metadata = {
  title: 'SDash',
  description: 'My dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <body>{children}</body>
        </ThemeProvider>
    </html>
  )
}
