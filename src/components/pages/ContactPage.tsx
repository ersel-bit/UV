'use client'

import { useState } from 'react'
import { PageHero } from '@/components/ui'
import type { SiteSettings } from '@/types'

const TABS = [
  ['sales', '💼 Sales / Quote'],
  ['support', '🛠 Technical Support'],
  ['procurement', '📦 Procurement / Spare Parts'],
]

export default function ContactPage({
  settings: s,
}: {
  settings: SiteSettings
}) {
  const [topic, setTopic] = useState('sales')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    industry: '',
    details: '',
  })

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

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

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))

    setSuccess(false)
    setError('')
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setSending(true)
    setSuccess(false)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          topic,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to send your request.'
        )
      }

      setForm({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        industry: '',
        details: '',
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
        tag="Contact"
        title="Request Engineering Review"
        subtitle="Describe your application — we will size the right system and send a proposal."
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '56px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr .7fr',
          gap: 40,
          alignItems: 'start',
        }}
      >

        <div>

          {/* TOPICS */}

          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 28,
              flexWrap: 'wrap',
            }}
          >

            {TABS.map(([v, l]) => (

              <button
                key={v}
                type="button"
                onClick={() => setTopic(v)}
                style={{
                  background:
                    topic === v
                      ? 'rgba(0,204,238,.1)'
                      : 'rgba(9,24,40,.8)',

                  border: `1px solid ${
                    topic === v
                      ? 'rgba(0,204,238,.4)'
                      : 'rgba(0,204,238,.1)'
                  }`,

                  color:
                    topic === v
                      ? '#00ccee'
                      : '#6a8aaa',

                  padding: '6px 14px',
                  borderRadius: 100,
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {l}
              </button>

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

              {/* FIRST NAME */}

              <div>
                <label style={fl}>
                  First Name *
                </label>

                <input
                  type="text"
                  value={form.firstName}
                  onChange={e =>
                    updateField(
                      'firstName',
                      e.target.value
                    )
                  }
                  placeholder="First Name"
                  style={fi}
                  required
                />
              </div>


              {/* LAST NAME */}

              <div>
                <label style={fl}>
                  Last Name *
                </label>

                <input
                  type="text"
                  value={form.lastName}
                  onChange={e =>
                    updateField(
                      'lastName',
                      e.target.value
                    )
                  }
                  placeholder="Last Name"
                  style={fi}
                  required
                />
              </div>


              {/* COMPANY */}

              <div>
                <label style={fl}>
                  Company *
                </label>

                <input
                  type="text"
                  value={form.company}
                  onChange={e =>
                    updateField(
                      'company',
                      e.target.value
                    )
                  }
                  placeholder="Company"
                  style={fi}
                  required
                />
              </div>


              {/* EMAIL */}

              <div>
                <label style={fl}>
                  Email *
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={e =>
                    updateField(
                      'email',
                      e.target.value
                    )
                  }
                  placeholder="email@company.com"
                  style={fi}
                  required
                />
              </div>


              {/* PHONE */}

              <div>
                <label style={fl}>
                  Phone *
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={e =>
                    updateField(
                      'phone',
                      e.target.value
                    )
                  }
                  placeholder="+90"
                  style={fi}
                  required
                />
              </div>


              {/* COUNTRY */}

              <div>
                <label style={fl}>
                  Country *
                </label>

                <input
                  type="text"
                  value={form.country}
                  onChange={e =>
                    updateField(
                      'country',
                      e.target.value
                    )
                  }
                  placeholder="Country"
                  style={fi}
                  required
                />
              </div>


              {/* INDUSTRY */}

              <div
                style={{
                  gridColumn: '1/-1',
                }}
              >

                <label style={fl}>
                  Industry
                </label>

                <select
                  value={form.industry}
                  onChange={e =>
                    updateField(
                      'industry',
                      e.target.value
                    )
                  }
                  style={fi}
                >

                  <option value="">
                    Select...
                  </option>

                  {[
                    'Aquaculture',
                    'Drinking Water',
                    'Food & Beverage',
                    'Dairy',
                    'Pharmaceutical',
                    'Healthcare',
                    'Pool & Spa',
                    'Agriculture',
                    'Livestock',
                    'Industrial',
                    'Hospitality',
                    'Wastewater',
                    'Other',
                  ].map(i => (

                    <option key={i}>
                      {i}
                    </option>

                  ))}

                </select>

              </div>


              {/* DETAILS */}

              <div
                style={{
                  gridColumn: '1/-1',
                }}
              >

                <label style={fl}>
                  Details *
                </label>

                <textarea
                  value={form.details}
                  onChange={e =>
                    updateField(
                      'details',
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Flow rate, pressure, belt speed, room size — any detail helps..."
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
                Request sent successfully.
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


            {/* BUTTON + CONTACT INFO */}

            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 8,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >

              <button
                type="submit"
                disabled={sending}
                style={{
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
                  : 'Send Request →'}
              </button>

              <div
                style={{
                  fontSize: 12,
                  color: '#6a8aaa',
                }}
              >
                📍 {s.address}
                &nbsp;|&nbsp;
                📞 {s.phone}
                &nbsp;|&nbsp;
                ✉️ {s.email}
              </div>

            </div>

          </form>

        </div>


        {/* IMAGE */}

        <div
          style={{
            position: 'sticky',
            top: 90,
          }}
        >

          <img
            src="/contact-uvc-lamp.jpeg"
            alt="UV-C disinfection lamp"
            style={{
              width: '100%',
              height: 460,
              objectFit: 'cover',
              display: 'block',
              borderRadius: 2,
              border:
                '1px solid rgba(0,204,238,.15)',
            }}
          />

        </div>

      </div>

    </div>
  )
}
