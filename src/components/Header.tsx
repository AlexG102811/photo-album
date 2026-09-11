import React from 'react';
import { Search, Plus, Image as ImageIcon, Heart, ArrowUpDown, FolderPlus, X, Trash2, RotateCcw } from 'lucide-react';
import { SortOption, ViewMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: 'all' | 'favorites';
  onFilterToggle: () => void;
  favoritesCount: number;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenUpload: () => void;
  onOpenNewAlbum: () => void;
  onOpenWipeout: () => void;
  onRestoreSamples: () => void;
  totalPhotos: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterToggle,
  favoritesCount,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenUpload,
  onOpenNewAlbum,
  onOpenWipeout,
  onRestoreSamples,
  totalPhotos,
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-neutral-900 leading-tight">Photo Album</h1>
                <p className="text-xs text-neutral-500 font-medium">
                  {totalPhotos} {totalPhotos === 1 ? 'photo' : 'photos'} in library
                </p>
              </div>
            </div>

            {/* Mobile upload CTA button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="mobile-upload-btn"
                onClick={onOpenUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="photo-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search photos by title, tag, or description..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white text-neutral-900 placeholder-neutral-400 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions & Controls */}
          <div className="flex items-center flex-wrap gap-2 justify-end">
            
            {/* Favorites filter toggle */}
            <button
              id="filter-favorites-btn"
              onClick={onFilterToggle}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedFilter === 'favorites'
                  ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
              title="Show only favorites"
            >
              <Heart className={`w-4 h-4 ${selectedFilter === 'favorites' ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'}`} />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedFilter === 'favorites' ? 'bg-rose-200 text-rose-800' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="relative inline-flex items-center">
              <label htmlFor="sort-select" className="sr-only">Sort photos</label>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="pl-8 pr-7 py-2 text-sm bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer font-medium appearance-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>

            {/* View density selector */}
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-xl p-0.5 bg-neutral-50">
              <button
                id="view-mode-grid"
                onClick={() => onViewModeChange('grid')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-500 hover:text-neutral-800'
                }`}
                title="3×3 Equal Dimension Photo Gallery"
              >
                3×3 Grid
              </button>
              <button
                id="view-mode-compact"
                onClick={() => onViewModeChange('compact')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === 'compact' ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-500 hover:text-neutral-800'
                }`}
                title="Compact Grid"
              >
                Compact
              </button>
            </div>

            {/* Wipeout or Restore Button */}
            {totalPhotos > 0 ? (
              <button
                id="wipeout-library-btn"
                onClick={onOpenWipeout}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 active:bg-red-100 text-neutral-600 hover:text-red-700 border border-neutral-200 hover:border-red-200 rounded-xl text-sm font-medium transition-all shadow-xs"
                title="Complete Wipeout: Clear all photos & reset library"
              >
                <Trash2 className="w-4 h-4 text-neutral-400 hover:text-red-600 transition-colors" />
                <span className="hidden lg:inline text-xs">Wipeout</span>
              </button>
            ) : (
              <button
                id="restore-demo-btn"
                onClick={onRestoreSamples}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-sm font-medium transition-all shadow-xs"
                title="Restore demo photos"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs">Restore Demos</span>
              </button>
            )}

            {/* Add Album Button */}
            <button
              id="new-album-btn"
              onClick={onOpenNewAlbum}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 text-neutral-700 rounded-xl text-sm font-medium transition-all shadow-xs"
              title="Create a new album"
            >
              <FolderPlus className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">New Album</span>
            </button>

            {/* Upload Button */}
            <button
              id="desktop-upload-btn"
              onClick={onOpenUpload}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-sm font-medium transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Upload Photos
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
