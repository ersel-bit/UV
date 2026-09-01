'use client'

import { useState, useRef, useEffect } from 'react'
import { SectionTag, DataTable, OptionBox, ProductImageGrid, TierTable } from '@/components/ui'
import ClosedVessel from '@/components/product/ClosedVessel'
import type {
  ProductCategory,
  ClosedVesselModel,
  WallUnitModel,
  HandUnitModel,
  AirUnitRoom,
  DuctUnit,
  ProductImage,
  SparePart
} from '@/types'

interface Props {
  cats: ProductCategory[]
}

// ─── Water Video ─────────────────────────────────────────────────────────────
function WaterVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src="/water-disinfection.mp4"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  )
}

// ─── Canvas Animations ───────────────────────────────────────────────────────
// ─── Air Video ────────────────────────────────────────────────────────────────
function AirVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src="/air-disinfection.mp4"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  )
}

function SurfaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return

    let t = 0
    let phase = 'dirty'
    let phaseT = 0
    let scanX = 0
    let bacteria: any[] = []
    let sparkles: any[] = []

    const mk = (W: number, H: number) =>
      Array.from({ length: 18 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 5 + Math.random() * 8,
        alive: true,
        sp: 0
      }))

    let raf: number

    const draw = () => {
      c.width = c.offsetWidth
      c.height = c.offsetHeight

      const W = c.width
      const H = c.height
      const ctx = c.getContext('2d')!

      t += 0.02
      phaseT += 0.012

      if (!bacteria.length && W) {
        bacteria = mk(W, H)
      }

      ctx.fillStyle =
        phase === 'clean'
          ? '#1a3a0a'
          : '#0d1a05'

      ctx.fillRect(0, 0, W, H)

      bacteria.forEach(b => {
        if (!b.alive) {
          b.sp = Math.min(1, b.sp + 0.05)
        }

        if (!(!b.alive && b.sp >= 1)) {
          const alpha = b.alive ? 1 : 1 - b.sp

          ;[1, -1].forEach(dir => {
            ctx.save()
            ctx.globalAlpha = alpha * 0.82

            ctx.translate(
              b.x,
              b.y + dir * (
                b.alive
                  ? 0
                  : b.sp * b.r * 1.6
              )
            )

            ctx.beginPath()

            for (let i = 0; i <= 24; i++) {
              const a = (i / 24) * Math.PI * 2

              const n =
                1 +
                0.28 * Math.sin(a * 3 + t) +
                0.12 * Math.sin(a * 7 + t * 1.4)

              ctx.lineTo(
                Math.cos(a) *
                  b.r *
                  n *
                  (b.alive ? 1 : 1 - b.sp * 0.3),
                Math.sin(a) *
                  b.r *
                  n *
                  0.55
              )
            }

            ctx.closePath()

            ctx.fillStyle =
              'rgba(60,200,20,0.68)'

            ctx.fill()
            ctx.restore()
          })
        }
      })

      if (phase === 'scanning') {
        scanX += W / 110

        const gr = ctx.createLinearGradient(
          scanX - 40,
          0,
          scanX + 20,
          0
        )

        gr.addColorStop(
          0,
          'rgba(180,255,255,0)'
        )

        gr.addColorStop(
          0.6,
          'rgba(180,255,255,0.65)'
        )

        gr.addColorStop(
          1,
          'rgba(180,255,255,0)'
        )

        ctx.fillStyle = gr
        ctx.fillRect(0, 0, W, H)

        bacteria.forEach(b => {
          if (b.alive && b.x < scanX + 20) {
            b.alive = false
          }
        })

        if (scanX > W + 60) {
          phase = 'clean'
          phaseT = 0
          sparkles = []
        }
      }

      if (phase === 'clean') {
        if (Math.random() < 0.15) {
          sparkles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            l: 1
          })
        }

        sparkles = sparkles.filter(
          s => s.l > 0
        )

        sparkles.forEach(s => {
          s.l -= 0.04

          ctx.fillStyle =
            `rgba(160,255,80,${s.l})`

          ctx.beginPath()
          ctx.arc(
            s.x,
            s.y,
            1.5,
            0,
            Math.PI * 2
          )
          ctx.fill()
        })

        if (phaseT > 2.8) {
          phase = 'dirty'
          phaseT = 0
          scanX = 0
          bacteria = mk(W, H)
          sparkles = []
        }
      }

      if (
        phase === 'dirty' &&
        phaseT > 2.2
      ) {
        phase = 'scanning'
        phaseT = 0
        scanX = 0
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%'
      }}
    />
  )
}

// ─── Static fallback data ─────────────────────────────────────────────────────

const GH =
  'https://raw.githubusercontent.com/ersel-bit/UV/main/'

const FB_IMGS: Record<string, ProductImage[]> = {
  PE: [{
    id: '1',
    product_section: 'PE',
    image_url:
      GH +
      'No.1.PE-15%20PE-20%20Before%20Packing%20Sample%20Picture%201.webp',
    alt_text: 'PE units',
    caption: '',
    sort_order: 1,
    is_active: true
  }],

  SM: [{
    id: '2',
    product_section: 'SM',
    image_url:
      GH +
      'No.49.%20SM-300%20Auto%20Wiper%20Testing%20Sample%20Picture%205.webp',
    alt_text: 'SM wiper',
    caption: '',
    sort_order: 1,
    is_active: true
  }],

  DS: [{
    id: '3',
    product_section: 'DS',
    image_url:
      GH +
      'No.13.DS%20Sample%20Picture%201.webp',
    alt_text: 'DS',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '4',
    product_section: 'DS',
    image_url:
      GH +
      'No.37.%20DSC%20Detail%20Picture%201%20(%20End%20of%20the%20lamp).webp',
    alt_text: 'Lamp end',
    caption: 'Lamp End Detail',
    sort_order: 2,
    is_active: true
  }, {
    id: '5',
    product_section: 'DS',
    image_url:
      GH +
      'No.38.DSC%20Detail%20Picture%202%20(%20Cable%20connection%20316%20SS%20Part).webp',
    alt_text: 'Cable',
    caption: 'SS316 Cable',
    sort_order: 3,
    is_active: true
  }],

  DM: [{
    id: '6',
    product_section: 'DM',
    image_url:
      GH +
      'No.53.DM-C%20Sample%20Picture%201.webp',
    alt_text: 'DM',
    caption: '',
    sort_order: 1,
    is_active: true
  }],

  DCAIR: [{
    id: '7',
    product_section: 'DCAIR',
    image_url:
      GH +
      'No.18.HVAC%20Unit%20Application%20Sample%20Picture%201.webp',
    alt_text: 'HVAC',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '8',
    product_section: 'DCAIR',
    image_url:
      GH +
      'No.54.%20DC-AIR%206%20Pcs%20Lamp%20Sample%20Picture%201.webp',
    alt_text: 'DC-AIR',
    caption: '',
    sort_order: 2,
    is_active: true
  }],

  WU: [{
    id: '9',
    product_section: 'WU',
    image_url:
      GH +
      'No.11.WU%20Application%20Sample%20Picture%201.webp',
    alt_text: 'WU',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '10',
    product_section: 'WU',
    image_url:
      GH +
      'No.30.WU%20C1%20Sample%20Picture%201.webp',
    alt_text: 'WU-C1',
    caption: '',
    sort_order: 2,
    is_active: true
  }],

  HU: [{
    id: '11',
    product_section: 'HU',
    image_url:
      GH +
      'No.17.HU-C1%20Sample%20Picture%201.webp',
    alt_text: 'HU',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '12',
    product_section: 'HU',
    image_url:
      GH +
      'No.32.HU%20C1%20Sample%20Picture%201.webp',
    alt_text: 'HU v2',
    caption: '',
    sort_order: 2,
    is_active: true
  }],

  AU: [{
    id: '13',
    product_section: 'AU',
    image_url:
      GH +
      'No.33.AU%20C1%20Sample%20Picture%201.webp',
    alt_text: 'AU',
    caption: '',
    sort_order: 1,
    is_active: true
  }],

  DU: [{
    id: '14',
    product_section: 'DU',
    image_url:
      GH +
      'No.40.%20DU%20S600%2012%20Lamps%20Sample%20Picture%201.webp',
    alt_text: 'DU-S600',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '15',
    product_section: 'DU',
    image_url:
      GH +
      'No.42.%20DU%20C200%20Sample%20Picture%201.webp',
    alt_text: 'DU-C200',
    caption: '',
    sort_order: 2,
    is_active: true
  }],

  CU: [{
    id: '16',
    product_section: 'CU',
    image_url:
      GH +
      'No.10.Conveyor%20Application%20Sample%20Picture%201.webp',
    alt_text: 'Conveyor',
    caption: '',
    sort_order: 1,
    is_active: true
  }],

  RDU: [{
    id: '17',
    product_section: 'RDU',
    image_url:
      GH +
      'No.2.RDU-1%20Application%20Sample%20Picture%201.webp',
    alt_text: 'RDU-1',
    caption: '',
    sort_order: 1,
    is_active: true
  }, {
    id: '18',
    product_section: 'RDU',
    image_url:
      GH +
      'No.3.RDU-1%20Application%20Sample%20Picture%202..webp',
    alt_text: 'RDU-1 v2',
    caption: '',
    sort_order: 2,
    is_active: true
  }],

  SS: [],
  PP: [],
  DC: []
}

