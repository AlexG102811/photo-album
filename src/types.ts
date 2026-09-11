export interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  albumId: string;
  tags: string[];
  date: string;
  width?: number;
  height?: number;
  favorite: boolean;
  size?: string;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoUrl?: string;
  iconName?: string;
  createdAt?: string;
}

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export type ViewMode = 'grid' | 'masonry' | 'compact';
