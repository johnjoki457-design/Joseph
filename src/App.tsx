import React, { useState, useEffect, useMemo } from 'react';
import { 
  Fish, 
  Sparkles, 
  Bookmark, 
  Filter, 
  Plus, 
  Calculator, 
  BookOpen, 
  Wind, 
  HeartPulse, 
  TrendingUp, 
  ShieldCheck, 
  Play, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { MurrelVideo, VideoCategory } from './types';
import { INITIAL_VIDEOS, MURREL_FACTS } from './data/initialVideos';
import { Navbar } from './components/Navbar';
import { VideoPlayer } from './components/VideoPlayer';
import { VideoCard } from './components/VideoCard';
import { AddVideoModal } from './components/AddVideoModal';
import { FarmCalculator } from './components/FarmCalculator';
import { SpeciesGuideModal } from './components/SpeciesGuideModal';

const STORAGE_KEY_CUSTOM = 'murrel_custom_videos_v1';
const STORAGE_KEY_SAVED = 'murrel_saved_videos_v1';

export default function App() {
  // Load custom videos from localStorage
  const [customVideos, setCustomVideos] = useState<MurrelVideo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // All combined videos
  const allVideos = useMemo(() => {
    return [...customVideos, ...INITIAL_VIDEOS];
  }, [customVideos]);

  // Active playing video (defaults to user's video: s3YFytpSuFQ)
  const [activeVideo, setActiveVideo] = useState<MurrelVideo>(() => {
    const userFeatured = INITIAL_VIDEOS.find((v) => v.id === 's3YFytpSuFQ');
    return userFeatured || INITIAL_VIDEOS[0];
  });

  // Bookmarks / Saved video IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Sync custom videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customVideos));
    } catch (e) {
      console.error(e);
    }
  }, [customVideos]);

  const handleToggleSave = (videoId: string) => {
    setSavedIds((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  const handleAddVideo = (newVideo: MurrelVideo) => {
    setCustomVideos((prev) => [newVideo, ...prev]);
    setActiveVideo(newVideo);
  };

  const handleDeleteCustom = (videoId: string) => {
    setCustomVideos((prev) => prev.filter((v) => v.id !== videoId));
    if (activeVideo.id === videoId) {
      setActiveVideo(INITIAL_VIDEOS[0]);
    }
  };

  const handleSelectVideo = (video: MurrelVideo) => {
    setActiveVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter logic
  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      // Category filter
      if (activeCategory !== 'all' && video.category !== activeCategory) {
        return false;
      }
      // Saved filter
      if (showOnlySaved && !savedIds.includes(video.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = video.title.toLowerCase().includes(query);
        const matchesDesc = video.description.toLowerCase().includes(query);
        const matchesAuthor = video.author.toLowerCase().includes(query);
        const matchesTag = video.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesAuthor || matchesTag;
      }
      return true;
    });
  }, [allVideos, activeCategory, showOnlySaved, savedIds, searchQuery]);

  // Categories config
  const categories: { id: VideoCategory; label: string }[] = [
    { id: 'all', label: 'All Videos' },
    { id: 'farming', label: 'Farming & Tanks' },
    { id: 'feeding', label: 'Feeding & Nutrition' },
    { id: 'breeding', label: 'Breeding & Hatchery' },
    { id: 'harvest', label: 'Harvest & Economics' },
    { id: 'cooking', label: 'Cooking & Health' },
  ];

  const factIcons: Record<string, React.ReactNode> = {
    Wind: <Wind className="w-5 h-5 text-emerald-600" />,
    HeartPulse: <HeartPulse className="w-5 h-5 text-rose-500" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-amber-500" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-teal-600" />,
  };

  return (
    <div className="min-h-screen bg-[#f0f8f0] text-slate-900 font-sans antialiased flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        savedCount={savedIds.length}
        showOnlySaved={showOnlySaved}
        onToggleShowSaved={() => setShowOnlySaved((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Featured Video Player Showcase */}
        <VideoPlayer
          video={activeVideo}
          isSaved={savedIds.includes(activeVideo.id)}
          onToggleSave={handleToggleSave}
          isCinemaMode={isCinemaMode}
          onToggleCinemaMode={() => setIsCinemaMode((prev) => !prev)}
        />

        {/* Quick Biological & Market Highlights */}
        {!isCinemaMode && (
          <section className="bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                  Murrel (Snakehead / Korrameenu) Species Quick Facts
                </h2>
              </div>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Aquaculture Guide</span> &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {MURREL_FACTS.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {factIcons[fact.icon]}
                    <h3 className="font-bold text-xs text-slate-800">{fact.title}</h3>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Library & Filter Section */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Explore Murrel Videos</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Watch seed stocking, cement tank farming, feeding techniques, and recipes
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const count = allVideos.filter(
                  (v) => cat.id === 'all' || v.category === cat.id
                ).length;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((vid) => (
                <VideoCard
                  key={vid.id}
                  video={vid}
                  isActive={activeVideo.id === vid.id}
                  isSaved={savedIds.includes(vid.id)}
                  onSelect={handleSelectVideo}
                  onToggleSave={handleToggleSave}
                  onDeleteCustom={vid.isCustom ? handleDeleteCustom : undefined}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
                <Fish className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No videos found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {showOnlySaved
                  ? "You haven't bookmarked any videos yet. Click the bookmark icon on any video to save it here."
                  : searchQuery
                  ? `No video matches "${searchQuery}". Try searching for fingerlings, breeding, or tanks.`
                  : 'No videos found in this category.'}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                {(searchQuery || showOnlySaved || activeCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowOnlySaved(false);
                      setActiveCategory('all');
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add a Video
                </button>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-emerald-100/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Fish className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">Murrel Fish Videos</p>
                <p className="text-xs text-slate-500">
                  Dedicated knowledge base for Snakehead / Korrameenu / Viral fish farming
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="hover:text-emerald-700 font-medium cursor-pointer"
              >
                Profit Calculator
              </button>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="hover:text-emerald-700 font-medium cursor-pointer"
              >
                Care & Water Guide
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="hover:text-emerald-700 font-medium cursor-pointer"
              >
                Add YouTube Video
              </button>
              <a
                href="https://youtu.be/s3YFytpSuFQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Original Video Link
              </a>
            </div>

          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
            Murrel Fish Videos Portal &bull; High Density Tanks, Biofloc, Rearing, Breeding & Cooking
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={handleAddVideo}
      />

      <FarmCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <SpeciesGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

    </div>
  );
}
