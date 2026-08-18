'use client'
import { useEffect, useState } from 'react'
import AdminNav from '@/components/admin/AdminNav'

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div style={{ background: '#091828', border: '1px solid rgba(0,204,238,.1)', borderRadius: 2, padding: '20px 24px' }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 32, fontWeight: 700, color: '#00ccee', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#eaf4ff', fontWeight: 600, marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: '#6a8aaa', marginTop: 2 }}>{sub}</div>
    </div>
  )
}

function QuickLink({ icon, label, desc, href }: { icon: string; label: string; desc: string; href: string }) {
  return (
    <a href={href} style={{ display: 'block', background: '#091828', border: '1px solid rgba(0,204,238,.08)', borderRadius: 2, padding: '16px 20px', textDecoration: 'none', transition: '.15s', cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,204,238,.35)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,204,238,.08)')}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 600, color: '#eaf4ff', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#6a8aaa' }}>{desc}</div>
    </a>
  )
}

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<string>('—')

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url === 'your-project-url') return
    import('@/lib/data').then(({ getSiteSettings }) => {
      getSiteSettings().then(s => setLastUpdated(new Date(s.updated_at).toLocaleString())).catch(console.error)
    })
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '40px 48px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#00ccee', fontWeight: 600, marginBottom: 8 }}>Admin Dashboard</div>
          <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 40, fontWeight: 700, marginBottom: 4 }}>UVTechnic CMS</h1>
          <div style={{ fontSize: 13, color: '#6a8aaa' }}>Last site update: {lastUpdated}</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 40 }}>
          <StatCard icon="💧" label="Water Models" value="15" sub="PE/PP/SS/SM series" />
          <StatCard icon="🏢" label="References" value="14" sub="Across 6 sectors" />
          <StatCard icon="🎪" label="Events" value="1" sub="Trade fairs listed" />
          <StatCard icon="🖼️" label="Product Images" value="32" sub="GitHub hosted" />
        </div>

        {/* Quick links */}
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, marginBottom: 14 }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 40 }}>
          <QuickLink icon="⚙️" label="Site Settings" desc="Hero text, contact info, SEO, YouTube IDs" href="/admin/settings" />
          <QuickLink icon="🔬" label="Products" desc="Models, specs, lamp counts, series data" href="/admin/products" />
          <QuickLink icon="🖼️" label="Media / Images" desc="Update product image URLs by section" href="/admin/media" />
          <QuickLink icon="🏢" label="References" desc="Add/edit/delete client references" href="/admin/references" />
          <QuickLink icon="🎪" label="Events" desc="Trade fair photos and captions" href="/admin/events" />
          <QuickLink icon="🏭" label="Industries" desc="Homepage industry grid" href="/admin/industries" />
        </div>

        {/* Setup checklist */}
        <div style={{ background: 'rgba(0,204,238,.04)', border: '1px solid rgba(0,204,238,.15)', borderRadius: 2, padding: '24px 28px' }}>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 18, fontWeight: 700, color: '#00ccee', marginBottom: 16 }}>Setup Checklist</div>
          {[
            [!!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url', 'Supabase URL configured in .env.local'],
            [!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'Supabase Anon Key configured'],
            [false, 'Run supabase/schema.sql in your Supabase SQL Editor'],
            [false, 'Create admin user in Supabase Auth → Users'],
            [false, 'Deploy to Vercel and set environment variables'],
          ].map(([done, label], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(0,204,238,.06)' : 'none' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: done ? 'rgba(34,197,94,.2)' : 'rgba(106,138,170,.1)', border: `1px solid ${done ? '#22c55e' : 'rgba(106,138,170,.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>
                {done ? '✓' : '○'}
              </div>
              <span style={{ fontSize: 13, color: done ? '#22c55e' : '#6a8aaa' }}>{label as string}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
