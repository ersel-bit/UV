-- ============================================================
-- UVTechnic CMS — Supabase SQL Schema
-- Run this entire script in:
--   Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Site Settings (singleton row) ────────────────────────────────────────────
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'UVTechnic',
  tagline TEXT NOT NULL DEFAULT 'European Technology. Made in Turkey.',
  hero_headline_1 TEXT NOT NULL DEFAULT 'PROTECTING WATER.',
  hero_headline_2 TEXT NOT NULL DEFAULT 'PURIFYING AIR.',
  hero_headline_3 TEXT NOT NULL DEFAULT 'Securing Surfaces.',
  hero_subtext TEXT NOT NULL DEFAULT 'UVTechnic engineers and manufactures complete UVC disinfection systems for water, air, and surface applications — in Turkey, to European technical standards.',
  years_experience TEXT NOT NULL DEFAULT '8+',
  systems_installed TEXT NOT NULL DEFAULT '300+',
  projects TEXT NOT NULL DEFAULT '40+',
  industries TEXT NOT NULL DEFAULT '12+',
  countries TEXT NOT NULL DEFAULT '5',
  facility_size TEXT NOT NULL DEFAULT '2,500 m²',
  address TEXT NOT NULL DEFAULT '1139 Sokak No:2, Yenişehir / İZMİR, Turkey',
  phone TEXT NOT NULL DEFAULT '+90 232 458 0862',
  email TEXT NOT NULL DEFAULT 'info@uvtechnic.com',
  city TEXT NOT NULL DEFAULT 'İzmir',
  country TEXT NOT NULL DEFAULT 'Turkey',
  seo_title TEXT NOT NULL DEFAULT 'UVTechnic — UV Disinfection Systems',
  seo_description TEXT NOT NULL DEFAULT 'UVC disinfection systems for water, air and surface — engineered and manufactured in Turkey to European standards.',
  og_image_url TEXT NOT NULL DEFAULT '',
  technology_intro_video_id TEXT NOT NULL DEFAULT 'ED3DWI567xM',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO site_settings DEFAULT VALUES;

-- ── Product Categories ────────────────────────────────────────────────────────
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  section TEXT CHECK (section IN ('W','A','S')),
  icon TEXT NOT NULL DEFAULT '💧',
  label TEXT NOT NULL,
  sub TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO product_categories (slug,section,icon,label,sub,sort_order) VALUES
  ('w0','W','💧','Water Systems','Overview',1),
  ('pe','W','🔵','PE — HDPE','4 bar · 5–400 m³/h',2),
  ('pp','W','🟣','PP — Polypropylene','4 bar · 5–400 m³/h',3),
  ('ss','W','⚙️','SS — Stainless 304','6 bar · options',4),
  ('sm','W','🔷','SM — SS316 Marine','6 bar · marine grade',5),
  ('oc','W','🌊','OC — Open Channel','450 & 900 m³/h',6),
  ('ds','W','⬇️','DS — Dip Suspension','Top-hanging',7),
  ('dm','W','🔩','DM — Dip Mount','Side-fixed',8),
  ('dc','W','📦','DC — Dip Cassette','Submersible multi-lamp',9),
  ('a0','A','💨','Air Systems','Overview',10),
  ('dcair','A','🔲','DC-AIR — HVAC Cassette','AHU slide-in cassette',11),
  ('au','A','🌀','AU — Air Unit Fan','Room-based sizing',12),
  ('du','A','🌬️','DU — Duct Unit','HVAC inline',13),
  ('s0','S','🧱','Surface Systems','Overview',14),
  ('wu','S','📡','WU — Wall Unit','C/S/P/U series',15),
  ('hu','S','✋','HU — Hand Unit','C/S/P series',16),
  ('cu','S','🏭','CU — Conveyor','Belt & product disinfection',17),
  ('rdu','S','🏥','RDU-1 — Room','Hospital mobile',18),
  ('spare',NULL,'🔧','Spare Parts','Lamps · Quartz · Ballasts',19);

