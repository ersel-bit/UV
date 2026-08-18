import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — UVTechnic CMS',
  robots: 'noindex,nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif', background: '#050f1a', color: '#eaf4ff' }}>
        {children}
      </body>
    </html>
  )
}
