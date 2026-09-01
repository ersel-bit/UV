'use client'

import { useState } from 'react'
import { PageHero } from '@/components/ui'
import type { SiteSettings } from '@/types'

export default function ConsultingPage({ settings: s }: { settings: SiteSettings }) {
  const fi: React.CSSProperties = {
    background: 'rgba(5,15,26,.8)',
    border: '1px solid rgba(0,204,238,.18)',
    color: '#eaf4ff',
    fontSize: 13.5,
    padding: '10px 12px',
    borderRadius: 2,
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
  }

  const fl: React.CSSProperties = {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#6a8aaa',
    fontWeight: 600,
    display: 'block',
    marginBottom: 4,
  }

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    city: '',
    application: '',
  })

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))

    setSuccess(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)
    setSuccess(false)
    setError('')

    try {
      const response = await fetch('/api/consulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to submit your request.'
        )
      }

      setForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        city: '',
        application: '',
      })

      setSuccess(true)

    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ marginTop: 58 }}>

      <PageHero
        tag="Consulting"
        title="We Size It. You Run It."
        subtitle={`Free on-site assessment for facilities in the ${s.city} region and beyond.`}
      />

      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(5,15,26,.72),rgba(5,15,26,.82)),url("/consulting-bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: '80px 32px',
          }}
        >

          {/* PROCESS */}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 20,
              marginBottom: 52,
            }}
          >

            {[
              [
                '01',
                'Tell Us',
                'Describe your water source, process, volumes, and problem. No technical knowledge needed.',
              ],
              [
                '02',
                'We Analyse',
                'Our engineers review your parameters and select the right UV dose, reactor size, and material spec.',
              ],
              [
                '03',
                'On-Site Visit',
                `We visit your facility, verify the installation conditions, and confirm the final specification. Free for ${s.city} region.`,
              ],
            ].map(([n, h, d]) => (

              <div
                key={n}
                style={{
                  background: '#091828',
                  padding: 28,
                  borderRadius: 2,
                  borderTop: '2px solid #00ccee',
                }}
              >

                <div
                  style={{
                    fontFamily: 'Rajdhani,sans-serif',
                    fontSize: 44,
                    fontWeight: 700,
                    color: 'rgba(0,204,238,.12)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {n}
                </div>

                <div
                  style={{
                    fontFamily: 'Rajdhani,sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {h}
                </div>

                <div
                  style={{
                    fontSize: 13.5,
                    color: '#6a8aaa',
                    lineHeight: 1.7,
                  }}
                >
                  {d}
                </div>

              </div>

            ))}

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 13,
              }}
            >

              {/* NAME */}

              <div>
                <label style={fl}>Name *</label>

                <input
                  type="text"
                  value={form.name}
                  onChange={e =>
                    updateField('name', e.target.value)
                  }
                  placeholder="Your name"
                  style={fi}
                  required
                />
              </div>


              {/* EMAIL */}

              <div>
                <label style={fl}>Email *</label>

                <input
                  type="email"
                  value={form.email}
                  onChange={e =>
                    updateField('email', e.target.value)
                  }
                  placeholder="your@email.com"
                  style={fi}
                  required
                />
              </div>


              {/* COMPANY */}

              <div>
                <label style={fl}>Company *</label>

                <input
                  type="text"
                  value={form.company}
                  onChange={e =>
                    updateField('company', e.target.value)
                  }
                  placeholder="Company name"
                  style={fi}
                  required
                />
              </div>


              {/* PHONE */}

              <div>
                <label style={fl}>Phone *</label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={e =>
                    updateField('phone', e.target.value)
                  }
                  placeholder="+90 5XX XXX XX XX"
                  style={fi}
                  required
                />
              </div>


              {/* CITY */}

              <div>
                <label style={fl}>City *</label>

                <input
                  type="text"
                  value={form.city}
                  onChange={e =>
                    updateField('city', e.target.value)
                  }
                  placeholder="City"
                  style={fi}
                  required
                />
              </div>


              {/* APPLICATION */}

              <div
                style={{
                  gridColumn: '1/-1',
                }}
              >

                <label style={fl}>
                  Describe Your Application *
                </label>

                <textarea
                  value={form.application}
                  onChange={e =>
                    updateField(
                      'application',
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Water source, flow rate, current treatment, problem you are trying to solve..."
                  style={{
                    ...fi,
                    resize: 'vertical',
                  }}
                  required
                />

              </div>

            </div>


            {/* SUCCESS */}

            {success && (
              <div
                style={{
                  marginTop: 16,
                  padding: '13px 15px',
                  border:
                    '1px solid rgba(0,204,238,.3)',
                  background:
                    'rgba(0,204,238,.08)',
                  color: '#00ccee',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                Request received successfully.
                <br />
                Our team will contact you shortly.
              </div>
            )}


            {/* ERROR */}

            {error && (
              <div
                style={{
                  marginTop: 16,
                  padding: '13px 15px',
                  border:
                    '1px solid rgba(255,80,80,.3)',
                  background:
                    'rgba(255,80,80,.08)',
                  color: '#ff8888',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              disabled={sending}
              style={{
                marginTop: 14,
                background: sending
                  ? '#4b7b85'
                  : '#00ccee',
                color: '#050f1a',
                fontFamily:
                  'Rajdhani,sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                padding: '13px 30px',
                borderRadius: 2,
                border: 'none',
                cursor: sending
                  ? 'wait'
                  : 'pointer',
                opacity: sending ? 0.75 : 1,
              }}
            >
              {sending
                ? 'Sending...'
                : 'Request Free Assessment →'}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}