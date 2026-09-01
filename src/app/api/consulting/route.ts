import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const company = String(body.company || '').trim()
    const phone = String(body.phone || '').trim()
    const city = String(body.city || '').trim()
    const application = String(body.application || '').trim()

    if (!name || !email || !company || !phone || !city || !application) {
      return NextResponse.json(
        {
          error: 'Please fill in all required fields.'
        },
        {
          status: 400
        }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'Please enter a valid email address.'
        },
        {
          status: 400
        }
      )
    }

    // 1. Save request to Supabase
    const { error: supabaseError } = await supabase
      .from('consulting_requests')
      .insert({
        name,
        email,
        company,
        phone,
        city,
        application,
        status: 'new',
      })

    if (supabaseError) {
      console.error('SUPABASE ERROR:', supabaseError)

      return NextResponse.json(
        {
          error: 'Unable to save consulting request.'
        },
        {
          status: 500
        }
      )
    }

    // 2. Send notification email
    const { error: emailError } = await resend.emails.send({
      from: 'UVTechnic Website <onboarding@resend.dev>',

      to: ['ersel@agrimakina.com'],

      replyTo: email,

      subject: `New Consulting Request – ${company}`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:700px;
          margin:0 auto;
          color:#172033;
        ">

          <h2 style="
            margin-bottom:24px;
            color:#172033;
          ">
            New Consulting Request
          </h2>

          <table style="
            width:100%;
            border-collapse:collapse;
          ">

            <tr>
              <td style="
                padding:10px 0;
                font-weight:bold;
                width:140px;
              ">
                Name
              </td>

              <td style="padding:10px 0;">
                ${escapeHtml(name)}
              </td>
            </tr>

            <tr>
              <td style="
                padding:10px 0;
                font-weight:bold;
              ">
                Email
              </td>

              <td style="padding:10px 0;">
                ${escapeHtml(email)}
              </td>
            </tr>

            <tr>
              <td style="
                padding:10px 0;
                font-weight:bold;
              ">
                Company
              </td>

              <td style="padding:10px 0;">
                ${escapeHtml(company)}
              </td>
            </tr>

            <tr>
              <td style="
                padding:10px 0;
                font-weight:bold;
              ">
                Phone
              </td>

              <td style="padding:10px 0;">
                ${escapeHtml(phone)}
              </td>
            </tr>

            <tr>
              <td style="
                padding:10px 0;
                font-weight:bold;
              ">
                City
              </td>

              <td style="padding:10px 0;">
                ${escapeHtml(city)}
              </td>
            </tr>

          </table>

          <div style="margin-top:28px;">

            <h3>
              Application
            </h3>

            <div style="
              background:#f4f6f8;
              padding:18px;
              border-radius:6px;
              line-height:1.6;
              white-space:pre-wrap;
            ">
              ${escapeHtml(application)}
            </div>

          </div>

          <div style="
            margin-top:30px;
            padding-top:20px;
            border-top:1px solid #ddd;
            color:#777;
            font-size:12px;
          ">
            Submitted from the UVTechnic website.
          </div>

        </div>
      `,
    })

    if (emailError) {
      console.error('RESEND ERROR:', emailError)

      return NextResponse.json({
        success: true,
        emailSent: false,
      })
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
    })

  } catch (error) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      {
        error: 'Something went wrong.'
      },
      {
        status: 500
      }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}