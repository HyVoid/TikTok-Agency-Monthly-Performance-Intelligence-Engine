import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ExecutiveDashboard from "./components/ExecutiveDashboard";
import SetupBenchmarks from "./components/SetupBenchmarks";
import OrganicData from "./components/OrganicData";
import PaidData from "./components/PaidData";
import AttributionTrend from "./components/AttributionTrend";
import StrategyInsights from "./components/StrategyInsights";
import { INITIAL_DATA } from "./initialData";
import { EngineDataState } from "./types";

const LOCAL_STORAGE_KEY = "tiktok_performance_engine_state_v1";

export default function App() {
  const [state, setState] = useState<EngineDataState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.setup && parsed.organicVideos && parsed.paidCampaigns) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using initial dataset.", e);
    }
    return INITIAL_DATA;
  });

  const [currentTab, setCurrentTab] = useState<string>("dashboard");

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      const stateToSave = {
        ...state,
        lastSaved: new Date().toLocaleTimeString("en-US", { hour12: false })
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      
      // Update state with saved timestamp ONLY if it differs to prevent infinite render loops
      if (stateToSave.lastSaved !== state.lastSaved) {
        setState(prev => ({
          ...prev,
          lastSaved: stateToSave.lastSaved
        }));
      }
    } catch (e) {
      console.error("Could not write state to localStorage.", e);
    }
  }, [state.setup, state.organicVideos, state.paidCampaigns, state.benchmarks, state.history]);

  // Export database profile
  const handleExportBackup = () => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${state.setup.clientName.replace(/[^a-z0-9]/gi, '_')}_Tiktok_Intelligence_Backup.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (err) {
      alert("Failed to export backup profile. Check permissions.");
    }
  };

  // Import database profile
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.setup && parsed.organicVideos && parsed.paidCampaigns) {
          setState({
            ...parsed,
            lastSaved: new Date().toLocaleTimeString("en-US", { hour12: false })
          });
          alert("SaaS Intelligence Backup restored successfully!");
        } else {
          alert("Failed to import. File does not match the engine schema configuration.");
        }
      } catch (err) {
        alert("Invalid JSON data format. Import halted.");
      }
    };
    fileReader.readAsText(files[0]);
  };

  // Reset standard seed data
  const handleResetData = () => {
    const confirmed = window.confirm("Are you sure you want to restore the default Germany Beauty seed records? This will overwrite current custom changes.");
    if (confirmed) {
      setState({
        ...INITIAL_DATA,
        lastSaved: new Date().toLocaleTimeString("en-US", { hour12: false })
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      alert("Database reset completed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#1A1A2E] flex flex-col font-sans">
      {/* Sticky Top Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lastSaved={state.lastSaved}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        onReset={handleResetData}
        clientName={state.setup.clientName}
      />

      {/* Primary Page Canvas (Centering 1400px width with 40px margins) */}
      <main className="w-full max-w-[1400px] mx-auto px-10 py-10 flex-grow">
        {currentTab === "dashboard" && (
          <ExecutiveDashboard
            setup={state.setup}
            organicVideos={state.organicVideos}
            paidCampaigns={state.paidCampaigns}
            benchmarks={state.benchmarks}
            history={state.history}
          />
        )}

        {currentTab === "setup" && (
          <SetupBenchmarks
            setup={state.setup}
            setSetup={(setup) => setState({ ...state, setup })}
            benchmarks={state.benchmarks}
            setBenchmarks={(benchmarks) => setState({ ...state, benchmarks })}
            history={state.history}
            setHistory={(history) => setState({ ...state, history })}
            onExport={handleExportBackup}
            onImport={handleImportBackup}
            onReset={handleResetData}
          />
        )}

        {currentTab === "organic" && (
          <OrganicData
            videos={state.organicVideos}
            setVideos={(organicVideos) => setState({ ...state, organicVideos })}
            targetER={state.setup.targetER}
          />
        )}

        {currentTab === "paid" && (
          <PaidData
            campaigns={state.paidCampaigns}
            setCampaigns={(paidCampaigns) => setState({ ...state, paidCampaigns })}
            targetCTR={state.setup.targetCTR}
            targetCPA={state.setup.targetCPA}
          />
        )}

        {currentTab === "attribution" && (
          <AttributionTrend
            organicVideos={state.organicVideos}
            paidCampaigns={state.paidCampaigns}
            history={state.history}
          />
        )}

        {currentTab === "strategy" && (
          <StrategyInsights
            setup={state.setup}
            organicVideos={state.organicVideos}
            paidCampaigns={state.paidCampaigns}
            benchmarks={state.benchmarks}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-[#E8E8E6] bg-white py-4 text-center text-xs text-[#888888] font-mono uppercase tracking-widest">
        TikTok Agency Performance Intelligence Operating System &copy; 2026
      </footer>
    </div>
  );
}
