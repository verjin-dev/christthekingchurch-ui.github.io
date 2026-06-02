/**
 * Gallery data — auto-discovers images from /public/images/gallery/
 * 
 * Uses a generated manifest (src/data/galleryManifest.json) created by `npm run dev` or `npm run build`.
 */

import manifest from './galleryManifest.json';

// Build structured gallery data from the generated manifest
export interface GalleryFolder {
  displayName: string;
  description: string;
  eventDateMs?: number;
  coverImage: string;
  images: string[];
  /** Full paths ready for <img src> */
  imagePaths: string[];
}

export type GalleryData = Record<string, Record<string, GalleryFolder>>;

function buildGalleryData(): GalleryData {
  const data: GalleryData = {};

  for (const entry of manifest) {
    if (!data[entry.year]) {
      data[entry.year] = {};
    }

    // Parse date from folder name if it matches (DD-MM-YYYY) or (DD/MM/YYYY)
    const dateMatch = entry.folder.match(/\((\d{1,2})[-/](\d{1,2})[-/](\d{4})\)/);
    let eventDateMs: number | undefined = undefined;
    let cleanName = entry.folder;
    let formattedDate = '';

    if (dateMatch) {
      const day = parseInt(dateMatch[1], 10);
      const month = parseInt(dateMatch[2], 10);
      const yearStr = parseInt(dateMatch[3], 10);
      const dateObj = new Date(yearStr, month - 1, day);
      
      if (!isNaN(dateObj.getTime())) {
        eventDateMs = dateObj.getTime();
        cleanName = entry.folder.replace(dateMatch[0], '').trim();
        formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    }

    const imagePaths = entry.images.map((img: string) => 
      `/images/gallery/${entry.year}/${encodeURIComponent(entry.folder)}/${encodeURIComponent(img)}`
    );

    data[entry.year][entry.folder] = {
      displayName: cleanName,
      description: formattedDate,
      eventDateMs,
      coverImage: entry.images[0] || '',
      images: entry.images,
      imagePaths: imagePaths,
    };
  }

  // Sort images within each folder naturally (1.JPG, 2.JPG, ...)
  for (const year of Object.keys(data)) {
    for (const folder of Object.keys(data[year])) {
      data[year][folder].images.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
      });
      data[year][folder].imagePaths.sort((a, b) => {
        const fA = a.split('/').pop() || '';
        const fB = b.split('/').pop() || '';
        const numA = parseInt(fA.replace(/\D/g, '')) || 0;
        const numB = parseInt(fB.replace(/\D/g, '')) || 0;
        return numA - numB;
      });
      // Set cover to first image after sorting
      data[year][folder].coverImage = data[year][folder].images[0] || '';
    }
  }

  return data;
}

export const galleryData: GalleryData = buildGalleryData();

// Utility types & functions

export interface FlatGalleryFolder {
  year: string;
  folderKey: string;
  displayName: string;
  description: string;
  eventDateMs?: number;
  coverImage: string;
  images: string[];
  imagePaths: string[];
}

export const getFlatGalleryFolders = (): FlatGalleryFolder[] => {
  const folders: FlatGalleryFolder[] = [];
  for (const year in galleryData) {
    for (const folderKey in galleryData[year]) {
      folders.push({
        year,
        folderKey,
        ...galleryData[year][folderKey],
      });
    }
  }
  return folders.sort((a, b) => {
    // Primary sort by year descending
    if (a.year !== b.year) {
      return b.year.localeCompare(a.year);
    }
    // Secondary sort by explicit parsed date
    if (a.eventDateMs && b.eventDateMs) {
      return b.eventDateMs - a.eventDateMs; // Latest first
    }
    // Fallback sort by folder name
    return b.displayName.localeCompare(a.displayName);
  });
};

export interface FlatImage {
  src: string;
  alt: string;
  year: string;
  folder: string;
}

export const getAllImages = (): FlatImage[] => {
  const images: FlatImage[] = [];
  for (const year in galleryData) {
    for (const folderKey in galleryData[year]) {
      const folder = galleryData[year][folderKey];
      folder.imagePaths.forEach((path, i) => {
        images.push({
          src: path,
          alt: `${folder.displayName} - ${i + 1}`,
          year,
          folder: folderKey,
        });
      });
    }
  }
  return images;
};

/**
 * Get the first N cover images from the latest folders, for use on the home page preview.
 * Returns { src, alt, year, folder } for each.
 */
export const getPreviewImages = (count: number = 3): FlatImage[] => {
  const latestFolders = getFlatGalleryFolders();
  return latestFolders.slice(0, count).map(folder => ({
    src: folder.imagePaths[0],
    alt: `${folder.displayName} Cover`,
    year: folder.year,
    folder: folder.folderKey,
  }));
};

/**
 * Get a list of unique years, sorted descending.
 */
export const getGalleryYears = (): string[] => {
  return Object.keys(galleryData).sort((a, b) => b.localeCompare(a));
};
