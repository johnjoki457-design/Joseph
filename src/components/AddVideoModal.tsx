import React, { useState, useEffect } from 'react';
import { X, Plus, AlertCircle, CheckCircle2, Film } from 'lucide-react';
import { MurrelVideo, VideoCategory } from '../types';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: MurrelVideo) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MurrelVideo['category']>('farming');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  const detectedId = extractYouTubeId(urlInput);
  const previewThumbnail = detectedId ? getYouTubeThumbnail(detectedId, 'hq') : null;

  useEffect(() => {
    if (!isOpen) {
      setUrlInput('');
      setTitle('');
      setAuthor('');
      setDescription('');
      setCategory('farming');
      setTagsInput('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detectedId) {
      setError('Please provide a valid YouTube link or 11-character video ID.');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a title for the video.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newVideo: MurrelVideo = {
      id: detectedId,
      title: title.trim(),
      description: description.trim() || 'Murrel fish video added to our aquaculture channel.',
      category,
      author: author.trim() || 'Community Contributor',
      publishedDate: 'Just now',
      duration: 'Custom',
      views: '1',
      tags: tags.length > 0 ? tags : ['Murrel Farm', 'Aquaculture'],
      isCustom: true,
      keyTakeaways: [
        'Added to collection from ' + (author.trim() || 'channel'),
        'Ensure tank water quality and feeding schedule match growth stage'
      ]
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add Murrel Video</h2>
              <p className="text-xs text-slate-500">Paste your YouTube video or short URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* YouTube Link Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              YouTube URL or Video ID *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. https://youtu.be/s3YFytpSuFQ or s3YFytpSuFQ"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900"
            />
          </div>

          {/* Live Thumbnail Preview */}
          {detectedId && previewThumbnail && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <img
                src={previewThumbnail}
                alt="Video preview"
                className="w-24 aspect-video object-cover rounded-lg shadow-xs"
              />
              <div className="text-xs">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Video ID detected:
                </span>
                <code className="text-slate-600 bg-slate-200/60 px-1 py-0.5 rounded font-mono text-[11px] block mt-0.5">
                  {detectedId}
                </code>
              </div>
            </div>
          )}

          {/* Video Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Video Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Murrel Fingerling Grading and Size Segregation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900"
            />
          </div>

          {/* Channel / Author & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Channel / Author
              </label>
              <input
                type="text"
                placeholder="e.g. AquaFarmer Joe"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MurrelVideo['category'])}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900 capitalize cursor-pointer"
              >
                <option value="farming">Farming & Tanks</option>
                <option value="feeding">Feeding & Nutrition</option>
                <option value="breeding">Breeding & Hatchery</option>
                <option value="harvest">Harvest & Market</option>
                <option value="cooking">Cooking & Recipes</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="What does this video show? (e.g., fingerlings feeding, cement tank aeration...)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900 resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Nursery, Biofloc, Live Feed, Cement Tank"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all text-slate-900"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Video Hub</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
