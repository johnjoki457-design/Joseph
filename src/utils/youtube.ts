/**
 * Extracts YouTube Video ID from varied URL formats:
 * - https://youtu.be/s3YFytpSuFQ?si=aj5IhulCh5oNkjez
 * - https://www.youtube.com/watch?v=s3YFytpSuFQ
 * - https://www.youtube.com/embed/s3YFytpSuFQ
 * - https://www.youtube.com/shorts/s3YFytpSuFQ
 * - Raw 11-char ID: s3YFytpSuFQ
 */
export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already an 11-character alphanumeric/dash/underscore string
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex for youtube URL formats
  const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoId: string, quality: 'hq' | 'mq' | 'max' = 'hq'): string {
  if (!videoId) return '';
  if (quality === 'max') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  if (quality === 'mq') {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
    origin: typeof window !== 'undefined' ? window.location.origin : '',
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
