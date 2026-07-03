import React, { useState } from "react";
import { Plus, Trash2, LineChart, Euro, Percent, RefreshCw, AlertTriangle } from "lucide-react";
import { PaidCampaign } from "../types";

interface PaidDataProps {
  campaigns: PaidCampaign[];
  setCampaigns: (campaigns: PaidCampaign[]) => void;
  targetCTR: number;
  targetCPA: number;
}

export default function PaidData({
  campaigns,
  setCampaigns,
  targetCTR,
  targetCPA
}: PaidDataProps) {
  
  const handleFieldChange = (id: string, field: keyof PaidCampaign, value: any) => {
    setCampaigns(
      campaigns.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            [field]: value
          };
        }
        return c;
      })
    );
  };

  const addCampaign = () => {
    const nextNum = campaigns.length + 1;
    const newCamp: PaidCampaign = {
      id: `paid-${Date.now()}`,
      campaign: `Spark Ads Promo Campaign #${nextNum}`,
      spend: 3000.00,
      impressions: 250000,
      clicks: 4000,
      conversions: 1200,
      revenue: 9000.00
    };
    setCampaigns([...campaigns, newCamp]);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  // Find max values for normalization of data-bars
  const maxSpend = Math.max(...campaigns.map((c) => c.spend), 1);
  const maxRevenue = Math.max(...campaigns.map((c) => c.revenue), 1);
  const maxConversions = Math.max(...campaigns.map((c) => c.conversions), 1);

  return (
    <div className="animate-fade-up space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
            Raw Paid Ads Performance
          </h2>
          <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
            Sheet 3 &bull; TikTok Ads Manager integration ledger, budget spends, and acquisition ROI.
          </p>
        </div>
        <button
          onClick={addCampaign}
          className="self-start sm:self-center flex items-center gap-1.5 bg-[#2251FF] hover:bg-[#2251FF]/90 text-white font-medium text-xs px-4 py-2.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4" />
          Add Paid Campaign
        </button>
      </div>

      {/* PAID CAMPAIGNS DATA TABLE */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
        <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6">
          Paid Campaigns Database Registry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E6] bg-[#051C2C]/[0.02]">
                <th className="table-head-uppercase py-3 pl-3">Campaign / Ad Set Name</th>
                <th className="table-head-uppercase py-3 text-right">Spend (€)</th>
                <th className="table-head-uppercase py-3 text-right">Impressions</th>
                <th className="table-head-uppercase py-3 text-right">Clicks</th>
                <th className="table-head-uppercase py-3 text-right">Conversions</th>
                <th className="table-head-uppercase py-3 text-right">Revenue (€)</th>
                <th className="table-head-uppercase py-3 text-right">CTR (%)</th>
                <th className="table-head-uppercase py-3 text-right">CPM (€)</th>
                <th className="table-head-uppercase py-3 text-right">CPA (€)</th>
                <th className="table-head-uppercase py-3 text-right">ROAS (x)</th>
                <th className="table-head-uppercase py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]/40 text-xs">
              {campaigns.map((c) => {
                const ctr = c.impressions > 0 ? c.clicks / c.impressions : 0;
                const cpm = c.impressions > 0 ? (c.spend / c.impressions) * 1000 : 0;
                const cpa = c.conversions > 0 ? c.spend / c.conversions : 0;
                const roas = c.spend > 0 ? c.revenue / c.spend : 0;

                const spendPct = Math.min((c.spend / maxSpend) * 100, 100);
                const revenuePct = Math.min((c.revenue / maxRevenue) * 100, 100);
                const convPct = Math.min((c.conversions / maxConversions) * 100, 100);

                const isCpaBreached = cpa > targetCPA * 1.25;

                return (
                  <tr key={c.id} className={`hover:bg-[#F5F5F2]/40 transition-colors ${isCpaBreached ? "bg-red-50/10" : ""}`}>
                    {/* Campaign Name */}
                    <td className="py-4 pl-3">
                      <input
                        type="text"
                        value={c.campaign}
                        onChange={(e) => handleFieldChange(c.id, "campaign", e.target.value)}
                        className="text-xs bg-[#FFFDE7] border border-[#E8E8E6] rounded px-2 py-1 text-[#051C2C] font-semibold w-full max-w-[220px] focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>

                    {/* Spend */}
                    <td className="py-4 text-right pr-3">
                      <div className="flex flex-col items-end">
                        <div className="relative w-20">
                          <span className="absolute left-1.5 top-1 text-[10px] text-[#888888] font-mono">€</span>
                          <input
                            type="number"
                            value={c.spend}
                            onChange={(e) => handleFieldChange(c.id, "spend", parseFloat(e.target.value) || 0)}
                            className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded pl-4 pr-1.5 py-0.5 text-[#051C2C] font-bold font-mono w-full focus:outline-none"
                          />
                        </div>
                        <div className="w-20 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${spendPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Impressions */}
                    <td className="py-4 text-right pr-3">
                      <input
                        type="number"
                        value={c.impressions}
                        onChange={(e) => handleFieldChange(c.id, "impressions", parseInt(e.target.value) || 0)}
                        className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-20 focus:outline-none"
                      />
                    </td>

                    {/* Clicks */}
                    <td className="py-4 text-right pr-3">
                      <input
                        type="number"
                        value={c.clicks}
                        onChange={(e) => handleFieldChange(c.id, "clicks", parseInt(e.target.value) || 0)}
                        className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-16 focus:outline-none"
                      />
                    </td>

                    {/* Conversions */}
                    <td className="py-4 text-right pr-3">
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          value={c.conversions}
                          onChange={(e) => handleFieldChange(c.id, "conversions", parseInt(e.target.value) || 0)}
                          className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-16 focus:outline-none"
                        />
                        <div className="w-16 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${convPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Revenue */}
                    <td className="py-4 text-right pr-3">
                      <div className="flex flex-col items-end">
                        <div className="relative w-20">
                          <span className="absolute left-1.5 top-1 text-[10px] text-[#888888] font-mono">€</span>
                          <input
                            type="number"
                            value={c.revenue}
                            onChange={(e) => handleFieldChange(c.id, "revenue", parseFloat(e.target.value) || 0)}
                            className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded pl-4 pr-1.5 py-0.5 text-[#051C2C] font-bold font-mono w-full focus:outline-none"
                          />
                        </div>
                        <div className="w-20 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${revenuePct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Calculated CTR */}
                    <td className="py-4 text-right font-mono pr-2">
                      <span className={`font-semibold ${ctr >= targetCTR ? "text-[#2251FF]" : "text-[#888888]"}`}>
                        {(ctr * 100).toFixed(2)}%
                      </span>
                    </td>

                    {/* Calculated CPM */}
                    <td className="py-4 text-right font-mono pr-2 text-[#051C2C]">
                      €{cpm.toFixed(2)}
                    </td>

                    {/* Calculated CPA */}
                    <td className="py-4 text-right font-mono pr-2">
                      <span className={`font-semibold ${isCpaBreached ? "text-[#D32F2F]" : "text-[#00C853]"}`}>
                        €{cpa.toFixed(2)}
                      </span>
                    </td>

                    {/* Calculated ROAS */}
                    <td className="py-4 text-right font-mono pr-3">
                      <span className={`font-bold ${roas >= 3.0 ? "text-[#2251FF]" : "text-[#051C2C]"}`}>
                        {roas.toFixed(2)}x
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-center">
                      <button
                        onClick={() => deleteCampaign(c.id)}
                        className="p-1.5 text-[#D32F2F] hover:bg-red-50 hover:text-red-700 rounded-md transition-all active:scale-90 cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* METRIC ANALYSIS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cost Efficiency Index */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#2251FF]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
              <Euro className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Average CPA Efficiency</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            Measures budget efficiency in customer conversion. If CPA breaches the target limit of <strong>€{targetCPA.toFixed(2)}</strong>, campaign stops are automatically prioritized.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Blended CPA actual:</span>
            <span className="text-[#2251FF] font-bold">
              €{(campaigns.reduce((sum, c) => sum + c.spend, 0) / campaigns.reduce((sum, c) => sum + c.conversions, 1)).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Traffic Click Rate Index */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#051C2C]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#051C2C]/10 text-[#051C2C]">
              <Percent className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Ad Hook Attraction (CTR)</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            Directly tells if the paid creative matches TikTok audience aesthetic standards. Target index is set to <strong>{(targetCTR * 100).toFixed(2)}%</strong>.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Blended CTR:</span>
            <span className="text-[#051C2C] font-bold">
              {(campaigns.reduce((sum, c) => sum + c.clicks, 0) / campaigns.reduce((sum, c) => sum + c.impressions, 1) * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Investment Return Index */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#2251FF]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
              <LineChart className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Investment Return (ROAS)</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            How many Euros are retrieved in revenue for every Euro spent in brand paid advertising. Optimal benchmark starts above 3.0x.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Blended Paid ROAS:</span>
            <span className="text-[#2251FF] font-bold">
              {(campaigns.reduce((sum, c) => sum + c.revenue, 0) / campaigns.reduce((sum, c) => sum + c.spend, 1)).toFixed(2)}x
            </span>
          </div>
        </div>

      </div>

      {/* BRIEF EXPLAINER */}
      <div className="bg-[#D32F2F]/[0.02] p-5 rounded-xl border-l-3 border-[#D32F2F] text-xs text-[#051C2C] flex items-center justify-between">
        <div className="space-y-1">
          <strong className="text-sm block text-[#D32F2F] flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Cost Warning Trigger Logic Active
          </strong>
          <span className="text-[#888888] block">
            Campaigns whose CPA exceeds the threshold limit (€{targetCPA.toFixed(2)}) by 25% or more are automatically flagged in red. These items will feed directly into the STOP recommendations list.
          </span>
        </div>
      </div>

    </div>
  );
}
