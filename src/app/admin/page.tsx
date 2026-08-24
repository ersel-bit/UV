'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { supabase } = await import('@/lib/supabase')
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError('Invalid credentials. Check your Supabase Auth settings.')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (err: any) {
  console.error('LOGIN ERROR:', err)
  setError(err?.message || 'Unknown error')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050f1a' }}>
      <div style={{ width: 400, background: '#091828', border: '1px solid rgba(0,204,238,.15)', borderRadius: 4, padding: 40 }}>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
          UV<span style={{ color: '#00ccee' }}>TECHNIC</span>
        </div>
        <div style={{ fontSize: 13, color: '#6a8aaa', marginBottom: 32 }}>Content Management System</div>

        <form onSubmit={handleSubmit}>
          {[['Email', 'email', email, setEmail], ['Password', 'password', password, setPassword]].map(([l, t, v, sv]) => (
            <div key={l as string} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6a8aaa', fontWeight: 600, display: 'block', marginBottom: 4 }}>{l as string}</label>
              <input
                type={t as string}
                value={v as string}
                onChange={e => (sv as (s: string) => void)(e.target.value)}
                required
                style={{ background: 'rgba(5,15,26,.8)', border: '1px solid rgba(0,204,238,.18)', color: '#eaf4ff', fontSize: 14, padding: '10px 12px', borderRadius: 2, width: '100%', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>
          ))}
          {error && <div style={{ color: '#f87171', fontSize: 12.5, marginBottom: 14 }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#00ccee', color: '#050f1a', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: 1.5, padding: 12, borderRadius: 2, border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Signing in...' : 'SIGN IN →'}
          </button>
        </form>
      </div>
    </div>
  )
}
