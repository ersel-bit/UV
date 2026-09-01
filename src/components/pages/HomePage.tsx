'use client'

import { useState, useEffect } from 'react'
import type { SiteSettings, Industry, WhyCard } from '@/types'
import { SectionTag } from '@/components/ui'

interface Props {
  settings: SiteSettings
  onNav: (p:string) => void
}

const FB_WHY: WhyCard[] = [
  {id:'1',number:'01',heading:'Manufactured in İzmir',body:'2,500 m² facility — full fabrication, electrical assembly, and UV performance testing. Every system tested before dispatch.',sort_order:1,is_active:true},
  {id:'2',number:'02',heading:'Real Technical Support',body:'Same timezone. Same language. On-site support. Full warranty and lifetime after-sales as standard.',sort_order:2,is_active:true},
  {id:'3',number:'03',heading:'Ready for Turkish Tenders',body:'CE, ISO 9001, 14001, 45001 certified domestic manufacturer. Qualifies for public procurement.',sort_order:3,is_active:true},
  {id:'4',number:'04',heading:'European Component Standards',body:'European UVC lamps, precision quartz, certified ballasts — engineered to European technical standards.',sort_order:4,is_active:true},
]

const FB_IND: Industry[] = [
  {id:'1',icon:'🐟',name:'Aquaculture',description:'RAS, fish, mussel, shrimp',sort_order:1,is_active:true},
  {id:'2',icon:'💧',name:'Drinking Water',description:'Municipal, wells, bottling',sort_order:2,is_active:true},
  {id:'3',icon:'🏊',name:'Pool & Spa',description:'Hotels, thermal, hot tubs',sort_order:3,is_active:true},
  {id:'4',icon:'🏥',name:'Healthcare',description:'Air, surface, rooms',sort_order:4,is_active:true},
  {id:'5',icon:'🥛',name:'Dairy & Food',description:'Milk, cheese, meat',sort_order:5,is_active:true},
  {id:'6',icon:'🍺',name:'Beverage',description:'Beer, juice, process water',sort_order:6,is_active:true},
  {id:'7',icon:'💊',name:'Pharmaceutical',description:'Ultra-pure water, HVAC',sort_order:7,is_active:true},
  {id:'8',icon:'🌱',name:'Agriculture',description:'Irrigation, greenhouses',sort_order:8,is_active:true},
  {id:'9',icon:'🐄',name:'Livestock',description:'Water and air treatment',sort_order:9,is_active:true},
  {id:'10',icon:'🏭',name:'Industrial',description:'Cooling towers, process',sort_order:10,is_active:true},
  {id:'11',icon:'🏨',name:'Hospitality',description:'Pools, legionella, HVAC',sort_order:11,is_active:true},
  {id:'12',icon:'♻️',name:'Wastewater',description:'Tertiary, reuse, effluent',sort_order:12,is_active:true},
]

const APPLICATIONS = [
  {
    name:'Aquaculture',
    image:'/application-aquaculture.jpeg',
    text:'Continuous pathogen control for recirculating aquaculture systems.'
  },
  {
    name:'Drinking Water',
    image:'/application-drinking-water.jpeg',
    text:'Reliable chemical-free disinfection for municipal and commercial water.'
  },
  {
    name:'Food & Beverage',
    image:'/application-food-beverage.jpeg',
    text:'Process water and surface disinfection for demanding production environments.'
  },
  {
    name:'Pool & Spa',
    image:'/application-pool-spa.jpeg',
    text:'Advanced UVC treatment for pools, hotels, spas and thermal facilities.'
  },
  {
    name:'Horticulture',
    image:'/application-horticulture.jpeg',
    text:'UVC protection for irrigation and nutrient solution recirculation.'
  },
  {
    name:'Cooling Towers',
    image:'/application-cooling-towers.jpeg',
    text:'Continuous control of Legionella and biofilm in industrial water loops.'
  },
]

const SYSTEMS = [
  {
    number:'01',
    title:'Closed Vessel UV',
    text:'Inline UVC reactors for water disinfection from compact commercial systems to high-flow industrial installations.',
    image:'/closed-vessel.jpg'
  },
  {
    number:'02',
    title:'Open Channel UV',
    text:'High-capacity UV systems for municipal, wastewater and large-volume water treatment.',
    image:'/open-channel.jpg'
  },
  {
    number:'03',
    title:'Air & Surface UV',
    text:'Engineered UVC solutions for HVAC, rooms, surfaces and continuous conveyor disinfection.',
    image:'/air-surface.jpg'
  },
]

