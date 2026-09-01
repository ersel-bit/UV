import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const firstName = String(body.firstName || '').trim()
    const lastName = String(body.lastName || '').trim()
    const company = String(body.company || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const country = String(body.country || '').trim()
    const industry = String(body.industry || '').trim()
    const details = String(body.details || '').trim()
    const topic = String(body.topic || 'sales').trim()

    if (
      !firstName ||
      !lastName ||
      !company ||
      !email ||
      !phone ||
      !country ||
      !details
    ) {
      return NextResponse.json(
        {
          error: 'Please fill in all required fields.'
        },
        {
          status: 400
        }
      )
    }

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

    const topicLabels: Record<string, string> = {
      sales: 'Sales / Quote',
      support: 'Technical Support',
      procurement: 'Procurement / Spare Parts',
    }

    const topicLabel =
      topicLabels[topic] || topic

    const { error } = await resend.emails.send({
      from: 'UVTechnic Website <onboarding@resend.dev>',

      to: ['ersel@agrimakina.com'],

      replyTo: email,

      subject: `[${topicLabel}] Contact Request – ${company}`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:700px;
          margin:0 auto;
          color:#172033;
        ">

          <h2 style="margin-bottom:24px;">
            New Contact Request
          </h2>

          <div style="
            display:inline-block;
            background:#eafcff;
            color:#007d91;
            padding:7px 12px;
            border-radius:4px;
            font-size:12px;
            font-weight:bold;
            margin-bottom:22px;
          ">
            ${escapeHtml(topicLabel)}
          </div>

          <table style="
            width:100%;
            border-collapse:collapse;
          ">

            <tr>
              <td style="padding:9px 0;font-weight:bold;width:140px;">
                Name
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(firstName)} ${escapeHtml(lastName)}
              </td>
            </tr>

            <tr>
              <td style="padding:9px 0;font-weight:bold;">
                Email
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(email)}
              </td>
            </tr>

            <tr>
              <td style="padding:9px 0;font-weight:bold;">
                Company
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(company)}
              </td>
            </tr>

            <tr>
              <td style="padding:9px 0;font-weight:bold;">
                Phone
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(phone)}
              </td>
            </tr>

            <tr>
              <td style="padding:9px 0;font-weight:bold;">
                Country
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(country)}
              </td>
            </tr>

            <tr>
              <td style="padding:9px 0;font-weight:bold;">
                Industry
              </td>
              <td style="padding:9px 0;">
                ${escapeHtml(industry || 'Not specified')}
              </td>
            </tr>

          </table>

          <div style="margin-top:28px;">

            <h3>
              Details
            </h3>

            <div style="
              background:#f4f6f8;
              padding:18px;
              border-radius:6px;
              line-height:1.6;
              white-space:pre-wrap;
            ">
              ${escapeHtml(details)}
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

    if (error) {
      console.error('RESEND ERROR:', error)

      return NextResponse.json(
        {
          error: 'Unable to send your request. Please try again.'
        },
        {
          status: 500
        }
      )
    }

    return NextResponse.json({
      success: true,
    })

  } catch (error) {
    console.error('CONTACT API ERROR:', error)

    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again.'
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