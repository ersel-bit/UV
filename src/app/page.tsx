'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HomePage from '@/components/pages/HomePage'
import ProductsPage from '@/components/pages/ProductsPage'
import TechPage from '@/components/pages/TechPage'
import AboutPage from '@/components/pages/AboutPage'
import RefsPage from '@/components/pages/RefsPage'
import ContactPage from '@/components/pages/ContactPage'
import CareerPage from '@/components/pages/CareerPage'
import EventsPage from '@/components/pages/EventsPage'
import ApplicationsPage from '@/components/pages/ApplicationsPage'
import ConsultingPage from '@/components/pages/ConsultingPage'
import PartnersPage from '@/components/pages/PartnersPage'
import type { SiteSettings, ProductCategory, Certification } from '@/types'

const FB_SETTINGS: SiteSettings = {
  id:'1', company_name:'UVTechnic', tagline:'European Technology. Made in Turkey.',
  hero_headline_1:'PROTECTING WATER.', hero_headline_2:'PURIFYING AIR.', hero_headline_3:'Securing Surfaces.',
  hero_subtext:'UVTechnic engineers and manufactures complete UVC disinfection systems for water, air, and surface applications — in Turkey, to European technical standards.',
  years_experience:'8+', systems_installed:'300+', projects:'40+', industries:'12+', countries:'5', facility_size:'2,500 m²',
  address:'1139 Sokak No:2, Yenişehir / İZMİR, Turkey', phone:'+90 232 458 0862', email:'info@uvtechnic.com',
  city:'İzmir', country:'Turkey',
  seo_title:'UVTechnic — UV Disinfection Systems',
  seo_description:'UVC disinfection systems for water, air and surface.',
  og_image_url:'', technology_intro_video_id:'ED3DWI567xM',
  updated_at: new Date().toISOString(),
}

const FB_CATS: ProductCategory[] = [
  {id:'w0',slug:'w0',section:'W',icon:'💧',label:'Water Systems',sub:'Overview',sort_order:1,is_active:true},
  {id:'pe',slug:'pe',section:'W',icon:'🔵',label:'PE — HDPE',sub:'4 bar · 5–400 m³/h',sort_order:2,is_active:true},
  {id:'pp',slug:'pp',section:'W',icon:'🟣',label:'PP — Polypropylene',sub:'4 bar · 5–400 m³/h',sort_order:3,is_active:true},
  {id:'ss',slug:'ss',section:'W',icon:'⚙️',label:'SS — Stainless 304',sub:'6 bar · options',sort_order:4,is_active:true},
  {id:'sm',slug:'sm',section:'W',icon:'🔷',label:'SM — SS316 Marine',sub:'6 bar · marine grade',sort_order:5,is_active:true},
  {id:'oc',slug:'oc',section:'W',icon:'🌊',label:'OC — Open Channel',sub:'450 & 900 m³/h',sort_order:6,is_active:true},
  {id:'ds',slug:'ds',section:'W',icon:'⬇️',label:'DS — Dip Suspension',sub:'Top-hanging',sort_order:7,is_active:true},
  {id:'dm',slug:'dm',section:'W',icon:'🔩',label:'DM — Dip Mount',sub:'Side-fixed',sort_order:8,is_active:true},
  {id:'dc',slug:'dc',section:'W',icon:'📦',label:'DC — Dip Cassette',sub:'Submersible multi-lamp',sort_order:9,is_active:true},
  {id:'a0',slug:'a0',section:'A',icon:'💨',label:'Air Systems',sub:'Overview',sort_order:10,is_active:true},
  {id:'dcair',slug:'dcair',section:'A',icon:'🔲',label:'DC-AIR — HVAC Cassette',sub:'AHU slide-in cassette',sort_order:11,is_active:true},
  {id:'au',slug:'au',section:'A',icon:'🌀',label:'AU — Air Unit Fan',sub:'Room-based sizing',sort_order:12,is_active:true},
  {id:'du',slug:'du',section:'A',icon:'🌬️',label:'DU — Duct Unit',sub:'HVAC inline',sort_order:13,is_active:true},
  {id:'s0',slug:'s0',section:'S',icon:'🧱',label:'Surface Systems',sub:'Overview',sort_order:14,is_active:true},
  {id:'wu',slug:'wu',section:'S',icon:'📡',label:'WU — Wall Unit',sub:'C/S/P/U series',sort_order:15,is_active:true},
  {id:'hu',slug:'hu',section:'S',icon:'✋',label:'HU — Hand Unit',sub:'C/S/P series',sort_order:16,is_active:true},
  {id:'cu',slug:'cu',section:'S',icon:'🏭',label:'CU — Conveyor',sub:'Belt & product disinfection',sort_order:17,is_active:true},
  {id:'rdu',slug:'rdu',section:'S',icon:'🏥',label:'RDU-1 — Room',sub:'Hospital mobile',sort_order:18,is_active:true},
  {id:'spare',slug:'spare',section:null,icon:'🔧',label:'Spare Parts',sub:'Lamps · Quartz · Ballasts',sort_order:19,is_active:true},
]

const FB_CERTS: Certification[] = [
  {id:'1',name:'CE Certified',sort_order:1,is_active:true},
  {id:'2',name:'ISO 9001:2015',sort_order:2,is_active:true},
  {id:'3',name:'ISO 14001:2015',sort_order:3,is_active:true},
  {id:'4',name:'ISO 45001:2018',sort_order:4,is_active:true},
]

export default function App() {
  const [page, setPage] = useState('home')
  const [settings, setSettings] = useState<SiteSettings>(FB_SETTINGS)
  const [cats, setCats] = useState<ProductCategory[]>(FB_CATS)
  const [certs, setCerts] = useState<Certification[]>(FB_CERTS)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!url || url === 'your-project-url') return
    import('@/lib/data').then(({ getSiteSettings, getProductCategories, getCertifications }) => {
      getSiteSettings().then(setSettings).catch(console.error)
      getProductCategories().then(setCats).catch(console.error)
      getCertifications().then(setCerts).catch(console.error)
    })
  }, [])

  const goTo = (p: string) => { setPage(p); window.scrollTo(0, 0) }

  const renderPage = () => {
    switch (page) {
      case 'home':         return <HomePage settings={settings} onNav={goTo}/>
      case 'products':     return <ProductsPage cats={cats}/>
      case 'technology':   return <TechPage settings={settings}/>
      case 'about':        return <AboutPage settings={settings}/>
      case 'references':   return <RefsPage/>
      case 'contact':      return <ContactPage settings={settings}/>
      case 'career':       return <CareerPage/>
      case 'events':       return <EventsPage/>
      case 'applications': return <ApplicationsPage onNav={goTo}/>
      case 'consulting':   return <ConsultingPage settings={settings}/>
      case 'partners':     return <PartnersPage/>
      default:             return <HomePage settings={settings} onNav={goTo}/>
    }
  }

  return (
    <>
      <Header settings={settings} cats={cats} page={page} onNav={goTo}/>
      <main>{renderPage()}</main>
      <Footer settings={settings} certs={certs} onNav={goTo}/>
    </>
  )
}
