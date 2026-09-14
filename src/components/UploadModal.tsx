import React, { useState, useRef } from 'react';
import { Photo } from '../types';
import { X, UploadCloud, Link as LinkIcon, Image as ImageIcon, Plus } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: Photo) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileMeta, setFileMeta] = useState<{ size?: string; width?: number; height?: number }>({});
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPEG, WebP, etc.)');
      return;
    }
    setErrorMessage('');

    // Default title from filename
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    if (!title) {
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Format file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = `${sizeInMB} MB`;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);

      // Measure dimensions
      const img = new Image();
      img.onload = () => {
        setFileMeta({
          size: sizeStr,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const cleanTag = tagInput.trim().replace(/^#/, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setFileMeta({ size: 'Online Link' });
    if (!title) {
      setTitle('Web Photo');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setErrorMessage('Please provide an image before uploading.');
      return;
    }

    const newPhoto: Photo = {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      url: previewUrl,
      title: title.trim() || 'Untitled Photo',
      description: description.trim(),
      tags: tags.length > 0 ? tags : ['Upload'],
      date: new Date().toISOString().split('T')[0],
      favorite: false,
      size: fileMeta.size || '1.8 MB',
      width: fileMeta.width || 1920,
      height: fileMeta.height || 1080,
    };

    onAddPhoto(newPhoto);
    onClose();
  };

  return (
    <div
      id="upload-photo-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-neutral-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg">Add Photo</h3>
          </div>
          <button
            id="close-upload-modal-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Switch Tabs */}
        <div className="px-6 pt-4">
          <div className="flex rounded-xl bg-neutral-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              File Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'url' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Image URL
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Upload Area or URL Input */}
          {activeTab === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="photo-file-upload-input"
              />
              
              {!previewUrl ? (
                <div
                  id="drop-zone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/50 hover:bg-neutral-50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100/70 text-blue-600 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-800">
                    Click to select an image or drag & drop here
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Supports JPG, PNG, WEBP, GIF up to 20MB
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-16/9 flex items-center justify-center group">
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-semibold shadow-md hover:bg-neutral-100"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setFileMeta({});
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold shadow-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  id="image-url-input"
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Preview
                </button>
              </div>

              {previewUrl && (
                <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-16/9 flex items-center justify-center">
                  <img src={previewUrl} alt="URL preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          )}

          {/* Metadata Form */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="upload-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Sunset Over the Ridge"
              className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Description <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="upload-description-input"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this photo..."
              className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Tags <span className="text-neutral-400 font-normal">(Type and press Enter)</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                id="upload-tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="e.g. Travel, Sunset"
                className="flex-1 px-3.5 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-medium inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-500 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-2">
            <button
              id="cancel-upload-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              id="submit-upload-btn"
              type="submit"
              disabled={!previewUrl}
              className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Save Photo
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
