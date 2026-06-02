// Gallery Data Configuration
const galleryData = {
  '2024': {
    Christmas: {
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

// Function to get all gallery folders
function getGalleryFolders() {
  const folders = [];
  for (const year in galleryData) {
    for (const folder in galleryData[year]) {
      folders.push({
        year,
        folder,
        data: galleryData[year][folder]
      });
    }
  }
  return folders;
}

// Function to get images for a specific folder
function getFolderImages(year, folder) {
  if (galleryData[year] && galleryData[year][folder]) {
    return galleryData[year][folder];
  }
  return null;
}
