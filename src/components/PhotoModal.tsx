import React, { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Download,
  Trash2,
  Edit2,
  Check,
  Tag,
  Info,
  Maximize2
} from 'lucide-react';

interface PhotoModalProps {
  photo: Photo | null;
  photosList: Photo[];
  onClose: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onUpdatePhoto: (updated: Photo) => void;
  onDeletePhoto: (id: string) => void;
  onSelectTag: (tag: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  photosList,
  onClose,
  onToggleFavorite,
  onUpdatePhoto,
  onDeletePhoto,
  onSelectTag,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTagsString, setEditTagsString] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(true);

  // Sync edit state when photo changes
  useEffect(() => {
    if (photo) {
      setEditTitle(photo.title);
      setEditDescription(photo.description || '');
      setEditTagsString(photo.tags.join(', '));
      setIsEditing(false);
      setShowConfirmDelete(false);
    }
  }, [photo]);

  // Current photo index and navigation
  const currentIndex = photo ? photosList.findIndex((p) => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < photosList.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      const prevPhoto = photosList[currentIndex - 1];
      onUpdatePhoto(prevPhoto); // using update trigger or navigation
    }
  }, [hasPrev, currentIndex, photosList, onUpdatePhoto]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      const nextPhoto = photosList[currentIndex + 1];
      onUpdatePhoto(nextPhoto);
    }
  }, [hasNext, currentIndex, photosList, onUpdatePhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (!isEditing && hasPrev) goToPrev();
      } else if (e.key === 'ArrowRight') {
        if (!isEditing && hasNext) goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, isEditing, hasPrev, hasNext, goToPrev, goToNext, onClose]);

  if (!photo) return null;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTags = editTagsString
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    onUpdatePhoto({
      ...photo,
      title: editTitle.trim() || 'Untitled Photo',
      description: editDescription.trim(),
      tags: updatedTags,
    });
    setIsEditing(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${photo.title.replace(/\s+/g, '-').toLowerCase() || 'photo'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback direct link
      window.open(photo.url, '_blank');
    }
  };

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 h-16 px-4 sm:px-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3 text-white">
          <span className="text-sm font-medium tracking-wide opacity-80">
            {currentIndex + 1} of {photosList.length}
          </span>
          <span className="text-neutral-500">•</span>
          <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">{photo.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Favorite button */}
          <button
            id="modal-favorite-btn"
            onClick={(e) => onToggleFavorite(photo.id, e)}
            className={`p-2.5 rounded-full transition-colors ${
              photo.favorite
                ? 'bg-rose-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={photo.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${photo.favorite ? 'fill-white' : ''}`} />
          </button>

          {/* Toggle details sidebar */}
          <button
            id="modal-toggle-details-btn"
            onClick={() => setShowDetailsPanel(!showDetailsPanel)}
            className={`p-2.5 rounded-full transition-colors ${
              showDetailsPanel ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Toggle details panel"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Download button */}
          <button
            id="modal-download-btn"
            onClick={handleDownload}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Download image"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between pt-16 pb-4 px-4 overflow-hidden">
        
        {/* Left & Right Nav Buttons */}
        {hasPrev && (
          <button
            id="modal-prev-btn"
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-all hover:scale-105"
            title="Previous photo (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            id="modal-next-btn"
            onClick={goToNext}
            className="absolute right-4 lg:right-96 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-all hover:scale-105"
            title="Next photo (Right arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Center: Image Display */}
        <div className="flex-1 w-full h-full flex items-center justify-center p-2 sm:p-6 select-none">
          <img
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all"
          />
        </div>

        {/* Right: Info & Metadata Panel */}
        {showDetailsPanel && (
          <div className="w-full lg:w-90 bg-neutral-900/95 border border-neutral-800 text-neutral-100 rounded-2xl p-5 lg:h-[calc(100vh-6rem)] overflow-y-auto z-20 backdrop-blur-lg flex flex-col justify-between shrink-0 shadow-2xl">
            {isEditing ? (
              /* Edit Form */
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h4 className="font-semibold text-white text-base">Edit Photo Info</h4>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add a description or memories..."
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Tags <span className="text-neutral-500">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={editTagsString}
                    onChange={(e) => setEditTagsString(e.target.value)}
                    placeholder="Nature, Mountain, Sunset"
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* View Metadata */
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white leading-snug">{photo.title}</h3>
                    <button
                      id="edit-photo-btn"
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Edit photo details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  {photo.description && (
                    <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                      {photo.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <h5 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Tags
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {photo.tags.length > 0 ? (
                      photo.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            onSelectTag(tag);
                            onClose();
                          }}
                          className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded-lg border border-neutral-700 transition-colors"
                          title={`Filter by #${tag}`}
                        >
                          #{tag}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-500 italic">No tags</span>
                    )}
                  </div>
                </div>

                {/* Technical specs */}
                <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs text-neutral-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Date Added
                    </span>
                    <span className="text-neutral-200 font-medium">{photo.date}</span>
                  </div>
                  {photo.size && (
                    <div className="flex items-center justify-between">
                      <span>File Size</span>
                      <span className="text-neutral-200 font-medium">{photo.size}</span>
                    </div>
                  )}
                  {photo.width && photo.height && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" /> Resolution
                      </span>
                      <span className="text-neutral-200 font-medium">{photo.width} × {photo.height}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Actions: Delete */}
            <div className="pt-6 border-t border-neutral-800 mt-6">
              {showConfirmDelete ? (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl space-y-2">
                   <p className="text-xs text-red-200">Delete this photo from your gallery?</p>
                  <div className="flex items-center gap-2">
                    <button
                      id="confirm-delete-photo-btn"
                      onClick={() => {
                        onDeletePhoto(photo.id);
                        onClose();
                      }}
                      className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(false)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  id="delete-photo-btn"
                  onClick={() => setShowConfirmDelete(true)}
                  className="w-full py-2 bg-neutral-800 hover:bg-red-950/40 hover:text-red-300 border border-neutral-700 hover:border-red-900 text-neutral-400 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Photo
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
