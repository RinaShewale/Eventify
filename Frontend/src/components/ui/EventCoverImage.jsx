import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { createEventCoverUrl } from '../../utils/eventCover';

export default function EventCoverImage({
  event,
  src,
  alt,
  className = '',
  imageClassName = '',
  onImageChange,
}) {
  const [imageSrc, setImageSrc] = useState(src || event?.cover || createEventCoverUrl(event || {}));
  const [failed, setFailed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const retryImage = async () => {
    if (retrying) return;
    setRetrying(true);
    setFailed(false);
    const nextSrc = createEventCoverUrl(event || {}, Date.now());
    setImageSrc(nextSrc);
    try {
      await onImageChange?.(nextSrc);
    } catch {
      setFailed(true);
    } finally {
      setRetrying(false);
    }
  };

  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-sand/30 p-4 text-center ${className}`}>
        <p className="text-xs text-burgundy/70">The image service refused this prompt or is temporarily rate-limited.</p>
        <button
          type="button"
          onClick={retryImage}
          disabled={retrying}
          className="inline-flex items-center gap-1.5 rounded-full border border-sand-dark bg-creme-50 px-3 py-1.5 text-[11px] font-medium text-burgundy disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${retrying ? 'animate-spin' : ''}`} />
          {retrying ? 'Retrying...' : 'Try another image'}
        </button>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt || event?.title || 'Event cover'}
      className={imageClassName || className}
      onError={() => setFailed(true)}
    />
  );
}
