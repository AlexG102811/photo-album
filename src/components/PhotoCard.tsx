import React, { useState } from 'react';
import { Photo } from '../types';
import { Heart, ImageOff } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  albumName?: string;
  isCompact?: boolean;
  onSelectPhoto: (photo: Photo) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectTag?: (tag: string, e: React.MouseEvent) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  albumName,
  onSelectPhoto,
  onToggleFavorite,
  onSelectTag,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      id={`photo-card-${photo.id}`}
      onClick={() => onSelectPhoto(photo)}
      className="group relative w-full aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 cursor-pointer select-none"
    >
      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-200/70 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-neutral-600 animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-neutral-400 bg-neutral-100 z-10">
          <ImageOff className="w-8 h-8 mb-1.5 stroke-[1.5]" />
          <span className="text-xs text-neutral-500 font-medium">Image unavailable</span>
        </div>
      ) : (
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Top Overlay: Album Tag & Favorite Button */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
        {albumName ? (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-md text-white/95 shadow-xs">
            {albumName}
          </span>
        ) : (
          <span />
        )}

        <button
          id={`favorite-btn-${photo.id}`}
          type="button"
          onClick={(e) => onToggleFavorite(photo.id, e)}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            photo.favorite
              ? 'bg-rose-500 text-white shadow-xs scale-100'
              : 'bg-black/40 text-white/90 hover:bg-black/65 hover:text-white opacity-85 group-hover:opacity-100'
          }`}
          title={photo.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${photo.favorite ? 'fill-white text-white' : ''}`} />
        </button>
      </div>

      {/* Title Overlay: Always clearly visible with equal dimensions */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-12 pb-3.5 px-4 flex flex-col justify-end text-white z-20">
        <h3 className="font-semibold text-white text-sm sm:text-base leading-snug truncate drop-shadow-xs group-hover:text-blue-200 transition-colors">
          {photo.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-neutral-300 mt-1">
          {photo.description ? (
            <span className="truncate max-w-[70%] opacity-90 text-[11px] sm:text-xs">
              {photo.description}
            </span>
          ) : (
            <span className="opacity-80 text-[11px]">{photo.date}</span>
          )}

          {photo.tags.length > 0 && (
            <button
              type="button"
              onClick={(e) => onSelectTag?.(photo.tags[0], e)}
              className="text-[10px] bg-white/20 hover:bg-white/30 backdrop-blur-xs px-2 py-0.5 rounded text-white font-medium shrink-0 transition-colors ml-2"
              title={`Filter by #${photo.tags[0]}`}
            >
              #{photo.tags[0]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
