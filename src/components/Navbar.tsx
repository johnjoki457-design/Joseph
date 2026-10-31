import React from 'react';
import { 
  Fish, 
  PlusCircle, 
  Calculator, 
  BookOpen, 
  Bookmark, 
  Search, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  onOpenCalculator: () => void;
  onOpenGuide: () => void;
  savedCount: number;
  showOnlySaved: boolean;
  onToggleShowSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onOpenCalculator,
  onOpenGuide,
  savedCount,
  showOnlySaved,
  onToggleShowSaved,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Fish className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  Murrel Fish
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Videos Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Korrameenu &bull; Snakehead &bull; Aquaculture &bull; Recipes
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search videos (e.g., fingerlings, biofloc, feeding, breeding)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all placeholder:text-slate-400 text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Farm Calculator */}
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer"
              title="Aquaculture yield and revenue calculator"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Farm Calculator</span>
            </button>

            {/* Species & Care Guide */}
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer"
              title="Murrel biological and farming guide"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Care Guide</span>
            </button>

            {/* Bookmarks / Favorites Toggle */}
            <button
              onClick={onToggleShowSaved}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                showOnlySaved
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/80 border-slate-200'
              }`}
              title="Filter bookmarked videos"
            >
              <Bookmark className={`w-4 h-4 ${showOnlySaved ? 'fill-white' : 'text-amber-500'}`} />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                  showOnlySaved ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {savedCount}
                </span>
              )}
            </button>

            {/* Add Video Button */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-700/25 transition-all cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Video</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Murrel videos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-800"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
