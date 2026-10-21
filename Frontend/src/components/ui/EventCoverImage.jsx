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
  const fallbackSrc = createEventCoverUrl(event || {});
  const requestedSrc = src || event?.cover;
  const [imageSrc, setImageSrc] = useState(
    requestedSrc && !requestedSrc.includes('pollinations.ai') ? requestedSrc : fallbackSrc
  );
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
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#4A1521] via-[#7A3B45] to-[#D8B4A6] ${className}`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("${fallbackSrc}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <span className="max-w-[75%] truncate text-sm font-medium text-white drop-shadow">{event?.title || event?.type || 'Event'}</span>
          <button
            type="button"
            onClick={retryImage}
            disabled={retrying}
            aria-label="Try another event cover"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-black/20 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${retrying ? 'animate-spin' : ''}`} />
            {retrying ? 'Updating...' : 'Change cover'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt || event?.title || 'Event cover'}
      className={imageClassName || className}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
