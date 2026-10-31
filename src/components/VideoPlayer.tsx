import React, { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  Check, 
  Sparkles, 
  Play, 
  Info, 
  Eye, 
  Clock, 
  Tag, 
  Volume2
} from 'lucide-react';
import { MurrelVideo } from '../types';
import { getYouTubeEmbedUrl } from '../utils/youtube';

interface VideoPlayerProps {
  video: MurrelVideo;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isSaved,
  onToggleSave,
  isCinemaMode,
  onToggleCinemaMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(video.id, autoplay);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(youtubeWatchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="transition-all duration-300">
      <div className={`mx-auto ${isCinemaMode ? 'max-w-full px-2 sm:px-6' : 'max-w-5xl'}`}>
        
        {/* Header title as requested by user ("Our Murrel Fish Videos") */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                Featured Video
              </span>
              <span className="text-xs font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full capitalize">
                {video.category}
              </span>
              {video.id === 's3YFytpSuFQ' && (
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-600" /> Farm Official
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              {video.title}
            </h1>
          </div>

          {/* Quick Player Bar */}
          <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
            {/* Cinema mode toggle */}
            <button
              onClick={onToggleCinemaMode}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-colors cursor-pointer"
              title={isCinemaMode ? 'Exit cinema mode' : 'Theater / Cinema mode'}
            >
              {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(video.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50 border-slate-200'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save video'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            {/* Share / Copy link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-colors cursor-pointer relative"
              title="Copy video link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>

            {/* Watch on YouTube */}
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-700 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 transition-colors"
              title="Open directly on YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">YouTube</span>
            </a>
          </div>
        </div>

        {/* Video Screen Frame */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 shadow-2xl ring-1 ring-slate-900/10 aspect-video">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Controls & Context Ribbon */}
        <div className="mt-4 p-4 sm:p-5 bg-white rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-800 text-sm">
                {video.author}
              </span>
              {video.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {video.duration}
                </span>
              )}
              {video.views && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" /> {video.views} views
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={(e) => setAutoplay(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Auto-play on select</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {video.description}
          </p>

          {/* Key Farming / Breeding Takeaways */}
          {video.keyTakeaways && video.keyTakeaways.length > 0 && (
            <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Key Aquaculture Insights & Tips:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-emerald-950">
                {video.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {video.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
