
export interface SiteSettings {
  id: string; company_name: string; tagline: string
  hero_headline_1: string; hero_headline_2: string; hero_headline_3: string; hero_subtext: string
  years_experience: string; systems_installed: string; projects: string; industries: string; countries: string; facility_size: string
  address: string; phone: string; email: string; city: string; country: string
  seo_title: string; seo_description: string; og_image_url: string
  technology_intro_video_id: string; updated_at: string
}
export interface ProductCategory {
  id: string; slug: string; section: 'W'|'A'|'S'|null
  icon: string; label: string; sub: string; sort_order: number; is_active: boolean
}
export interface ClosedVesselModel {
  id: string; series: 'PE'|'PP'|'SS'|'SM'; model_name: string; flow_rate: string
  body_dn: string; inner_length: string; total_length: string; connection: string
  lamps: string; system_power: string; is_hp: boolean; sort_order: number; is_active: boolean
}
export interface DipModel {
  id: string; series: 'DS'|'DM'|'DC'|'DCAIR'; model_name: string; lamps: string
  total_length: string; quartz_sleeve: string; connection: string
  cassette_size?: string; system_power?: string; installation_note?: string
  sort_order: number; is_active: boolean
}
export interface WallUnitModel {
  id: string; model_name: string; series_name: string; lamp_count: number
  coverage: string; dimensions: string; system_power: string; sort_order: number; is_active: boolean
}
export interface HandUnitModel {
  id: string; model_name: string; series_name: string; lamp_count: number
  length: string; typical_use: string; sort_order: number; is_active: boolean
}
export interface AirUnitRoom {
  id: string; category: string; description: string; sort_order: number; models: AirUnitModel[]
}
export interface AirUnitModel {
  id: string; room_category_id: string; model_name: string; lamps: string
  housing_size: string; body_length: string; note: string; sort_order: number; is_active: boolean
}
export interface DuctUnit {
  id: string; model_name: string; description: string; sort_order: number; rows: DuctUnitRow[]
}
export interface DuctUnitRow {
  id: string; duct_unit_id: string; air_flow: string; velocity: string
  lamps_standard: string; lamps_professional: string; lamps_premium: string; sort_order: number
}
export interface ConveyorUnit {
  id: string; belt_width: string; typical_use: string; mount_description: string
  sort_order: number; rows: ConveyorRow[]
}
export interface ConveyorRow {
  id: string; conveyor_unit_id: string; belt_speed: string; lamp_count: string; sort_order: number
}
export interface ProductImage {
  id: string; product_section: string; image_url: string
  alt_text: string; caption: string; sort_order: number; is_active: boolean
}
export interface Reference {
  id: string; company_name: string; sector: string; description: string; sort_order: number; is_active: boolean
}
export interface TradeEvent {
  id: string; title: string; location: string; event_date: string
  description: string; sort_order: number; is_active: boolean; images: EventImage[]
}
export interface EventImage {
  id: string; event_id: string; image_url: string; caption: string; sort_order: number
}
export interface Application {
  id: string; slug: string; title: string; sector: string; tag: string
  intro: string; body: string; image_url: string; recommended_systems: string
  sort_order: number; is_active: boolean
}
export interface Industry {
  id: string; icon: string; name: string; description: string; sort_order: number; is_active: boolean
}
export interface WhyCard {
  id: string; number: string; heading: string; body: string; sort_order: number; is_active: boolean
}
export interface SparePart {
  id: string; title: string; description: string; icon: string; sort_order: number; is_active: boolean
}
export interface Certification {
  id: string; name: string; sort_order: number; is_active: boolean
}
