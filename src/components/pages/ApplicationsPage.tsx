'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'

const APPS = [
  {id:'APP-01',tag:'Food & Beverage',title:'UVC Disinfection in Food & Beverage Production',sector:'Food & Bev',
   intro:'From dairy to brewing to packaged goods, UVC is the chemical-free solution for continuous process water and surface disinfection.',
   body:`Food and beverage manufacturers face constant pressure to maintain hygiene standards while eliminating chemical residues. UVC at 253.7 nm inactivates bacteria, mould, yeast, and viruses without introducing any chemistry into the water stream or onto product-contact surfaces.

Process water treatment: Closed vessel LP reactors installed inline on the incoming water feed ensure that every litre entering the production line meets strict microbiological limits — without the chlorine taste or trihalomethane formation.

Conveyor and surface disinfection: CU-B belt disinfection units mounted beneath the return run continuously sterilise the belt on every cycle. CU-P product tunnels expose packaged product to a controlled UV dose before dispatch.`,
   systems:'PE / PP / SS Closed Vessel · CU Conveyor · DC-AIR HVAC Cassette'},
  {id:'APP-02',tag:'Aquaculture',title:'Recirculating Aquaculture Systems (RAS)',sector:'Aquaculture',
   intro:'RAS operations require pathogen-free water at every recirculation cycle. UVC is the global standard for fish, mussel, and shrimp farming.',
   body:`In recirculating aquaculture systems, water is reused at 95–99% efficiency — making biological contamination control critical. UVC provides continuous, chemical-free disinfection that does not accumulate in the water body or affect fish biology.

LP reactors are typically installed on the return line after mechanical filtration and biological treatment. The target dose for Aeromonas, Vibrio, and key aquaculture pathogens is 40–60 mJ/cm².

For mussel, oyster, and bivalve depuration, OC open-channel systems or DS/DM immersion radiators are used in holding tanks to achieve the log-reduction counts required by EU food safety regulation.`,
   systems:'PE / PP Closed Vessel · OC Open Channel · DS / DM / DC Immersion'},
  {id:'APP-03',tag:'Cooling Towers',title:'Cooling Tower Water Treatment',sector:'Industrial',
   intro:'UVC eliminates Legionella and biofilm in cooling water loops — without the chemical handling and discharge costs of biocide programmes.',
   body:`Cooling towers are among the highest-risk environments for Legionella pneumophila proliferation. Water temperatures in the 25–45°C range, combined with nutrient-rich water and large surface areas, create ideal conditions for biofilm growth.

UVC systems installed on the cooling water return line provide continuous disinfection at every recirculation pass. Unlike biocide programmes, UVC does not generate disinfection by-products or require chemical storage, handling, or discharge permits.

For large cooling towers, SS316 closed vessel reactors (SS-60 to SS-400) are used. The system can be integrated with the existing PLC/BMS via 4-20mA or Modbus RTU.`,
   systems:'SS / SM Closed Vessel · OC Open Channel'},
  {id:'APP-04',tag:'Pool & Spa',title:'Swimming Pool and Spa Water Disinfection',sector:'Hotel & Pool',
   intro:'UVC reduces chlorine demand by 60–80%, eliminates chloramines, and provides 4-log disinfection against chlorine-resistant pathogens.',
   body:`Chlorine alone cannot fully control Cryptosporidium and Giardia. UV exposure at 40 mJ/cm² is the only validated method for Cryptosporidium inactivation at standard pool chlorine levels.

Beyond pathogen control, UVC photolysis destroys chloramines — the compounds responsible for the characteristic pool smell and swimmer eye/skin irritation. This allows operators to maintain the same disinfection standard with 40–60% less chlorine.

For hotels and resorts, PE series inline reactors are the standard choice. For thermal and hot-tub applications, SS316 (SM series) is recommended for elevated-temperature operation.`,
   systems:'PE / SS / SM Closed Vessel'},
  {id:'APP-05',tag:'Horticulture',title:'Greenhouse and Irrigation Water Disinfection',sector:'Agriculture',
   intro:'UVC eliminates Pythium, Fusarium, and other water-borne pathogens from irrigation and nutrient solution recirculation without phytotoxic residues.',
   body:`In greenhouse and hydroponic growing operations, irrigation water and nutrient solution recirculation are primary vectors for root disease. Chemical fungicide programmes face increasing regulatory restrictions and resistance development.

UVC provides a chemical-free alternative that leaves zero residue on produce and integrates directly into recirculation pipework. PE series closed vessel reactors are installed inline on the return leg of the nutrient solution circuit.

For large greenhouse operations with multiple growing zones, a central UVC station feeding sub-circuits is the most economical configuration.`,
   systems:'PE / PP Closed Vessel · DS / DM Immersion'},
  {id:'APP-06',tag:'Livestock',title:'Livestock Drinking Water Treatment',sector:'Livestock',
   intro:'Clean drinking water is directly correlated with feed conversion, growth rate, and antibiotic dependency in poultry, swine, and cattle operations.',
   body:`Water-borne pathogens — E. coli, Salmonella, Campylobacter, and Clostridium — are significant contributors to livestock health problems and antibiotic use in intensive farming. UVC at the point of supply provides continuous disinfection without the residue concerns of chlorination.

For poultry and swine operations, PE series reactors installed on the header supply to drinking lines are the standard configuration. Flow rates from 5 to 80 m³/h cover the majority of mid-scale operations.

For cattle and large-scale operations, SS316 reactors with PLC integration and flow-proportional control are used.`,
   systems:'PE / PP / SS Closed Vessel'},
  {id:'APP-07',tag:'Aquariums',title:'Public and Commercial Aquariums',sector:'Industrial',
   intro:'Maintaining crystal-clear, pathogen-free display water without harmful chemistry requires the precision of UVC disinfection.',
   body:`Public aquariums and large ornamental water features must maintain biologically clean but visually pristine water, without any chemical that could harm sensitive marine species. Ozone and high-dose chlorination are incompatible with live coral and reef species.

UVC at species-appropriate doses (10–30 mJ/cm² for fish-only systems, up to 40 mJ/cm² for pathogen control) provides continuous disinfection on the return circuit without affecting water chemistry.

DS and DC immersion cassettes are used in tank sumps; PE or SS inline reactors serve central filtration systems.`,
   systems:'PE / SS Closed Vessel · DS / DC Immersion'},
  {id:'APP-08',tag:'Pharmaceutical',title:'Pharmaceutical Water Systems (PW, HPW, WFI)',sector:'Industrial',
   intro:'UVC is a compendial method (USP, EP) for microbial control in pharmaceutical water loops — validated, residue-free, and PLC-integratable.',
   body:`Pharmacopoeial water grades require continuous microbial control throughout production and distribution loops. UVC is recognised in both USP and EP monographs as a validated, residue-free method for Total Viable Count reduction in pharmaceutical water systems.

SS316L electropolished reactors with UV intensity monitoring, 4-20mA output, Modbus RTU, and full IQ/OQ documentation support are used in pharmaceutical environments.

All UVTechnic SS/SM reactors include provision for UV intensity sensor and automated alarm output. Custom validation documentation packages are available on request.`,
   systems:'SS / SM Closed Vessel (SS316L electropolished)'},
  {id:'APP-09',tag:'Electronics / UPW',title:'Ultra-Pure Water for Electronics Manufacturing',sector:'Industrial',
   intro:'UVC-assisted TOC reduction and microbial control in ultrapure water systems for semiconductor and PCB manufacturing.',
   body:`Semiconductor and advanced electronics manufacturing requires ultrapure water with resistivity ≥ 18.2 MΩ·cm and TOC < 1 ppb. UVC at 185 nm generates hydroxyl radicals that oxidise organic contaminants — a process known as UV-TOC oxidation.

At 254 nm, UVC provides microbial inactivation in the polishing loop return. Combined 185/254 nm low-pressure lamps in a closed vessel reactor provide both functions simultaneously.

UVTechnic SM series reactors with electropolished SS316L internals, ultra-low-extractable quartz sleeves, and continuous UV monitoring are used in UPW applications.`,
   systems:'SM Closed Vessel (SS316L, VUV option)'},
  {id:'APP-10',tag:'Drinking Water',title:'Municipal and Commercial Drinking Water',sector:'Water',
   intro:'UVC is the globally adopted primary or secondary disinfection method for municipal drinking water — effective against all pathogens at validated doses.',
   body:`UV disinfection is required by WHO guidelines and national drinking water standards for surface water supplies. The validated dose of 40 mJ/cm² provides ≥ 4-log inactivation of Cryptosporidium and Giardia, and ≥ 3-log reduction of most bacteria and viruses.

For municipal applications, SS316 medium-pressure or multiple-LP-lamp reactors with UV transmittance monitoring, flow-paced control, and full SCADA integration are used.

For commercial applications (bottled water, beverage production, hospitality), PE series reactors from 5 to 400 m³/h provide validated protection at lower capital cost.`,
   systems:'PE / PP / SS / SM Closed Vessel · OC Open Channel'},
]