-- ── Closed Vessel Models ──────────────────────────────────────────────────────
CREATE TABLE closed_vessel_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  series TEXT NOT NULL CHECK (series IN ('PE','PP','SS','SM')),
  model_name TEXT NOT NULL,
  flow_rate TEXT NOT NULL,
  body_dn TEXT NOT NULL,
  inner_length TEXT NOT NULL,
  total_length TEXT NOT NULL,
  connection TEXT NOT NULL,
  lamps TEXT NOT NULL,
  system_power TEXT NOT NULL,
  is_hp BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO closed_vessel_models (series,model_name,flow_rate,body_dn,inner_length,total_length,connection,lamps,system_power,is_hp,sort_order) VALUES
  ('PE','PE-05','5','DN160','780','920','DN32 (1¼")','1 pcs','~26W',false,1),
  ('PE','PE-10','10','DN200','780','920','DN40 (1½")','2 pcs','~52W',false,2),
  ('PE','PE-15','15','DN200','780','920','DN50 (2")','2 pcs','~88W',false,3),
  ('PE','PE-20','20','DN250','780','920','DN65 (2½")','4 pcs','~288W',false,4),
  ('PE','PE-25','25','DN200','1452','1592','DN65 (2½")','1 pcs HP','~340W',true,5),
  ('PE','PE-30','30','DN250','780','920','DN80 (3")','4 pcs','~288W',false,6),
  ('PE','PE-45','45','DN250','780','920','DN80 (3")','4 pcs','~352W',false,7),
  ('PE','PE-60','60','DN225','1452','1592','DN100 (4")','2 pcs HP','~700W',true,8),
  ('PE','PE-80','80','DN250','1452','1592','DN125 (5")','3 pcs HP','~1050W',true,9),
  ('PE','PE-100','100','DN280','1452','1592','DN125 (5")','3 pcs HP','~1050W',true,10),
  ('PE','PE-125','125','DN280','1452','1592','DN150 (6")','4 pcs HP','~1400W',true,11),
  ('PE','PE-150','150','DN280','1452','1592','DN150 (6")','5 pcs HP','~1750W',true,12),
  ('PE','PE-200','200','DN315','1452','1592','DN200 (8")','6 pcs HP','~2100W',true,13),
  ('PE','PE-300','300','DN355','1452','1592','DN250 (10")','7 pcs HP','~2450W',true,14),
  ('PE','PE-400','400','DN400','1452','1592','DN250 (10")','8 pcs HP','~2800W',true,15);

-- ── Dip Models ────────────────────────────────────────────────────────────────
CREATE TABLE dip_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  series TEXT NOT NULL CHECK (series IN ('DS','DM','DC','DCAIR')),
  model_name TEXT NOT NULL,
  lamps TEXT NOT NULL,
  total_length TEXT NOT NULL,
  quartz_sleeve TEXT NOT NULL DEFAULT '',
  connection TEXT NOT NULL DEFAULT '',
  cassette_size TEXT,
  system_power TEXT,
  installation_note TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO dip_models (series,model_name,lamps,total_length,quartz_sleeve,connection,sort_order) VALUES
  ('DS','DS-C','1 pcs','~470mm','Ø19mm','4-pin · 3m WP cable',1),
  ('DS','DS-S','1 pcs','~900mm','Ø19mm','4-pin · 5m WP cable',2),
  ('DS','DS-P','1 pcs','~900mm','Ø19mm','4-pin · 5m WP cable',3),
  ('DS','DS-U','1 pcs','~1600mm','Ø28mm','4-pin · 5m WP cable',4),
  ('DM','DM-C','1 pcs','~470mm','Ø19mm','4-pin · 3m WP cable',1),
  ('DM','DM-S','1 pcs','~900mm','Ø19mm','4-pin · 5m WP cable',2),
  ('DM','DM-P','1 pcs','~900mm','Ø19mm','4-pin · 5m WP cable',3),
  ('DC','DC-S/4','4 pcs','~950mm','Ø19mm','4× individual 4-pin',1),
  ('DC','DC-S/6','6 pcs','~950mm','Ø19mm','6× individual 4-pin',2),
  ('DC','DC-U/4','4 pcs','~1650mm','Ø28mm','4× individual 4-pin',3),
  ('DC','DC-U/6','6 pcs','~1650mm','Ø28mm','6× individual 4-pin',4);
