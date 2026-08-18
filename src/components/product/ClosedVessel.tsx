import type { ClosedVesselModel, ProductImage } from '@/types'
import { DataTable, OptionBox, ProductImageGrid, SectionTag } from '@/components/ui'

interface Props { prefix:'PE'|'PP'|'SS'|'SM'; mat:string; bar:string; models:ClosedVesselModel[]; images:ProductImage[] }

const SS_OPTS = ['SS316 stainless control panel (IP65)','UV intensity sensor + display','Flow switch interlock',
  '4-20mA output (SCADA/BAS)','RS485/Modbus RTU','Auto wiper (SM-60 and above)',
  'Inlet/outlet pressure gauges','Bypass nipple','Temperature sensor','Non-return valve']

export default function ClosedVessel({ prefix, mat, bar, models, images }: Props) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Closed Vessel — Low Pressure</SectionTag>
      <h2 style={{fontFamily:'Rajdhani,sans-serif',fontSize:40,fontWeight:700,lineHeight:1.05,marginBottom:14}}>
        {prefix} Series <span style={{color:'#6a8aaa',fontWeight:400,fontSize:22}}>— {mat}</span>
      </h2>
      <p style={{fontSize:13,color:'#6a8aaa',marginBottom:4}}>Max pressure: <b style={{color:'#eaf4ff'}}>{bar}</b> · UV dose: <b style={{color:'#22c55e'}}>≥ 400 J/m² validated</b> · CIP ports: <b style={{color:'#22c55e'}}>Standard all models</b></p>
      <p style={{fontSize:12,color:'#f59e0b',marginBottom:4}}>HP = High Power lamp series. Lamp wattage not disclosed — contact us for full TDS.</p>
      <p style={{fontSize:12,color:'#6a8aaa',marginBottom:14}}>All models include 2× CIP service ports (½" BSP). Add ~140mm for flanges to get total installation length.</p>
      <ProductImageGrid images={images} height={220}/>
      <DataTable headers={['Model','Flow','Body DN','Inner L','Total L','Inlet/Outlet','Lamps','Sys. Power','CIP']}
        rows={models.map(r=>[
          r.model_name, `${r.flow_rate} m³/h`, r.body_dn, `${r.inner_length} mm`, `${r.total_length} mm`, r.connection,
          <span key="l" style={{color:r.is_hp?'#f59e0b':'#6a8aaa'}}>{r.lamps}</span>,
          r.system_power,
          <span key="c" style={{color:'#22c55e',fontWeight:600}}>✓</span>
        ])}
      />
      {(prefix==='SS'||prefix==='SM') && (
        <div>
          <OptionBox title={`Options — ${prefix} Series`} items={SS_OPTS}/>
        </div>
      )}
    </div>
  )
}
