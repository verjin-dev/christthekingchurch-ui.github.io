// Gallery Data Configuration
const galleryData = {
  "2024": {
    "Christmas": {
      displayName: "Christmas Celebration 2024",
      description: "Joy and celebration during Christmas 2024",
      coverImage: "1.jpg",
      images: ["1.jpg"] // Add more image names as they exist
    },
    "Mother Mary Feast": {
      displayName: "Mother Mary Feast 2024",
      description: "Celebrating the feast of Mother Mary",
      coverImage: "1.jpg",
      images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
    }
  },
  "2023": {
    "Easter": {
      displayName: "Easter Celebration 2023",
      description: "Easter celebrations and services",
      coverImage: "1.jpg",
      images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]
    }
  }
};

// Function to get all gallery folders
function getGalleryFolders() {
  const folders = [];
  for (const year in galleryData) {
    for (const folder in galleryData[year]) {
      folders.push({
        year: year,
        folder: folder,
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
