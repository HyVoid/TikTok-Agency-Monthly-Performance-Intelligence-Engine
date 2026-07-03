import React, { useRef } from "react";
import { Download, Upload, RotateCcw, CloudLightning, Database } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lastSaved: string;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  clientName: string;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  lastSaved,
  onExport,
  onImport,
  onReset,
  clientName
}: NavbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "dashboard", label: "Executive Dashboard" },
    { id: "setup", label: "Setup & Library" },
    { id: "organic", label: "Organic Raw Data" },
    { id: "paid", label: "Paid Raw Data" },
    { id: "attribution", label: "Attribution & Trend" },
    { id: "strategy", label: "Strategy & Insights" }
  ];

  return (
    <header 
      id="app-header"
      className="sticky top-0 z-50 h-[56px] w-full bg-white border-b border-[#E8E8E6] shadow-[0_1px_3px_rgba(5,28,44,0.06)]"
    >
      <div className="max-w-[1400px] h-full mx-auto px-10 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#051C2C] p-1.5 rounded-lg flex items-center justify-center text-[#2251FF]">
            <CloudLightning className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif-heading text-lg font-bold text-[#051C2C] tracking-tight leading-none">
              TikTok Monthly Performance
            </h1>
            <p className="text-[10px] text-[#888888] font-mono tracking-wider uppercase">
              Intelligence Engine • {clientName || "Agency Client"}
            </p>
          </div>
        </div>

        {/* Middle: Tab items */}
        <nav className="hidden lg:flex items-center h-full space-x-6">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setCurrentTab(tab.id)}
                className={`h-full px-2 text-[13px] font-medium relative flex items-center transition-all duration-150 cursor-pointer ${
                  isActive 
                    ? "text-[#2251FF] font-semibold" 
                    : "text-[#051C2C]/75 hover:text-[#2251FF]"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2251FF] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sync Status and Utility Buttons */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end text-right hidden sm:flex">
            <span className="text-[11px] text-[#888888] flex items-center gap-1 font-mono uppercase">
              <Database className="w-3 h-3 text-[#2251FF]" />
              Auto-saved
            </span>
            <span className="text-[11px] font-medium text-[#051C2C] font-mono">
              Last saved: {lastSaved}
            </span>
          </div>

          <div className="flex items-center space-x-2 border-l border-[#E8E8E6] pl-4">
            {/* Export Backup */}
            <button
              onClick={onExport}
              title="Export Backup JSON"
              className="p-1.5 text-[#051C2C] hover:text-[#2251FF] bg-[#F5F5F2] hover:bg-[#2251FF]/10 rounded-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Import Backup */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Backup JSON"
              className="p-1.5 text-[#051C2C] hover:text-[#2251FF] bg-[#F5F5F2] hover:bg-[#2251FF]/10 rounded-md transition-all active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImport}
              accept=".json"
              className="hidden"
            />

            {/* Reset Data */}
            <button
              onClick={onReset}
              title="Reset Default Seed Data"
              className="p-1.5 text-[#D32F2F] hover:text-white hover:bg-[#D32F2F] bg-[#D32F2F]/10 rounded-md transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Select Dropdown */}
      <div className="lg:hidden w-full bg-white px-4 py-1.5 border-b border-[#E8E8E6] flex items-center justify-between">
        <label htmlFor="mobile-tab-select" className="text-xs font-mono text-[#888888] uppercase">Navigate Worksheets:</label>
        <select
          id="mobile-tab-select"
          value={currentTab}
          onChange={(e) => setCurrentTab(e.target.value)}
          className="text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded px-2 py-1 text-[#051C2C] font-semibold focus:outline-none"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
