export interface GalleryFolder {
  displayName: string;
  description: string;
  coverImage: string;
  images: string[];
}

export type GalleryData = Record<string, Record<string, GalleryFolder>>;

export const galleryData: GalleryData = {
  '2024': {
    'Christmas': {
      displayName: 'Christmas Celebration 2024',
      description: 'Joy and celebration during Christmas 2024',
      coverImage: '1.JPG',
      images: ['1.JPG']
    },
    'Mother Mary Feast': {
      displayName: 'Mother Mary Feast 2024',
      description: 'Celebrating the feast of Mother Mary',
      coverImage: '1.JPG',
      images: ['1.JPG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG', '7.JPG']
    }
  },
  '2023': {
    'Mother Mary Feast': {
      displayName: 'Mother Mary Feast 2023',
      description: 'Celebrating the feast of Mother Mary',
      coverImage: '1.JPG',
      images: ['1.JPG']
    }
  }
};

export interface FlatGalleryFolder {
  year: string;
  folderKey: string;
  displayName: string;
  description: string;
  coverImage: string;
  images: string[];
}

export const getFlatGalleryFolders = (): FlatGalleryFolder[] => {
  const folders: FlatGalleryFolder[] = [];
  for (const year in galleryData) {
    for (const folderKey in galleryData[year]) {
      folders.push({
        year,
        folderKey,
        ...galleryData[year][folderKey]
      });
    }
  }
  return folders.sort((a, b) => b.year.localeCompare(a.year));
};
