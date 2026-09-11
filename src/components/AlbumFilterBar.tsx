import React from 'react';
import { Album } from '../types';
import { Layers, X, Tag } from 'lucide-react';

interface AlbumFilterBarProps {
  albums: Album[];
  activeAlbumId: string;
  onSelectAlbum: (albumId: string) => void;
  getAlbumPhotoCount: (albumId: string) => number;
  selectedTag: string | null;
  onClearTag: () => void;
}

export const AlbumFilterBar: React.FC<AlbumFilterBarProps> = ({
  albums,
  activeAlbumId,
  onSelectAlbum,
  getAlbumPhotoCount,
  selectedTag,
  onClearTag,
}) => {
  return (
    <div id="album-filter-bar" className="py-4 border-b border-neutral-200/80 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Albums
            </span>
            {albums.map((album) => {
              const isActive = activeAlbumId === album.id;
              const count = getAlbumPhotoCount(album.id);

              return (
                <button
                  key={album.id}
                  id={`album-tab-${album.id}`}
                  onClick={() => onSelectAlbum(album.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span>{album.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tag Filter Indicator if selected */}
          {selectedTag && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shrink-0 animate-fadeIn">
              <Tag className="w-3 h-3 text-blue-600" />
              <span>Tag: #{selectedTag}</span>
              <button
                id="clear-selected-tag-btn"
                onClick={onClearTag}
                className="hover:bg-blue-200/60 p-0.5 rounded-full text-blue-700"
                title="Remove tag filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