const FB_PE: ClosedVesselModel[] = [
  {
    id: '1',
    series: 'PE',
    model_name: 'PE-05',
    flow_rate: '5',
    body_dn: 'DN160',
    inner_length: '780',
    total_length: '920',
    connection: 'DN32 (1¼")',
    lamps: '1 pcs',
    system_power: '~26W',
    is_hp: false,
    sort_order: 1,
    is_active: true
  },
  {
    id: '2',
    series: 'PE',
    model_name: 'PE-10',
    flow_rate: '10',
    body_dn: 'DN200',
    inner_length: '780',
    total_length: '920',
    connection: 'DN40 (1½")',
    lamps: '2 pcs',
    system_power: '~52W',
    is_hp: false,
    sort_order: 2,
    is_active: true
  },
  {
    id: '3',
    series: 'PE',
    model_name: 'PE-15',
    flow_rate: '15',
    body_dn: 'DN200',
    inner_length: '780',
    total_length: '920',
    connection: 'DN50 (2")',
    lamps: '2 pcs',
    system_power: '~88W',
    is_hp: false,
    sort_order: 3,
    is_active: true
  },
  {
    id: '4',
    series: 'PE',
    model_name: 'PE-20',
    flow_rate: '20',
    body_dn: 'DN250',
    inner_length: '780',
    total_length: '920',
    connection: 'DN65 (2½")',
    lamps: '4 pcs',
    system_power: '~288W',
    is_hp: false,
    sort_order: 4,
    is_active: true
  },
  {
    id: '5',
    series: 'PE',
    model_name: 'PE-25',
    flow_rate: '25',
    body_dn: 'DN200',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN65 (2½")',
    lamps: '1 pcs HP',
    system_power: '~340W',
    is_hp: true,
    sort_order: 5,
    is_active: true
  },
  {
    id: '6',
    series: 'PE',
    model_name: 'PE-30',
    flow_rate: '30',
    body_dn: 'DN250',
    inner_length: '780',
    total_length: '920',
    connection: 'DN80 (3")',
    lamps: '4 pcs',
    system_power: '~288W',
    is_hp: false,
    sort_order: 6,
    is_active: true
  },
  {
    id: '7',
    series: 'PE',
    model_name: 'PE-45',
    flow_rate: '45',
    body_dn: 'DN250',
    inner_length: '780',
    total_length: '920',
    connection: 'DN80 (3")',
    lamps: '4 pcs',
    system_power: '~352W',
    is_hp: false,
    sort_order: 7,
    is_active: true
  },
  {
    id: '8',
    series: 'PE',
    model_name: 'PE-60',
    flow_rate: '60',
    body_dn: 'DN225',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN100 (4")',
    lamps: '2 pcs HP',
    system_power: '~700W',
    is_hp: true,
    sort_order: 8,
    is_active: true
  },
  {
    id: '9',
    series: 'PE',
    model_name: 'PE-80',
    flow_rate: '80',
    body_dn: 'DN250',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN125 (5")',
    lamps: '3 pcs HP',
    system_power: '~1050W',
    is_hp: true,
    sort_order: 9,
    is_active: true
  },
  {
    id: '10',
    series: 'PE',
    model_name: 'PE-100',
    flow_rate: '100',
    body_dn: 'DN280',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN125 (5")',
    lamps: '3 pcs HP',
    system_power: '~1050W',
    is_hp: true,
    sort_order: 10,
    is_active: true
  },
  {
    id: '11',
    series: 'PE',
    model_name: 'PE-125',
    flow_rate: '125',
    body_dn: 'DN280',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN150 (6")',
    lamps: '4 pcs HP',
    system_power: '~1400W',
    is_hp: true,
    sort_order: 11,
    is_active: true
  },
  {
    id: '12',
    series: 'PE',
    model_name: 'PE-150',
    flow_rate: '150',
    body_dn: 'DN280',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN150 (6")',
    lamps: '5 pcs HP',
    system_power: '~1750W',
    is_hp: true,
    sort_order: 12,
    is_active: true
  },
  {
    id: '13',
    series: 'PE',
    model_name: 'PE-200',
    flow_rate: '200',
    body_dn: 'DN315',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN200 (8")',
    lamps: '6 pcs HP',
    system_power: '~2100W',
    is_hp: true,
    sort_order: 13,
    is_active: true
  },
  {
    id: '14',
    series: 'PE',
    model_name: 'PE-300',
    flow_rate: '300',
    body_dn: 'DN355',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN250 (10")',
    lamps: '7 pcs HP',
    system_power: '~2450W',
    is_hp: true,
    sort_order: 14,
    is_active: true
  },
  {
    id: '15',
    series: 'PE',
    model_name: 'PE-400',
    flow_rate: '400',
    body_dn: 'DN400',
    inner_length: '1452',
    total_length: '1592',
    connection: 'DN250 (10")',
    lamps: '8 pcs HP',
    system_power: '~2800W',
    is_hp: true,
    sort_order: 15,
    is_active: true
  }
]

const FB_WU: WallUnitModel[] = [
  {
    id: '1',
    model_name: 'WU-C/1',
    series_name: 'Compact',
    lamp_count: 1,
    coverage: 'Up to 10 m²',
    dimensions: '100×90×500mm',
    system_power: '~26W',
    sort_order: 1,
    is_active: true
  },
  {
    id: '2',
    model_name: 'WU-C/2',
    series_name: 'Compact',
    lamp_count: 2,
    coverage: 'Up to 18 m²',
    dimensions: '160×90×500mm',
    system_power: '~52W',
    sort_order: 2,
    is_active: true
  },
  {
    id: '3',
    model_name: 'WU-S/1',
    series_name: 'Standard',
    lamp_count: 1,
    coverage: 'Up to 20 m²',
    dimensions: '100×90×910mm',
    system_power: '~50W',
    sort_order: 3,
    is_active: true
  },
  {
    id: '4',
    model_name: 'WU-S/2',
    series_name: 'Standard',
    lamp_count: 2,
    coverage: 'Up to 40 m²',
    dimensions: '160×90×910mm',
    system_power: '~100W',
    sort_order: 4,
    is_active: true
  },
  {
    id: '5',
    model_name: 'WU-S/4',
    series_name: 'Standard',
    lamp_count: 4,
    coverage: 'Up to 60 m²',
    dimensions: '280×90×910mm',
    system_power: '~200W',
    sort_order: 5,
    is_active: true
  },
  {
    id: '6',
    model_name: 'WU-S/8',
    series_name: 'Standard',
    lamp_count: 8,
    coverage: 'Up to 100 m²',
    dimensions: '520×90×910mm',
    system_power: '~400W',
    sort_order: 6,
    is_active: true
  },
  {
    id: '7',
    model_name: 'WU-P/1',
    series_name: 'Professional',
    lamp_count: 1,
    coverage: 'Up to 25 m²',
    dimensions: '100×90×910mm',
    system_power: '~76W',
    sort_order: 7,
    is_active: true
  },
  {
    id: '8',
    model_name: 'WU-P/2',
    series_name: 'Professional',
    lamp_count: 2,
    coverage: 'Up to 50 m²',
    dimensions: '160×90×910mm',
    system_power: '~152W',
    sort_order: 8,
    is_active: true
  },
  {
    id: '9',
    model_name: 'WU-P/4',
    series_name: 'Professional',
    lamp_count: 4,
    coverage: 'Up to 80 m²',
    dimensions: '280×90×910mm',
    system_power: '~304W',
    sort_order: 9,
    is_active: true
  },
  {
    id: '10',
    model_name: 'WU-P/8',
    series_name: 'Professional',
    lamp_count: 8,
    coverage: 'Up to 150 m²',
    dimensions: '520×90×910mm',
    system_power: '~608W',
    sort_order: 10,
    is_active: true
  },
  {
    id: '11',
    model_name: 'WU-U/1',
    series_name: 'Ultra',
    lamp_count: 1,
    coverage: 'Up to 30 m²',
    dimensions: '100×90×910mm',
    system_power: '~88W',
    sort_order: 11,
    is_active: true
  },
  {
    id: '12',
    model_name: 'WU-U/2',
    series_name: 'Ultra',
    lamp_count: 2,
    coverage: 'Up to 60 m²',
    dimensions: '160×90×910mm',
    system_power: '~176W',
    sort_order: 12,
    is_active: true
  },
  {
    id: '13',
    model_name: 'WU-U/4',
    series_name: 'Ultra',
    lamp_count: 4,
    coverage: 'Up to 100 m²',
    dimensions: '280×90×910mm',
    system_power: '~352W',
    sort_order: 13,
    is_active: true
  },
  {
    id: '14',
    model_name: 'WU-U/8',
    series_name: 'Ultra',
    lamp_count: 8,
    coverage: '200+ m²',
    dimensions: '520×90×910mm',
    system_power: '~704W',
    sort_order: 14,
    is_active: true
  }
]

const FB_HU: HandUnitModel[] = [
  {
    id: '1',
    model_name: 'HU-C/1',
    series_name: 'Compact',
    lamp_count: 1,
    length: '500mm',
    typical_use: 'Spot surface disinfection',
    sort_order: 1,
    is_active: true
  },
  {
    id: '2',
    model_name: 'HU-C/2',
    series_name: 'Compact',
    lamp_count: 2,
    length: '500mm',
    typical_use: 'Wide spot — double coverage',
    sort_order: 2,
    is_active: true
  },
  {
    id: '3',
    model_name: 'HU-S/1',
    series_name: 'Standard',
    lamp_count: 1,
    length: '910mm',
    typical_use: 'Long-reach surface disinfection',
    sort_order: 3,
    is_active: true
  },
  {
    id: '4',
    model_name: 'HU-S/2',
    series_name: 'Standard',
    lamp_count: 2,
    length: '910mm',
    typical_use: 'High-dose surface treatment',
    sort_order: 4,
    is_active: true
  },
  {
    id: '5',
    model_name: 'HU-P/1',
    series_name: 'Professional',
    lamp_count: 1,
    length: '910mm',
    typical_use: 'Rapid professional disinfection',
    sort_order: 5,
    is_active: true
  },
  {
    id: '6',
    model_name: 'HU-P/2',
    series_name: 'Professional',
    lamp_count: 2,
    length: '910mm',
    typical_use: 'Premium double — max surface dose',
    sort_order: 6,
    is_active: true
  }
]

const FB_AU: AirUnitRoom[] = [
  {
    id: '1',
    category: 'Up to 15 m²',
    description: 'Toilets · Storage · Small exam rooms',
    sort_order: 1,
    models: [
      {
        id: '1',
        room_category_id: '1',
        model_name: 'AU-C/1',
        lamps: '1 pcs',
        housing_size: '100×100mm',
        body_length: '534mm',
        note: 'Basic',
        sort_order: 1,
        is_active: true
      },
      {
        id: '2',
        room_category_id: '1',
        model_name: 'AU-C/2',
        lamps: '2 pcs',
        housing_size: '100×100mm',
        body_length: '534mm',
        note: 'Enhanced',
        sort_order: 2,
        is_active: true
      }
    ]
  },
  {
    id: '2',
    category: '15–35 m²',
    description: 'Offices · Hotel rooms · Hospital rooms',
    sort_order: 2,
    models: [
      {
        id: '3',
        room_category_id: '2',
        model_name: 'AU-S/1',
        lamps: '1 pcs',
        housing_size: '100×100mm',
        body_length: '944mm',
        note: 'Standard',
        sort_order: 1,
        is_active: true
      },
      {
        id: '4',
        room_category_id: '2',
        model_name: 'AU-S/2',
        lamps: '2 pcs',
        housing_size: '100×100mm',
        body_length: '944mm',
        note: 'Hospital grade',
        sort_order: 2,
        is_active: true
      }
    ]
  },
  {
    id: '3',
    category: '35–80 m²',
    description: 'Operating areas · Waiting rooms · Classrooms',
    sort_order: 3,
    models: [
      {
        id: '5',
        room_category_id: '3',
        model_name: 'AU-P/1',
        lamps: '1 pcs',
        housing_size: '100×100mm',
        body_length: '944mm',
        note: 'High output',
        sort_order: 1,
        is_active: true
      },
      {
        id: '6',
        room_category_id: '3',
        model_name: 'AU-P/2',
        lamps: '2 pcs',
        housing_size: '100×100mm',
        body_length: '944mm',
        note: 'Premium',
        sort_order: 2,
        is_active: true
      },
      {
        id: '7',
        room_category_id: '3',
        model_name: 'AU-P/4',
        lamps: '4 pcs',
        housing_size: '140×140mm',
        body_length: '944mm',
        note: 'Maximum',
        sort_order: 3,
        is_active: true
      }
    ]
  },
  {
    id: '4',
    category: '80+ m²',
    description: 'Industrial halls · Large open spaces',
    sort_order: 4,
    models: [
      {
        id: '8',
        room_category_id: '4',
        model_name: 'AU-U/2',
        lamps: '2 pcs',
        housing_size: '100×100mm',
        body_length: '930mm',
        note: 'High intensity',
        sort_order: 1,
        is_active: true
      },
      {
        id: '9',
        room_category_id: '4',
        model_name: 'AU-U/4',
        lamps: '4 pcs',
        housing_size: '140×140mm',
        body_length: '930mm',
        note: 'Maximum',
        sort_order: 2,
        is_active: true
      }
    ]
  }
]

const FB_DU: DuctUnit[] = [
  {
    id: '1',
    model_name: 'DU-C200',
    description: 'Ø200mm round duct',
    sort_order: 1,
    rows: [
      {
        id: '1',
        duct_unit_id: '1',
        air_flow: '100–250 m³/h',
        velocity: '0.9–2.2 m/s',
        lamps_standard: '1 pcs',
        lamps_professional: '1 pcs',
        lamps_premium: '2 pcs',
        sort_order: 1
      },
      {
        id: '2',
        duct_unit_id: '1',
        air_flow: '250–400 m³/h',
        velocity: '2.2–3.5 m/s',
        lamps_standard: '1 pcs',
        lamps_professional: '2 pcs',
        lamps_premium: '3 pcs',
        sort_order: 2
      },
      {
        id: '3',
        duct_unit_id: '1',
        air_flow: '400–600 m³/h',
        velocity: '3.5–5 m/s',
        lamps_standard: '2 pcs',
        lamps_professional: '3 pcs',
        lamps_premium: '4 pcs',
        sort_order: 3
      }
    ]
  },
  {
    id: '5',
    model_name: 'DU-S500',
    description: '500×500mm AHU cassette',
    sort_order: 5,
    rows: [
      {
        id: '13',
        duct_unit_id: '5',
        air_flow: '1000–2000 m³/h',
        velocity: '1.1–2.2 m/s',
        lamps_standard: '3 pcs',
        lamps_professional: '4 pcs',
        lamps_premium: '6 pcs',
        sort_order: 1
      },
      {
        id: '14',
        duct_unit_id: '5',
        air_flow: '2000–3500 m³/h',
        velocity: '2.2–3.9 m/s',
        lamps_standard: '4 pcs',
        lamps_professional: '6 pcs',
        lamps_premium: '8 pcs',
        sort_order: 2
      }
    ]
  },
  {
    id: '6',
    model_name: 'DU-S600',
    description: '600×600mm large AHU cassette',
    sort_order: 6,
    rows: [
      {
        id: '16',
        duct_unit_id: '6',
        air_flow: '1500–3000 m³/h',
        velocity: '1.2–2.3 m/s',
        lamps_standard: '4 pcs',
        lamps_professional: '6 pcs',
        lamps_premium: '8 pcs',
        sort_order: 1
      },
      {
        id: '17',
        duct_unit_id: '6',
        air_flow: '3000–5000 m³/h',
        velocity: '2.3–3.9 m/s',
        lamps_standard: '6 pcs',
        lamps_professional: '8 pcs',
        lamps_premium: '8 pcs',
        sort_order: 2
      }
    ]
  }
]

const FB_SPARE: SparePart[] = [
  {
    id: '1',
    title: 'UVC Lamps',
    description:
      'Standard germicidal lamps. Multiple lengths. 4-pin fitting. Contact us — do not specify OEM brand.',
    icon: '💡',
    sort_order: 1,
    is_active: true
  },
  {
    id: '2',
    title: 'Coated Lamps',
    description:
      'PTFE-coated germicidal lamps. Food, pharma, conveyor use. Glass containment safe.',
    icon: '🛡️',
    sort_order: 2,
    is_active: true
  },
  {
    id: '3',
    title: 'Quartz Sleeves',
    description:
      'Precision quartz glass. Round straight · square · hollow · solid rod. Contact for size.',
    icon: '🔭',
    sort_order: 3,
    is_active: true
  },
  {
    id: '4',
    title: 'Ballasts / Drivers',
    description:
      'CE-certified electronic ballasts. Contact us with lamp type.',
    icon: '⚡',
    sort_order: 4,
    is_active: true
  },
  {
    id: '5',
    title: 'Ceramic Sockets',
    description:
      '4-pin ceramic. High-temperature rated.',
    icon: '🔌',
    sort_order: 5,
    is_active: true
  },
  {
    id: '6',
    title: 'Plastic Sockets',
    description:
      '4-pin plastic. Standard and 90° cable-exit versions.',
    icon: '🔗',
    sort_order: 6,
    is_active: true
  }
]

const CU_DATA = [
  {
    belt: '150mm',
    use: 'Pharma vials · Narrow bottles',
    rows: [
      { s: '5 m/min', n: '1 pcs' },
      { s: '15 m/min', n: '1 pcs' },
      { s: '30 m/min', n: '1 pcs' },
      { s: '50 m/min', n: '2 pcs' }
    ]
  },
  {
    belt: '200mm',
    use: 'Beverage bottles · Small food items',
    rows: [
      { s: '5 m/min', n: '1 pcs' },
      { s: '15 m/min', n: '1 pcs' },
      { s: '30 m/min', n: '2 pcs' },
      { s: '50 m/min', n: '2 pcs' }
    ]
  },
  {
    belt: '300mm',
    use: 'General food · Dairy · Packaged goods',
    rows: [
      { s: '5 m/min', n: '1 pcs' },
      { s: '15 m/min', n: '2 pcs' },
      { s: '30 m/min', n: '2 pcs' },
      { s: '50 m/min', n: '4 pcs' }
    ]
  },
  {
    belt: '400mm',
    use: 'Bakery · Confectionery · Meat',
    rows: [
      { s: '5 m/min', n: '1 pcs' },
      { s: '15 m/min', n: '2 pcs' },
      { s: '30 m/min', n: '4 pcs' },
      { s: '50 m/min', n: '4 pcs' }
    ]
  },
  {
    belt: '500mm',
    use: 'Poultry · Fish processing',
    rows: [
      { s: '5 m/min', n: '2 pcs' },
      { s: '15 m/min', n: '2 pcs' },
      { s: '30 m/min', n: '4 pcs' },
      { s: '50 m/min', n: '6 pcs' }
    ]
  },
  {
    belt: '600mm',
    use: 'Industrial food · Large packaging',
    rows: [
      { s: '5 m/min', n: '2 pcs' },
      { s: '15 m/min', n: '2 pcs' },
      { s: '30 m/min', n: '4 pcs' },
      { s: '50 m/min', n: '6 pcs' }
    ]
  },
  {
    belt: '800mm',
    use: 'Large-scale production',
    rows: [
      { s: '5 m/min', n: '2 pcs' },
      { s: '15 m/min', n: '4 pcs' },
      { s: '30 m/min', n: '6 pcs' },
      { s: '50 m/min', n: '8 pcs' }
    ]
  }
]

// ─── Sub-page components ──────────────────────────────────────────────────────

function WaterOverview() {
  return (
    <div className="animate-fade-up">
      <SectionTag>Water Disinfection</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        Complete UVC Water Systems
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#6a8aaa',
          lineHeight: 1.8,
          maxWidth: 640,
          marginBottom: 24
        }}
      >
        Closed vessel LP, open channel, and immersion systems for any water treatment application. Chemical-free. CIP service ports standard on all closed vessel models.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginBottom: 20
        }}
      >
        {[
          {
            h: 'Closed Vessel LP',
            d: 'HDPE, PP, SS304, SS316. 5–400 m³/h. 4–6 bar. CIP standard.',
            i: '💧'
          },
          {
            h: 'Open Channel',
            d: 'AISI 316. Auto wiper standard. OC-450 and OC-900.',
            i: '🌊'
          },
          {
            h: 'Immersion',
            d: 'Dip Suspension, Dip Mount, Dip Cassette — submersible & HVAC air.',
            i: '⬇️'
          }
        ].map(c => (
          <div
            key={c.h}
            style={{
              background: '#091828',
              padding: 20,
              borderTop: '2px solid #00ccee'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              {c.i}
            </div>

            <div
              style={{
                fontFamily: 'Rajdhani,sans-serif',
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 6
              }}
            >
              {c.h}
            </div>

            <div
              style={{
                fontSize: 12.5,
                color: '#6a8aaa',
                lineHeight: 1.7
              }}
            >
              {c.d}
            </div>
          </div>
        ))}
      </div>

      <OptionBox
        title="Technical Standards"
        items={[
          'UV dose validated ≥ 400 J/m² worst case',
          'CIP ports (½" BSP) all closed vessel models',
          'Lamp life: 9,000 hours',
          'CE certified — EN standards',
          'Quartz sleeve protection on all lamps',
          '220V/50Hz standard · 3-phase on request'
        ]}
      />
    </div>
  )
}

function OCPage() {
  return (
    <div className="animate-fade-up">
      <SectionTag>Open Channel</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        OC Series
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 16
        }}
      >
        Gravity-flow channels, irrigation, large-volume treatment. Auto wiper standard. AISI 316 throughout.
      </p>

      <DataTable
        headers={[
          'Model',
          'Max Flow',
          'Channel',
          'Water Level',
          'Min Channel',
          'Wiper',
          'Material'
        ]}
        rows={[
          [
            'OC-450',
            '450 m³/h',
            '820×980mm',
            '1400–1600mm',
            '3 m',
            <span
              key="w1"
              style={{
                color: '#22c55e',
                fontWeight: 600
              }}
            >
              Standard
            </span>,
            'AISI 316'
          ],
          [
            'OC-900',
            '900 m³/h',
            '820×980mm',
            '1400–1600mm',
            '3 m',
            <span
              key="w2"
              style={{
                color: '#22c55e',
                fontWeight: 600
              }}
            >
              Standard
            </span>,
            'AISI 316'
          ]
        ]}
      />
    </div>
  )
}

function DipPage({
  type,
  images
}: {
  type: 'ds' | 'dm' | 'dc'
  images: ProductImage[]
}) {
  const dsRows = [
    ['DS-C', '1 pcs', '~470mm', 'Ø19mm', '4-pin · 3m WP'],
    ['DS-S', '1 pcs', '~900mm', 'Ø19mm', '4-pin · 5m WP'],
    ['DS-P', '1 pcs', '~900mm', 'Ø19mm', '4-pin · 5m WP'],
    ['DS-U', '1 pcs', '~1600mm', 'Ø28mm', '4-pin · 5m WP']
  ]

  const dmRows = [
    ['DM-C', '1 pcs', '~470mm', 'Ø19mm', '4-pin · 3m WP'],
    ['DM-S', '1 pcs', '~900mm', 'Ø19mm', '4-pin · 5m WP'],
    ['DM-P', '1 pcs', '~900mm', 'Ø19mm', '4-pin · 5m WP']
  ]

  return (
    <div className="animate-fade-up">
      <SectionTag>Immersion Systems</SectionTag>

      {type === 'ds' && (
        <>
          <h2
            style={{
              fontFamily: 'Rajdhani,sans-serif',
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 14
            }}
          >
            DS — Dip Suspension
          </h2>

          <p
            style={{
              fontSize: 13,
              color: '#6a8aaa',
              marginBottom: 14
            }}
          >
            Single-lamp units suspended from tank top. Inox and plastic versions.
          </p>

          <ProductImageGrid
            images={images}
            height={200}
          />

          <DataTable
            headers={[
              'Model',
              'Lamps',
              'Length',
              'Quartz',
              'Connection'
            ]}
            rows={dsRows}
          />
        </>
      )}

      {type === 'dm' && (
        <>
          <h2
            style={{
              fontFamily: 'Rajdhani,sans-serif',
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 14
            }}
          >
            DM — Dip Mount
          </h2>

          <p
            style={{
              fontSize: 12.5,
              color: '#00ccee',
              marginBottom: 14
            }}
          >
            ⚠ Brackets and connection hardware: AISI 316 L
          </p>

          <ProductImageGrid
            images={images}
            height={200}
          />

          <DataTable
            headers={[
              'Model',
              'Lamps',
              'Length',
              'Quartz',
              'Connection'
            ]}
            rows={dmRows}
          />
        </>
      )}

      {type === 'dc' && (
        <>
          <h2
            style={{
              fontFamily: 'Rajdhani,sans-serif',
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 14
            }}
          >
            DC — Dip Cassette
          </h2>

          <p
            style={{
              fontSize: 12.5,
              color: '#00ccee',
              marginBottom: 14
            }}
          >
            ⚠ Cassette body: AISI 316 L · Each lamp: individual cable
          </p>

          <DataTable
            headers={[
              'Model',
              'Lamps',
              'Length',
              'Quartz',
              'Cables'
            ]}
            rows={[
              [
                'DC-S/4',
                '4 pcs',
                '~950mm',
                'Ø19mm',
                '4× individual 4-pin'
              ],
              [
                'DC-S/6',
                '6 pcs',
                '~950mm',
                'Ø19mm',
                '6× individual 4-pin'
              ],
              [
                'DC-U/4',
                '4 pcs',
                '~1650mm',
                'Ø28mm',
                '4× individual 4-pin'
              ],
              [
                'DC-U/6',
                '6 pcs',
                '~1650mm',
                'Ø28mm',
                '6× individual 4-pin'
              ]
            ]}
          />
        </>
      )}
    </div>
  )
}

function DCAirPage({
  images
}: {
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Air — HVAC Cassette</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        DC-AIR Series
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 14
        }}
      >
        Plug-in UVC cassette for AHU air handling units. No external panel required. Ballast integrated. AISI 316 frame.
      </p>

      <ProductImageGrid
        images={images}
        height={200}
      />

      <DataTable
        headers={[
          'Model',
          'Lamps',
          'Cassette Size',
          'Total Power',
          'Installation'
        ]}
        rows={[
          [
            'DC-AIR/2',
            '2 pcs',
            '400×400mm',
            '~100W',
            'Slide-in AHU · 4-screw'
          ],
          [
            'DC-AIR/4',
            '4 pcs',
            '500×500mm',
            '~200W',
            'Slide-in AHU · 4-screw'
          ],
          [
            'DC-AIR/6',
            '6 pcs',
            '500×900mm',
            '~300W',
            'Slide-in AHU · 6-screw'
          ],
          [
            'DC-AIR/8',
            '8 pcs',
            '600×600mm',
            '~400W',
            'Slide-in AHU · 8-screw'
          ]
        ]}
      />
    </div>
  )
}

function AirOverview() {
  return (
    <div className="animate-fade-up">
      <SectionTag>Air Disinfection</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        UVC Air Treatment Systems
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#6a8aaa',
          lineHeight: 1.8,
          maxWidth: 640,
          marginBottom: 24
        }}
      >
        C = Compact, S = Standard, P = Professional, U = Ultra. Number = lamp count. Lamp wattage not disclosed.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10
        }}
      >
        {[
          {
            h: 'DC-AIR — HVAC Cassette',
            d: 'Slide-in AHU section. AISI 316 frame.',
            i: '🔲'
          },
          {
            h: 'AU — Air Unit Fan',
            d: 'Fan-powered portable. 4 room size categories.',
            i: '🌀'
          },
          {
            h: 'DU — Duct Unit',
            d: 'Inline round duct (Ø200–400mm) and AHU cassette.',
            i: '🌬️'
          }
        ].map(c => (
          <div
            key={c.h}
            style={{
              background: '#091828',
              padding: 20,
              borderTop: '2px solid #00ccee'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              {c.i}
            </div>

            <div
              style={{
                fontFamily: 'Rajdhani,sans-serif',
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 5
              }}
            >
              {c.h}
            </div>

            <div
              style={{
                fontSize: 12.5,
                color: '#6a8aaa',
                lineHeight: 1.7
              }}
            >
              {c.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WUPage({
  models,
  images
}: {
  models: WallUnitModel[]
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Surface — Passive</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        WU Series — Wall Unit
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 4
        }}
      >
        Passive wall or ceiling mount. SS304 reflector. On/Off switch.
      </p>

      <p
        style={{
          fontSize: 12.5,
          color: '#00ccee',
          marginBottom: 14
        }}
      >
        C = Compact · S = Standard · P = Professional · U = Ultra
      </p>

      <ProductImageGrid
        images={images}
        height={180}
      />

      <DataTable
        headers={[
          'Model',
          'Series',
          'Lamps',
          'Coverage',
          'Housing W×H×L',
          'Sys. Power',
          'Supply'
        ]}
        rows={models.map(r => [
          r.model_name,
          r.series_name,
          `${r.lamp_count} pcs`,
          r.coverage,
          r.dimensions,
          r.system_power,
          '220V/50Hz'
        ])}
      />
    </div>
  )
}

function HUPage({
  models,
  images
}: {
  models: HandUnitModel[]
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Surface & Air — Portable</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        HU Series — Hand Unit
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 14
        }}
      >
        Handheld UVC for surface and spot air disinfection. SS304 body. Trained personnel only — never point at persons.
      </p>

      <ProductImageGrid
        images={images}
        height={200}
      />

      <DataTable
        headers={[
          'Model',
          'Series',
          'Lamps',
          'Length',
          'Typical Use'
        ]}
        rows={models.map(r => [
          r.model_name,
          r.series_name,
          `${r.lamp_count} pcs`,
          r.length,
          r.typical_use
        ])}
      />
    </div>
  )
}

function AUPage({
  rooms,
  images
}: {
  rooms: AirUnitRoom[]
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Air — Fan Powered</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        AU Series — Air Unit
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 4
        }}
      >
        Fan-assisted portable air disinfection. Sized by room area. SS304 standard.
      </p>

      <p
        style={{
          fontSize: 12.5,
          color: '#00ccee',
          marginBottom: 14
        }}
      >
        Options: SS316 · Timer · Remote on/off · IP65
      </p>

      <ProductImageGrid
        images={images}
        height={200}
      />

      {rooms.map(cat => (
        <div
          key={cat.id}
          style={{ marginBottom: 26 }}
        >
          <div
            style={{
              fontFamily: 'Rajdhani,sans-serif',
              fontSize: 17,
              fontWeight: 700,
              color: '#00ccee',
              marginBottom: 3
            }}
          >
            {cat.category}
          </div>

          <div
            style={{
              fontSize: 12.5,
              color: '#6a8aaa',
              marginBottom: 10
            }}
          >
            {cat.description}
          </div>

          <DataTable
            headers={[
              'Model',
              'Lamps',
              'Housing',
              'Length',
              'Note'
            ]}
            rows={cat.models.map(m => [
              m.model_name,
              m.lamps,
              m.housing_size,
              m.body_length,
              m.note
            ])}
          />
        </div>
      ))}
    </div>
  )
}

