export interface SetupConfig {
  clientName: string;
  country: string;
  industry: string;
  reportMonth: string;
  targetER: number; // e.g. 0.05
  targetCTR: number; // e.g. 0.015
  targetCPA: number; // e.g. 2.0
}

export interface OrganicVideo {
  id: string;
  publishDate: string;
  videoId: string;
  contentTitle: string;
  views: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  followersGained: number;
  watchTime: number; // in seconds
}

export interface PaidCampaign {
  id: string;
  campaign: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface BenchmarkItem {
  id: string;
  country: string;
  industry: string;
  ctr: number; // e.g. 0.014
  er: number;  // e.g. 0.052
  cpm: number; // e.g. 7.8
  vtr: number; // e.g. 0.18
  cpf: number; // e.g. 1.8 (Cost per Follower/Action)
}

export interface HistoricalMonth {
  month: string; // e.g. "2026-03"
  organicViews: number;
  paidSpend: number;
  totalFollowersGained: number;
  totalRevenue: number;
}

export interface EngineDataState {
  setup: SetupConfig;
  organicVideos: OrganicVideo[];
  paidCampaigns: PaidCampaign[];
  benchmarks: BenchmarkItem[];
  history: HistoricalMonth[];
  lastSaved: string; // ISO string or format
}
