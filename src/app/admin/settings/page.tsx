'use client'
import { useState, useEffect } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { SiteSettings } from '@/types'

const FALLBACK: Partial<SiteSettings> = {
  company_name: 'UVTechnic', tagline: 'European Technology. Made in Turkey.',
  hero_headline_1: 'PROTECTING WATER.', hero_headline_2: 'PURIFYING AIR.',
  hero_headline_3: 'Securing Surfaces.',
  hero_subtext: 'UVTechnic engineers and manufactures complete UVC disinfection systems for water, air, and surface applications — in Turkey, to European technical standards.',
  years_experience: '8+', systems_installed: '300+', projects: '40+', industries: '12+', countries: '5',
  address: '1139 Sokak No:2, Yenişehir / İZMİR, Turkey', phone: '+90 232 458 0862', email: 'info@uvtechnic.com',
  city: 'İzmir', country: 'Turkey', seo_title: 'UVTechnic — UV Disinfection Systems',
  seo_description: 'UVC disinfection systems for water, air and surface.', og_image_url: '',
  technology_intro_video_id: 'ED3DWI567xM',
}

function Field({ label, name, value, onChange, type = 'text', hint }: { label: string; name: string; value: string; onChange: (k: string, v: string) => void; type?: string; hint?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(name, e.target.value)} rows={3}
          style={{ background: 'rgba(5,15,26,.8)', border: '1px solid rgba(0,204,238,.18)', color: '#eaf4ff', fontSize: 13.5, padding: '10px 12px', borderRadius: 2, width: '100%', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}/>
      ) : (
        <input type={type} value={value} onChange={e => onChange(name, e.target.value)}
          style={{ background: 'rgba(5,15,26,.8)', border: '1px solid rgba(0,204,238,.18)', color: '#eaf4ff', fontSize: 13.5, padding: '10px 12px', borderRadius: 2, width: '100%', outline: 'none', fontFamily: 'inherit' }}/>
      )}
      {hint && <div style={{ fontSize: 11, color: '#6a8aaa', marginTop: 3 }}>{hint}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#091828', border: '1px solid rgba(0,204,238,.1)', borderRadius: 2, padding: '24px 28px', marginBottom: 20 }}>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 18, fontWeight: 700, color: '#00ccee', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(0,204,238,.1)' }}>{title}</div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [data, setData] = useState<Partial<SiteSettings>>(FALLBACK)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url === 'your-project-url') { setMsg('⚠ Supabase not configured — showing fallback data. Changes will not persist.'); return }
    import('@/lib/data').then(({ getSiteSettings }) => getSiteSettings().then(s => setData(s)).catch(e => setMsg('Could not load settings: ' + e.message)))
  }, [])

  const update = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }))

  const save = async () => {
    setSaving(true)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url === 'your-project-url') { setMsg('⚠ Cannot save — Supabase not configured.'); setSaving(false); return }
    try {
      const { updateSiteSettings } = await import('@/lib/data')
      await updateSiteSettings(data)
      setSaved(true); setMsg('✓ Settings saved successfully.')
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) { setMsg('Error saving: ' + e.message) }
    setSaving(false)
  }

  const f = (key: keyof SiteSettings) => (data[key] as string) || ''

  return (
    <div style={{ display: 'flex' }}>
      <AdminNav />
      <main style={{ flex: 1, padding: '40px 48px', maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#00ccee', fontWeight: 600, marginBottom: 6 }}>Admin</div>
            <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 36, fontWeight: 700 }}>Site Settings</h1>
          </div>
          <button onClick={save} disabled={saving} style={{ background: saving ? '#6a8aaa' : '#00ccee', color: '#050f1a', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: 1.5, padding: '11px 28px', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {msg && <div style={{ padding: '10px 16px', background: saved ? 'rgba(34,197,94,.1)' : 'rgba(251,191,36,.08)', border: `1px solid ${saved ? '#22c55e' : 'rgba(251,191,36,.3)'}`, borderRadius: 2, fontSize: 13, color: saved ? '#22c55e' : '#f59e0b', marginBottom: 24 }}>{msg}</div>}

        <Section title="Hero Section">
          <Field label="Headline Line 1" name="hero_headline_1" value={f('hero_headline_1')} onChange={update}/>
          <Field label="Headline Line 2" name="hero_headline_2" value={f('hero_headline_2')} onChange={update}/>
          <Field label="Headline Line 3 (subdued)" name="hero_headline_3" value={f('hero_headline_3')} onChange={update}/>
          <Field label="Hero Subtext" name="hero_subtext" value={f('hero_subtext')} onChange={update} type="textarea"/>
          <Field label="Tagline (Why UVTechnic heading)" name="tagline" value={f('tagline')} onChange={update}/>
        </Section>

        <Section title="Trust Bar Statistics">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <Field label="Years Experience" name="years_experience" value={f('years_experience')} onChange={update}/>
            <Field label="Systems Installed" name="systems_installed" value={f('systems_installed')} onChange={update}/>
            <Field label="Projects" name="projects" value={f('projects')} onChange={update}/>
            <Field label="Industries" name="industries" value={f('industries')} onChange={update}/>
            <Field label="Countries" name="countries" value={f('countries')} onChange={update}/>
            <Field label="Facility Size" name="facility_size" value={f('facility_size')} onChange={update}/>
          </div>
        </Section>

        <Section title="Contact Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Company Name" name="company_name" value={f('company_name')} onChange={update}/>
            <Field label="City" name="city" value={f('city')} onChange={update}/>
            <Field label="Phone" name="phone" value={f('phone')} onChange={update}/>
            <Field label="Email" name="email" value={f('email')} onChange={update}/>
          </div>
          <Field label="Full Address" name="address" value={f('address')} onChange={update}/>
          <Field label="Country" name="country" value={f('country')} onChange={update}/>
        </Section>

        <Section title="SEO & Meta">
          <Field label="SEO Title" name="seo_title" value={f('seo_title')} onChange={update}/>
          <Field label="SEO Description" name="seo_description" value={f('seo_description')} onChange={update} type="textarea"/>
          <Field label="OG Image URL" name="og_image_url" value={f('og_image_url')} onChange={update} hint="Recommended: 1200×630px hosted image URL"/>
        </Section>

        <Section title="YouTube Videos">
          <Field label="Technology Page Intro Video ID" name="technology_intro_video_id" value={f('technology_intro_video_id')} onChange={update}
            hint="YouTube video ID only (e.g. ED3DWI567xM — not the full URL)"/>
        </Section>
      </main>
    </div>
  )
}