const SECTORS = ['All','Food & Bev','Aquaculture','Industrial','Hotel & Pool','Agriculture','Livestock','Water']

export default function ApplicationsPage({ onNav }: { onNav:(p:string)=>void }) {
  const [expanded, setExpanded] = useState<string|null>(null)
  const [filter, setFilter] = useState('All')
  const shown = filter==='All' ? APPS : APPS.filter(a=>a.sector===filter||a.tag===filter)

  return (
    <div style={{marginTop:58}}>
      <PageHero tag="Applications" title="Industries We Serve"
        subtitle="Detailed application guides for each industry — technology selection, flow rates, and recommended systems."/>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'80px 32px'}}>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:32}}>
          {SECTORS.map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{background:filter===s?'rgba(0,204,238,.1)':'rgba(9,24,40,.8)',border:`1px solid ${filter===s?'rgba(0,204,238,.4)':'rgba(0,204,238,.1)'}`,color:filter===s?'#00ccee':'#6a8aaa',padding:'6px 13px',borderRadius:100,fontSize:11.5,cursor:'pointer',fontFamily:'Rajdhani,sans-serif',fontWeight:500}}>{s}</button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {shown.map(app=>(
            <div key={app.id} style={{background:'#091828',border:`1px solid ${expanded===app.id?'rgba(0,204,238,.35)':'rgba(0,204,238,.08)'}`,borderRadius:2,overflow:'hidden',transition:'.2s'}}>
              <div onClick={()=>setExpanded(expanded===app.id?null:app.id)} style={{padding:'20px 24px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:4}}>{app.tag}</div>
                  <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:20,fontWeight:700}}>{app.title}</div>
                  <div style={{fontSize:13,color:'#6a8aaa',marginTop:4}}>{app.intro}</div>
                </div>
                <div style={{color:'#00ccee',fontSize:18,marginLeft:16,flexShrink:0}}>{expanded===app.id?'▲':'▼'}</div>
              </div>
              {expanded===app.id && (
                <div style={{padding:'0 24px 24px',borderTop:'1px solid rgba(0,204,238,.08)'}}>
                  <div style={{paddingTop:20}}>
                    {app.body.split('\n\n').map((para,i)=>(
                      <p key={i} style={{fontSize:13.5,color:'#6a8aaa',lineHeight:1.85,marginBottom:14}}>{para}</p>
                    ))}
                    <div style={{marginTop:20,padding:'14px 18px',background:'rgba(0,204,238,.04)',border:'1px solid rgba(0,204,238,.15)',borderRadius:2,display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                      <div>
                        <div style={{fontSize:10,letterSpacing:2,textTransform:'uppercase',color:'#00ccee',fontWeight:600,marginBottom:4}}>Recommended Systems</div>
                        <div style={{fontSize:13,color:'#eaf4ff'}}>{app.systems}</div>
                      </div>
                      <button onClick={()=>onNav('products')} style={{marginLeft:'auto',background:'#00ccee',color:'#050f1a',fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:12,letterSpacing:1.5,textTransform:'uppercase',padding:'9px 20px',borderRadius:2,border:'none',cursor:'pointer',whiteSpace:'nowrap'}}>View Products →</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