INSERT INTO dip_models (series,model_name,lamps,total_length,quartz_sleeve,connection,cassette_size,system_power,installation_note,sort_order) VALUES
  ('DCAIR','DC-AIR/2','2 pcs','-','-','-','400×400mm','~100W','Slide-in AHU section · 4-screw fix',1),
  ('DCAIR','DC-AIR/4','4 pcs','-','-','-','500×500mm','~200W','Slide-in AHU section · 4-screw fix',2),
  ('DCAIR','DC-AIR/6','6 pcs','-','-','-','500×900mm','~300W','Slide-in AHU section · 6-screw fix',3),
  ('DCAIR','DC-AIR/8','8 pcs','-','-','-','600×600mm','~400W','Slide-in AHU section · 8-screw fix',4);

-- ── Wall Unit Models ──────────────────────────────────────────────────────────
CREATE TABLE wall_unit_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  series_name TEXT NOT NULL,
  lamp_count INTEGER NOT NULL,
  coverage TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  system_power TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO wall_unit_models (model_name,series_name,lamp_count,coverage,dimensions,system_power,sort_order) VALUES
  ('WU-C/1','Compact',1,'Up to 10 m²','100×90×500mm','~26W',1),
  ('WU-C/2','Compact',2,'Up to 18 m²','160×90×500mm','~52W',2),
  ('WU-S/1','Standard',1,'Up to 20 m²','100×90×910mm','~50W',3),
  ('WU-S/2','Standard',2,'Up to 40 m²','160×90×910mm','~100W',4),
  ('WU-S/4','Standard',4,'Up to 60 m²','280×90×910mm','~200W',5),
  ('WU-S/8','Standard',8,'Up to 100 m²','520×90×910mm','~400W',6),
  ('WU-P/1','Professional',1,'Up to 25 m²','100×90×910mm','~76W',7),
  ('WU-P/2','Professional',2,'Up to 50 m²','160×90×910mm','~152W',8),
  ('WU-P/4','Professional',4,'Up to 80 m²','280×90×910mm','~304W',9),
  ('WU-P/8','Professional',8,'Up to 150 m²','520×90×910mm','~608W',10),
  ('WU-U/1','Ultra',1,'Up to 30 m²','100×90×910mm','~88W',11),
  ('WU-U/2','Ultra',2,'Up to 60 m²','160×90×910mm','~176W',12),
  ('WU-U/4','Ultra',4,'Up to 100 m²','280×90×910mm','~352W',13),
  ('WU-U/8','Ultra',8,'200+ m²','520×90×910mm','~704W',14);

-- ── Hand Unit Models ──────────────────────────────────────────────────────────
CREATE TABLE hand_unit_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  series_name TEXT NOT NULL,
  lamp_count INTEGER NOT NULL,
  length TEXT NOT NULL,
  typical_use TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO hand_unit_models (model_name,series_name,lamp_count,length,typical_use,sort_order) VALUES
  ('HU-C/1','Compact',1,'500mm','Spot surface disinfection',1),
  ('HU-C/2','Compact',2,'500mm','Wide spot — double coverage',2),
  ('HU-S/1','Standard',1,'910mm','Long-reach surface disinfection',3),
  ('HU-S/2','Standard',2,'910mm','High-dose surface treatment',4),
  ('HU-P/1','Professional',1,'910mm','Rapid professional disinfection',5),
  ('HU-P/2','Professional',2,'910mm','Premium double — max surface dose',6);