export default function HomePage({ settings:s, onNav }: Props) {

  const [why,setWhy] = useState<WhyCard[]>(FB_WHY)
  const [inds,setInds] = useState<Industry[]>(FB_IND)
  const [activeSystem,setActiveSystem] = useState(0)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url==='your-project-url') return

    import('@/lib/data').then(({getWhyCards,getIndustries}) => {
      getWhyCards().then(setWhy).catch(console.error)
      getIndustries().then(setInds).catch(console.error)
    })
  },[])

  const stats = [
    [s.years_experience,'Years Experience'],
    [s.systems_installed,'Systems Installed'],
    [s.projects,'Projects'],
    [s.industries,'Industries'],
    [s.countries,'Countries']
  ]

  return (
    <div style={{background:'#050f1a',color:'#eaf4ff'}}>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section style={{
        minHeight:'calc(100vh - 58px)',
        marginTop:58,
        position:'relative',
        overflow:'hidden',
        display:'flex',
        alignItems:'center',
        background:'#050f1a'
      }}>

        {/* Background glow */}
        <div style={{
          position:'absolute',
          inset:0,
          background:
            'radial-gradient(circle at 75% 50%,rgba(0,204,238,.10),transparent 32%),linear-gradient(100deg,#050f1a 0%,#071522 55%,#050f1a 100%)'
        }}/>

        {/* Video */}
        <div style={{
          position:'absolute',
          right:'-4%',
          top:0,
          width:'65%',
          height:'100%',
          overflow:'hidden',
          opacity:.95
        }}>

          <video
            src="/technology-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            style={{
              width:'100%',
              height:'100%',
              objectFit:'cover',
              display:'block'
            }}
          />

          {/* Video fade */}
          <div style={{
            position:'absolute',
            inset:0,
            background:
              'linear-gradient(90deg,#050f1a 0%,rgba(5,15,26,.88) 8%,rgba(5,15,26,.25) 42%,rgba(5,15,26,.05) 75%,#050f1a 100%)'
          }}/>

          <div style={{
            position:'absolute',
            inset:0,
            background:
              'linear-gradient(0deg,#050f1a 0%,transparent 20%,transparent 80%,#050f1a 100%)'
          }}/>
        </div>

        {/* Hero content */}
        <div style={{
          position:'relative',
          zIndex:2,
          width:'100%',
          maxWidth:1280,
          margin:'0 auto',
          padding:'80px 42px'
        }}>

          <div style={{
            maxWidth:650
          }}>

            <div style={{
              display:'inline-flex',
              alignItems:'center',
              gap:8,
              background:'rgba(0,204,238,.07)',
              border:'1px solid rgba(0,204,238,.25)',
              borderRadius:100,
              padding:'6px 14px',
              fontSize:10,
              letterSpacing:2,
              textTransform:'uppercase',
              color:'#00ccee',
              fontWeight:600,
              marginBottom:28
            }}>
              <span style={{
                width:6,
                height:6,
                borderRadius:'50%',
                background:'#00ccee',
                display:'inline-block'
              }}/>
              Engineered UVC Disinfection Systems
            </div>

            <h1 style={{
              fontFamily:'Rajdhani,sans-serif',
              fontSize:'clamp(54px,7vw,92px)',
              lineHeight:.86,
              letterSpacing:-2,
              fontWeight:700,
              margin:'0 0 28px'
            }}>
              <span style={{
                display:'block',
                color:'#eaf4ff'
              }}>
                {s.hero_headline_1}
              </span>

              <span style={{
                display:'block',
                color:'#00ccee'
              }}>
                {s.hero_headline_2}
              </span>

              <span style={{
                display:'block',
                color:'rgba(234,244,255,.38)',
                fontWeight:400,
                fontSize:'clamp(34px,4vw,52px)',
                marginTop:7
              }}>
                {s.hero_headline_3}
              </span>
            </h1>

            <p style={{
              maxWidth:550,
              fontSize:16,
              lineHeight:1.8,
              color:'#8aa1b8',
              fontWeight:300,
              marginBottom:32
            }}>
              {s.hero_subtext}
            </p>

            <div style={{
              display:'flex',
              gap:12,
              flexWrap:'wrap'
            }}>

              <button
                onClick={()=>onNav('products')}
                style={{
                  background:'#00ccee',
                  color:'#050f1a',
                  border:'none',
                  padding:'14px 28px',
                  fontFamily:'Rajdhani,sans-serif',
                  fontWeight:700,
                  fontSize:13,
                  letterSpacing:1.5,
                  cursor:'pointer',
                  borderRadius:2
                }}
              >
                EXPLORE SYSTEMS →
              </button>

              <button
                onClick={()=>onNav('contact')}
                style={{
                  background:'rgba(5,15,26,.35)',
                  color:'#eaf4ff',
                  border:'1px solid rgba(234,244,255,.22)',
                  padding:'14px 28px',
                  fontFamily:'Rajdhani,sans-serif',
                  fontWeight:600,
                  fontSize:13,
                  letterSpacing:1.5,
                  cursor:'pointer',
                  borderRadius:2
                }}
              >
                REQUEST A QUOTE
              </button>

            </div>

          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div style={{
          position:'absolute',
          bottom:24,
          left:42,
          zIndex:3,
          display:'flex',
          alignItems:'center',
          gap:10,
          color:'#536b82',
          fontSize:9,
          letterSpacing:2,
          textTransform:'uppercase'
        }}>
          <span style={{
            width:32,
            height:1,
            background:'#00ccee',
            display:'block'
          }}/>
          Scroll to explore
        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section style={{
        borderTop:'1px solid rgba(0,204,238,.10)',
        borderBottom:'1px solid rgba(0,204,238,.10)',
        background:'#091828'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'repeat(5,1fr)'
        }}>

          {stats.map(([n,l],i)=>(
            <div
              key={l}
              style={{
                textAlign:'center',
                padding:'25px 12px',
                borderRight:i<4?'1px solid rgba(0,204,238,.10)':'none'
              }}
            >
              <div style={{
                fontFamily:'Rajdhani,sans-serif',
                fontSize:36,
                fontWeight:700,
                color:'#00ccee'
              }}>
                {n}
              </div>

              <div style={{
                fontSize:9,
                letterSpacing:1.6,
                textTransform:'uppercase',
                color:'#657d95',
                marginTop:3
              }}>
                {l}
              </div>
            </div>
          ))}

        </div>
      </section>


      {/* =====================================================
          FIND YOUR SOLUTION
      ===================================================== */}

      <section style={{
        background:'#050f1a',
        padding:'100px 32px'
      }}>

        <div style={{
          maxWidth:1100,
          margin:'0 auto'
        }}>

          <SectionTag>Find Your Solution</SectionTag>

          <div style={{
            display:'flex',
            justifyContent:'space-between',
            gap:30,
            alignItems:'end',
            flexWrap:'wrap'
          }}>

            <div>
              <h2 style={{
                fontFamily:'Rajdhani,sans-serif',
                fontSize:'clamp(36px,5vw,56px)',
                lineHeight:.95,
                margin:'0 0 14px'
              }}>
                The Right UVC System<br/>
                <span style={{color:'#00ccee'}}>Starts With Your Application.</span>
              </h2>

              <p style={{
                color:'#6a8aaa',
                maxWidth:570,
                lineHeight:1.75,
                fontSize:14
              }}>
                Water, air or surface — tell us what you need to disinfect
                and our engineering team will guide you to the right system.
              </p>
            </div>

            <button
              onClick={()=>onNav('contact')}
              style={{
                background:'#00ccee',
                color:'#050f1a',
                border:'none',
                padding:'13px 24px',
                fontFamily:'Rajdhani,sans-serif',
                fontWeight:700,
                fontSize:12,
                letterSpacing:1.5,
                cursor:'pointer',
                whiteSpace:'nowrap'
              }}
            >
              ENGINEERING REVIEW →
            </button>

          </div>


          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(3,1fr)',
            gap:12,
            marginTop:42
          }}>

            {[
              ['01','APPLICATION',['Water Treatment','Air Disinfection','Surface / Conveyor','Not sure']],
              ['02','CAPACITY',['Under 10 m³/h','10–100 m³/h','100–400 m³/h','400+ m³/h']],
              ['03','MATERIAL',['HDPE / Plastic','Stainless 304','Stainless 316','Let manufacturer decide']]
            ].map(([num,title,options])=>(
              <div
                key={title as string}
                style={{
                  background:'#091828',
                  border:'1px solid rgba(0,204,238,.10)',
                  padding:24,
                  minHeight:190
                }}
              >

                <div style={{
                  color:'#00ccee',
                  fontFamily:'Rajdhani,sans-serif',
                  fontSize:12,
                  fontWeight:700,
                  marginBottom:14
                }}>
                  {num} / {title}
                </div>

                {(options as string[]).map(o=>(
                  <label
                    key={o}
                    style={{
                      display:'flex',
                      alignItems:'center',
                      gap:9,
                      color:'#7890a7',
                      fontSize:12,
                      padding:'6px 0',
                      cursor:'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name={title as string}
                      style={{accentColor:'#00ccee'}}
                    />
                    {o}
                  </label>
                ))}

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          SYSTEMS
      ===================================================== */}

      <section style={{
        background:'#091828',
        padding:'100px 32px',
        borderTop:'1px solid rgba(0,204,238,.08)',
        borderBottom:'1px solid rgba(0,204,238,.08)'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto'
        }}>

          <SectionTag>Our Systems</SectionTag>

          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1.35fr',
            gap:42,
            alignItems:'center'
          }}>

            <div>

              <h2 style={{
                fontFamily:'Rajdhani,sans-serif',
                fontSize:48,
                lineHeight:.95,
                margin:'0 0 18px'
              }}>
                Engineered for<br/>
                <span style={{color:'#00ccee'}}>Real Applications.</span>
              </h2>

              <p style={{
                color:'#6a8aaa',
                fontSize:14,
                lineHeight:1.8,
                marginBottom:30
              }}>
                From compact commercial installations to high-flow industrial
                treatment, UVTechnic builds complete UVC systems around your
                process requirements.
              </p>

              {SYSTEMS.map((system,i)=>(
                <div
                  key={system.number}
                  onClick={()=>setActiveSystem(i)}
                  style={{
                    padding:'15px 0',
                    borderBottom:'1px solid rgba(0,204,238,.10)',
                    cursor:'pointer',
                    display:'flex',
                    gap:16,
                    alignItems:'center'
                  }}
                >

                  <div style={{
                    fontFamily:'Rajdhani,sans-serif',
                    color:i===activeSystem?'#00ccee':'#41566c',
                    fontSize:13,
                    fontWeight:700
                  }}>
                    {system.number}
                  </div>

                  <div style={{
                    fontFamily:'Rajdhani,sans-serif',
                    fontSize:18,
                    fontWeight:600,
                    color:i===activeSystem?'#eaf4ff':'#71869b'
                  }}>
                    {system.title}
                  </div>

                  <div style={{
                    marginLeft:'auto',
                    color:'#00ccee',
                    opacity:i===activeSystem?1:0
                  }}>
                    →
                  </div>

                </div>
              ))}

              <button
                onClick={()=>onNav('products')}
                style={{
                  marginTop:28,
                  background:'transparent',
                  border:'1px solid rgba(0,204,238,.35)',
                  color:'#00ccee',
                  padding:'11px 22px',
                  fontFamily:'Rajdhani,sans-serif',
                  fontWeight:700,
                  letterSpacing:1.3,
                  fontSize:11,
                  cursor:'pointer'
                }}
              >
                VIEW ALL PRODUCTS →
              </button>

            </div>


            <div style={{
              position:'relative',
              height:520,
              overflow:'hidden',
              background:'#050f1a',
              border:'1px solid rgba(0,204,238,.12)'
            }}>

              {SYSTEMS.map((system,i)=>(
                <div
                  key={system.number}
                  style={{
                    position:'absolute',
                    inset:0,
                    opacity:i===activeSystem?1:0,
                    transition:'opacity .35s',
                    pointerEvents:i===activeSystem?'auto':'none'
                  }}
                >

                  <img
                    src={system.image}
                    alt={system.title}
                    style={{
                      width:'100%',
                      height:'100%',
                      objectFit:'cover'
                    }}
                  />

                  <div style={{
                    position:'absolute',
                    inset:0,
                    background:'linear-gradient(0deg,rgba(5,15,26,.9),transparent 55%)'
                  }}/>

                  <div style={{
                    position:'absolute',
                    left:24,
                    right:24,
                    bottom:24
                  }}>

                    <div style={{
                      color:'#00ccee',
                      fontSize:10,
                      letterSpacing:2,
                      textTransform:'uppercase',
                      marginBottom:6
                    }}>
                      UVTechnic System
                    </div>

                    <div style={{
                      fontFamily:'Rajdhani,sans-serif',
                      fontSize:30,
                      fontWeight:700,
                      marginBottom:6
                    }}>
                      {system.title}
                    </div>

                    <div style={{
                      color:'#9aafc3',
                      fontSize:13,
                      lineHeight:1.6,
                      maxWidth:600
                    }}>
                      {system.text}
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          APPLICATIONS
      ===================================================== */}

      <section style={{
        background:'#050f1a',
        padding:'100px 32px'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto'
        }}>

          <SectionTag>Applications</SectionTag>

          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'end',
            gap:20,
            marginBottom:35,
            flexWrap:'wrap'
          }}>

            <div>
              <h2 style={{
                fontFamily:'Rajdhani,sans-serif',
                fontSize:48,
                lineHeight:.95,
                margin:0
              }}>
                UVC Where It<br/>
                <span style={{color:'#00ccee'}}>Matters Most.</span>
              </h2>
            </div>

            <button
              onClick={()=>onNav('applications')}
              style={{
                background:'transparent',
                border:'1px solid rgba(0,204,238,.30)',
                color:'#00ccee',
                padding:'11px 22px',
                fontFamily:'Rajdhani,sans-serif',
                fontWeight:700,
                fontSize:11,
                letterSpacing:1.3,
                cursor:'pointer'
              }}
            >
              ALL APPLICATIONS →
            </button>

          </div>


          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(3,1fr)',
            gap:14
          }}>

            {APPLICATIONS.map((app,i)=>(
              <div
                key={app.name}
                onClick={()=>onNav('applications')}
                style={{
                  position:'relative',
                  height:280,
                  overflow:'hidden',
                  cursor:'pointer',
                  background:'#091828',
                  border:'1px solid rgba(0,204,238,.08)'
                }}
              >

                <img
                  src={app.image}
                  alt={app.name}
                  style={{
                    width:'100%',
                    height:'100%',
                    objectFit:'cover',
                    display:'block',
                    transition:'transform .5s'
                  }}
                />

                <div style={{
                  position:'absolute',
                  inset:0,
                  background:'linear-gradient(0deg,rgba(5,15,26,.95),rgba(5,15,26,.05) 70%)'
                }}/>

                <div style={{
                  position:'absolute',
                  left:20,
                  right:20,
                  bottom:18
                }}>

                  <div style={{
                    color:'#00ccee',
                    fontSize:9,
                    letterSpacing:1.7,
                    textTransform:'uppercase',
                    marginBottom:5
                  }}>
                    Application {String(i+1).padStart(2,'0')}
                  </div>

                  <div style={{
                    fontFamily:'Rajdhani,sans-serif',
                    fontSize:24,
                    fontWeight:700,
                    marginBottom:5
                  }}>
                    {app.name}
                  </div>

                  <div style={{
                    color:'#91a5b9',
                    fontSize:11.5,
                    lineHeight:1.5
                  }}>
                    {app.text}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section style={{
        background:'#091828',
        padding:'100px 32px',
        borderTop:'1px solid rgba(0,204,238,.08)'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:55,
          alignItems:'center'
        }}>

          <div>

            <SectionTag>Technology</SectionTag>

            <h2 style={{
              fontFamily:'Rajdhani,sans-serif',
              fontSize:52,
              lineHeight:.95,
              margin:'0 0 20px'
            }}>
              The Science<br/>
              <span style={{color:'#00ccee'}}>Behind UVC.</span>
            </h2>

            <p style={{
              color:'#6a8aaa',
              fontSize:14,
              lineHeight:1.8,
              maxWidth:500,
              marginBottom:26
            }}>
              UVC radiation at 253.7 nm disrupts microbial DNA and prevents
              microorganisms from reproducing. No chemicals, no residues and
              no chemical by-products.
            </p>

            <div style={{
              display:'flex',
              gap:10,
              marginBottom:28,
              flexWrap:'wrap'
            }}>

              {[
                ['UV-A','315–400 nm'],
                ['UV-B','280–315 nm'],
                ['UV-C','200–280 nm']
              ].map(([n,r])=>(
                <div
                  key={n}
                  style={{
                    padding:'12px 16px',
                    border:'1px solid rgba(0,204,238,.13)',
                    background:'#050f1a'
                  }}
                >
                  <div style={{
                    fontFamily:'Rajdhani,sans-serif',
                    color:n==='UV-C'?'#00ccee':'#eaf4ff',
                    fontWeight:700,
                    fontSize:17
                  }}>
                    {n}
                  </div>

                  <div style={{
                    color:'#617991',
                    fontSize:10,
                    marginTop:3
                  }}>
                    {r}
                  </div>
                </div>
              ))}

            </div>

            <button
              onClick={()=>onNav('technology')}
              style={{
                background:'#00ccee',
                color:'#050f1a',
                border:'none',
                padding:'12px 24px',
                fontFamily:'Rajdhani,sans-serif',
                fontWeight:700,
                fontSize:11,
                letterSpacing:1.4,
                cursor:'pointer'
              }}
            >
              EXPLORE TECHNOLOGY →
            </button>

          </div>


          <div style={{
            position:'relative',
            aspectRatio:'16/9',
            overflow:'hidden',
            border:'1px solid rgba(0,204,238,.14)'
          }}>

            <div style={{
              position:'absolute',
              inset:0,
              background:'radial-gradient(circle,rgba(0,204,238,.15),transparent 65%)',
              zIndex:1,
              pointerEvents:'none'
            }}/>

            <img
              src="/uv-spectrum.jpg"
              alt="UVA UVB UVC spectrum"
              style={{
                width:'100%',
                height:'100%',
                objectFit:'cover'
              }}
              onError={(e)=>{
                e.currentTarget.style.display='none'
              }}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY UVTECHNIC
      ===================================================== */}

      <section style={{
        background:'#050f1a',
        padding:'100px 32px'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto'
        }}>

          <SectionTag>Why UVTechnic</SectionTag>

          <h2 style={{
            fontFamily:'Rajdhani,sans-serif',
            fontSize:50,
            lineHeight:.95,
            margin:'0 0 42px'
          }}>
            European Technology.<br/>
            <span style={{color:'#00ccee'}}>Made in Turkey.</span>
          </h2>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:12
          }}>

            {why.map(w=>(
              <div
                key={w.id}
                style={{
                  background:'#091828',
                  border:'1px solid rgba(0,204,238,.08)',
                  padding:24,
                  minHeight:235
                }}
              >

                <div style={{
                  fontFamily:'Rajdhani,sans-serif',
                  fontSize:42,
                  fontWeight:700,
                  color:'rgba(0,204,238,.16)',
                  lineHeight:1,
                  marginBottom:15
                }}>
                  {w.number}
                </div>

                <div style={{
                  fontFamily:'Rajdhani,sans-serif',
                  fontSize:20,
                  fontWeight:700,
                  marginBottom:8
                }}>
                  {w.heading}
                </div>

                <div style={{
                  color:'#6a8aaa',
                  fontSize:12.5,
                  lineHeight:1.7
                }}>
                  {w.body}
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section style={{
        background:'#091828',
        padding:'100px 32px',
        borderTop:'1px solid rgba(0,204,238,.08)'
      }}>

        <div style={{
          maxWidth:1200,
          margin:'0 auto'
        }}>

          <SectionTag>Industries We Serve</SectionTag>

          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'end',
            gap:20,
            flexWrap:'wrap'
          }}>

            <h2 style={{
              fontFamily:'Rajdhani,sans-serif',
              fontSize:48,
              lineHeight:.95,
              margin:0
            }}>
              One Technology.<br/>
              <span style={{color:'#00ccee'}}>Many Applications.</span>
            </h2>

            <button
              onClick={()=>onNav('applications')}
              style={{
                background:'transparent',
                border:'1px solid rgba(0,204,238,.30)',
                color:'#00ccee',
                padding:'11px 22px',
                fontFamily:'Rajdhani,sans-serif',
                fontWeight:700,
                fontSize:11,
                letterSpacing:1.3,
                cursor:'pointer'
              }}
            >
              EXPLORE APPLICATIONS →
            </button>

          </div>


          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:9,
            marginTop:38
          }}>

            {inds.map(ind=>(
              <div
                key={ind.id}
                style={{
                  background:'#050f1a',
                  border:'1px solid rgba(0,204,238,.07)',
                  padding:'20px 16px',
                  minHeight:115,
                  transition:'border .2s'
                }}
              >

                <div style={{
                  fontSize:20,
                  marginBottom:8
                }}>
                  {ind.icon}
                </div>

                <div style={{
                  fontFamily:'Rajdhani,sans-serif',
                  fontSize:15,
                  fontWeight:600,
                  marginBottom:3
                }}>
                  {ind.name}
                </div>

                <div style={{
                  fontSize:10.5,
                  color:'#60778e'
                }}>
                  {ind.description}
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section style={{
        position:'relative',
        overflow:'hidden',
        padding:'105px 32px',
        textAlign:'center',
        background:'#050f1a',
        borderTop:'1px solid rgba(0,204,238,.10)'
      }}>

        <div style={{
          position:'absolute',
          width:600,
          height:600,
          borderRadius:'50%',
          left:'50%',
          top:'50%',
          transform:'translate(-50%,-50%)',
          background:'radial-gradient(circle,rgba(0,204,238,.08),transparent 65%)',
          pointerEvents:'none'
        }}/>

        <div style={{
          position:'relative',
          zIndex:1
        }}>

          <SectionTag>Engineering Review</SectionTag>

          <h2 style={{
            fontFamily:'Rajdhani,sans-serif',
            fontSize:'clamp(42px,6vw,68px)',
            lineHeight:.9,
            margin:'0 0 18px'
          }}>
            Have a Water, Air or<br/>
            <span style={{color:'#00ccee'}}>Surface Challenge?</span>
          </h2>

          <p style={{
            maxWidth:540,
            margin:'0 auto 32px',
            color:'#6a8aaa',
            fontSize:14,
            lineHeight:1.8
          }}>
            Tell us about your application. Our engineers will review the
            process and recommend the right UVC system.
          </p>

          <button
            onClick={()=>onNav('contact')}
            style={{
              background:'#00ccee',
              color:'#050f1a',
              border:'none',
              padding:'15px 32px',
              fontFamily:'Rajdhani,sans-serif',
              fontWeight:700,
              fontSize:13,
              letterSpacing:1.6,
              cursor:'pointer'
            }}
          >
            REQUEST ENGINEERING REVIEW →
          </button>

        </div>

      </section>


      {/* =====================================================
          RESPONSIVE
      ===================================================== */}

      <style jsx>{`

        @media (max-width: 900px) {

          section {
            scroll-margin-top:58px;
          }

        }

        @media (max-width: 760px) {

          h1 {
            font-size:54px !important;
          }

          section {
            padding-left:20px !important;
            padding-right:20px !important;
          }

          section:first-child {
            min-height:calc(100vh - 58px) !important;
          }

          section:first-child > div:nth-child(3) {
            width:100% !important;
            right:0 !important;
            opacity:.28 !important;
          }

          section:first-child > div:nth-child(4) {
            padding-left:0 !important;
            padding-right:0 !important;
          }

          section:nth-of-type(2) > div {
            grid-template-columns:repeat(2,1fr) !important;
          }

          section:nth-of-type(3) > div > div:nth-child(2),
          section:nth-of-type(5) > div,
          section:nth-of-type(6) > div,
          section:nth-of-type(7) > div {
            grid-template-columns:1fr !important;
          }

          section:nth-of-type(4) > div > div:last-child {
            height:360px !important;
          }

          section:nth-of-type(6) > div > div:last-child {
            margin-top:20px;
          }

          section:nth-of-type(7) > div > div:last-child {
            grid-template-columns:repeat(2,1fr) !important;
          }

        }

        @media (max-width: 480px) {

          section:nth-of-type(2) > div {
            grid-template-columns:1fr !important;
          }

          section:nth-of-type(7) > div > div:last-child {
            grid-template-columns:1fr !important;
          }

          h2 {
            font-size:40px !important;
          }

        }

      `}</style>

    </div>
  )
}