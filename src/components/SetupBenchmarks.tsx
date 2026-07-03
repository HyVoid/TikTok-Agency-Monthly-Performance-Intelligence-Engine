import React, { useState, useRef } from "react";
import { Download, Upload, RotateCcw, Plus, Trash2, Sliders, Database, BookOpen, Clock } from "lucide-react";
import { SetupConfig, BenchmarkItem, HistoricalMonth } from "../types";

interface SetupBenchmarksProps {
  setup: SetupConfig;
  setSetup: (cfg: SetupConfig) => void;
  benchmarks: BenchmarkItem[];
  setBenchmarks: (b: BenchmarkItem[]) => void;
  history: HistoricalMonth[];
  setHistory: (h: HistoricalMonth[]) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function SetupBenchmarks({
  setup,
  setSetup,
  benchmarks,
  setBenchmarks,
  history,
  setHistory,
  onExport,
  onImport,
  onReset
}: SetupBenchmarksProps) {
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // --- LOCAL EDIT FORM TRIGGERS ---
  const handleSetupChange = (key: keyof SetupConfig, value: any) => {
    setSetup({
      ...setup,
      [key]: value
    });
  };

  // Benchmark edits
  const handleBenchmarkChange = (id: string, key: keyof BenchmarkItem, val: any) => {
    setBenchmarks(
      benchmarks.map((b) => (b.id === id ? { ...b, [key]: val } : b))
    );
  };

  const addBenchmark = () => {
    const newItem: BenchmarkItem = {
      id: `bench-${Date.now()}`,
      country: "Germany",
      industry: "Beauty",
      ctr: 0.015,
      er: 0.05,
      cpm: 7.5,
      vtr: 0.15,
      cpf: 1.5
    };
    setBenchmarks([...benchmarks, newItem]);
  };

  const deleteBenchmark = (id: string) => {
    setBenchmarks(benchmarks.filter((b) => b.id !== id));
  };

  // Historical months edits
  const handleHistoryChange = (index: number, key: keyof HistoricalMonth, val: any) => {
    const updated = [...history];
    updated[index] = { ...updated[index], [key]: val };
    setHistory(updated);
  };

  const addHistoryMonth = () => {
    const lastMonth = history[history.length - 1]?.month || "2026-06";
    // increment month string
    const [year, month] = lastMonth.split("-").map(Number);
    let nextMonthStr = "";
    if (month === 12) {
      nextMonthStr = `${year + 1}-01`;
    } else {
      nextMonthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    }

    const newItem: HistoricalMonth = {
      month: nextMonthStr,
      organicViews: 500000,
      paidSpend: 15000,
      totalFollowersGained: 6000,
      totalRevenue: 40000
    };
    setHistory([...history, newItem]);
  };

  const deleteHistoryMonth = (index: number) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <div className="animate-fade-up space-y-8">
      {/* Page Title Header */}
      <div>
        <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
          Setup & Benchmark Settings
        </h2>
        <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
          Configure agency parameters, define benchmark targets, and manage client workspace state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column (2/3 width) - Parameters + Backup Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CLIENT PARAMETERS */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#2251FF]" />
              SaaS Operational Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Client Name (SaaS tenant)
                </label>
                <input
                  type="text"
                  value={setup.clientName}
                  onChange={(e) => handleSetupChange("clientName", e.target.value)}
                  className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#2251FF] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Reporting Month
                </label>
                <input
                  type="month"
                  value={setup.reportMonth}
                  onChange={(e) => handleSetupChange("reportMonth", e.target.value)}
                  className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#2251FF] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Country Market
                </label>
                <select
                  value={setup.country}
                  onChange={(e) => handleSetupChange("country", e.target.value)}
                  className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#2251FF] font-sans"
                >
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Industry Classification
                </label>
                <select
                  value={setup.industry}
                  onChange={(e) => handleSetupChange("industry", e.target.value)}
                  className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#2251FF] font-sans"
                >
                  <option value="Beauty">Beauty</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Target Engagement Rate (ER)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={setup.targetER}
                    onChange={(e) => handleSetupChange("targetER", parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#2251FF] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[#888888] text-xs font-semibold font-mono">/ ratio</span>
                </div>
                <span className="text-[10px] text-[#888888] font-mono mt-1 block">
                  Equivalent to {(setup.targetER * 100).toFixed(2)}% ER
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Target Click-Through Rate (CTR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    max="1"
                    value={setup.targetCTR}
                    onChange={(e) => handleSetupChange("targetCTR", parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#2251FF] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[#888888] text-xs font-semibold font-mono">/ ratio</span>
                </div>
                <span className="text-[10px] text-[#888888] font-mono mt-1 block">
                  Equivalent to {(setup.targetCTR * 100).toFixed(2)}% CTR
                </span>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#888888] font-mono uppercase tracking-wider mb-2">
                  Maximum Cost per Acquisition Threshold (€ Target CPA)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-[#051C2C] text-xs font-semibold font-sans">€</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={setup.targetCPA}
                    onChange={(e) => handleSetupChange("targetCPA", parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:border-[#2251FF] font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BENCHMARK LIBRARY TABLE */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center border-b border-[#E8E8E6] pb-3 mb-6">
              <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2251FF]" />
                Standard Benchmarks Library
              </h3>
              <button
                onClick={addBenchmark}
                className="flex items-center gap-1 bg-[#2251FF] hover:bg-[#2251FF]/90 text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer font-sans"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E8E6]">
                    <th className="table-head-uppercase pb-3 pl-2">Market</th>
                    <th className="table-head-uppercase pb-3">Industry</th>
                    <th className="table-head-uppercase pb-3 text-right">Bench CTR</th>
                    <th className="table-head-uppercase pb-3 text-right">Bench ER</th>
                    <th className="table-head-uppercase pb-3 text-right">CPM (€)</th>
                    <th className="table-head-uppercase pb-3 text-right">VTR (%)</th>
                    <th className="table-head-uppercase pb-3 text-right">CPF (€)</th>
                    <th className="table-head-uppercase pb-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]/40">
                  {benchmarks.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F5F5F2]/40 transition-colors">
                      <td className="py-2 pl-2">
                        <input
                          type="text"
                          value={b.country}
                          onChange={(e) => handleBenchmarkChange(b.id, "country", e.target.value)}
                          className="w-20 text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-semibold"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={b.industry}
                          onChange={(e) => handleBenchmarkChange(b.id, "industry", e.target.value)}
                          className="w-24 text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-semibold"
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          step="0.001"
                          value={b.ctr}
                          onChange={(e) => handleBenchmarkChange(b.id, "ctr", parseFloat(e.target.value) || 0)}
                          className="w-16 text-right text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-mono"
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          step="0.01"
                          value={b.er}
                          onChange={(e) => handleBenchmarkChange(b.id, "er", parseFloat(e.target.value) || 0)}
                          className="w-16 text-right text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-mono"
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          step="0.1"
                          value={b.cpm}
                          onChange={(e) => handleBenchmarkChange(b.id, "cpm", parseFloat(e.target.value) || 0)}
                          className="w-16 text-right text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-mono"
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          step="0.01"
                          value={b.vtr}
                          onChange={(e) => handleBenchmarkChange(b.id, "vtr", parseFloat(e.target.value) || 0)}
                          className="w-16 text-right text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-mono"
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          step="0.1"
                          value={b.cpf}
                          onChange={(e) => handleBenchmarkChange(b.id, "cpf", parseFloat(e.target.value) || 0)}
                          className="w-16 text-right text-xs bg-[#FFFDE7] border border-[#E8E8E6]/60 rounded px-1.5 py-1 text-[#051C2C] font-mono"
                        />
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => deleteBenchmark(b.id)}
                          className="p-1 text-[#D32F2F] hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right column (1/3 width) - Historical Config + SaaS Utilities */}
        <div className="space-y-8">
          
          {/* SAAS DATA MANAGER */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2251FF]" />
              Backup & Database Controls
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              Download current operational dataset backups or upload an agency standard profile configuration.
            </p>

            <div className="space-y-4">
              <button
                onClick={onExport}
                className="w-full flex items-center justify-between text-left px-4 py-3 bg-[#F5F5F2] hover:bg-[#2251FF]/10 text-[#051C2C] hover:text-[#2251FF] rounded-xl transition-all font-medium text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4" />
                  <div>
                    <span className="block font-semibold">Download Backup JSON</span>
                    <span className="text-[10px] text-[#888888] font-normal font-mono">Full spreadsheet replica state</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => fileInputRef2.current?.click()}
                className="w-full flex items-center justify-between text-left px-4 py-3 bg-[#F5F5F2] hover:bg-[#2251FF]/10 text-[#051C2C] hover:text-[#2251FF] rounded-xl transition-all font-medium text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4" />
                  <div>
                    <span className="block font-semibold">Restore Backup JSON</span>
                    <span className="text-[10px] text-[#888888] font-normal font-mono">Upload database blueprint file</span>
                  </div>
                </div>
              </button>
              <input
                type="file"
                ref={fileInputRef2}
                onChange={onImport}
                accept=".json"
                className="hidden"
              />

              <button
                onClick={onReset}
                className="w-full flex items-center justify-between text-left px-4 py-3 bg-red-50 hover:bg-red-100 text-[#D32F2F] rounded-xl transition-all font-medium text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4" />
                  <div>
                    <span className="block font-semibold text-red-700">Hard Reset Workspace</span>
                    <span className="text-[10px] text-red-500 font-normal font-mono">Restore original beauty seed records</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* HISTORICAL TRENDS DATA */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center border-b border-[#E8E8E6] pb-3 mb-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2251FF]" />
                Trend Engine Inputs (History)
              </h3>
              <button
                onClick={addHistoryMonth}
                className="p-1 text-[#2251FF] hover:bg-[#2251FF]/10 rounded transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-[#888888] mb-4">
              Manage preceding months' totals used by the Trend Engine to generate MoM comparisons and 3-month moving averages.
            </p>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {history.map((h, idx) => (
                <div key={idx} className="p-3 border border-[#E8E8E6] rounded-lg space-y-2.5 bg-[#F5F5F2]/40 relative">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={h.month}
                      onChange={(e) => handleHistoryChange(idx, "month", e.target.value)}
                      className="text-xs font-mono font-bold text-[#051C2C] bg-white border border-[#E8E8E6] rounded px-1 w-20"
                    />
                    <button
                      onClick={() => deleteHistoryMonth(idx)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#888888]">
                    <div>
                      <span>Views (Org):</span>
                      <input
                        type="number"
                        value={h.organicViews}
                        onChange={(e) => handleHistoryChange(idx, "organicViews", parseInt(e.target.value) || 0)}
                        className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                      />
                    </div>
                    <div>
                      <span>Spend (€):</span>
                      <input
                        type="number"
                        value={h.paidSpend}
                        onChange={(e) => handleHistoryChange(idx, "paidSpend", parseInt(e.target.value) || 0)}
                        className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                      />
                    </div>
                    <div>
                      <span>Followers:</span>
                      <input
                        type="number"
                        value={h.totalFollowersGained}
                        onChange={(e) => handleHistoryChange(idx, "totalFollowersGained", parseInt(e.target.value) || 0)}
                        className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                      />
                    </div>
                    <div>
                      <span>Revenue (€):</span>
                      <input
                        type="number"
                        value={h.totalRevenue}
                        onChange={(e) => handleHistoryChange(idx, "totalRevenue", parseInt(e.target.value) || 0)}
                        className="w-full text-xs font-semibold text-[#051C2C] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