-- ── Air Unit Rooms & Models ───────────────────────────────────────────────────
CREATE TABLE air_unit_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE air_unit_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_category_id UUID REFERENCES air_unit_rooms(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  lamps TEXT NOT NULL,
  housing_size TEXT NOT NULL,
  body_length TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
WITH cats AS (
  INSERT INTO air_unit_rooms (category,description,sort_order) VALUES
    ('Up to 15 m²','Toilets · Storage · Small exam rooms',1),
    ('15–35 m²','Offices · Hotel rooms · Hospital rooms',2),
    ('35–80 m²','Operating areas · Waiting rooms · Classrooms',3),
    ('80+ m²','Industrial halls · Large open spaces',4)
  RETURNING id, category
)
INSERT INTO air_unit_models (room_category_id,model_name,lamps,housing_size,body_length,note,sort_order)
SELECT c.id,m.model_name,m.lamps,m.housing_size,m.body_length,m.note,m.sort_order
FROM cats c
JOIN (VALUES
  ('Up to 15 m²','AU-C/1','1 pcs','100×100mm','534mm','Basic',1),
  ('Up to 15 m²','AU-C/2','2 pcs','100×100mm','534mm','Enhanced',2),
  ('15–35 m²','AU-S/1','1 pcs','100×100mm','944mm','Standard',1),
  ('15–35 m²','AU-S/2','2 pcs','100×100mm','944mm','Hospital grade',2),
  ('35–80 m²','AU-P/1','1 pcs','100×100mm','944mm','High output',1),
  ('35–80 m²','AU-P/2','2 pcs','100×100mm','944mm','Premium',2),
  ('35–80 m²','AU-P/4','4 pcs','140×140mm','944mm','Maximum',3),
  ('80+ m²','AU-U/2','2 pcs','100×100mm','930mm','High intensity',1),
  ('80+ m²','AU-U/4','4 pcs','140×140mm','930mm','Maximum',2)
) AS m(cat,model_name,lamps,housing_size,body_length,note,sort_order)
ON c.category = m.cat;

-- ── Duct Units ────────────────────────────────────────────────────────────────
CREATE TABLE duct_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE duct_unit_rows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  duct_unit_id UUID REFERENCES duct_units(id) ON DELETE CASCADE,
  air_flow TEXT NOT NULL,
  velocity TEXT NOT NULL,
  lamps_standard TEXT NOT NULL,
  lamps_professional TEXT NOT NULL,
  lamps_premium TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
WITH du AS (
  INSERT INTO duct_units (model_name,description,sort_order) VALUES
    ('DU-C200','Ø200mm round duct',1),
    ('DU-C250','Ø250mm round duct',2),
    ('DU-C315','Ø315mm round duct',3),
    ('DU-C400','Ø400mm round duct',4),
    ('DU-S500','500×500mm AHU cassette — ballast on unit',5),
    ('DU-S600','600×600mm large AHU cassette — ballast on unit',6)
  RETURNING id, model_name
)
INSERT INTO duct_unit_rows (duct_unit_id,air_flow,velocity,lamps_standard,lamps_professional,lamps_premium,sort_order)
SELECT du.id,r.af,r.vel,r.ls,r.lp,r.lpr,r.so FROM du
JOIN (VALUES
  ('DU-C200','100–250 m³/h','0.9–2.2 m/s','1 pcs','1 pcs','2 pcs',1),
  ('DU-C200','250–400 m³/h','2.2–3.5 m/s','1 pcs','2 pcs','3 pcs',2),
  ('DU-C200','400–600 m³/h','3.5–5 m/s','2 pcs','3 pcs','4 pcs',3),
  ('DU-C250','200–400 m³/h','1.1–2.3 m/s','1 pcs','2 pcs','2 pcs',1),
  ('DU-C250','400–700 m³/h','2.3–4 m/s','2 pcs','3 pcs','4 pcs',2),
  ('DU-C250','700–1000 m³/h','4–5.7 m/s','3 pcs','4 pcs','6 pcs',3),
  ('DU-C315','400–700 m³/h','1.4–2.5 m/s','1 pcs','2 pcs','3 pcs',1),
  ('DU-C315','700–1200 m³/h','2.5–4.3 m/s','2 pcs','4 pcs','6 pcs',2),
  ('DU-C315','1200–1800 m³/h','4.3–6.4 m/s','4 pcs','6 pcs','8 pcs',3),
  ('DU-C400','600–1000 m³/h','1.3–2.2 m/s','2 pcs','3 pcs','4 pcs',1),
  ('DU-C400','1000–1600 m³/h','2.2–3.5 m/s','3 pcs','5 pcs','6 pcs',2),
  ('DU-C400','1600–2400 m³/h','3.5–5.3 m/s','5 pcs','6 pcs','8 pcs',3),
  ('DU-S500','1000–2000 m³/h','1.1–2.2 m/s','3 pcs','4 pcs','6 pcs',1),
  ('DU-S500','2000–3500 m³/h','2.2–3.9 m/s','4 pcs','6 pcs','8 pcs',2),
  ('DU-S500','3500–5000 m³/h','3.9–5.6 m/s','6 pcs','8 pcs','8 pcs',3),
  ('DU-S600','1500–3000 m³/h','1.2–2.3 m/s','4 pcs','6 pcs','8 pcs',1),
  ('DU-S600','3000–5000 m³/h','2.3–3.9 m/s','6 pcs','8 pcs','8 pcs',2),
  ('DU-S600','5000–7000 m³/h','3.9–5.4 m/s','8 pcs','8 pcs','12 pcs',3)
) AS r(mn,af,vel,ls,lp,lpr,so) ON du.model_name = r.mn;

-- ── References ────────────────────────────────────────────────────────────────
CREATE TABLE references_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO references_table (company_name,sector,description,sort_order) VALUES
  ('AQUARENA','Aquaculture','RAS Recirculation System',1),
  ('MIDYE A.Ş.','Aquaculture','Mussel Farming Water',2),
  ('PINAR SÜT','Food & Bev','Dairy Process Water',3),
  ('TÜRK TUBORG','Food & Bev','Brewery Process Water',4),
  ('EFE MADEN SUYU','Water','Mineral Water Plant',5),
  ('LEVENT BAKLAVA','Food & Bev','Food Production',6),
  ('MEMORIAL','Healthcare','Hospital Air & Water',7),
  ('ECZACIBAŞI','Industrial','Process Water System',8),
  ('ARÇELIK','Industrial','Cooling Tower',9),
  ('KOZA ALTIN','Industrial','Mine Process Water',10),
  ('ÇEŞME RESORT','Hotel & Pool','Hotel Pool System',11),
  ('TURYAĞ','Food & Bev','Oil Production Water',12),
  ('KARKİMYA','Industrial','Chemical Plant Water',13),
  ('BÜYÜK KÖY TATİL','Hotel & Pool','Resort Pool UV',14);

-- ── Trade Events & Images ─────────────────────────────────────────────────────
CREATE TABLE trade_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  event_date TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE event_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES trade_events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
WITH ev AS (
  INSERT INTO trade_events (title,location,event_date,description,sort_order) VALUES
    ('GROWTECH Eurasia 2024','Antalya, Turkey','November 2024','[Add your description of the stand, products shown, and key visitors here]',1)
  RETURNING id
)
INSERT INTO event_images (event_id,image_url,caption,sort_order)
SELECT ev.id,img.url,img.cap,img.so FROM ev,
(VALUES
  ('https://raw.githubusercontent.com/ersel-bit/UV/main/No.6.%20Fair%20Sample%20Picture%201%20.webp','[Caption placeholder]',1),
  ('https://raw.githubusercontent.com/ersel-bit/UV/main/No.7.Fair%20Sample%20Picture%202.webp','[Caption placeholder]',2),
  ('https://raw.githubusercontent.com/ersel-bit/UV/main/No.8.%20Fair%20Sample%20Picture%203%20.webp','[Caption placeholder]',3)
) AS img(url,cap,so);

-- ── Product Images ────────────────────────────────────────────────────────────
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_section TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO product_images (product_section,image_url,alt_text,sort_order) VALUES
  ('PE','https://raw.githubusercontent.com/ersel-bit/UV/main/No.1.PE-15%20PE-20%20Before%20Packing%20Sample%20Picture%201.webp','PE units before packing',1),
  ('SM','https://raw.githubusercontent.com/ersel-bit/UV/main/No.49.%20SM-300%20Auto%20Wiper%20Testing%20Sample%20Picture%205.webp','SM auto wiper testing',1),
  ('DS','https://raw.githubusercontent.com/ersel-bit/UV/main/No.13.DS%20Sample%20Picture%201.webp','DS Series',1),
  ('DS','https://raw.githubusercontent.com/ersel-bit/UV/main/No.37.%20DSC%20Detail%20Picture%201%20(%20End%20of%20the%20lamp).webp','Lamp end detail',2),
  ('DS','https://raw.githubusercontent.com/ersel-bit/UV/main/No.38.DSC%20Detail%20Picture%202%20(%20Cable%20connection%20316%20SS%20Part).webp','SS316 cable connection',3),
  ('DM','https://raw.githubusercontent.com/ersel-bit/UV/main/No.53.DM-C%20Sample%20Picture%201.webp','DM Series',1),
  ('DCAIR','https://raw.githubusercontent.com/ersel-bit/UV/main/No.18.HVAC%20Unit%20Application%20Sample%20Picture%201.webp','HVAC application',1),
  ('DCAIR','https://raw.githubusercontent.com/ersel-bit/UV/main/No.54.%20DC-AIR%206%20Pcs%20Lamp%20Sample%20Picture%201.webp','DC-AIR 6 lamps',2),
  ('DCAIR','https://raw.githubusercontent.com/ersel-bit/UV/main/No.55.%20DC-AIR%206%20Pcs%20Lamp%20Sample%20Picture%202.webp','DC-AIR installed',3),
  ('DCAIR','https://raw.githubusercontent.com/ersel-bit/UV/main/No.56.%20DC%20AIR%20Sample%20Picture%201.webp','DC-AIR cassette',4),
  ('WU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.11.WU%20Application%20Sample%20Picture%201.webp','WU application',1),
  ('WU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.30.WU%20C1%20Sample%20Picture%201.webp','WU-C/1',2),
  ('WU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.31.WU%20C1%20Sample%20Picture%202.webp','WU-C/1 v2',3),
  ('HU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.17.HU-C1%20Sample%20Picture%201.webp','HU-C/1',1),
  ('HU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.32.HU%20C1%20Sample%20Picture%201.webp','HU-C/1 v2',2),
  ('AU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.33.AU%20C1%20Sample%20Picture%201.webp','AU-C/1 unit',1),
  ('DU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.40.%20DU%20S600%2012%20Lamps%20Sample%20Picture%201.webp','DU-S600',1),
  ('DU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.42.%20DU%20C200%20Sample%20Picture%201.webp','DU-C200',2),
  ('DU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.45.DU%20C400%20%20Sample%20Picture%201.webp','DU-C400',3),
  ('CU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.10.Conveyor%20Application%20Sample%20Picture%201.webp','Conveyor application',1),
  ('RDU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.2.RDU-1%20Application%20Sample%20Picture%201.webp','RDU-1 in use',1),
  ('RDU','https://raw.githubusercontent.com/ersel-bit/UV/main/No.3.RDU-1%20Application%20Sample%20Picture%202..webp','RDU-1 application',2);

-- ── Industries ────────────────────────────────────────────────────────────────
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '💧',
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO industries (icon,name,description,sort_order) VALUES
  ('🐟','Aquaculture','RAS, fish, mussel, shrimp',1),
  ('💧','Drinking Water','Municipal, wells, bottling',2),
  ('🏊','Pool & Spa','Hotels, thermal, hot tubs',3),
  ('🏥','Healthcare','Air, surface, rooms',4),
  ('🥛','Dairy & Food','Milk, cheese, meat',5),
  ('🍺','Beverage','Beer, juice, process water',6),
  ('💊','Pharmaceutical','Ultra-pure water, HVAC',7),
  ('🌱','Agriculture','Irrigation, greenhouses',8),
  ('🐄','Livestock','Water and air treatment',9),
  ('🏭','Industrial','Cooling towers, process',10),
  ('🏨','Hospitality','Pools, legionella, HVAC',11),
  ('♻️','Wastewater','Tertiary, reuse, effluent',12);

-- ── Why Cards ─────────────────────────────────────────────────────────────────
CREATE TABLE why_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL,
  heading TEXT NOT NULL,
  body TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO why_cards (number,heading,body,sort_order) VALUES
  ('01','Manufactured in İzmir','2,500 m² facility — full fabrication, electrical assembly, and UV performance testing. Every system tested before dispatch.',1),
  ('02','Real Technical Support','Same timezone. Same language. On-site within hours. Full warranty and lifetime after-sales as standard.',2),
  ('03','Ready for Turkish Tenders','CE, ISO 9001, 14001, 45001 certified domestic manufacturer. Qualifies for public procurement.',3),
  ('04','European Component Standards','European UVC lamps, precision quartz, certified ballasts — same specs as manufacturers in Germany or Denmark.',4);

-- ── Spare Parts ───────────────────────────────────────────────────────────────
CREATE TABLE spare_parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🔧',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO spare_parts (title,description,icon,sort_order) VALUES
  ('UVC Lamps','Standard germicidal lamps. Multiple lengths and outputs. 4-pin fitting. Contact us — do not specify OEM brand.','💡',1),
  ('Coated Lamps','PTFE-coated germicidal lamps. Food, pharma, conveyor use. Glass containment safe.','🛡️',2),
  ('Quartz Sleeves','Precision quartz glass. Round straight · square profile · hollow · solid rod. Contact for size.','🔭',3),
  ('Ballasts / Drivers','CE-certified electronic ballasts. Contact us with lamp type — we supply the correct matching ballast.','⚡',4),
  ('Ceramic Sockets','4-pin ceramic. High-temperature rated. All standard UVC lamp types.','🔌',5),
  ('Plastic Sockets','4-pin plastic. Standard and 90° cable-exit versions.','🔗',6);

-- ── Certifications ────────────────────────────────────────────────────────────
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO certifications (name,sort_order) VALUES
  ('CE Certified',1),('ISO 9001:2015',2),('ISO 14001:2015',3),('ISO 45001:2018',4),('Domestic Manufacturer',5);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Public read, authenticated write for all tables
DO $$
DECLARE tbl TEXT;
BEGIN
  FOR tbl IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "public_read" ON %I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "auth_write" ON %I', tbl);
    EXECUTE format('CREATE POLICY "public_read" ON %I FOR SELECT USING (true)', tbl);
    EXECUTE format('CREATE POLICY "auth_write" ON %I FOR ALL USING (auth.role() = ''authenticated'')', tbl);
  END LOOP;
END $$;

-- ── Done ──────────────────────────────────────────────────────────────────────
-- Next steps:
-- 1. Create an admin user in Supabase: Authentication → Users → Invite user
-- 2. Copy .env.local.example to .env.local and fill in your Supabase URL + keys
-- 3. Run: npm install && npm run dev
-- 4. Visit http://localhost:3000/admin to sign in
