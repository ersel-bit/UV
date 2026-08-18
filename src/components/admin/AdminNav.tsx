'use client'
import { usePathname, useRouter } from 'next/navigation'

const LINKS = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/settings', icon: '⚙️', label: 'Site Settings' },
  { href: '/admin/products', icon: '🔬', label: 'Products' },
  { href: '/admin/references', icon: '🏢', label: 'References' },
  { href: '/admin/events', icon: '🎪', label: 'Events' },
  { href: '/admin/media', icon: '🖼️', label: 'Media / Images' },
  { href: '/admin/industries', icon: '🏭', label: 'Industries' },
  { href: '/admin/spare-parts', icon: '🔧', label: 'Spare Parts' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <aside style={{ width: 220, background: '#091828', borderRight: '1px solid rgba(0,204,238,.1)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0 }}>
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>
          UV<span style={{ color: '#00ccee' }}>TECHNIC</span>
        </div>
        <div style={{ fontSize: 10, color: '#6a8aaa', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
      </div>
      <div style={{ height: 1, background: 'rgba(0,204,238,.1)', margin: '0 16px' }} />
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {LINKS.map(link => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <button key={link.href} onClick={() => router.push(link.href)} style={{
              width: '100%', background: active ? 'rgba(0,204,238,.08)' : 'none',
              border: 'none', borderLeft: `3px solid ${active ? '#00ccee' : 'transparent'}`,
              color: active ? '#00ccee' : '#6a8aaa',
              textAlign: 'left', padding: '10px 20px',
              fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 10,
              transition: '.15s', fontWeight: active ? 600 : 400,
            }}>
              <span>{link.icon}</span>
              {link.label}
            </button>
          )
        })}
      </nav>
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,204,238,.08)' }}>
        <button onClick={() => window.open('/', '_blank')} style={{ width: '100%', background: 'rgba(0,204,238,.06)', border: '1px solid rgba(0,204,238,.2)', color: '#00ccee', borderRadius: 2, padding: '8px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 6 }}>
          → View Site
        </button>
        <button onClick={handleSignOut} style={{ width: '100%', background: 'none', border: '1px solid rgba(106,138,170,.2)', color: '#6a8aaa', borderRadius: 2, padding: '8px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
