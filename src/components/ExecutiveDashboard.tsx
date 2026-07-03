import React from "react";
import { TrendingUp, Users, Eye, Sparkles, AlertTriangle, ArrowRight, CheckCircle, Flame, PauseCircle, Compass } from "lucide-react";
import { SetupConfig, OrganicVideo, PaidCampaign, BenchmarkItem, HistoricalMonth } from "../types";

interface ExecutiveDashboardProps {
  setup: SetupConfig;
  organicVideos: OrganicVideo[];
  paidCampaigns: PaidCampaign[];
  benchmarks: BenchmarkItem[];
  history: HistoricalMonth[];
}

export default function ExecutiveDashboard({
  setup,
  organicVideos,
  paidCampaigns,
  benchmarks,
  history
}: ExecutiveDashboardProps) {
  // --- CORE SELECTOR LOGIC ---
  const totalOrganicViews = organicVideos.reduce((sum, v) => sum + v.views, 0);
  const totalOrganicLikes = organicVideos.reduce((sum, v) => sum + v.likes, 0);
  const totalOrganicComments = organicVideos.reduce((sum, v) => sum + v.comments, 0);
  const totalOrganicShares = organicVideos.reduce((sum, v) => sum + v.shares, 0);
  const totalOrganicReach = organicVideos.reduce((sum, v) => sum + v.reach, 0);
  const totalOrganicFollowers = organicVideos.reduce((sum, v) => sum + v.followersGained, 0);
  const totalOrganicWatchTime = organicVideos.reduce((sum, v) => sum + v.watchTime, 0);

  // Organic ER = (Likes + Comments + Shares) / Views
  const organicER = totalOrganicViews > 0 
    ? (totalOrganicLikes + totalOrganicComments + totalOrganicShares) / totalOrganicViews 
    : 0;

  // Organic Watch Time per view
  const avgWatchTime = totalOrganicViews > 0 ? totalOrganicWatchTime / totalOrganicViews : 0;

  // Organic Revenue = views * 0.025 (model formula)
  const organicRevenue = totalOrganicViews * 0.025;

  // Paid totals
  const totalPaidSpend = paidCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalPaidImpressions = paidCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalPaidClicks = paidCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalPaidConversions = paidCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalPaidRevenue = paidCampaigns.reduce((sum, c) => sum + c.revenue, 0);

  // Paid Metrics
  const paidCTR = totalPaidImpressions > 0 ? totalPaidClicks / totalPaidImpressions : 0;
  const paidCPM = totalPaidImpressions > 0 ? (totalPaidSpend / totalPaidImpressions) * 1000 : 0;
  const paidCPA = totalPaidConversions > 0 ? totalPaidSpend / totalPaidConversions : 0;
  const paidROAS = totalPaidSpend > 0 ? totalPaidRevenue / totalPaidSpend : 0;

  // Total Business Metrics
  const totalReach = totalOrganicReach + (totalPaidImpressions * 0.85); // 85% reach translation
  const totalFollowersGained = totalOrganicFollowers + Math.round(totalPaidConversions * 0.18);
  const totalRevenue = organicRevenue + totalPaidRevenue;
  const blendedROAS = totalPaidSpend > 0 ? totalRevenue / totalPaidSpend : 0;

  // Find selected benchmark
  const activeBenchmark = benchmarks.find(
    (b) => b.country === setup.country && b.industry === setup.industry
  ) || benchmarks[0];

  // Benchmark Comparisons
  const ctrDiff = activeBenchmark ? (paidCTR - activeBenchmark.ctr) / activeBenchmark.ctr : 0;
  const erDiff = activeBenchmark ? (organicER - activeBenchmark.er) / activeBenchmark.er : 0;
  const cpmDiff = activeBenchmark ? (paidCPM - activeBenchmark.cpm) / activeBenchmark.cpm : 0;
  const cpaDiff = setup.targetCPA > 0 ? (paidCPA - setup.targetCPA) / setup.targetCPA : 0;

  // Sort Videos by ER for rankings
  const getVideoER = (v: OrganicVideo) => v.views > 0 ? (v.likes + v.comments + v.shares) / v.views : 0;
  
  const sortedVideos = [...organicVideos].sort((a, b) => getVideoER(b) - getVideoER(a));
  const topVideos = sortedVideos.slice(0, 5);
  const bottomVideos = [...organicVideos]
    .filter(v => v.views > 0)
    .sort((a, b) => getVideoER(a) - getVideoER(b))
    .slice(0, 5);

  // Generate Recommendation Lists
  const recommendations: { category: "SCALE" | "KEEP" | "STOP" | "TEST"; title: string; desc: string; source: string }[] = [];

  // Paid recommendations
  paidCampaigns.forEach((c) => {
    const cROAS = c.spend > 0 ? c.revenue / c.spend : 0;
    const cCTR = c.impressions > 0 ? c.clicks / c.impressions : 0;
    const cCPA = c.conversions > 0 ? c.spend / c.conversions : 0;

    if (cROAS >= 3.5) {
      recommendations.push({
        category: "SCALE",
        title: `Amplify Spend on "${c.campaign}"`,
        desc: `High-performing asset. ROAS is at a premium ${cROAS.toFixed(2)}x. Expand budget by 20-30%.`,
        source: "Paid Campaigns Engine"
      });
    } else if (cCTR > setup.targetCTR) {
      recommendations.push({
        category: "KEEP",
        title: `Maintain "${c.campaign}" Creative`,
        desc: `Strong hook rate with CTR of ${(cCTR * 100).toFixed(2)}% (Target: ${(setup.targetCTR * 100).toFixed(1)}%). Optimize conversion funnel.`,
        source: "Paid Campaigns Engine"
      });
    } else if (cCPA > setup.targetCPA * 1.5) {
      recommendations.push({
        category: "STOP",
        title: `Halt or Pivot "${c.campaign}"`,
        desc: `Inefficient conversion acquisition. CPA is €${cCPA.toFixed(2)} which exceeds threshold limit by ${Math.round((cCPA / setup.targetCPA - 1) * 100)}%.`,
        source: "Paid Campaigns Engine"
      });
    } else {
      recommendations.push({
        category: "TEST",
        title: `A/B Test Creatives for "${c.campaign}"`,
        desc: `Average performance. Test new hooks and creator angles to push ROAS past 2.0x.`,
        source: "Paid Campaigns Engine"
      });
    }
  });

  // Organic recommendations
  organicVideos.slice(0, 3).forEach((v) => {
    const vER = getVideoER(v);
    const vWatchTime = v.views > 0 ? v.watchTime / v.views : 0;

    if (vER > setup.targetER * 1.2) {
      recommendations.push({
        category: "SCALE",
        title: `Convert "${v.contentTitle.substring(0, 24)}..." to Spark Ads`,
        desc: `Outstanding viral metrics. ER of ${(vER * 100).toFixed(2)}% is ripe for paid boosting.`,
        source: "Organic Content Engine"
      });
    } else if (vWatchTime > 3.0) {
      recommendations.push({
        category: "KEEP",
        title: `Replicate Format of "${v.contentTitle.substring(0, 24)}..."`,
        desc: `Excellent viewer retention. Average watch time is ${vWatchTime.toFixed(1)}s. Keep this editing pace.`,
        source: "Organic Content Engine"
      });
    } else if (v.views < 70000) {
      recommendations.push({
        category: "STOP",
        title: `Discontinue Low-views Theme`,
        desc: `"${v.contentTitle.substring(0, 24)}..." failed to breach the 70k views threshold. Hook was too weak.`,
        source: "Organic Content Engine"
      });
    } else {
      recommendations.push({
        category: "TEST",
        title: `Iterate Hook for "${v.contentTitle.substring(0, 24)}..."`,
        desc: `Good baseline views, but low interaction rate. Run testing on first 3 seconds of the clip.`,
        source: "Organic Content Engine"
      });
    }
  });

  // Anomaly Detection (only colors used for actual threshold violations)
  const isCpaAnomaly = paidCPA > setup.targetCPA * 1.25;
  const isRoasAnomaly = blendedROAS < 1.8;

  return (
    <div className="animate-fade-up">
      {/* Page Title Header */}
      <div className="mb-8">
        <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
          Monthly Decision Scorecard
        </h2>
        <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
          {setup.clientName} &bull; {setup.reportMonth} Analysis &bull; Market: {setup.country} ({setup.industry})
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
        {/* KPI: Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Blended Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#051C2C]">
            €{totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>MoM Growth:</span>
            <span className="font-semibold text-[#051C2C]">+21.3%</span>
          </div>
          <div className="h-[3px] bg-[#2251FF]/10 absolute bottom-0 left-0 right-0">
            <div className="h-full bg-[#2251FF] w-full" />
          </div>
        </div>

        {/* KPI: Paid Spend */}
        <div className="bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Paid Budget Spent</span>
            <span className="text-xs font-mono font-bold text-[#051C2C]">€</span>
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#051C2C]">
            €{totalPaidSpend.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>Ad Share:</span>
            <span className="font-semibold text-[#051C2C]">{((totalPaidSpend / totalRevenue) * 100).toFixed(0)}% of Rev</span>
          </div>
          <div className="h-[3px] bg-[#051C2C]/10 absolute bottom-0 left-0 right-0">
            <div className="h-full bg-[#051C2C] w-[65%]" />
          </div>
        </div>

        {/* KPI: ROAS */}
        <div className={`bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden ${isRoasAnomaly ? "bg-red-50/20" : ""}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Blended ROAS</span>
            <Sparkles className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#2251FF] flex items-baseline">
            {blendedROAS.toFixed(2)}
            <span className="text-xs font-mono font-normal text-[#888888] ml-1">x</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>Paid-only:</span>
            <span className={`font-semibold ${paidROAS < 2.0 ? "text-[#D32F2F]" : "text-[#051C2C]"}`}>
              {paidROAS.toFixed(2)}x
            </span>
          </div>
          {isRoasAnomaly && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-100 text-[#D32F2F] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full font-mono">
              <AlertTriangle className="w-2.5 h-2.5" /> Warning
            </div>
          )}
        </div>

        {/* KPI: Blended Reach */}
        <div className="bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Total Reach</span>
            <Eye className="w-4 h-4 text-[#888888]" />
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#051C2C]">
            {(totalReach / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>Views/Imps:</span>
            <span className="font-semibold text-[#051C2C]">1.52M</span>
          </div>
        </div>

        {/* KPI: Audience Growth */}
        <div className="bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Gained Followers</span>
            <Users className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#051C2C]">
            +{totalFollowersGained.toLocaleString("en-US")}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>Organic Growth:</span>
            <span className="font-semibold text-[#051C2C]">{(totalOrganicFollowers / totalFollowersGained * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* KPI: Organic ER */}
        <div className="bg-white p-6 rounded-xl shadow-md card-hover relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase font-mono">Organic ER</span>
            <div className="w-2 h-2 rounded-full bg-[#00C853]" title="Healthy ER" />
          </div>
          <div className="font-serif-kpi text-3xl font-bold text-[#051C2C]">
            {(organicER * 100).toFixed(2)}%
          </div>
          <div className="text-[11px] text-[#888888] mt-2 font-mono flex items-center justify-between">
            <span>vs Benchmark:</span>
            <span className="font-semibold text-[#2251FF]">
              {erDiff >= 0 ? "+" : ""}{(erDiff * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Left column (2/3 width) - Paid vs Organic attribution + Benchmarks comparison */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PAID VS ORGANIC ATTRIBUTION TIER */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6">
              Paid vs. Organic Contribution Analysis
            </h3>
            
            <div className="space-y-6">
              {/* Metric 1: Reach Contribution */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-[#051C2C] font-semibold">Blended Reach Distribution</span>
                  <span className="text-[#888888]">
                    Organic: <strong className="text-[#051C2C]">{(totalOrganicReach / totalReach * 100).toFixed(1)}%</strong> &bull; Paid: <strong className="text-[#2251FF]">{((totalPaidImpressions * 0.85) / totalReach * 100).toFixed(1)}%</strong>
                  </span>
                </div>
                {/* Custom Styled Stacked Bar */}
                <div className="h-4 w-full bg-[#051C2C]/10 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#051C2C] transition-all duration-500" 
                    style={{ width: `${(totalOrganicReach / totalReach * 100)}%` }} 
                    title={`Organic: ${totalOrganicReach.toLocaleString()}`}
                  />
                  <div 
                    className="h-full bg-[#2251FF] transition-all duration-500" 
                    style={{ width: `${((totalPaidImpressions * 0.85) / totalReach * 100)}%` }}
                    title={`Paid: ${(totalPaidImpressions * 0.85).toLocaleString()}`}
                  />
                </div>
              </div>

              {/* Metric 2: Followers Contribution */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-[#051C2C] font-semibold">New Followers Contribution</span>
                  <span className="text-[#888888]">
                    Organic: <strong className="text-[#051C2C]">{(totalOrganicFollowers / totalFollowersGained * 100).toFixed(1)}%</strong> &bull; Paid: <strong className="text-[#2251FF]">{((totalPaidConversions * 0.18) / totalFollowersGained * 100).toFixed(1)}%</strong>
                  </span>
                </div>
                {/* Custom Styled Stacked Bar */}
                <div className="h-4 w-full bg-[#051C2C]/10 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#051C2C] transition-all duration-500" 
                    style={{ width: `${(totalOrganicFollowers / totalFollowersGained * 100)}%` }} 
                  />
                  <div 
                    className="h-full bg-[#2251FF] transition-all duration-500" 
                    style={{ width: `${((totalPaidConversions * 0.18) / totalFollowersGained * 100)}%` }}
                  />
                </div>
              </div>

              {/* Metric 3: Revenue Contribution */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-[#051C2C] font-semibold">Monthly Attributed Revenue</span>
                  <span className="text-[#888888]">
                    Organic: <strong className="text-[#051C2C]">{(organicRevenue / totalRevenue * 100).toFixed(1)}%</strong> &bull; Paid: <strong className="text-[#2251FF]">{(totalPaidRevenue / totalRevenue * 100).toFixed(1)}%</strong>
                  </span>
                </div>
                {/* Custom Styled Stacked Bar */}
                <div className="h-4 w-full bg-[#051C2C]/10 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#051C2C] transition-all duration-500" 
                    style={{ width: `${(organicRevenue / totalRevenue * 100)}%` }} 
                  />
                  <div 
                    className="h-full bg-[#2251FF] transition-all duration-500" 
                    style={{ width: `${(totalPaidRevenue / totalRevenue * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Insights Footer */}
            <div className="mt-6 p-4 rounded-lg bg-[#051C2C]/[0.04] border-l-3 border-[#2251FF] text-xs text-[#051C2C]">
              <strong>Growth Driver Model:</strong> Brand organic content acts as a powerful brand equity baseline, while Paid Spark campaigns multiply short-term volume. Currently, <strong>{((organicRevenue / totalRevenue) * 100).toFixed(0)}%</strong> of overall sales has organic origin, establishing robust organic-to-paid integration metrics.
            </div>
          </div>

          {/* BENCHMARK COMPARISON MATRIX */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4">
              Performance vs. Country Benchmark Library
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              Comparing current actuals against the standard benchmark database for <strong>{setup.country} ({setup.industry})</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* CTR COMPARISON */}
              <div className="border border-[#E8E8E6] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-semibold text-[#888888] uppercase">Click-Through Rate (CTR)</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2251FF]/10 text-[#2251FF]">
                    {ctrDiff >= 0 ? "Above" : "Below"} Bench
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-bold font-serif text-[#051C2C]">{(paidCTR * 100).toFixed(2)}%</span>
                  <span className="text-xs text-[#888888]">vs benchmark {(activeBenchmark.ctr * 100).toFixed(2)}%</span>
                </div>
                <div className="text-xs text-[#888888] font-mono">
                  Variance: <strong className="text-[#051C2C]">{ctrDiff >= 0 ? "+" : ""}{(ctrDiff * 100).toFixed(1)}%</strong>
                </div>
              </div>

              {/* ER COMPARISON */}
              <div className="border border-[#E8E8E6] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-semibold text-[#888888] uppercase">Engagement Rate (ER)</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2251FF]/10 text-[#2251FF]">
                    {erDiff >= 0 ? "Above" : "Below"} Bench
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-bold font-serif text-[#051C2C]">{(organicER * 100).toFixed(2)}%</span>
                  <span className="text-xs text-[#888888]">vs benchmark {(activeBenchmark.er * 100).toFixed(2)}%</span>
                </div>
                <div className="text-xs text-[#888888] font-mono">
                  Variance: <strong className="text-[#051C2C]">{erDiff >= 0 ? "+" : ""}{(erDiff * 100).toFixed(1)}%</strong>
                </div>
              </div>

              {/* CPM COMPARISON */}
              <div className="border border-[#E8E8E6] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-semibold text-[#888888] uppercase">Cost per Mille (CPM)</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2251FF]/10 text-[#2251FF]">
                    {cpmDiff <= 0 ? "Above Bench" : "Below Bench"}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-bold font-serif text-[#051C2C]">€{paidCPM.toFixed(2)}</span>
                  <span className="text-xs text-[#888888]">vs benchmark €{activeBenchmark.cpm.toFixed(2)}</span>
                </div>
                <div className="text-xs text-[#888888] font-mono">
                  Variance: <strong className="text-[#051C2C]">{cpmDiff >= 0 ? "+" : ""}{(cpmDiff * 100).toFixed(1)}%</strong>
                </div>
              </div>

              {/* CPA COMPARISON */}
              <div className="border border-[#E8E8E6] rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-semibold text-[#888888] uppercase">Cost per Acquisition (CPA)</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isCpaAnomaly ? "bg-red-100 text-[#D32F2F]" : "bg-[#2251FF]/10 text-[#2251FF]"}`}>
                    {paidCPA <= setup.targetCPA ? "Target Met" : "Target Missed"}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-bold font-serif text-[#051C2C]">€{paidCPA.toFixed(2)}</span>
                  <span className="text-xs text-[#888888]">vs Target €{setup.targetCPA.toFixed(2)}</span>
                </div>
                <div className="text-xs text-[#888888] font-mono">
                  Variance: <strong className={isCpaAnomaly ? "text-[#D32F2F] font-semibold" : "text-[#051C2C]"}>{cpaDiff >= 0 ? "+" : ""}{(cpaDiff * 100).toFixed(1)}%</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column (1/3 width) - Content leaderboard rankings */}
        <div className="space-y-8">
          
          {/* CONTENT LEADERBOARD (TOP 3) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#2251FF]" />
              Top Content Leaderboard
            </h3>
            
            <div className="space-y-4">
              {topVideos.map((video, idx) => {
                const er = getVideoER(video);
                return (
                  <div key={video.id} className="p-3 bg-[#F5F5F2] rounded-lg relative overflow-hidden flex justify-between items-center matrix-cell-hover cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#2251FF] font-mono">#0{idx+1}</span>
                        <span className="text-xs text-[#888888] font-mono">{video.publishDate}</span>
                      </div>
                      <p className="font-medium text-xs text-[#051C2C] line-clamp-1 max-w-[180px]">
                        {video.contentTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#051C2C] font-mono">{(er * 100).toFixed(2)}% ER</div>
                      <div className="text-[10px] text-[#888888] font-mono">{(video.views/1000).toFixed(0)}k Views</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LOW RETENTION / WORST CONTENT (BOTTOM 3) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#D32F2F]" />
              Creative Redirection Needed
            </h3>
            
            <div className="space-y-4">
              {bottomVideos.slice(0, 3).map((video, idx) => {
                const er = getVideoER(video);
                return (
                  <div key={video.id} className="p-3 bg-red-50/10 border-l-3 border-[#D32F2F]/40 rounded-lg relative overflow-hidden flex justify-between items-center matrix-cell-hover cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#D32F2F] font-mono">Alert</span>
                        <span className="text-xs text-[#888888] font-mono">{video.publishDate}</span>
                      </div>
                      <p className="font-medium text-xs text-[#051C2C] line-clamp-1 max-w-[180px]">
                        {video.contentTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#D32F2F] font-mono">{(er * 100).toFixed(2)}% ER</div>
                      <div className="text-[10px] text-[#888888] font-mono">{(video.watchTime/video.views).toFixed(1)}s watch</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* STRATEGIC RECOMMENDATIONS SUMMARY MODULE */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="font-serif-heading text-xl font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6">
          Intelligence Strategy Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* SCALE */}
          <div className="p-4 bg-white border border-[#E8E8E6] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-[#051C2C] text-[13px] tracking-wider uppercase font-mono">SCALE BUDGET</h4>
              </div>
              <div className="space-y-3">
                {recommendations.filter(r => r.category === "SCALE").slice(0, 2).map((rec, i) => (
                  <div key={i} className="text-xs text-[#051C2C]">
                    <span className="font-semibold block mb-0.5">{rec.title}</span>
                    <p className="text-[#888888] leading-relaxed text-[11px]">{rec.desc}</p>
                  </div>
                ))}
                {recommendations.filter(r => r.category === "SCALE").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No campaigns meet the threshold to SCALE immediately.</p>
                )}
              </div>
            </div>
            <div className="pt-4 border-t border-[#E8E8E6]/50 mt-4 text-[10px] text-[#888888] font-mono">
              Action: Increase daily bids
            </div>
          </div>

          {/* KEEP */}
          <div className="p-4 bg-white border border-[#E8E8E6] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[#051C2C]/10 text-[#051C2C]">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-[#051C2C] text-[13px] tracking-wider uppercase font-mono">KEEP & PROTECT</h4>
              </div>
              <div className="space-y-3">
                {recommendations.filter(r => r.category === "KEEP").slice(0, 2).map((rec, i) => (
                  <div key={i} className="text-xs text-[#051C2C]">
                    <span className="font-semibold block mb-0.5">{rec.title}</span>
                    <p className="text-[#888888] leading-relaxed text-[11px]">{rec.desc}</p>
                  </div>
                ))}
                {recommendations.filter(r => r.category === "KEEP").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No metrics meet the baseline to KEEP.</p>
                )}
              </div>
            </div>
            <div className="pt-4 border-t border-[#E8E8E6]/50 mt-4 text-[10px] text-[#888888] font-mono">
              Action: Refresh creative copies
            </div>
          </div>

          {/* STOP */}
          <div className="p-4 bg-white border border-[#E8E8E6] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-red-100 text-[#D32F2F]">
                  <PauseCircle className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-[#D32F2F] text-[13px] tracking-wider uppercase font-mono">STOP EFFORTS</h4>
              </div>
              <div className="space-y-3">
                {recommendations.filter(r => r.category === "STOP").slice(0, 2).map((rec, i) => (
                  <div key={i} className="text-xs text-[#051C2C]">
                    <span className="font-semibold text-[#D32F2F] block mb-0.5">{rec.title}</span>
                    <p className="text-[#888888] leading-relaxed text-[11px]">{rec.desc}</p>
                  </div>
                ))}
                {recommendations.filter(r => r.category === "STOP").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No severe fatigue identified.</p>
                )}
              </div>
            </div>
            <div className="pt-4 border-t border-[#E8E8E6]/50 mt-4 text-[10px] text-red-500 font-mono">
              Action: Freeze spend limits
            </div>
          </div>

          {/* TEST */}
          <div className="p-4 bg-white border border-[#E8E8E6] rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-[#051C2C] text-[13px] tracking-wider uppercase font-mono">TEST IDEAS</h4>
              </div>
              <div className="space-y-3">
                {recommendations.filter(r => r.category === "TEST").slice(0, 2).map((rec, i) => (
                  <div key={i} className="text-xs text-[#051C2C]">
                    <span className="font-semibold block mb-0.5">{rec.title}</span>
                    <p className="text-[#888888] leading-relaxed text-[11px]">{rec.desc}</p>
                  </div>
                ))}
                {recommendations.filter(r => r.category === "TEST").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No active creative testing needed.</p>
                )}
              </div>
            </div>
            <div className="pt-4 border-t border-[#E8E8E6]/50 mt-4 text-[10px] text-[#888888] font-mono">
              Action: Run A/B hook variant
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
