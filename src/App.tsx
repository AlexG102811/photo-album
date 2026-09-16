import React, { useState, useEffect, useMemo } from 'react';
import { Photo, SortOption, ViewMode } from './types';
import { INITIAL_PHOTOS } from './data/samplePhotos';
import { Header } from './components/Header';
import { PhotoCard } from './components/PhotoCard';
import { PhotoModal } from './components/PhotoModal';
import { UploadModal } from './components/UploadModal';
import { WipeoutModal } from './components/WipeoutModal';
import { Image as ImageIcon, Plus, FolderOpen, Heart, ArrowUp, RotateCcw } from 'lucide-react';

export function App() {
  // LocalStorage initialization
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const saved = localStorage.getItem('photo_album_photos_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const savedIds = new Set(parsed.map((photo) => photo.id));
            const newlyAddedPhotos = INITIAL_PHOTOS.filter((photo) => !savedIds.has(photo.id));
            const correctedPhotos = parsed.map((photo) =>
              photo.id === 'photo-11' && ['brownioes', 'brownoes'].includes(photo.title.toLowerCase())
                ? { ...photo, title: 'brownies' }
                : photo
            );
            return [...correctedPhotos, ...newlyAddedPhotos];
          }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PHOTOS;
  });

  // Filters and UI states
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Modals
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isWipeoutOpen, setIsWipeoutOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('photo_album_photos_v1', JSON.stringify(photos));
    } catch (e) {
      console.warn('Could not save photos to localStorage:', e);
    }
  }, [photos]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort calculations
  const filteredAndSortedPhotos = useMemo(() => {
    return photos
      .filter((photo) => {
        // Favorites filter
        if (selectedFilter === 'favorites' && !photo.favorite) {
          return false;
        }

        // Tag filter
        if (selectedTag && !photo.tags.includes(selectedTag)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = photo.title.toLowerCase().includes(query);
          const matchDesc = (photo.description || '').toLowerCase().includes(query);
          const matchTag = photo.tags.some((t) => t.toLowerCase().includes(query));
          return matchTitle || matchDesc || matchTag;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortOption === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortOption === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortOption === 'title-desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [photos, selectedFilter, selectedTag, searchQuery, sortOption]);

  const favoritesCount = useMemo(() => {
    return photos.filter((p) => p.favorite).length;
  }, [photos]);

  // Actions
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null));
    }
  };

  const handleAddPhoto = (newPhoto: Photo) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleUpdatePhoto = (updatedPhoto: Photo) => {
    setPhotos((prev) => prev.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)));
    setSelectedPhoto(updatedPhoto);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const handleSelectTag = (tag: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedTag(tag);
  };

  const handleResetFilters = () => {
    setSelectedTag(null);
    setSearchQuery('');
    setSelectedFilter('all');
  };

  const handleConfirmWipeout = () => {
    setPhotos([]);
    setSelectedTag(null);
    setSearchQuery('');
    setSelectedFilter('all');
    setSelectedPhoto(null);
    try {
      localStorage.setItem('photo_album_photos_v1', JSON.stringify([]));
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  };

  const handleRestoreSamples = () => {
    setPhotos(INITIAL_PHOTOS);
    setSelectedTag(null);
    setSearchQuery('');
    setSelectedFilter('all');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col selection:bg-blue-900 selection:text-blue-100">
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/food-gallery-background.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/45" aria-hidden="true" />
      
      {/* App Header */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterToggle={() =>
          setSelectedFilter(selectedFilter === 'favorites' ? 'all' : 'favorites')
        }
        favoritesCount={favoritesCount}
        sortOption={sortOption}
        onSortChange={setSortOption}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenWipeout={() => setIsWipeoutOpen(true)}
        onRestoreSamples={handleRestoreSamples}
        totalPhotos={photos.length}
        />

      {/* Main Content Area */}
      <main id="main-content" className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Gallery Title Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 id="gallery-main-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedFilter === 'favorites'
                  ? 'Favorites Gallery (3×3)'
                  : 'Food Gallery'}
              </h2>
              {selectedFilter === 'favorites' && (
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              )}
            </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {selectedFilter === 'favorites'
                ? 'Your starred photos displayed in an equal-dimension 3×3 gallery'
                : 'Curated 3×3 gallery of equal-dimension photos with titles, tags, and descriptions'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-neutral-300 bg-neutral-900 px-3 py-1 rounded-full">
              {filteredAndSortedPhotos.length === 9 ? '3×3 Grid (9 Photos)' : `${filteredAndSortedPhotos.length} of ${photos.length} Photos`}
            </span>
          </div>
        </div>

        {/* Photo Grid or Empty State */}
        {filteredAndSortedPhotos.length > 0 ? (
          <div
            id="photos-grid-container"
            className={`grid gap-5 md:gap-6 ${
              viewMode === 'compact'
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {filteredAndSortedPhotos.map((photo) => {
              return (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isCompact={viewMode === 'compact'}
                  onSelectPhoto={setSelectedPhoto}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectTag={handleSelectTag}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            id="empty-photos-state"
            className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {photos.length === 0 ? 'Photo Library Wiped Clean' : 'No photos found'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              {photos.length === 0
                ? 'Your photo library is currently empty. You can upload new photos or restore the original demo collection at any time.'
                : searchQuery || selectedTag || selectedFilter === 'favorites'
                ? "We couldn't find any photos matching your current search or filter criteria."
                : 'Upload photos to start filling your gallery!'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {(searchQuery || selectedTag || selectedFilter === 'favorites') && photos.length > 0 && (
                <button
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 rounded-xl transition-colors shadow-xs"
                >
                  Clear Filters
                </button>
              )}
              {photos.length === 0 && (
                <button
                  id="empty-restore-btn"
                  onClick={handleRestoreSamples}
                  className="px-4 py-2 text-xs font-semibold bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Demo Photos
                </button>
              )}
              <button
                id="empty-state-upload-btn"
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Upload New Photo
              </button>
            </div>
          </div>
        )}

        {/* Blank space below the gallery */}
        <section
          aria-hidden="true"
          className="h-80 sm:h-96 mt-8"
        />

      </main>

      {/* Back to top floating button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-black transition-all hover:scale-105"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          photosList={filteredAndSortedPhotos}
          onClose={() => setSelectedPhoto(null)}
          onToggleFavorite={handleToggleFavorite}
          onUpdatePhoto={handleUpdatePhoto}
          onDeletePhoto={handleDeletePhoto}
          onSelectTag={setSelectedTag}
        />
      )}

      {/* Upload Photo Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddPhoto={handleAddPhoto}
      />

      {/* Wipeout Confirmation Modal */}
      <WipeoutModal
        isOpen={isWipeoutOpen}
        onClose={() => setIsWipeoutOpen(false)}
        onConfirmWipeout={handleConfirmWipeout}
        photoCount={photos.length}
      />

      {/* Footer */}
      <footer className="relative border-t border-neutral-800 bg-black/80 py-6 mt-12 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-neutral-200">Food Gallery</span>
            <span>— Personal Gallery & Organizer</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>{photos.length} photos</span>
            <span>•</span>
            <span>Stored locally</span>
          </div>
        </div>
      </footer>
      </div>

    </div>
  );
}
export default App;
