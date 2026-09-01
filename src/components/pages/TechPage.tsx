'use client'

import { PageHero } from '@/components/ui'

export default function TechPage() {
  return (
    <div style={{marginTop:58}}>
      
      <PageHero
        tag="Technology"
        title="How UVC Disinfection Works"
      />

      {/* =====================================================
          UV SPECTRUM IMAGE
      ===================================================== */}

      <div style={{
        background:'#050f1a',
        padding:'32px 32px 0'
      }}>
        <div style={{
          maxWidth:980,
          margin:'0 auto'
        }}>
          <div style={{
            position:'relative',
            overflow:'hidden',
            borderRadius:2,
            border:'1px solid rgba(0,204,238,.15)'
          }}>
            <img
              src="/uv-spectrum.jpg"
              alt="UVA UVB UVC spectrum and germicidal effect"
              style={{
                width:'100%',
                display:'block'
              }}
            />
          </div>
        </div>
      </div>


      {/* =====================================================
          THE SCIENCE
      ===================================================== */}

      <div style={{
        maxWidth:980,
        margin:'0 auto',
        padding:'44px 32px'
      }}>

        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:48,
          marginBottom:52
        }}>

          <div>

            <h2 style={{
              fontFamily:'Rajdhani,sans-serif',
              fontSize:34,
              fontWeight:700,
              marginBottom:14
            }}>
              The Science
            </h2>

            {[
              'UVC radiation at 253.7 nm is absorbed by microbial DNA, causing irreparable thymine dimer formation. The organism cannot reproduce — permanently inactivated.',

              'No chemicals. No by-products. No resistance development. Purely photochemical — deterministic and immediate.',

              'Effective against bacteria, viruses, protozoa, fungi, and algae — including chlorine-resistant Cryptosporidium and Giardia.'
            ].map((t,i)=>(
              <p
                key={i}
                style={{
                  color:'#6a8aaa',
                  fontSize:14,
                  lineHeight:1.8,
                  marginBottom:12
                }}
              >
                {t}
              </p>
            ))}

          </div>


          {/* =====================================================
              GERMICIDAL UV SPECTRUM
          ===================================================== */}

          <div style={{
            background:'#091828',
            border:'1px solid rgba(0,204,238,.12)',
            padding:26,
            borderRadius:2
          }}>

            <div style={{
              fontFamily:'Rajdhani,sans-serif',
              fontSize:18,
              fontWeight:600,
              color:'#00ccee',
              marginBottom:18
            }}>
              Germicidal UV Spectrum
            </div>

            {[
              ['Vacuum UV','100–200 nm','Research',false],
              ['UV-C ★','200–280 nm','Germicidal',true],
              ['UV-B','280–315 nm','Sunburn',false],
              ['UV-A','315–400 nm','Near-visible',false]
            ].map(([n,r,note,a])=>(
              <div
                key={n as string}
                style={{
                  display:'flex',
                  gap:12,
                  alignItems:'center',
                  padding:'8px 0',
                  borderBottom:'1px solid rgba(0,204,238,.07)'
                }}
              >

                <div style={{
                  width:60,
                  fontSize:13,
                  fontWeight:a?700:400,
                  color:a?'#00ccee':'#6a8aaa'
                }}>
                  {n as string}
                </div>

                <div style={{
                  width:80,
                  fontSize:11.5,
                  color:'#6a8aaa'
                }}>
                  {r as string}
                </div>

                <div style={{
                  flex:1,
                  height:7,
                  background:a
                    ? 'rgba(0,204,238,.4)'
                    : 'rgba(106,138,170,.1)',
                  borderRadius:3
                }}/>

                <div style={{
                  fontSize:11,
                  color:a?'#00ccee':'#6a8aaa',
                  minWidth:80,
                  textAlign:'right'
                }}>
                  {note as string}
                </div>

              </div>
            ))}

          </div>

        </div>


        {/* =====================================================
            UV DOSE VALIDATION
        ===================================================== */}

        <h2 style={{
          fontFamily:'Rajdhani,sans-serif',
          fontSize:34,
          fontWeight:700,
          marginBottom:14
        }}>
          UV Dose Validation
        </h2>

        <p style={{
          color:'#6a8aaa',
          fontSize:14,
          lineHeight:1.8,
          marginBottom:20
        }}>
          Every UVTechnic water system is validated to deliver a minimum{' '}
          <b style={{color:'#eaf4ff'}}>
            400 J/m²
          </b>{' '}
          under worst-case conditions: 60% end-of-life lamp output and 70%
          minimum UV transmittance.
        </p>


        <div style={{
          background:'#091828',
          border:'1px solid rgba(0,204,238,.12)',
          padding:26,
          borderRadius:2
        }}>

          {[
            ['Step 1','Reactor geometry','Inner diameter × lamp length → projected irradiation area'],
            ['Step 2','Contact time','Internal volume ÷ flow rate → exposure time (s)'],
            ['Step 3','Irradiance','UVC output ÷ projected area → W/m²'],
            ['Step 4','Raw dose','Irradiance × contact time → J/m²'],
            ['Step 5','Lamp aging','× 0.60 — end-of-life factor'],
            ['Step 6','Transmittance','× 0.70 — worst-case fluid UV transmittance'],
            ['Step 7','Validation','Result ≥ 400 J/m² required ✓']
          ].map(([s,h,d])=>(
            <div
              key={s}
              style={{
                display:'flex',
                gap:16,
                padding:'9px 0',
                borderBottom:'1px solid rgba(0,204,238,.07)'
              }}
            >

              <div style={{
                width:52,
                fontFamily:'Rajdhani,sans-serif',
                fontSize:13,
                fontWeight:700,
                color:'#00ccee',
                flexShrink:0
              }}>
                {s}
              </div>

              <div style={{
                width:160,
                fontSize:13,
                fontWeight:600,
                color:'#eaf4ff',
                flexShrink:0
              }}>
                {h}
              </div>

              <div style={{
                fontSize:13,
                color:'#6a8aaa',
                lineHeight:1.6
              }}>
                {d}
              </div>

            </div>
          ))}

        </div>

      </div>


      {/* =====================================================
          RESPONSIVE
      ===================================================== */}

      <style jsx>{`

        @media (max-width: 760px) {

          section {
            scroll-margin-top:58px;
          }

          div {
            box-sizing:border-box;
          }

        }

        @media (max-width: 700px) {

          h2 {
            font-size:30px !important;
          }

        }

        @media (max-width: 600px) {

          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns:1fr !important;
          }

        }

      `}</style>

    </div>
  )
}