function DUPage({
  units,
  images
}: {
  units: DuctUnit[]
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Air — HVAC Inline</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        DU Series — Duct Unit
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 12
        }}
      >
        Round duct models flange between duct sections. AHU cassette models slide-in. Ballast integrated on all units.
      </p>

      <OptionBox
        title="How Lamp Count is Determined"
        items={[
          'Air UV dose = UVC Power × Lamp Length ÷ Air Flow Rate',
          'Higher velocity = shorter contact time = more lamps',
          'Standard (100 J/m²) — general air treatment',
          'Professional (250 J/m²) — food/clean rooms',
          'Premium (400 J/m²) — hospital/pharmaceutical'
        ]}
      />

      <div style={{ marginTop: 20 }}>
        <TierTable units={units} />
      </div>

      <ProductImageGrid
        images={images}
        height={160}
      />
    </div>
  )
}

function SurfaceOverview() {
  return (
    <div className="animate-fade-up">
      <SectionTag>Surface Disinfection</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        Conveyor & Room Systems
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#6a8aaa',
          lineHeight: 1.8,
          maxWidth: 640,
          marginBottom: 24
        }}
      >
        Specially coated lamps throughout — glass containment safe. Two conveyor approaches: belt self-disinfection and product disinfection tunnel.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10
        }}
      >
        {[
          {
            h: 'WU — Wall Unit',
            d: 'Passive wall/ceiling. Sized by room area.',
            i: '📡'
          },
          {
            h: 'HU — Hand Unit',
            d: 'Portable handheld. Trained personnel only.',
            i: '✋'
          },
          {
            h: 'CU-B — Belt',
            d: 'Mounted under conveyor return. Continuous self-disinfection.',
            i: '♻️'
          },
          {
            h: 'CU-P — Product',
            d: 'Enclosed UVC tunnel over running belt.',
            i: '📦'
          },
          {
            h: 'RDU-1 — Room',
            d: 'Battery-powered hospital mobile unit.',
            i: '🏥'
          }
        ].map(c => (
          <div
            key={c.h}
            style={{
              background: '#091828',
              padding: 22,
              borderTop: '2px solid #00ccee'
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>
              {c.i}
            </div>

            <div
              style={{
                fontFamily: 'Rajdhani,sans-serif',
                fontSize: 17,
                fontWeight: 600,
                marginBottom: 5
              }}
            >
              {c.h}
            </div>

            <div
              style={{
                fontSize: 12.5,
                color: '#6a8aaa',
                lineHeight: 1.7
              }}
            >
              {c.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CUPage({
  images
}: {
  images: ProductImage[]
}) {
  const [view, setView] =
    useState<'belt' | 'product'>('belt')

  return (
    <div className="animate-fade-up">
      <SectionTag>Surface — Conveyor</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        CU Series
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 18
        }}
      >
        {(['belt', 'product'] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              background:
                view === v
                  ? 'rgba(0,204,238,.1)'
                  : 'rgba(9,24,40,.8)',
              border: `1px solid ${
                view === v
                  ? 'rgba(0,204,238,.4)'
                  : 'rgba(0,204,238,.1)'
              }`,
              color:
                view === v
                  ? '#00ccee'
                  : '#6a8aaa',
              padding: '6px 13px',
              borderRadius: 100,
              fontSize: 11.5,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {v === 'belt'
              ? 'Belt Self-Disinfection'
              : 'Product Disinfection (Tunnel)'}
          </button>
        ))}
      </div>

      {view === 'belt' && (
        <>
          <ProductImageGrid
            images={images}
            height={200}
          />

          <p
            style={{
              fontSize: 13,
              color: '#6a8aaa',
              marginBottom: 16
            }}
          >
            Mounted under the conveyor frame at the belt return section. Specially coated lamps throughout.
          </p>

          {CU_DATA.map(cu => (
            <div
              key={cu.belt}
              style={{ marginBottom: 20 }}
            >
              <div
                style={{
                  fontFamily: 'Rajdhani,sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 2
                }}
              >
                {cu.belt} Belt — {cu.use}
              </div>

              <DataTable
                headers={[
                  'Belt Speed',
                  'Lamps (≥400 J/m²)'
                ]}
                rows={cu.rows.map(r => [
                  r.s,
                  `${r.n} coated`
                ])}
              />
            </div>
          ))}
        </>
      )}

      {view === 'product' && (
        <>
          <p
            style={{
              fontSize: 13,
              color: '#6a8aaa',
              marginBottom: 12
            }}
          >
            Enclosed tunnel over the running conveyor. No UV escapes. Specially coated lamps throughout.
          </p>

          <OptionBox
            title="Typical Tunnel Configurations"
            items={[
              'Bottles/ampoules (narrow, tall): Vertical lamps, 1–2 sides',
              'Flat products/trays (wide, low): Horizontal overhead + optional underside',
              'Boxes/cartons (square): 3 or 4-sided illumination',
              'Custom layouts — we specify lamp count based on product geometry and line speed'
            ]}
          />
        </>
      )}
    </div>
  )
}

function RDUPage({
  images
}: {
  images: ProductImage[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Healthcare — Mobile</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        RDU-1 — Room Disinfection Unit
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 22,
          maxWidth: 560
        }}
      >
        Mobile battery-powered UVC trolley for hospital room changeovers, isolation rooms, and clinical spaces. Specially coated lamps: glass containment safe.
      </p>

      <ProductImageGrid
        images={images}
        height={200}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginTop: 16
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Rajdhani,sans-serif',
              fontSize: 15,
              fontWeight: 600,
              color: '#00ccee',
              marginBottom: 10
            }}
          >
            OPERATION
          </div>

          {[
            'Wheel into vacated room, close door',
            'Activate via front panel — set timer',
            'Staff exits before UV activates',
            'UV active: continuous slow beep',
            'Cycle complete: 3× distinct tones',
            'No chemicals, no residue'
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                padding: '6px 0',
                borderBottom:
                  '1px solid rgba(0,204,238,.06)',
                fontSize: 12.5,
                color: '#6a8aaa'
              }}
            >
              <span
                style={{
                  color: '#00ccee',
                  fontFamily: 'Rajdhani,sans-serif',
                  fontWeight: 700,
                  minWidth: 20
                }}
              >
                {i + 1}
              </span>

              {s}
            </div>
          ))}
        </div>

        <DataTable
          headers={['Spec', '']}
          rows={[
            [
              'Lamp type',
              'Specially coated UVC — glass-safe'
            ],
            [
              'Power',
              'Rechargeable battery — cordless'
            ],
            [
              'Timer',
              'Adjustable delayed start + cycle'
            ],
            [
              'Body',
              'SS304 welded · powder coat'
            ],
            [
              'Mobility',
              '4-wheel trolley · 2 locking'
            ],
            [
              'Safety',
              'Motion sensor interlock (opt.)'
            ],
            [
              'Certification',
              'CE · Hospital grade'
            ]
          ]}
        />
      </div>
    </div>
  )
}

