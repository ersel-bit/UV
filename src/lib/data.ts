import { supabase } from './supabase'
import type { SiteSettings, ProductCategory, ClosedVesselModel, DipModel,
  WallUnitModel, HandUnitModel, AirUnitRoom, AirUnitModel, DuctUnit, DuctUnitRow,
  Reference, TradeEvent, EventImage, ProductImage, Industry, WhyCard, SparePart, Certification } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error) throw error; return data
}
export async function updateSiteSettings(s: Partial<SiteSettings>) {
  const { data, error } = await supabase.from('site_settings').update({...s,updated_at:new Date().toISOString()}).not('id','is',null).select().single()
  if (error) throw error; return data
}
export async function getProductCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase.from('product_categories').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getClosedVesselModels(series: 'PE'|'PP'|'SS'|'SM'): Promise<ClosedVesselModel[]> {
  const { data, error } = await supabase.from('closed_vessel_models').select('*').eq('series',series).eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getDipModels(series: 'DS'|'DM'|'DC'|'DCAIR'): Promise<DipModel[]> {
  const { data, error } = await supabase.from('dip_models').select('*').eq('series',series).eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getWallUnitModels(): Promise<WallUnitModel[]> {
  const { data, error } = await supabase.from('wall_unit_models').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getHandUnitModels(): Promise<HandUnitModel[]> {
  const { data, error } = await supabase.from('hand_unit_models').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getAirUnitRooms(): Promise<AirUnitRoom[]> {
  const { data, error } = await supabase.from('air_unit_rooms').select('*, air_unit_models(*)').order('sort_order')
  if (error) throw error
  return (data||[]).map(r=>({...r, models:(r.air_unit_models||[]).sort((a:AirUnitModel,b:AirUnitModel)=>a.sort_order-b.sort_order)}))
}
export async function getDuctUnits(): Promise<DuctUnit[]> {
  const { data, error } = await supabase.from('duct_units').select('*, duct_unit_rows(*)').eq('is_active',true).order('sort_order')
  if (error) throw error
  return (data||[]).map(d=>({...d, rows:(d.duct_unit_rows||[]).sort((a:DuctUnitRow,b:DuctUnitRow)=>a.sort_order-b.sort_order)}))
}
export async function getReferences(): Promise<Reference[]> {
  const { data, error } = await supabase.from('references_table').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getTradeEvents(): Promise<TradeEvent[]> {
  const { data, error } = await supabase.from('trade_events').select('*, event_images(*)').eq('is_active',true).order('sort_order')
  if (error) throw error
  return (data||[]).map(e=>({...e, images:(e.event_images||[]).sort((a:EventImage,b:EventImage)=>a.sort_order-b.sort_order)}))
}
export async function getProductImages(section: string): Promise<ProductImage[]> {
  const { data, error } = await supabase.from('product_images').select('*').eq('product_section',section).eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase.from('industries').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getWhyCards(): Promise<WhyCard[]> {
  const { data, error } = await supabase.from('why_cards').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getSpareParts(): Promise<SparePart[]> {
  const { data, error } = await supabase.from('spare_parts').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase.from('certifications').select('*').eq('is_active',true).order('sort_order')
  if (error) throw error; return data||[]
}
