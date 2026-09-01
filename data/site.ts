export const brand = {
  name: "ELVITA FINANCE",
  legalName: "Elvita Finance",
  description:
    "Private business funding guidance for U.S. companies seeking a sophisticated, concierge financing experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elvitafinance.com",
  phone: "(000) 000-0000",
  email: "concierge@elvitafinance.com",
  address: "United States business funding desk",
  webhookUrl: "https://n8n.srv939555.hstgr.cloud/webhook/submit-forms-curated"
};

export const commercialConfig = {
  formId: "EF-001",
  company: "elvita",
  source: "elvita-finance-web",
  payloadFormat: "json-v2",
  action: "create",
  status: "New",
  COMMERCIAL_NAME: process.env.NEXT_PUBLIC_COMMERCIAL_NAME || "Elvita Finance Funding Desk",
  COMMERCIAL_EMAIL: process.env.NEXT_PUBLIC_COMMERCIAL_EMAIL || "funding@example.com",
  COMMERCIAL_IDENTIFIER: process.env.NEXT_PUBLIC_COMMERCIAL_IDENTIFIER || "EF-COMM-001"
} as const;

export const fundingValues = {
  heroRange: "$25K - $2M+",
  terms: "Configured terms",
  review: "Review timeline placeholder",
  note:
    "All funding amounts, rates, approval percentages, funding speeds and terms shown on this website are placeholders or configurable values and remain subject to verification, underwriting and final agreement."
};

export const services = [
  {
    eyebrow: "Liquidity",
    title: "Working Capital",
    amount: "$25K - $500K placeholder",
    description:
      "Flexible funding conversations for payroll timing, vendor payments, inventory cycles and short-term operating needs.",
    considerations:
      "Repayment structure, documentation, cash-flow seasonality and existing obligations are reviewed before any option is presented."
  },
  {
    eyebrow: "Growth",
    title: "Expansion Capital",
    amount: "$100K - $2M+ placeholder",
    description:
      "Capital pathways for hiring, inventory, equipment, locations or larger operating capacity.",
    considerations:
      "Projected use of funds and historical business performance are considered together."
  },
  {
    eyebrow: "Performance-Aligned",
    title: "Revenue-Based Financing",
    amount: "Configured by request",
    description:
      "Funding structures evaluated around revenue patterns, use of funds and practical repayment comfort.",
    considerations:
      "Illustrative ranges only. Terms depend on underwriting, documentation and product availability."
  },
  {
    eyebrow: "Timing",
    title: "Bridge Funding",
    amount: "Configured by request",
    description:
      "Short-duration funding conversations for receivable timing, purchase orders, seasonal ramps or urgent opportunities.",
    considerations:
      "No timing or approval outcome is guaranteed. Availability varies by applicant and funding partner."
  }
];

export const processSteps = [
  { title: "Private Intake", text: "A focused application collects the information needed to begin a funding review." },
  { title: "Document Review", text: "Statements, tax return files and ownership details are organized for a funding specialist." },
  { title: "Curated Options", text: "Available structures are compared against use of funds, repayment comfort and business context." },
  { title: "Final Terms", text: "Any offer, commitment or final financing terms must come from the applicable funding process and agreement." }
];

export const sampleTestimonials = [
  {
    label: "Sample",
    quote:
      "The Elvita process felt considered and private. The team helped us understand what documents mattered before we moved forward.",
    name: "Sample Founder",
    company: "Sample Hospitality Group"
  },
  {
    label: "Sample",
    quote:
      "We needed a clearer view of funding options for a seasonal expansion. The experience was polished and direct.",
    name: "Sample Managing Partner",
    company: "Sample Retail Company"
  },
  {
    label: "Sample",
    quote:
      "A measured, advisory-style process made the application feel less transactional and more strategic.",
    name: "Sample Operator",
    company: "Sample Services Firm"
  }
];

export const disclosures = [
  "The above hereby authorizes Elvita Finance, on a on exclusive basis, to seek financial transactions on its behalf from the date stated herein, and otherwise from time to time until any and all loans and/or revenue based financings are repaid in full and the relationship with the merchant is completed, including but not limited to for any renewal or for any purpose relating thereto.",
  "By signing below, the Merchant and its owners/principals: (1) certify that all information and documents submitted in connection with this application are true, correct, and complete; and (2) authorize Elvita Finance and its assignees/designees to obtain credit reports and any other information regarding the Merchant and its owners and principals to verify the information provided on the application."
];

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/calculator", label: "Calculator" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" }
];

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/data-security", label: "Data & Security" },
  { href: "/disclosures", label: "Disclosures" }
];

export const photography = {
  hero: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=82",
  detail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=82",
  meeting: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=82",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=82"
};

export const entityTypes = ["Sole Proprietorship", "LLC", "Corporation", "Partnership", "Non-Profit"] as const;
