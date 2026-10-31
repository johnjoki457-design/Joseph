import React, { useState } from 'react';
import { Play, Bookmark, Clock, Eye, Trash2, Check } from 'lucide-react';
import { MurrelVideo } from '../types';
import { getYouTubeThumbnail } from '../utils/youtube';

interface VideoCardProps {
  video: MurrelVideo;
  isActive: boolean;
  isSaved: boolean;
  onSelect: (video: MurrelVideo) => void;
  onToggleSave: (id: string) => void;
  onDeleteCustom?: (id: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  isSaved,
  onSelect,
  onToggleSave,
  onDeleteCustom,
}) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = getYouTubeThumbnail(video.id, 'hq');

  const categoryColorMap: Record<string, string> = {
    farming: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    feeding: 'bg-amber-100 text-amber-800 border-amber-200',
    breeding: 'bg-blue-100 text-blue-800 border-blue-200',
    harvest: 'bg-teal-100 text-teal-800 border-teal-200',
    cooking: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <div
      onClick={() => onSelect(video)}
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer ${
        isActive
          ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-md scale-[1.01]'
          : 'border-slate-200/80 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {!imgError ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-slate-900 text-emerald-100 p-4 text-center">
            <span className="text-xs font-medium">{video.title}</span>
          </div>
        )}

        {/* Hover Dark Overlay & Play Button */}
        <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 ${
            isActive
              ? 'bg-emerald-500 text-white shadow-lg scale-110'
              : 'bg-white/90 text-emerald-900 group-hover:scale-110 shadow-md'
          }`}>
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Category Pill */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border backdrop-blur-md shadow-xs ${categoryColorMap[video.category] || 'bg-slate-100 text-slate-800'}`}>
            {video.category}
          </span>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5">
            <span className="text-[11px] font-medium bg-slate-900/85 text-white px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>
        )}

        {/* Custom video indicator or delete */}
        {video.isCustom && onDeleteCustom && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCustom(video.id);
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-xs"
            title="Delete this custom video"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
              {video.title}
            </h3>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(video.id);
              }}
              className="p-1 text-slate-400 hover:text-amber-500 shrink-0 transition-colors cursor-pointer"
              title={isSaved ? 'Saved' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-700 truncate max-w-[130px]">
            {video.author}
          </span>
          {video.views && (
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3 h-3 text-slate-400" /> {video.views}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
