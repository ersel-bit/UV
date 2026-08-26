'use client'

import { useState, useEffect } from 'react'
import { PageHero } from '@/components/ui'
import type { Reference } from '@/types'

export default function RefsPage() {
  const [refs, setRefs] = useState<Reference[]>([])

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!url || url === 'your-project-url') return

    import('@/lib/data')
      .then(({ getReferences }) =>
        getReferences()
          .then(setRefs)
          .catch(console.error)
      )
  }, [])

  const images = refs.filter(
    (r) => r.image_url
  )

  return (
    <div style={{ marginTop: 58 }}>
      <PageHero
        tag="References"
        title="Our References"
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(4, 1fr)',
            gap: 30,
            alignItems: 'center',
          }}
        >
          {images.map((r) => (
            <div
              key={r.id}
              style={{
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={r.image_url}
                alt="Reference"
                style={{
                  maxWidth: '100%',
                  maxHeight: 180,
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: '#6a8aaa',
              padding: '60px 20px',
              fontSize: 13,
            }}
          >
            No references available.
          </div>
        )}
      </div>
    </div>
  )
}