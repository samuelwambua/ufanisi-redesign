import { ReactNode } from "react";

export type ServiceHighlight = { label: string; value: string };
export type ServiceFeature = { icon: ReactNode; title: string; description: string };
export type ServiceStep = { number: string; title: string; description: string };

export type ServiceData = {
  slug: string;
  route: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  bg: string;
  shapeColor: string;
  accentColor: string;
  stats: ServiceHighlight[];
  overview: string;
  features: ServiceFeature[];
  steps: ServiceStep[];
  ctaHeadline: string;
  shape: ReactNode;
};

const iconStroke = (color: string, children: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "sea-freight",
    route: "/sea-freight",
    title: "Sea Freight",
    subtitle: "Ocean Shipping",
    tagline: "Global ocean freight, handled with precision.",
    description: "We provide full authority in the customs clearance and delivery of sea cargo across the globe. With deep expertise at Mombasa Port and beyond, our sea freight team manages FCL and LCL shipments with speed and accuracy.",
    bg: "#D6CFC4",
    shapeColor: "#A89880",
    accentColor: "#6B5B45",
    stats: [
      { label: "Cargo Types", value: "FCL & LCL" },
      { label: "Key Port", value: "Mombasa" },
      { label: "Experience", value: "35+ Years" },
      { label: "Network", value: "Worldwide" },
    ],
    overview: "Our sea freight division has been the backbone of Ufanisi since 1989. We handle the full lifecycle of ocean cargo — from booking and documentation through customs clearance, port handling and final delivery. Whether you're importing consumer goods, raw materials or project equipment, our team ensures your shipment arrives on time and in full compliance with all regulations.",
    features: [
      {
        icon: iconStroke("#6B5B45", <><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1"/><path d="M4 18l-1-5h18l-2 5"/><path d="M12 2v8"/><path d="M6.5 10l5.5-5.5L17.5 10"/></>),
        title: "FCL & LCL Handling",
        description: "Full container load and less-than-container load services for all cargo types, sized right to your shipment volume.",
      },
      {
        icon: iconStroke("#6B5B45", <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>),
        title: "Full Documentation",
        description: "Bills of lading, certificates of origin, packing lists and all customs documentation prepared accurately and on time.",
      },
      {
        icon: iconStroke("#6B5B45", <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
        title: "Real-Time Tracking",
        description: "Live shipment visibility from port of origin through to final delivery at your door.",
      },
      {
        icon: iconStroke("#6B5B45", <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
        title: "Cargo Insurance",
        description: "Comprehensive marine cargo insurance options to protect your goods throughout the entire ocean voyage.",
      },
    ],
    steps: [
      { number: "01", title: "Booking & Quotation", description: "Contact our team with your cargo details — origin, destination, volume and timeline. We respond with a competitive rate within minutes." },
      { number: "02", title: "Documentation", description: "Our documentation team prepares all required shipping papers, export declarations and customs entries accurately." },
      { number: "03", title: "Port Handling", description: "We coordinate container stuffing, port delivery orders, and all terminal operations at the port of loading." },
      { number: "04", title: "Ocean Transit", description: "Your cargo sails on our preferred carrier network. We monitor the vessel schedule and keep you updated throughout." },
      { number: "05", title: "Customs Clearance & Delivery", description: "On arrival, our customs team clears your shipment with priority. We then arrange last-mile delivery to your facility." },
    ],
    ctaHeadline: "Ready to ship by sea?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="400" cy="20" r="230" fill="none" stroke="#A89880" strokeWidth="48" opacity="0.4" />
        <circle cx="400" cy="20" r="155" fill="none" stroke="#A89880" strokeWidth="30" opacity="0.28" />
        <circle cx="100" cy="420" r="190" fill="none" stroke="#A89880" strokeWidth="38" opacity="0.22" />
        <rect x="20" y="240" width="140" height="140" rx="70" fill="#A89880" opacity="0.18" />
      </svg>
    ),
  },
  {
    slug: "air-freight",
    route: "/air-freight",
    title: "Air Freight",
    subtitle: "Global Express",
    tagline: "When time is the cargo.",
    description: "We coordinate fast import and export air cargo worldwide through a vast network of airline partners. For time-critical shipments, our air freight team delivers speed without compromise.",
    bg: "#C8D4D8",
    shapeColor: "#8AAAB4",
    accentColor: "#3D606B",
    stats: [
      { label: "Avg. Transit", value: "24–72 hrs" },
      { label: "Network", value: "Global airlines" },
      { label: "Cargo", value: "General & Perishable" },
      { label: "Airports", value: "JKIA · Mombasa" },
    ],
    overview: "Our air freight division handles both general and perishable cargo through Kenya's main international airports. We work with a global network of airline carriers to secure space, negotiate rates and ensure your time-sensitive goods move without delay. From pharmaceutical shipments to high-value electronics, we bring the same precision to every consignment.",
    features: [
      {
        icon: iconStroke("#3D606B", <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><line x1="12" y1="22.08" x2="12" y2="12"/></>),
        title: "Express & Standard Air",
        description: "Flexible service levels — from next-flight-out express to cost-optimised standard air, matched to your urgency.",
      },
      {
        icon: iconStroke("#3D606B", <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>),
        title: "Perishable Cargo",
        description: "Temperature-controlled handling for flowers, fresh produce, pharmaceuticals and other perishable goods.",
      },
      {
        icon: iconStroke("#3D606B", <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>),
        title: "Competitive Rates",
        description: "We leverage our carrier relationships to negotiate the best available air rates for your specific trade lane.",
      },
      {
        icon: iconStroke("#3D606B", <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>),
        title: "Live Shipment Tracking",
        description: "Real-time airwaybill tracking so you always know exactly where your cargo is in the air.",
      },
    ],
    steps: [
      { number: "01", title: "Rate & Space Request", description: "Share your cargo details — weight, dimensions, commodity and destination. We source the best available rates immediately." },
      { number: "02", title: "Booking Confirmation", description: "We secure space on the optimal flight and confirm your airwaybill number and flight details." },
      { number: "03", title: "Cargo Acceptance", description: "Your goods are collected or delivered to the airport cargo terminal. We handle all acceptance formalities." },
      { number: "04", title: "Flight & Transit", description: "Your cargo flies on the confirmed airline. For multi-leg shipments, we manage all transshipment coordination." },
      { number: "05", title: "Destination Clearance & Delivery", description: "On arrival, we clear your cargo through customs and arrange final delivery to your consignee." },
    ],
    ctaHeadline: "Need urgent air freight?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="280" y="-60" width="340" height="340" rx="170" fill="#8AAAB4" opacity="0.16" />
        <rect x="310" y="-20" width="260" height="260" rx="130" fill="#8AAAB4" opacity="0.13" />
        <line x1="0" y1="300" x2="500" y2="100" stroke="#8AAAB4" strokeWidth="42" strokeLinecap="round" opacity="0.26" />
        <line x1="0" y1="360" x2="450" y2="180" stroke="#8AAAB4" strokeWidth="22" strokeLinecap="round" opacity="0.16" />
        <line x1="0" y1="400" x2="380" y2="240" stroke="#8AAAB4" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
      </svg>
    ),
  },
  {
    slug: "customs-clearance",
    route: "/customs-clearance",
    title: "Customs Clearance",
    subtitle: "Sea & Air · AEO",
    tagline: "Priority clearance. Zero delays.",
    description: "As an Authorized Economic Operator, Ufanisi enjoys priority customs processing at all major Kenyan ports and airports. Our clearance team ensures compliant, fast import and export processing every time.",
    bg: "#D4CED8",
    shapeColor: "#A094AE",
    accentColor: "#5C5070",
    stats: [
      { label: "Status", value: "EAC AEO" },
      { label: "Ports", value: "All Kenya entry points" },
      { label: "Experience", value: "35+ Years" },
      { label: "Clearance", value: "Sea & Air" },
    ],
    overview: "Ufanisi holds Authorized Economic Operator (AEO) status under the East African Community framework — one of the most trusted designations in regional trade. This means priority lanes, reduced physical inspections and faster release of your cargo at every port and airport in Kenya. Our team of licensed clearing agents manages the full customs process, from entry lodgement through duty assessment to final release.",
    features: [
      {
        icon: iconStroke("#5C5070", <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
        title: "AEO Priority Status",
        description: "Authorized Economic Operator certification gives your cargo priority processing and reduced examination rates.",
      },
      {
        icon: iconStroke("#5C5070", <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>),
        title: "Full Documentation",
        description: "Import & export entries, duty calculations, exemption applications and all compliance paperwork handled in-house.",
      },
      {
        icon: iconStroke("#5C5070", <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
        title: "Sea & Air Coverage",
        description: "Clearance at Mombasa Port, JKIA, Mombasa Airport and all other licensed entry points across Kenya.",
      },
      {
        icon: iconStroke("#5C5070", <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>),
        title: "Duty Optimization",
        description: "Expert tariff classification and duty relief schemes to ensure you only pay what is legally required — nothing more.",
      },
    ],
    steps: [
      { number: "01", title: "Document Submission", description: "Submit your shipping documents — commercial invoice, packing list, bill of lading or airwaybill — to our team upon cargo arrival." },
      { number: "02", title: "Entry Lodgement", description: "We prepare and lodge the customs entry on the Kenya TradeNet system with accurate tariff codes and values." },
      { number: "03", title: "Duty Assessment", description: "Customs assesses duties and taxes. We review assessments and raise queries or objections where applicable." },
      { number: "04", title: "Examination (if required)", description: "As AEO holders, physical examinations are rare. When required, our team supervises the process efficiently." },
      { number: "05", title: "Release & Delivery", description: "Once duties are paid and release confirmed, we coordinate immediate collection and delivery to your warehouse." },
    ],
    ctaHeadline: "Need faster customs clearance?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="80" y="20" width="200" height="200" rx="16" fill="#A094AE" opacity="0.2" />
        <rect x="140" y="60" width="200" height="200" rx="16" fill="#A094AE" opacity="0.16" />
        <rect x="200" y="100" width="200" height="200" rx="16" fill="#A094AE" opacity="0.13" />
        <circle cx="100" cy="50" r="60" fill="#A094AE" opacity="0.22" />
        <circle cx="100" cy="50" r="36" fill="#A094AE" opacity="0.16" />
      </svg>
    ),
  },
  {
    slug: "warehousing",
    route: "/warehousing",
    title: "Warehousing",
    subtitle: "Free & Bonded",
    tagline: "Secure storage. Seamless handling.",
    description: "ISO-certified warehousing near Kenya's major ports. Our free and bonded facilities offer secure, compliant storage with full cargo handling, collateral management and flexible release options.",
    bg: "#C9D6C8",
    shapeColor: "#7FA37C",
    accentColor: "#3D6B3A",
    stats: [
      { label: "Certification", value: "ISO 9001 · 22000" },
      { label: "Location", value: "Mombasa Port Area" },
      { label: "Type", value: "Free & Bonded" },
      { label: "Handling", value: "Full Cargo Services" },
    ],
    overview: "Our warehousing facilities are strategically located near Mombasa Port — Kenya's primary gateway for imports and exports. We operate both free warehouses and customs-bonded stores, giving importers flexibility on duty payment timing. All facilities are ISO 9001 and ISO 22000 certified, making them suitable for general goods, food commodities and sensitive cargo. Our team handles receipt, storage, stock management and dispatch.",
    features: [
      {
        icon: iconStroke("#3D6B3A", <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>),
        title: "Bonded & Free Warehousing",
        description: "Choose between bonded storage (defer duty payment) and free warehouses for direct-release cargo.",
      },
      {
        icon: iconStroke("#3D6B3A", <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
        title: "ISO Certified Facilities",
        description: "ISO 9001:2015 and ISO 22000:2018 certified — meeting international standards for quality and food safety.",
      },
      {
        icon: iconStroke("#3D6B3A", <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
        title: "Stock Management System",
        description: "Digital stock tracking with real-time balance reports, goods received notes and dispatch confirmations.",
      },
      {
        icon: iconStroke("#3D6B3A", <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>),
        title: "Full Cargo Handling",
        description: "Receipt, tallying, palletisation, repackaging, fumigation and dispatch — all handled by our experienced team.",
      },
    ],
    steps: [
      { number: "01", title: "Space Booking", description: "Contact us with your cargo volume, commodity type and expected arrival date. We confirm available space and rates." },
      { number: "02", title: "Cargo Receipt", description: "Our team receives your cargo at the warehouse, tallies quantities and issues a goods received note." },
      { number: "03", title: "Storage & Management", description: "Cargo is stored securely with regular stock reports provided. We monitor conditions to ensure cargo integrity." },
      { number: "04", title: "Release Order Processing", description: "When you're ready to release cargo, submit a release order. We process it and prepare for dispatch." },
      { number: "05", title: "Dispatch & Delivery", description: "Goods are dispatched on your instruction — either collected by your transporter or delivered by our trucking fleet." },
    ],
    ctaHeadline: "Need warehousing near the port?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="20" y="160" width="460" height="280" rx="12" fill="#7FA37C" opacity="0.16" />
        <polygon points="250,20 480,160 20,160" fill="#7FA37C" opacity="0.24" />
        <rect x="140" y="230" width="90" height="110" rx="6" fill="#7FA37C" opacity="0.3" />
        <rect x="250" y="230" width="90" height="110" rx="6" fill="#7FA37C" opacity="0.24" />
        <rect x="360" y="230" width="70" height="110" rx="6" fill="#7FA37C" opacity="0.18" />
      </svg>
    ),
  },
  {
    slug: "cross-border",
    route: "/cross-border",
    title: "Cross Border Clearance",
    subtitle: "East Africa Corridors",
    tagline: "Borders crossed. Cargo delivered.",
    description: "Ufanisi operates at all major East African border points — Malaba, Namanga, Holili and beyond. Our experienced cross-border teams ensure smooth transit across 8 countries with zero corridor delays.",
    bg: "#D4C9BC",
    shapeColor: "#B5906A",
    accentColor: "#7A5535",
    stats: [
      { label: "Countries", value: "8 Nations" },
      { label: "Border Points", value: "Malaba · Namanga · Holili" },
      { label: "Corridors", value: "Northern & Central" },
      { label: "Transit", value: "Kenya to Zambia" },
    ],
    overview: "We operate dedicated cross-border clearance teams at Kenya's busiest land border points. Our agents work round the clock to process transit documentation, manage bond cancellations, handle transit goods verification and ensure your cargo moves seamlessly from one country to the next. We cover the full Northern Corridor from Mombasa to Uganda, Rwanda, Burundi, DRC, South Sudan and beyond — and the Central Corridor via Tanzania.",
    features: [
      {
        icon: iconStroke("#7A5535", <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
        title: "Multi-Country Coverage",
        description: "Kenya, Uganda, Tanzania, Rwanda, Burundi, DRC, South Sudan and Zambia — all corridors, one partner.",
      },
      {
        icon: iconStroke("#7A5535", <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>),
        title: "Transit Bond Management",
        description: "We manage transit bonds, security deposits and bond cancellations at all EAC border points efficiently.",
      },
      {
        icon: iconStroke("#7A5535", <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
        title: "24/7 Border Teams",
        description: "Our agents are present at border crossings around the clock — no waiting for office hours when your truck arrives.",
      },
      {
        icon: iconStroke("#7A5535", <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>),
        title: "Transit Documentation",
        description: "Road Transit Customs (C63), EAC transit forms, COMESA certificates and all cross-border paperwork prepared.",
      },
    ],
    steps: [
      { number: "01", title: "Pre-Arrival Notification", description: "Notify our border team of your truck's expected arrival. We prepare all transit documentation in advance." },
      { number: "02", title: "Border Entry Processing", description: "Our agent meets the truck at the border, presents transit documents and processes entry into the system." },
      { number: "03", title: "Customs Examination", description: "We supervise any physical examination of goods, ensuring the process is swift and your cargo is handled properly." },
      { number: "04", title: "Transit Bond Lodgement", description: "Transit bond or security is lodged to allow the truck to proceed through the country under customs control." },
      { number: "05", title: "Exit & Bond Cancellation", description: "On exit from the country, we process the bond cancellation and provide proof of transit to all relevant authorities." },
    ],
    ctaHeadline: "Moving cargo across borders?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="250" cy="200" r="160" fill="none" stroke="#B5906A" strokeWidth="50" opacity="0.2" />
        <circle cx="250" cy="200" r="100" fill="none" stroke="#B5906A" strokeWidth="32" opacity="0.16" />
        <circle cx="250" cy="200" r="40" fill="#B5906A" opacity="0.26" />
        <line x1="0" y1="200" x2="500" y2="200" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.38" />
        <line x1="250" y1="0" x2="250" y2="400" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="14 10" opacity="0.38" />
      </svg>
    ),
  },
  {
    slug: "trucking",
    route: "/trucking",
    title: "Trucking",
    subtitle: "Door-to-Door",
    tagline: "Your cargo, from our port to your door.",
    description: "Ufanisi owns and operates a fleet of flatbeds, skeletal trailers, low loaders and canters. GPS-monitored and professionally driven, our trucks deliver across the full East African road network.",
    bg: "#C9C8BC",
    shapeColor: "#919077",
    accentColor: "#555447",
    stats: [
      { label: "Fleet Types", value: "Flatbed · Low loader · Canter" },
      { label: "Monitoring", value: "GPS Real-Time" },
      { label: "Coverage", value: "East Africa" },
      { label: "Cargo", value: "General & Oversized" },
    ],
    overview: "Our own fleet gives us full control over your cargo from port gate to final destination. Unlike brokers, we own our trucks — meaning we control quality, scheduling and driver standards directly. The fleet includes skeletal trailers for containers, flatbeds for break-bulk cargo, low loaders for heavy machinery and canters for smaller last-mile deliveries. Every truck is GPS-tracked and every driver is professionally trained.",
    features: [
      {
        icon: iconStroke("#555447", <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>),
        title: "Own Fleet",
        description: "We own our trucks — flatbeds, skeletal trailers, low loaders and canters. No middlemen, full control.",
      },
      {
        icon: iconStroke("#555447", <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>),
        title: "GPS Fleet Tracking",
        description: "Every truck in our fleet is GPS-monitored. You get real-time location updates throughout the journey.",
      },
      {
        icon: iconStroke("#555447", <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>),
        title: "Professional Drivers",
        description: "All drivers are vetted, licensed and trained in cargo handling, safety and cross-border documentation.",
      },
      {
        icon: iconStroke("#555447", <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
        title: "East Africa Coverage",
        description: "Nairobi, Mombasa, Kampala, Kigali, Dar es Salaam — we cover all major destinations across the region.",
      },
    ],
    steps: [
      { number: "01", title: "Transport Request", description: "Share your cargo details — type, weight, dimensions, collection point and destination. We assign the right truck type." },
      { number: "02", title: "Truck Allocation", description: "We allocate a truck from our fleet and confirm the driver details, truck registration and estimated departure time." },
      { number: "03", title: "Collection", description: "The truck arrives at port, warehouse or your facility at the agreed time. Cargo is loaded and secured properly." },
      { number: "04", title: "Transit & Tracking", description: "The truck departs under GPS monitoring. You receive real-time updates. Our operations team tracks progress throughout." },
      { number: "05", title: "Delivery & Proof", description: "Cargo is delivered to the consignee. We provide a signed delivery note as proof of successful delivery." },
    ],
    ctaHeadline: "Need reliable road transport?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="-10" y="200" width="360" height="120" rx="12" fill="#919077" opacity="0.2" />
        <rect x="310" y="230" width="190" height="90" rx="12" fill="#919077" opacity="0.16" />
        <polygon points="310,230 390,140 510,140 510,230" fill="#919077" opacity="0.18" />
        <circle cx="80" cy="318" r="48" fill="none" stroke="#919077" strokeWidth="24" opacity="0.35" />
        <circle cx="390" cy="318" r="48" fill="none" stroke="#919077" strokeWidth="24" opacity="0.35" />
      </svg>
    ),
  },
  {
    slug: "project-cargo",
    route: "/project-cargo",
    title: "Project Cargo",
    subtitle: "Heavy & Oversized",
    tagline: "No load too large. No route too complex.",
    description: "Ufanisi specialises in the handling of heavy lifts, oversized machinery and out-of-gauge cargo. From port to project site, we manage every detail of complex cargo movements across East Africa.",
    bg: "#BFCDD4",
    shapeColor: "#6C93A6",
    accentColor: "#2C5568",
    stats: [
      { label: "Specialty", value: "OOG & Heavy Lift" },
      { label: "Scope", value: "Port to Project Site" },
      { label: "Equipment", value: "Low loaders · Cranes" },
      { label: "Coverage", value: "East & Central Africa" },
    ],
    overview: "Project cargo requires a different level of expertise. From initial feasibility and route surveys to permits, escort vehicles and specialised lifting equipment, our project cargo team manages every aspect of complex heavy cargo movements. We've successfully moved industrial generators, mining equipment, wind turbine components and factory machinery across East Africa's most challenging routes.",
    features: [
      {
        icon: iconStroke("#2C5568", <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>),
        title: "Heavy Lift Expertise",
        description: "From 10 tonnes to 500+ tonnes, our team has the experience and equipment to handle any heavy lift requirement.",
      },
      {
        icon: iconStroke("#2C5568", <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
        title: "Route Surveys",
        description: "We conduct detailed route surveys to identify bridge load limits, clearance heights and road restrictions before movement.",
      },
      {
        icon: iconStroke("#2C5568", <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>),
        title: "Permits & Escorts",
        description: "We obtain all oversize/overweight transport permits and arrange police or traffic escort vehicles as required.",
      },
      {
        icon: iconStroke("#2C5568", <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>),
        title: "Specialised Equipment",
        description: "Low loaders, multi-axle trailers, hydraulic platform trailers and mobile cranes — all available through our network.",
      },
    ],
    steps: [
      { number: "01", title: "Feasibility Assessment", description: "We review your cargo specifications — weight, dimensions, centre of gravity — and assess the feasibility of the movement." },
      { number: "02", title: "Route Survey & Planning", description: "Our team conducts a detailed route survey and produces a movement plan with risk assessments and contingencies." },
      { number: "03", title: "Permits & Approvals", description: "We apply for all required transport permits from relevant authorities in each country along the route." },
      { number: "04", title: "Equipment Mobilisation", description: "The right trailers, cranes and escort vehicles are mobilised to the port or collection point." },
      { number: "05", title: "Supervised Movement & Delivery", description: "Our project manager supervises the full movement from loading through to delivery and off-loading at the project site." },
    ],
    ctaHeadline: "Have a complex cargo challenge?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="60" y="60" width="180" height="180" rx="10" fill="#6C93A6" opacity="0.18" />
        <rect x="120" y="20" width="300" height="220" rx="10" fill="#6C93A6" opacity="0.14" />
        <line x1="60" y1="240" x2="420" y2="240" stroke="#6C93A6" strokeWidth="26" strokeLinecap="round" opacity="0.26" />
        <circle cx="120" cy="274" r="32" fill="#6C93A6" opacity="0.32" />
        <circle cx="360" cy="274" r="32" fill="#6C93A6" opacity="0.32" />
      </svg>
    ),
  },
  {
    slug: "collateral-management",
    route: "/collateral-management",
    title: "Collateral Management",
    subtitle: "Asset Control",
    tagline: "Your commodity assets, professionally controlled.",
    description: "We provide professional collateral management services for commodity-backed financing. Banks, financiers and traders trust Ufanisi to monitor, report and release stock with full accountability.",
    bg: "#D8C9C6",
    shapeColor: "#B5857A",
    accentColor: "#7A4A40",
    stats: [
      { label: "Monitoring", value: "24/7 Stock Control" },
      { label: "Clients", value: "Banks · Financiers" },
      { label: "Reporting", value: "Daily Stock Reports" },
      { label: "Commodities", value: "Grain · Coffee · Metals" },
    ],
    overview: "Collateral management is the independent monitoring and control of commodity stocks pledged as security for financing. Ufanisi acts as the neutral collateral manager — appointed by the lender, operating at the borrower's warehouse. We control access to the goods, maintain accurate stock records and release goods only on written instruction from the financing bank. Our service gives lenders the confidence that their security is intact and properly managed.",
    features: [
      {
        icon: iconStroke("#7A4A40", <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>),
        title: "Controlled Access",
        description: "We control all access to the pledged stock. No goods move without written authorisation from the lender.",
      },
      {
        icon: iconStroke("#7A4A40", <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>),
        title: "Daily Stock Reports",
        description: "Lenders receive daily stock balance reports with opening stock, receipts, releases and closing balances.",
      },
      {
        icon: iconStroke("#7A4A40", <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>),
        title: "Real-Time Monitoring",
        description: "Our on-site collateral monitors are present at the warehouse during all operational hours to ensure full accountability.",
      },
      {
        icon: iconStroke("#7A4A40", <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
        title: "Independent & Neutral",
        description: "As an independent third party, we serve the lender's interests — providing transparent, unbiased stock control.",
      },
    ],
    steps: [
      { number: "01", title: "Engagement & Setup", description: "Lender and borrower appoint Ufanisi as collateral manager. We review the warehouse, stock and financing agreement." },
      { number: "02", title: "Initial Stock Count", description: "We conduct an independent opening stock count and confirm the quantity and quality of goods to be pledged." },
      { number: "03", title: "Control Implementation", description: "Access controls are put in place. Our monitor takes up residence at the warehouse. Stock records are established." },
      { number: "04", title: "Ongoing Monitoring", description: "Daily monitoring of all stock movements. Any receipts or deliveries are recorded and reported to the lender." },
      { number: "05", title: "Release on Instruction", description: "Goods are released only on written release orders from the lender. All releases are documented and reported." },
    ],
    ctaHeadline: "Need collateral management services?",
    shape: (
      <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="30" y="30" width="140" height="140" rx="10" fill="#B5857A" opacity="0.24" />
        <rect x="185" y="30" width="140" height="140" rx="10" fill="#B5857A" opacity="0.18" />
        <rect x="340" y="30" width="140" height="140" rx="10" fill="#B5857A" opacity="0.14" />
        <rect x="107" y="190" width="140" height="68" rx="10" fill="#B5857A" opacity="0.18" />
        <rect x="262" y="190" width="140" height="68" rx="10" fill="#B5857A" opacity="0.14" />
        <line x1="100" y1="170" x2="177" y2="190" stroke="#B5857A" strokeWidth="3" opacity="0.35" />
        <line x1="255" y1="170" x2="177" y2="190" stroke="#B5857A" strokeWidth="3" opacity="0.35" />
        <line x1="255" y1="170" x2="332" y2="190" stroke="#B5857A" strokeWidth="3" opacity="0.35" />
        <line x1="410" y1="170" x2="332" y2="190" stroke="#B5857A" strokeWidth="3" opacity="0.35" />
      </svg>
    ),
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}