function SparePage({
  parts
}: {
  parts: SparePart[]
}) {
  return (
    <div className="animate-fade-up">
      <SectionTag>Spare Parts</SectionTag>

      <h2
        style={{
          fontFamily: 'Rajdhani,sans-serif',
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 14
        }}
      >
        Components Catalogue
      </h2>

      <p
        style={{
          fontSize: 13,
          color: '#6a8aaa',
          marginBottom: 24,
          maxWidth: 540
        }}
      >
        Contact us with your system model — we supply the exact replacement.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12
        }}
      >
        {parts.map(p => (
          <div
            key={p.id}
            style={{
              background: '#091828',
              border:
                '1px solid rgba(0,204,238,.07)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: 80,
                background: '#0d2236',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32
              }}
            >
              {p.icon}
            </div>

            <div style={{ padding: '14px 16px' }}>
              <div
                style={{
                  fontFamily: 'Rajdhani,sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#00ccee',
                  marginBottom: 6
                }}
              >
                {p.title}
              </div>

              <div
                style={{
                  fontSize: 12.5,
                  color: '#6a8aaa',
                  lineHeight: 1.6
                }}
              >
                {p.description}
              </div>

              <div
                style={{
                  display: 'inline-block',
                  background:
                    'rgba(0,204,238,.08)',
                  border:
                    '1px solid rgba(0,204,238,.25)',
                  color: '#00ccee',
                  fontSize: 10,
                  padding: '2px 7px',
                  borderRadius: 2,
                  marginTop: 10
                }}
              >
                Contact for availability
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ProductsPage ────────────────────────────────────────────────────────

export default function ProductsPage({
  cats
}: Props) {
  const [med, setMed] =
    useState<'W' | 'A' | 'S' | null>(null)

  const [cat, setCat] =
    useState<string | null>(null)

  const renderContent = () => {
    switch (cat) {
      case 'w0':
        return <WaterOverview />

      case 'pe':
        return (
          <ClosedVessel
            prefix="PE"
            mat="HDPE Polyethylene"
            bar="4 bar"
            models={FB_PE}
            images={FB_IMGS.PE || []}
          />
        )

      case 'pp':
        return (
          <ClosedVessel
            prefix="PP"
            mat="Polypropylene"
            bar="4 bar"
            models={FB_PE.map(m => ({
              ...m,
              series: 'PP' as const,
              model_name:
                m.model_name.replace('PE', 'PP')
            }))}
            images={[]}
          />
        )

      case 'ss':
        return (
          <ClosedVessel
            prefix="SS"
            mat="Stainless 304"
            bar="6 bar"
            models={FB_PE.map(m => ({
              ...m,
              series: 'SS' as const,
              model_name:
                m.model_name.replace('PE', 'SS')
            }))}
            images={[]}
          />
        )

      case 'sm':
        return (
          <ClosedVessel
            prefix="SM"
            mat="SS316 Marine"
            bar="6 bar"
            models={FB_PE.map(m => ({
              ...m,
              series: 'SM' as const,
              model_name:
                m.model_name.replace('PE', 'SM')
            }))}
            images={FB_IMGS.SM || []}
          />
        )

      case 'oc':
        return <OCPage />

      case 'ds':
        return (
          <DipPage
            type="ds"
            images={FB_IMGS.DS || []}
          />
        )

      case 'dm':
        return (
          <DipPage
            type="dm"
            images={FB_IMGS.DM || []}
          />
        )

      case 'dc':
        return (
          <DipPage
            type="dc"
            images={[]}
          />
        )

      case 'a0':
        return <AirOverview />

      case 'dcair':
        return (
          <DCAirPage
            images={FB_IMGS.DCAIR || []}
          />
        )

      case 'au':
        return (
          <AUPage
            rooms={FB_AU}
            images={FB_IMGS.AU || []}
          />
        )

      case 'du':
        return (
          <DUPage
            units={FB_DU}
            images={FB_IMGS.DU || []}
          />
        )

      case 's0':
        return <SurfaceOverview />

      case 'wu':
        return (
          <WUPage
            models={FB_WU}
            images={FB_IMGS.WU || []}
          />
        )

      case 'hu':
        return (
          <HUPage
            models={FB_HU}
            images={FB_IMGS.HU || []}
          />
        )

      case 'cu':
        return (
          <CUPage
            images={FB_IMGS.CU || []}
          />
        )

      case 'rdu':
        return (
          <RDUPage
            images={FB_IMGS.RDU || []}
          />
        )

      case 'spare':
        return (
          <SparePage
            parts={FB_SPARE}
          />
        )

      default:
        return <WaterOverview />
    }
  }

  // ─── Portal view ────────────────────────────────────────────────────────────

  if (!med) {
    const portals = [
      {
        cls: 'W',
        Canvas: WaterVideo,
        tag: 'Water Treatment',
        h: 'WATER',
        sub: 'Closed vessel · open channel · immersion — 5 to 900 m³/h',
        lbl: 'Explore Water',
        c: 'w0',
        ov: 'linear-gradient(180deg,rgba(0,20,60,.55),rgba(0,50,120,.3) 60%,rgba(0,90,160,.15))'
      },
      {
  cls: 'A',
  Canvas: AirVideo,
  tag: 'Air Treatment',
  h: 'AIR',
  sub: 'HVAC cassette · fan units · duct inline — any space, any duct',
  lbl: 'Explore Air',
  c: 'a0',
  ov: 'linear-gradient(180deg,rgba(0,20,10,.55),rgba(0,60,30,.35) 60%,rgba(0,110,60,.2))'
},
      {
        cls: 'S',
        Canvas: SurfaceCanvas,
        tag: 'Surface Treatment',
        h: 'SURFACE',
        sub: 'Conveyor disinfection · wall units · hospital mobile',
        lbl: 'Explore Surface',
        c: 's0',
        ov: 'linear-gradient(180deg,rgba(20,0,40,.8),rgba(70,0,90,.5) 60%,rgba(110,0,130,.3))'
      }
    ]

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          height: 'calc(100vh - 58px)',
          marginTop: 58
        }}
      >
        {portals.map(p => (
          <div
            key={p.h}
            onClick={() => {
              setMed(p.cls as 'W' | 'A' | 'S')
              setCat(p.c)
            }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '44px 36px',
              transition: '.3s'
            }}
          >
            <p.Canvas />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: p.ov,
                transition: '.3s'
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 2
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color:
                    'rgba(234,244,255,.6)',
                  fontWeight: 600,
                  marginBottom: 8
                }}
              >
                {p.tag}
              </div>

              <div
                style={{
                  fontFamily: 'Rajdhani,sans-serif',
                  fontSize: 52,
                  fontWeight: 700,
                  lineHeight: 0.95,
                  marginBottom: 10
                }}
              >
                {p.h}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color:
                    'rgba(234,244,255,.6)',
                  lineHeight: 1.6,
                  maxWidth: 240,
                  marginBottom: 18
                }}
              >
                {p.sub}
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'Rajdhani,sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#00ccee',
                  border:
                    '1px solid rgba(0,204,238,.35)',
                  padding: '7px 16px',
                  borderRadius: 2
                }}
              >
                → {p.lbl}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ─── Sidebar + content view ─────────────────────────────────────────────────

  const sectionCats =
    cats.filter(c => c.section === med)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '210px 1fr',
        marginTop: 58
      }}
    >
      <div
        style={{
          background: '#091828',
          borderRight:
            '1px solid rgba(0,204,238,.1)',
          position: 'sticky',
          top: 58,
          height: 'calc(100vh - 58px)',
          overflowY: 'auto',
          padding: '16px 0'
        }}
      >
        <div
          style={{
            padding: '10px 12px 4px',
            display: 'flex',
            gap: 5,
            flexWrap: 'wrap'
          }}
        >
          {(['W', 'A', 'S'] as const).map(m => (
            <button
              key={m}
              onClick={() => {
                setMed(m)
                setCat(
                  m === 'W'
                    ? 'w0'
                    : m === 'A'
                      ? 'a0'
                      : 's0'
                )
              }}
              style={{
                background:
                  med === m
                    ? 'rgba(0,204,238,.14)'
                    : 'rgba(9,24,40,.8)',
                border: `1px solid ${
                  med === m
                    ? 'rgba(0,204,238,.4)'
                    : 'rgba(0,204,238,.12)'
                }`,
                color:
                  med === m
                    ? '#00ccee'
                    : '#6a8aaa',
                fontSize: 11,
                letterSpacing: 1,
                padding: '5px 10px',
                borderRadius: 2,
                fontFamily:
                  'Rajdhani,sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                flex: 1
              }}
            >
              {m === 'W'
                ? '💧 WATER'
                : m === 'A'
                  ? '💨 AIR'
                  : '🧱 SURF'}
            </button>
          ))}
        </div>

        {sectionCats.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.slug)}
            style={{
              width: '100%',
              background:
                cat === c.slug
                  ? 'rgba(0,204,238,.07)'
                  : 'none',
              textAlign: 'left',
              padding: '10px 16px',
              fontSize: 12,
              color:
                cat === c.slug
                  ? '#00ccee'
                  : '#6a8aaa',
              fontWeight:
                cat === c.slug
                  ? 600
                  : 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderRight: `2px solid ${
                cat === c.slug
                  ? '#00ccee'
                  : 'transparent'
              }`,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: '.12s'
            }}
          >
            <span
              style={{
                fontSize: 14,
                flexShrink: 0
              }}
            >
              {c.icon}
            </span>

            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 12
                }}
              >
                {c.label}
              </div>

              {c.sub && (
                <div
                  style={{
                    fontSize: 10.5,
                    color: '#6a8aaa',
                    marginTop: 1
                  }}
                >
                  {c.sub}
                </div>
              )}
            </div>
          </button>
        ))}

        <div
          style={{
            padding: '5px 16px',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color:
              'rgba(106,138,170,.45)',
            fontWeight: 600,
            marginTop: 8
          }}
        >
          COMPONENTS
        </div>

        <button
          onClick={() => setCat('spare')}
          style={{
            width: '100%',
            background:
              cat === 'spare'
                ? 'rgba(0,204,238,.07)'
                : 'none',
            textAlign: 'left',
            padding: '10px 16px',
            fontSize: 12,
            color:
              cat === 'spare'
                ? '#00ccee'
                : '#6a8aaa',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderRight: `2px solid ${
              cat === 'spare'
                ? '#00ccee'
                : 'transparent'
            }`,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          <span
            style={{
              fontSize: 14
            }}
          >
            🔧
          </span>

          <div
            style={{
              fontWeight: 600,
              fontSize: 12
            }}
          >
            Spare Parts
          </div>
        </button>

        <div
          style={{
            padding: '8px 12px',
            marginTop: 10
          }}
        >
          <button
            onClick={() => {
              setMed(null)
              setCat(null)
            }}
            style={{
              width: '100%',
              background: 'none',
              border:
                '1px solid rgba(0,204,238,.18)',
              color: '#6a8aaa',
              fontSize: 11,
              letterSpacing: 1,
              padding: 6,
              borderRadius: 2,
              fontFamily:
                'Rajdhani,sans-serif',
              cursor: 'pointer'
            }}
          >
            ← Change
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '36px 40px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 58px)'
        }}
      >
        {renderContent()}
      </div>
    </div>
  )
}