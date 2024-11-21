document.addEventListener('DOMContentLoaded', () => {
  // Get the year and folder from URL query parameters
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');  // e.g., "2024"
  const folder = params.get('folder');  // e.g., "Christmas"

  // Check if year or folder is missing
  if (!year || !folder) {
    console.log("Missing year or folder in URL parameters.");
    document.getElementById('folder-name').textContent = 'No Folder Selected';
    return;
  }

  console.log(`Selected Year: ${year}, Folder: ${folder}`);

  const galleryBasePath = 'images/gallery'; // Base path for gallery images
  const folderPath = `${galleryBasePath}/${year}/${folder}`;  // Path to images

  // Check if the folder path exists (this will be logged in the console)
  console.log(`Trying to load images from: ${folderPath}`);

  // Get the image container and folder name display
  const imageContainer = document.getElementById('image-container');
  document.getElementById('folder-name').textContent = `${folder} - ${year}`;

  // Clear any existing images (in case of page reload)
  imageContainer.innerHTML = '';

  // Function to load images dynamically
  const loadImages = () => {
    let i = 1;
    let img;
    let imageElement;

    const loadNextImage = () => {
      img = new Image();
      img.src = `${folderPath}/${i}.jpg`;  // Build the image path dynamically

      // Log to see if the path is correct
      console.log(`Loading image: ${img.src}`);

      // Check if the image exists
      img.onload = () => {
        imageElement = document.createElement('div');
        imageElement.classList.add('rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white');
        imageElement.innerHTML = `
          <img src="${img.src}" alt="Image ${i}" class="w-full h-48 object-cover">
        `;
        imageContainer.appendChild(imageElement);
        i++;  // Increment image number and load next image
        loadNextImage();  // Recursively load the next image
      };

      // If the image doesn't exist, break the loop
      img.onerror = () => {
        console.log(`Image not found: ${img.src}`);
        if (i === 1) {
          document.getElementById('folder-name').textContent = 'No Images Found';
        } else {
          console.log(`End of images for ${folder}.`);
        }
      };
    };

    loadNextImage();  // Start loading the first image
  };

  // Load images initially
  loadImages();
});
