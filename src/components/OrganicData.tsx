import React, { useState } from "react";
import { Plus, Trash2, Eye, Award, Share2, Hourglass, Sparkles } from "lucide-react";
import { OrganicVideo } from "../types";

interface OrganicDataProps {
  videos: OrganicVideo[];
  setVideos: (videos: OrganicVideo[]) => void;
  targetER: number;
}

export default function OrganicData({ videos, setVideos, targetER }: OrganicDataProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleFieldChange = (id: string, field: keyof OrganicVideo, value: any) => {
    setVideos(
      videos.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            [field]: value
          };
        }
        return v;
      })
    );
  };

  const addVideo = () => {
    const nextNum = videos.length + 1;
    const newVideo: OrganicVideo = {
      id: `org-${Date.now()}`,
      publishDate: new Date().toISOString().split("T")[0],
      videoId: `v_${Math.floor(10000000 + Math.random() * 90000000)}`,
      contentTitle: `Organic Video #${nextNum} Topic Variant`,
      views: 100000,
      reach: 90000,
      likes: 5000,
      comments: 300,
      shares: 400,
      followersGained: 1000,
      watchTime: 300000
    };
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  // Find max values for normalization of data-bars
  const maxViews = Math.max(...videos.map((v) => v.views), 1);
  const maxFollowers = Math.max(...videos.map((v) => v.followersGained), 1);
  const maxReach = Math.max(...videos.map((v) => v.reach), 1);

  return (
    <div className="animate-fade-up space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-heading text-4xl font-bold text-[#051C2C] tracking-tight mb-2">
            Raw Organic Video Performance
          </h2>
          <p className="text-[#888888] font-mono uppercase text-xs tracking-wider">
            Sheet 2 &bull; Direct TikTok organic content analytics and exposure statistics.
          </p>
        </div>
        <button
          onClick={addVideo}
          className="self-start sm:self-center flex items-center gap-1.5 bg-[#2251FF] hover:bg-[#2251FF]/90 text-white font-medium text-xs px-4 py-2.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4" />
          Import/Add Video
        </button>
      </div>

      {/* RAW ORGANIC DATA TABLE */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
        <h3 className="font-serif-heading text-lg font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-3 mb-6">
          Organic Database Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E6] bg-[#051C2C]/[0.02]">
                <th className="table-head-uppercase py-3 pl-3">Publish Date</th>
                <th className="table-head-uppercase py-3">Video ID</th>
                <th className="table-head-uppercase py-3 min-w-[200px]">Content Title / Topic Angle</th>
                <th className="table-head-uppercase py-3 text-right">Views</th>
                <th className="table-head-uppercase py-3 text-right">Reach</th>
                <th className="table-head-uppercase py-3 text-right">Gained Followers</th>
                <th className="table-head-uppercase py-3 text-right">ER (%)</th>
                <th className="table-head-uppercase py-3 text-right">Watch / View</th>
                <th className="table-head-uppercase py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]/40 text-xs">
              {videos.map((video) => {
                const er = video.views > 0 ? (video.likes + video.comments + video.shares) / video.views : 0;
                const wtPerView = video.views > 0 ? video.watchTime / video.views : 0;
                const viewsPct = Math.min((video.views / maxViews) * 100, 100);
                const reachPct = Math.min((video.reach / maxReach) * 100, 100);
                const followersPct = Math.min((video.followersGained / maxFollowers) * 100, 100);
                
                return (
                  <tr key={video.id} className="hover:bg-[#F5F5F2]/40 transition-colors">
                    {/* Publish Date */}
                    <td className="py-3 pl-3">
                      <input
                        type="date"
                        value={video.publishDate}
                        onChange={(e) => handleFieldChange(video.id, "publishDate", e.target.value)}
                        className="text-xs bg-[#FFFDE7] border border-[#E8E8E6] rounded px-2 py-1 text-[#051C2C] font-semibold w-28 focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>

                    {/* Video ID */}
                    <td className="py-3">
                      <input
                        type="text"
                        value={video.videoId}
                        onChange={(e) => handleFieldChange(video.id, "videoId", e.target.value)}
                        className="text-xs bg-[#FFFDE7] border border-[#E8E8E6] rounded px-2 py-1 text-[#051C2C] font-mono w-24 focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>

                    {/* Title */}
                    <td className="py-3">
                      <input
                        type="text"
                        value={video.contentTitle}
                        onChange={(e) => handleFieldChange(video.id, "contentTitle", e.target.value)}
                        className="text-xs bg-[#FFFDE7] border border-[#E8E8E6] rounded px-2 py-1 text-[#051C2C] font-sans font-medium w-full max-w-[280px] focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>

                    {/* Views (with Inline Data Bar) */}
                    <td className="py-3 text-right pr-4">
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          value={video.views}
                          onChange={(e) => handleFieldChange(video.id, "views", parseInt(e.target.value) || 0)}
                          className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-20 focus:outline-none"
                        />
                        {/* Data Bar Track is 10% opacity primary (#051C2C), Fill is accent (#2251FF) */}
                        <div className="w-20 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${viewsPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Reach (with Inline Data Bar) */}
                    <td className="py-3 text-right pr-4">
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          value={video.reach}
                          onChange={(e) => handleFieldChange(video.id, "reach", parseInt(e.target.value) || 0)}
                          className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-20 focus:outline-none"
                        />
                        <div className="w-20 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${reachPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Followers Gained */}
                    <td className="py-3 text-right pr-4">
                      <div className="flex flex-col items-end">
                        <input
                          type="number"
                          value={video.followersGained}
                          onChange={(e) => handleFieldChange(video.id, "followersGained", parseInt(e.target.value) || 0)}
                          className="text-xs text-right bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] font-semibold font-mono w-16 focus:outline-none"
                        />
                        <div className="w-16 h-1 bg-[#051C2C]/10 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#2251FF] rounded-full transition-all duration-300" 
                            style={{ width: `${followersPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Calculated ER */}
                    <td className="py-3 text-right font-semibold font-mono pr-2">
                      <div className="flex flex-col items-end">
                        <span className={er >= targetER ? "text-[#2251FF]" : "text-[#051C2C]/80"}>
                          {(er * 100).toFixed(2)}%
                        </span>
                        <span className="text-[9px] text-[#888888] font-normal">
                          {((video.likes + video.comments + video.shares)).toLocaleString()} Eng
                        </span>
                      </div>
                    </td>

                    {/* Calculated Watch Time Per View */}
                    <td className="py-3 text-right font-mono pr-2">
                      <div className="flex flex-col items-end">
                        <span className="text-[#051C2C]">{wtPerView.toFixed(2)}s</span>
                        <span className="text-[9px] text-[#888888]">
                          {Math.round(video.watchTime / 60).toLocaleString()} min total
                        </span>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => deleteVideo(video.id)}
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

      {/* EXPOSURE MATRIX INTERACTIVE CARD TIER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1: Organic Reach Efficiency */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#2251FF]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Views-to-Reach Ratio</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            How effectively content breaches outside our immediate account followers into organic TikTok FYP recommendations.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Average Reach/Views:</span>
            <span className="text-[#2251FF] font-bold">
              {(videos.reduce((sum, v) => sum + v.reach, 0) / videos.reduce((sum, v) => sum + v.views, 1) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Metric Card 2: Virality Efficiency Index */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#051C2C]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#051C2C]/10 text-[#051C2C]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Follower Multiplier</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            How many new long-term followers are acquired for every 10,000 views generated across our brand organically.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Followers per 10k views:</span>
            <span className="text-[#051C2C] font-bold">
              {Math.round(videos.reduce((sum, v) => sum + v.followersGained, 0) / videos.reduce((sum, v) => sum + v.views, 1) * 10000)}
            </span>
          </div>
        </div>

        {/* Metric Card 3: Watch Time Depth */}
        <div className="bg-white p-6 rounded-xl shadow-md matrix-cell-hover cursor-pointer border-l-4 border-[#2251FF]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
              <Hourglass className="w-5 h-5" />
            </div>
            <h4 className="font-serif-heading text-base font-bold text-[#051C2C]">Watch Retention Index</h4>
          </div>
          <p className="text-[#888888] text-xs leading-relaxed mb-4">
            A critical indicator of the video's early hook speed. Higher retention signals that TikTok's algorithm will keep boosting views.
          </p>
          <div className="flex justify-between items-baseline font-mono text-xs border-t border-[#E8E8E6] pt-3">
            <span className="text-[#888888]">Avg. Watch Time:</span>
            <span className="text-[#2251FF] font-bold">
              {(videos.reduce((sum, v) => sum + v.watchTime, 0) / videos.reduce((sum, v) => sum + v.views, 1)).toFixed(2)}s
            </span>
          </div>
        </div>

      </div>

      {/* QUICK LOG DETAILS DRAWER */}
      <div className="bg-[#051C2C]/[0.04] p-5 rounded-xl border-l-3 border-[#2251FF] text-xs text-[#051C2C] flex items-center justify-between">
        <div className="space-y-1">
          <strong className="text-sm block">How to edit this worksheet?</strong>
          <span className="text-[#888888] block">All cells with a yellow tint can be edited directly. Changes propagate immediately to all dashboards and calculations. Click "Import/Add Video" above to append a new video record automatically with seeded baseline data.</span>
        </div>
        <div className="hidden md:flex p-2 bg-white rounded-lg font-mono text-[11px] font-bold shadow-sm items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2251FF]" />
          Algorithm: FYP Activated
        </div>
      </div>

    </div>
  );
}
