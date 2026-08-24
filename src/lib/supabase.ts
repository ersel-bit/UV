import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (typeof window !== 'undefined') {
  console.log('SUPABASE URL EXISTS:', !!url)
  console.log('SUPABASE KEY EXISTS:', !!key)
  console.log('SUPABASE URL:', url)
}

console.log('[SUPABASE CONFIG]', {
  urlPresent: Boolean(url),
  keyPresent: Boolean(key),
})

export const supabase = createClient(url, key)

export const supabaseAdmin = createClient(
  url,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
)