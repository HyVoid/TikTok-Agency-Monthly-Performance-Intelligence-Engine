import React from "react";
import { Compass, Flame, CheckCircle, PauseCircle, HelpCircle, Award, Sparkles, TrendingUp, Filter } from "lucide-react";
import { SetupConfig, OrganicVideo, PaidCampaign, BenchmarkItem } from "../types";

interface StrategyInsightsProps {
  setup: SetupConfig;
  organicVideos: OrganicVideo[];
  paidCampaigns: PaidCampaign[];
  benchmarks: BenchmarkItem[];
}

export default function StrategyInsights({
  setup,
  organicVideos,
  paidCampaigns,
  benchmarks
}: StrategyInsightsProps) {
  
  // --- SELECTORS AND CALCULATIONS ---
  const totalOrganicViews = organicVideos.reduce((sum, v) => sum + v.views, 0);
  const totalOrganicLikes = organicVideos.reduce((sum, v) => sum + v.likes, 0);
  const totalOrganicComments = organicVideos.reduce((sum, v) => sum + v.comments, 0);
  const totalOrganicShares = organicVideos.reduce((sum, v) => sum + v.shares, 0);

  const organicER = totalOrganicViews > 0 
    ? (totalOrganicLikes + totalOrganicComments + totalOrganicShares) / totalOrganicViews 
    : 0;

  const totalPaidSpend = paidCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalPaidImpressions = paidCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalPaidClicks = paidCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalPaidConversions = paidCampaigns.reduce((sum, c) => sum + c.conversions, 0);

  const paidCTR = totalPaidImpressions > 0 ? totalPaidClicks / totalPaidImpressions : 0;
  const paidCPM = totalPaidImpressions > 0 ? (totalPaidSpend / totalPaidImpressions) * 1000 : 0;
  const paidCPA = totalPaidConversions > 0 ? totalPaidSpend / totalPaidConversions : 0;

  // Active benchmark lookup
  const activeBenchmark = benchmarks.find(
    (b) => b.country === setup.country && b.industry === setup.industry
  ) || benchmarks[0];

  // Helper: video ER
  const getVideoER = (v: OrganicVideo) => v.views > 0 ? (v.likes + v.comments + v.shares) / v.views : 0;

  // Best/Worst content
  const sortedByER = [...organicVideos].sort((a, b) => getVideoER(b) - getVideoER(a));
  const topContent = sortedByER.slice(0, 5);
  const worstContent = [...organicVideos]
    .filter(v => v.views > 0)
    .sort((a, b) => getVideoER(a) - getVideoER(b))
    .slice(0, 5);

  // --- INTERACTIVE STRATEGIC COMPILATION (Sheet 9) ---
  const actionsList: {
    id: string;
    type: "Paid Campaign" | "Organic Video";
    name: string;
    metricLabel: string;
    metricValue: string;
    ruleMatch: "SCALE" | "KEEP" | "STOP" | "TEST";
    details: string;
  }[] = [];

  // Run Recommendation Logic on Paid Campaigns
  paidCampaigns.forEach((c) => {
    const roas = c.spend > 0 ? c.revenue / c.spend : 0;
    const ctr = c.impressions > 0 ? c.clicks / c.impressions : 0;
    const cpa = c.conversions > 0 ? c.spend / c.conversions : 0;

    let decision: "SCALE" | "KEEP" | "STOP" | "TEST" = "TEST";
    let explanation = "";

    if (roas > 3.0) {
      decision = "SCALE";
      explanation = `Excellent ROI of ${roas.toFixed(2)}x. Expand advertising budget immediately to capture maximum market impressions in ${setup.country}.`;
    } else if (ctr > setup.targetCTR) {
      decision = "KEEP";
      explanation = `Highly engaging paid creative! Click-through rate ${(ctr * 100).toFixed(2)}% met the target threshold. Maintain asset bid caps.`;
    } else if (cpa > setup.targetCPA * 1.25) {
      decision = "STOP";
      explanation = `Inefficient customer acquisition cost. CPA at €${cpa.toFixed(2)} is substantially over the maximum target limit (€${setup.targetCPA.toFixed(2)}).`;
    } else {
      decision = "TEST";
      explanation = `Average performance metrics (ROAS: ${roas.toFixed(1)}x, CPA: €${cpa.toFixed(1)}). Run test optimizations on hook variations.`;
    }

    actionsList.push({
      id: c.id,
      type: "Paid Campaign",
      name: c.campaign,
      metricLabel: "ROAS / CPA",
      metricValue: `${roas.toFixed(2)}x / €${cpa.toFixed(2)}`,
      ruleMatch: decision,
      details: explanation
    });
  });

  // Run Recommendation Logic on Organic Content
  organicVideos.forEach((v) => {
    const er = getVideoER(v);
    const watchTime = v.views > 0 ? v.watchTime / v.views : 0;

    let decision: "SCALE" | "KEEP" | "STOP" | "TEST" = "TEST";
    let explanation = "";

    if (er > activeBenchmark.er) {
      decision = "SCALE";
      explanation = `Superb organic virality index! ER of ${(er * 100).toFixed(2)}% exceeded industry benchmark (${(activeBenchmark.er * 100).toFixed(1)}%). Launch Spark Ads boost.`;
    } else if (watchTime > 3.0) {
      decision = "KEEP";
      explanation = `Strong retention and editing format. Average view duration at ${watchTime.toFixed(1)}s hooks users. Maintain current visual flow templates.`;
    } else if (v.views < 70000) {
      decision = "STOP";
      explanation = `Fails to breach initial organic algorithm threshold views (${(v.views/1000).toFixed(0)}k Views). Repivot content focus angle.`;
    } else {
      decision = "TEST";
      explanation = `Solid view base, but underperforming engagement rate. Test adding clickable overlays or prompt captions to trigger comments.`;
    }

    actionsList.push({
      id: v.id,
      type: "Organic Video",
      name: v.contentTitle,
      metricLabel: "ER / Watch Time",
      metricValue: `${(er * 100).toFixed(1)}% / ${watchTime.toFixed(1)}s`,
      ruleMatch: decision,
      details: explanation
    });
  });

  return (
    <div className="animate-fade-up space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
          Insights & Recommendation Engines
        </h2>
        <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
          Sheets 8 & 9 &bull; Rule-based algorithmic decision engine guiding the monthly TikTok operational roadmap.
        </p>
      </div>

      {/* BENCHMARK COMPILER CARDS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#2251FF]" />
          Benchmark Comparison Audit (Sheet 8)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CTR */}
          <div className="p-4 rounded-xl border border-[#E8E8E6] flex justify-between items-center bg-[#F5F5F2]/20">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Brand Paid CTR</span>
              <span className="text-xl font-bold font-serif text-[#051C2C]">{(paidCTR * 100).toFixed(2)}%</span>
              <span className="block text-[10px] text-[#888888] mt-1">Benchmark: {(activeBenchmark.ctr * 100).toFixed(2)}%</span>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${paidCTR >= activeBenchmark.ctr ? "bg-[#2251FF]/10 text-[#2251FF]" : "bg-red-50 text-[#D32F2F]"}`}>
              {paidCTR >= activeBenchmark.ctr ? "Above Bench" : "Below Bench"}
            </div>
          </div>

          {/* ER */}
          <div className="p-4 rounded-xl border border-[#E8E8E6] flex justify-between items-center bg-[#F5F5F2]/20">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Organic Engagement</span>
              <span className="text-xl font-bold font-serif text-[#051C2C]">{(organicER * 100).toFixed(2)}%</span>
              <span className="block text-[10px] text-[#888888] mt-1">Benchmark: {(activeBenchmark.er * 100).toFixed(2)}%</span>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${organicER >= activeBenchmark.er ? "bg-[#2251FF]/10 text-[#2251FF]" : "bg-red-50 text-[#D32F2F]"}`}>
              {organicER >= activeBenchmark.er ? "Above Bench" : "Below Bench"}
            </div>
          </div>

          {/* CPM */}
          <div className="p-4 rounded-xl border border-[#E8E8E6] flex justify-between items-center bg-[#F5F5F2]/20">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#888888]">Cost per Mille (CPM)</span>
              <span className="text-xl font-bold font-serif text-[#051C2C]">€{paidCPM.toFixed(2)}</span>
              <span className="block text-[10px] text-[#888888] mt-1">Benchmark: €{activeBenchmark.cpm.toFixed(2)}</span>
            </div>
            {/* Lower CPM is Better (Cheaper) */}
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${paidCPM <= activeBenchmark.cpm ? "bg-[#2251FF]/10 text-[#2251FF]" : "bg-red-50 text-[#D32F2F]"}`}>
              {paidCPM <= activeBenchmark.cpm ? "Highly Efficient" : "High CPM Cost"}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT CLASS TIER - BEST VS WORST CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top 5 Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2251FF]" />
            Top 5 Organic Videos (High Viral Class)
          </h3>
          <div className="space-y-3">
            {topContent.map((video, idx) => (
              <div key={video.id} className="p-3 bg-[#051C2C]/[0.02] hover:bg-[#2251FF]/5 rounded-lg flex justify-between items-center transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2251FF]">#0{idx+1}</span>
                    <span className="text-[10px] text-[#888888] font-mono">{video.publishDate}</span>
                  </div>
                  <p className="font-medium text-xs text-[#051C2C] line-clamp-1">{video.contentTitle}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <strong className="text-[#051C2C]">{(getVideoER(video) * 100).toFixed(2)}% ER</strong>
                  <span className="block text-[10px] text-[#888888]">{(video.views/1000).toFixed(0)}k views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst 5 Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4 flex items-center gap-2">
            <PauseCircle className="w-5 h-5 text-[#D32F2F]" />
            Lowest Trailing Organic Videos (Pivot Needed)
          </h3>
          <div className="space-y-3">
            {worstContent.map((video, idx) => (
              <div key={video.id} className="p-3 bg-red-50/10 hover:bg-red-50/20 border-l-3 border-[#D32F2F]/30 rounded-lg flex justify-between items-center transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#D32F2F]">Alert</span>
                    <span className="text-[10px] text-[#888888] font-mono">{video.publishDate}</span>
                  </div>
                  <p className="font-medium text-xs text-[#051C2C] line-clamp-1">{video.contentTitle}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <strong className="text-[#D32F2F]">{(getVideoER(video) * 100).toFixed(2)}% ER</strong>
                  <span className="block text-[10px] text-[#888888]">{(video.watchTime/video.views).toFixed(1)}s watch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE COMPREHENSIVE ROADMAP (Sheet 9 Recommendation Logic) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#2251FF]" />
          Operational Strategy Roadmap (Rule-Based Matrix)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* SCALE CARD */}
          <div className="p-5 rounded-xl border border-[#E8E8E6] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-[#2251FF]/10 text-[#2251FF]">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#051C2C] uppercase font-mono tracking-wider">SCALE</h4>
              </div>
              <p className="text-[11px] text-[#888888]">
                Asset elements exceeding primary targets or benchmark baselines. Amplify spends and adapt to ad hooks.
              </p>
              
              <div className="space-y-3 pt-2">
                {actionsList.filter(item => item.ruleMatch === "SCALE").map((item) => (
                  <div key={item.id} className="p-2.5 bg-[#2251FF]/5 rounded border-l-2 border-[#2251FF] text-xs">
                    <span className="font-semibold text-[#051C2C] block line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-[#888888] font-mono block mt-0.5">{item.metricLabel}: {item.metricValue}</span>
                    <p className="text-[#888888] text-[10px] mt-1 leading-relaxed">{item.details}</p>
                  </div>
                ))}
                {actionsList.filter(item => item.ruleMatch === "SCALE").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No active assets qualified for scaling.</p>
                )}
              </div>
            </div>
            <span className="text-[10px] text-[#2251FF] font-mono mt-4 block pt-2 border-t border-[#E8E8E6]">
              Budget Directive: +25%
            </span>
          </div>

          {/* KEEP CARD */}
          <div className="p-5 rounded-xl border border-[#E8E8E6] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-[#051C2C]/10 text-[#051C2C]">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#051C2C] uppercase font-mono tracking-wider">KEEP</h4>
              </div>
              <p className="text-[11px] text-[#888888]">
                Stable high-retention formats or click rates within budget standards. Maintain current pacing.
              </p>

              <div className="space-y-3 pt-2">
                {actionsList.filter(item => item.ruleMatch === "KEEP").map((item) => (
                  <div key={item.id} className="p-2.5 bg-[#051C2C]/5 rounded border-l-2 border-[#051C2C] text-xs">
                    <span className="font-semibold text-[#051C2C] block line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-[#888888] font-mono block mt-0.5">{item.metricLabel}: {item.metricValue}</span>
                    <p className="text-[#888888] text-[10px] mt-1 leading-relaxed">{item.details}</p>
                  </div>
                ))}
                {actionsList.filter(item => item.ruleMatch === "KEEP").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No stable assets in maintenance range.</p>
                )}
              </div>
            </div>
            <span className="text-[10px] text-[#888888] font-mono mt-4 block pt-2 border-t border-[#E8E8E6]">
              Budget Directive: Hold Flat
            </span>
          </div>

          {/* STOP CARD */}
          <div className="p-5 rounded-xl border border-[#E8E8E6] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-red-100 text-[#D32F2F]">
                  <PauseCircle className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#D32F2F] uppercase font-mono tracking-wider">STOP</h4>
              </div>
              <p className="text-[11px] text-[#888888]">
                High fatigue or CPA breaches that fail to deliver conversions. Freeze budgets instantly.
              </p>

              <div className="space-y-3 pt-2">
                {actionsList.filter(item => item.ruleMatch === "STOP").map((item) => (
                  <div key={item.id} className="p-2.5 bg-red-50 text-xs rounded border-l-2 border-[#D32F2F]">
                    <span className="font-semibold text-[#D32F2F] block line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-[#888888] font-mono block mt-0.5">{item.metricLabel}: {item.metricValue}</span>
                    <p className="text-[#888888] text-[10px] mt-1 leading-relaxed">{item.details}</p>
                  </div>
                ))}
                {actionsList.filter(item => item.ruleMatch === "STOP").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No active CPA breaches detected.</p>
                )}
              </div>
            </div>
            <span className="text-[10px] text-red-500 font-mono mt-4 block pt-2 border-t border-[#E8E8E6]">
              Budget Directive: 0% (Halt)
            </span>
          </div>

          {/* TEST CARD */}
          <div className="p-5 rounded-xl border border-[#E8E8E6] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-[#2251FF]/10 text-[#2251FF]">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#051C2C] uppercase font-mono tracking-wider">TEST</h4>
              </div>
              <p className="text-[11px] text-[#888888]">
                Standard baseline content or average campaigns needing creative variation testing or hook revisions.
              </p>

              <div className="space-y-3 pt-2">
                {actionsList.filter(item => item.ruleMatch === "TEST").map((item) => (
                  <div key={item.id} className="p-2.5 bg-[#2251FF]/5 rounded border-l-2 border-[#2251FF] text-xs">
                    <span className="font-semibold text-[#051C2C] block line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-[#888888] font-mono block mt-0.5">{item.metricLabel}: {item.metricValue}</span>
                    <p className="text-[#888888] text-[10px] mt-1 leading-relaxed">{item.details}</p>
                  </div>
                ))}
                {actionsList.filter(item => item.ruleMatch === "TEST").length === 0 && (
                  <p className="text-xs text-[#888888] italic">No assets placed in sandbox testing.</p>
                )}
              </div>
            </div>
            <span className="text-[10px] text-[#888888] font-mono mt-4 block pt-2 border-t border-[#E8E8E6]">
              Budget Directive: Test Hook
            </span>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="p-5 rounded-xl bg-[#051C2C] text-white flex items-center justify-between">
        <div className="space-y-1.5">
          <h4 className="font-serif-heading text-lg font-bold">Standardized Decision Engine Active</h4>
          <p className="text-[11px] text-white/70 max-w-xl leading-relaxed">
            Every operational rule is derived from the official TikTok agency formula matrix, aligning ad managers with real, mathematical content retention, click interest indices, and cost acquisition budgets.
          </p>
        </div>
        <div className="hidden md:flex p-2 bg-[#2251FF] rounded text-xs font-mono font-bold tracking-wider uppercase">
          ROAS Engine: Standard Active
        </div>
      </div>

    </div>
  );
}
