import { EngineDataState } from "./types";

export const DEFAULT_BENCHMARKS = [
  { id: "b1", country: "Germany", industry: "Beauty", ctr: 0.014, er: 0.052, cpm: 7.80, vtr: 0.18, cpf: 1.80 },
  { id: "b2", country: "France", industry: "Beauty", ctr: 0.012, er: 0.049, cpm: 8.40, vtr: 0.16, cpf: 2.10 },
  { id: "b3", country: "Spain", industry: "Beauty", ctr: 0.015, er: 0.056, cpm: 6.20, vtr: 0.19, cpf: 1.60 },
  { id: "b4", country: "UK", industry: "Beauty", ctr: 0.016, er: 0.050, cpm: 8.00, vtr: 0.17, cpf: 1.70 },
  { id: "b5", country: "Germany", industry: "Fashion", ctr: 0.011, er: 0.042, cpm: 9.50, vtr: 0.14, cpf: 2.20 },
  { id: "b6", country: "France", industry: "Fashion", ctr: 0.010, er: 0.038, cpm: 10.20, vtr: 0.13, cpf: 2.50 },
  { id: "b7", country: "Spain", industry: "Fashion", ctr: 0.013, er: 0.048, cpm: 7.50, vtr: 0.15, cpf: 1.90 },
  { id: "b8", country: "UK", industry: "Fashion", ctr: 0.014, er: 0.045, cpm: 9.00, vtr: 0.15, cpf: 2.00 },
  { id: "b9", country: "Germany", industry: "Tech & Gadgets", ctr: 0.009, er: 0.035, cpm: 12.00, vtr: 0.12, cpf: 3.00 },
];

export const INITIAL_DATA: EngineDataState = {
  setup: {
    clientName: "L'Oréal Luxe DE",
    country: "Germany",
    industry: "Beauty",
    reportMonth: "2026-06",
    targetER: 0.050, // 5.0%
    targetCTR: 0.015, // 1.5%
    targetCPA: 2.00 // €2.00
  },
  organicVideos: [
    {
      id: "org-1",
      publishDate: "2026-06-02",
      videoId: "v_73829104",
      contentTitle: "Ultimate Hydration Routine Review (Luxe Serum)",
      views: 125000,
      reach: 112000,
      likes: 5800,
      comments: 420,
      shares: 850,
      followersGained: 1120,
      watchTime: 375000 // Watch time per view: 3.0s
    },
    {
      id: "org-2",
      publishDate: "2026-06-08",
      videoId: "v_73891024",
      contentTitle: "Summer Glow Makeup Hack - Matte vs Dewy",
      views: 98000,
      reach: 85000,
      likes: 4100,
      comments: 290,
      shares: 410,
      followersGained: 840,
      watchTime: 245000 // Watch time per view: 2.5s
    },
    {
      id: "org-3",
      publishDate: "2026-06-15",
      videoId: "v_73928105",
      contentTitle: "ASMR Unboxing: Luxe Revitalizing Serum ASMR",
      views: 154000,
      reach: 141000,
      likes: 8900,
      comments: 750,
      shares: 1100,
      followersGained: 1850,
      watchTime: 539000 // Watch time per view: 3.5s
    },
    {
      id: "org-4",
      publishDate: "2026-06-20",
      videoId: "v_74019284",
      contentTitle: "Trying Viral Clay Mask (Honest Alert & Review)",
      views: 62000,
      reach: 55000,
      likes: 1900,
      comments: 180,
      shares: 110,
      followersGained: 250,
      watchTime: 111600 // Watch time per view: 1.8s
    },
    {
      id: "org-5",
      publishDate: "2026-06-25",
      videoId: "v_74102914",
      contentTitle: "GRWM: Gala Night Elegance with Gold Elixir",
      views: 185000,
      reach: 168000,
      likes: 9100,
      comments: 820,
      shares: 1320,
      followersGained: 2210,
      watchTime: 684500 // Watch time per view: 3.7s
    }
  ],
  paidCampaigns: [
    {
      id: "paid-1",
      campaign: "Spark Ads - Virals Selection DE",
      spend: 4200.00,
      impressions: 320000,
      clicks: 5120,
      conversions: 2100,
      revenue: 12600.00
    },
    {
      id: "paid-2",
      campaign: "Broad Awareness - Serum Launch Germany",
      spend: 6800.00,
      impressions: 850000,
      clicks: 10200,
      conversions: 1700,
      revenue: 8500.00
    },
    {
      id: "paid-3",
      campaign: "Retargeting - Active Shoppers Cart Abandoners",
      spend: 2100.00,
      impressions: 150000,
      clicks: 3300,
      conversions: 1200,
      revenue: 9400.00
    },
    {
      id: "paid-4",
      campaign: "Creator Partnerships Boost Retargeting",
      spend: 3500.00,
      impressions: 280000,
      clicks: 4480,
      conversions: 1400,
      revenue: 8400.00
    },
    {
      id: "paid-5",
      campaign: "UGC Product Review Promo Spark",
      spend: 2900.00,
      impressions: 240000,
      clicks: 4080,
      conversions: 1350,
      revenue: 11600.00
    }
  ],
  benchmarks: DEFAULT_BENCHMARKS,
  history: [
    { month: "2026-03", organicViews: 450000, paidSpend: 15000, totalFollowersGained: 5200, totalRevenue: 38000 },
    { month: "2026-04", organicViews: 510000, paidSpend: 17500, totalFollowersGained: 6100, totalRevenue: 43500 },
    { month: "2026-05", organicViews: 540000, paidSpend: 18000, totalFollowersGained: 6500, totalRevenue: 42000 },
    { month: "2026-06", organicViews: 624000, paidSpend: 19500, totalFollowersGained: 8114, totalRevenue: 54500 } // populated on load
  ],
  lastSaved: new Date().toLocaleTimeString()
};
