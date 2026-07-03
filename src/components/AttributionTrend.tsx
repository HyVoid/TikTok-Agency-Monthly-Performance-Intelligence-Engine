import React from "react";
import { Share2, TrendingUp, HelpCircle, Activity, Award, Sparkles } from "lucide-react";
import { OrganicVideo, PaidCampaign, HistoricalMonth } from "../types";

interface AttributionTrendProps {
  organicVideos: OrganicVideo[];
  paidCampaigns: PaidCampaign[];
  history: HistoricalMonth[];
}

export default function AttributionTrend({
  organicVideos,
  paidCampaigns,
  history
}: AttributionTrendProps) {
  
  // --- CALCULATE ATTRIBUTION STATS ---
  const totalOrganicViews = organicVideos.reduce((sum, v) => sum + v.views, 0);
  const totalOrganicReach = organicVideos.reduce((sum, v) => sum + v.reach, 0);
  const totalOrganicFollowers = organicVideos.reduce((sum, v) => sum + v.followersGained, 0);
  const organicRevenue = totalOrganicViews * 0.025; // €0.025 per view model

  const totalPaidSpend = paidCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalPaidImpressions = paidCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalPaidConversions = paidCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalPaidRevenue = paidCampaigns.reduce((sum, c) => sum + c.revenue, 0);

  // Formula allocations:
  // Reach: Organic Reach vs. Paid Impressions * 0.85
  const paidReachAlloc = totalPaidImpressions * 0.85;
  const blendedReach = totalOrganicReach + paidReachAlloc;

  // Followers: Organic Followers vs. Paid Conversions * 0.18
  const paidFollowersAlloc = Math.round(totalPaidConversions * 0.18);
  const blendedFollowers = totalOrganicFollowers + paidFollowersAlloc;

  // Revenue: Organic views based model vs Paid Revenue
  const blendedRevenue = organicRevenue + totalPaidRevenue;

  // --- HISTORICAL TREND ENGINE CALCULATIONS ---
  // Overwrite or append June (current month) based on active state to guarantee calculations align!
  const processedHistory = history.map((item) => {
    // If we detect the current report month "2026-06", override with our active state
    if (item.month === "2026-06") {
      return {
        month: "2026-06",
        organicViews: totalOrganicViews,
        paidSpend: totalPaidSpend,
        totalFollowersGained: blendedFollowers,
        totalRevenue: blendedRevenue
      };
    }
    return item;
  });

  // Calculate MoMs and 3M Moving Averages
  const calculatedHistory = processedHistory.map((item, idx) => {
    const prevItem = idx > 0 ? processedHistory[idx - 1] : null;
    
    // MoM = (Current - Prev) / Prev
    const viewsMoM = prevItem && prevItem.organicViews > 0 
      ? (item.organicViews - prevItem.organicViews) / prevItem.organicViews 
      : 0;
    const spendMoM = prevItem && prevItem.paidSpend > 0 
      ? (item.paidSpend - prevItem.paidSpend) / prevItem.paidSpend 
      : 0;
    const followersMoM = prevItem && prevItem.totalFollowersGained > 0 
      ? (item.totalFollowersGained - prevItem.totalFollowersGained) / prevItem.totalFollowersGained 
      : 0;
    const revenueMoM = prevItem && prevItem.totalRevenue > 0 
      ? (item.totalRevenue - prevItem.totalRevenue) / prevItem.totalRevenue 
      : 0;

    // 3M moving average (current + previous 2 months)
    let views3M = item.organicViews;
    let spend3M = item.paidSpend;
    let followers3M = item.totalFollowersGained;
    let revenue3M = item.totalRevenue;

    if (idx >= 2) {
      const p1 = processedHistory[idx - 1];
      const p2 = processedHistory[idx - 2];
      views3M = (item.organicViews + p1.organicViews + p2.organicViews) / 3;
      spend3M = (item.paidSpend + p1.paidSpend + p2.paidSpend) / 3;
      followers3M = (item.totalFollowersGained + p1.totalFollowersGained + p2.totalFollowersGained) / 3;
      revenue3M = (item.totalRevenue + p1.totalRevenue + p2.totalRevenue) / 3;
    } else if (idx === 1) {
      const p1 = processedHistory[idx - 1];
      views3M = (item.organicViews + p1.organicViews) / 2;
      spend3M = (item.paidSpend + p1.paidSpend) / 2;
      followers3M = (item.totalFollowersGained + p1.totalFollowersGained) / 2;
      revenue3M = (item.totalRevenue + p1.totalRevenue) / 2;
    }

    return {
      ...item,
      viewsMoM,
      spendMoM,
      followersMoM,
      revenueMoM,
      views3M,
      spend3M,
      followers3M,
      revenue3M
    };
  });

  return (
    <div className="animate-fade-up space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
          Attribution & Trend Calculations
        </h2>
        <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
          Sheets 6 & 7 &bull; Automated models calculating media split contributions, historical speeds, and rolling averages.
        </p>
      </div>

      {/* TWO BLOCK LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER: ATTRIBUTION MATRIX MODULE */}
        <div className="xl:col-span-1 bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-2 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#2251FF]" />
              Attribution Engine Matrix
            </h3>
            <p className="text-xs text-[#888888]">
              Allocation formulas tracking direct organic performance shares versus paid conversions.
            </p>
          </div>

          <div className="space-y-6">
            {/* Reach Row */}
            <div className="border border-[#E8E8E6] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#051C2C] font-mono uppercase tracking-wider">Reach Contribution</span>
                <span className="text-xs font-bold text-[#2251FF] font-mono">
                  {blendedReach > 0 ? ((paidReachAlloc / blendedReach) * 100).toFixed(0) : 0}% Paid
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono text-right">
                <div className="text-left bg-[#051C2C]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Organic</span>
                  <strong className="text-[#051C2C]">{totalOrganicReach.toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#2251FF]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Paid</span>
                  <strong className="text-[#2251FF]">{Math.round(paidReachAlloc).toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#051C2C]/10 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Blended</span>
                  <strong className="text-[#051C2C]">{Math.round(blendedReach).toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Followers Row */}
            <div className="border border-[#E8E8E6] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#051C2C] font-mono uppercase tracking-wider">Follower Acquisition Split</span>
                <span className="text-xs font-bold text-[#2251FF] font-mono">
                  {blendedFollowers > 0 ? ((paidFollowersAlloc / blendedFollowers) * 100).toFixed(0) : 0}% Paid
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono text-right">
                <div className="text-left bg-[#051C2C]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Organic</span>
                  <strong className="text-[#051C2C]">{totalOrganicFollowers.toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#2251FF]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Paid</span>
                  <strong className="text-[#2251FF]">{paidFollowersAlloc.toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#051C2C]/10 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Total Gained</span>
                  <strong className="text-[#051C2C]">{blendedFollowers.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Revenue Row */}
            <div className="border border-[#E8E8E6] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#051C2C] font-mono uppercase tracking-wider">Revenue Attribution</span>
                <span className="text-xs font-bold text-[#2251FF] font-mono">
                  {blendedRevenue > 0 ? ((totalPaidRevenue / blendedRevenue) * 100).toFixed(0) : 0}% Paid
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono text-right">
                <div className="text-left bg-[#051C2C]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Organic Est.</span>
                  <strong className="text-[#051C2C]">€{Math.round(organicRevenue).toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#2251FF]/5 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Paid Direct</span>
                  <strong className="text-[#2251FF]">€{Math.round(totalPaidRevenue).toLocaleString()}</strong>
                </div>
                <div className="text-left bg-[#051C2C]/10 rounded p-1.5">
                  <span className="block text-[10px] text-[#888888]">Blended Total</span>
                  <strong className="text-[#051C2C]">€{Math.round(blendedRevenue).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: TREND ENGINE MATRIX MODULE */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="border-b border-[#E8E8E6] pb-3 mb-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#2251FF]" />
              Trend Engine & Rolling Averages
            </h3>
            <p className="text-xs text-[#888888]">
              Analyzing growth speed (MoM) and smoothing monthly volatility with a 3-Month Moving Average.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E8E8E6] bg-[#051C2C]/[0.02]">
                  <th className="table-head-uppercase py-3 pl-2">Timeline</th>
                  <th className="table-head-uppercase py-3 text-right">Organic Views</th>
                  <th className="table-head-uppercase py-3 text-right">Paid Spend (€)</th>
                  <th className="table-head-uppercase py-3 text-right">Followers</th>
                  <th className="table-head-uppercase py-3 text-right">Revenue (€)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6]/40">
                {calculatedHistory.map((row, idx) => (
                  <React.Fragment key={row.month}>
                    {/* Main Row */}
                    <tr className="font-semibold bg-[#F5F5F2]/20">
                      <td className="py-2.5 pl-2 font-mono text-[#051C2C]">{row.month}</td>
                      <td className="text-right font-mono text-[#051C2C]">{row.organicViews.toLocaleString()}</td>
                      <td className="text-right font-mono text-[#051C2C]">€{row.paidSpend.toLocaleString()}</td>
                      <td className="text-right font-mono text-[#051C2C]">{row.totalFollowersGained.toLocaleString()}</td>
                      <td className="text-right font-mono text-[#051C2C]">€{Math.round(row.totalRevenue).toLocaleString()}</td>
                    </tr>
                    
                    {/* Month-over-Month calculation details */}
                    <tr className="text-[#888888] font-mono text-[10px]">
                      <td className="py-1 pl-4 italic text-[9px] uppercase tracking-wider text-[#888888]/80">MoM Growth</td>
                      <td className="text-right text-[#051C2C] pr-1">
                        {idx > 0 ? (
                          <span>
                            {row.viewsMoM >= 0 ? "▲" : "▼"} {(row.viewsMoM * 100).toFixed(1)}%
                          </span>
                        ) : "-"}
                      </td>
                      <td className="text-right text-[#051C2C] pr-1">
                        {idx > 0 ? (
                          <span>
                            {row.spendMoM >= 0 ? "▲" : "▼"} {(row.spendMoM * 100).toFixed(1)}%
                          </span>
                        ) : "-"}
                      </td>
                      <td className="text-right text-[#051C2C] pr-1">
                        {idx > 0 ? (
                          <span>
                            {row.followersMoM >= 0 ? "▲" : "▼"} {(row.followersMoM * 100).toFixed(1)}%
                          </span>
                        ) : "-"}
                      </td>
                      <td className="text-right text-[#051C2C] pr-1">
                        {idx > 0 ? (
                          <span>
                            {row.revenueMoM >= 0 ? "▲" : "▼"} {(row.revenueMoM * 100).toFixed(1)}%
                          </span>
                        ) : "-"}
                      </td>
                    </tr>

                    {/* 3M Rolling Average details */}
                    <tr className="text-[#2251FF] font-mono text-[10px]">
                      <td className="py-1 pl-4 italic text-[9px] uppercase tracking-wider text-[#2251FF]/80">3-Mo Roll Avg</td>
                      <td className="text-right pr-1">
                        {row.views3M ? Math.round(row.views3M).toLocaleString() : "-"}
                      </td>
                      <td className="text-right pr-1">
                        {row.spend3M ? `€${Math.round(row.spend3M).toLocaleString()}` : "-"}
                      </td>
                      <td className="text-right pr-1">
                        {row.followers3M ? Math.round(row.followers3M).toLocaleString() : "-"}
                      </td>
                      <td className="text-right pr-1">
                        {row.revenue3M ? `€${Math.round(row.revenue3M).toLocaleString()}` : "-"}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Quick Informational footer */}
          <div className="mt-6 p-4 rounded-lg bg-[#2251FF]/[0.04] border-l-3 border-[#2251FF] text-xs text-[#051C2C] space-y-1">
            <strong>Trend Integration Active:</strong>
            <p className="text-[#888888] text-[11px] leading-relaxed">
              The 3-Month Moving Average (Roll Avg) helps smooth out weekly algorithmic surges in TikTok's FYP recommendations, giving the marketing director an accurate, standardized baseline of brand health. Graphed MoM arrows display growth acceleration directions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
