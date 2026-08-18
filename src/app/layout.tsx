import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UVTechnic — UV Disinfection Systems',
  description: 'UVC disinfection systems for water, air and surface — engineered and manufactured in Turkey to European standards.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
