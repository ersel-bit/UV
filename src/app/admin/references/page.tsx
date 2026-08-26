'use client'

import { useEffect, useRef, useState } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import type { Reference } from '@/types'

export default function RefsAdmin() {
  const [refs, setRefs] = useState<Reference[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { getReferences } = await import('@/lib/data')
    setRefs(await getReferences())
  }

  function choose() {
    input.current?.click()
  }

  function selected(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return

    if (!f.type.startsWith('image/')) {
      setMsg('Please select an image.')
      return
    }

    setFile(f)
    setPreview(URL.createObjectURL(f))
    setMsg('')
  }

  function cancel() {
    setFile(null)
    setPreview('')
    setEditId(null)
    if (input.current) input.current.value = ''
  }

  async function save() {
    if (!file) {
      setMsg('Please select an image.')
      return
    }

    setLoading(true)
    setMsg('Uploading...')

    try {
      const { supabase } = await import('@/lib/supabase')

      const ext = file.name.split('.').pop() || 'jpg'
      const name = `reference-${Date.now()}.${ext}`

      const { error: uploadError } =
        await supabase.storage
          .from('references')
          .upload(name, file)

      if (uploadError) throw uploadError

      const { data } =
        supabase.storage
          .from('references')
          .getPublicUrl(name)

      const image_url = data.publicUrl

      if (editId) {
        const { error } = await supabase
          .from('references_table')
          .update({ image_url })
          .eq('id', editId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('references_table')
          .insert({
            company_name: 'Reference',
            sector: 'Other',
            description: '',
            image_url,
            sort_order: refs.length + 1,
            is_active: true,
          })

        if (error) throw error
      }

      await load()
      cancel()
      setMsg('✓ Saved successfully.')
    } catch (e: any) {
      setMsg('Error: ' + e.message)
    }

    setLoading(false)
  }

  async function remove(r: Reference) {
    if (!confirm('Delete this image?')) return

    try {
      const { supabase } = await import('@/lib/supabase')

      const { error } = await supabase
        .from('references_table')
        .delete()
        .eq('id', r.id)

      if (error) throw error

      setRefs((x) => x.filter((i) => i.id !== r.id))
      setMsg('✓ Deleted.')
    } catch (e: any) {
      setMsg('Error: ' + e.message)
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <AdminNav />

      <main style={{ flex: 1, padding: '40px 48px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <h1 style={{ fontFamily: 'Rajdhani', fontSize: 36 }}>
            References
          </h1>

          <button onClick={choose} style={btn}>
            + Add Image
          </button>
        </header>

        {msg && (
          <div style={{ color: '#00ccee', marginBottom: 20 }}>
            {msg}
          </div>
        )}

        <input
          ref={input}
          type="file"
          accept="image/*"
          onChange={selected}
          style={{ display: 'none' }}
        />

        {preview && (
          <div style={{ marginBottom: 30 }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: 300,
                height: 300,
                objectFit: 'contain',
              }}
            />

            <div style={{ marginTop: 12 }}>
              <button
                onClick={save}
                disabled={loading}
                style={btn}
              >
                {loading ? 'Uploading...' : 'Save'}
              </button>

              <button
                onClick={cancel}
                style={{
                  ...btn,
                  marginLeft: 8,
                  background: 'transparent',
                  color: '#6a8aaa',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
          }}
        >
          {refs
            .filter((r) => r.image_url)
            .map((r) => (
              <div key={r.id}>
                <img
                  src={r.image_url}
                  alt="Reference"
                  style={{
                    width: '100%',
                    height: 220,
                    objectFit: 'contain',
                  }}
                />

                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => {
                      setEditId(r.id)
                      setFile(null)
                      setPreview('')
                      choose()
                    }}
                    style={btn}
                  >
                    Change
                  </button>

                  <button
                    onClick={() => remove(r)}
                    style={{
                      ...btn,
                      marginLeft: 6,
                      background: 'transparent',
                      color: '#f87171',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}

const btn = {
  background: '#00ccee',
  color: '#050f1a',
  border: 'none',
  padding: '9px 18px',
  borderRadius: 2,
  cursor: 'pointer',
  fontFamily: 'Rajdhani',
  fontWeight: 700,
}