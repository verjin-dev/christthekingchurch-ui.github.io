// Folder Gallery - Display images from a specific folder
document.addEventListener('DOMContentLoaded', () => {
  // Get the year and folder from URL query parameters
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');
  const folder = params.get('folder');

  // Check if year or folder is missing
  if (!year || !folder) {
    console.log("Missing year or folder in URL parameters.");
    const folderName = document.getElementById('folder-name');
    if (folderName) {
      folderName.textContent = 'No Folder Selected';
      folderName.style.color = 'var(--text-muted)';
    }
    return;
  }

  console.log(`Loading gallery: ${year}/${folder}`);

  const galleryBasePath = 'images/gallery';
  const folderPath = `${galleryBasePath}/${year}/${folder}`;
  const imageContainer = document.getElementById('image-container');
  const folderNameElement = document.getElementById('folder-name');

  if (folderNameElement) {
    folderNameElement.textContent = `${folder} - ${year}`;
  }

  if (!imageContainer) {
    console.error('Image container not found');
    return;
  }

  // Clear any existing images
  imageContainer.innerHTML = '';

  // Add loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 3rem;';
  loadingDiv.innerHTML = '<div class="spinner" style="margin: 0 auto;"></div><p style="margin-top: 1rem;">Loading images...</p>';
  imageContainer.appendChild(loadingDiv);

  // Array to store successfully loaded images
  const loadedImages = [];
  let attemptedCount = 0;
  const maxAttempts = 20; // Try to load up to 20 images

  // Function to create image element
  const createImageElement = (src, index) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'gallery-item animate-on-scroll';
    imageWrapper.style.animationDelay = `${index * 0.05}s`;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.style.cssText = `
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all var(--transition-base);
    `;
    
    // Add click handler for lightbox (optional)
    img.addEventListener('click', () => {
      // You can implement a lightbox feature here
      window.open(src, '_blank');
    });
    
    imageWrapper.appendChild(img);
    return imageWrapper;
  };

  // Function to attempt loading multiple images
  const loadImages = () => {
    const promises = [];
    
    // Try loading images with different extensions and naming patterns
    for (let i = 1; i <= maxAttempts; i++) {
      // Try .jpg first
      const imgPath = `${folderPath}/${i}.jpg`;
      
      const promise = new Promise((resolve) => {
        const img = new Image();
        img.src = imgPath;
        
        img.onload = () => {
          console.log(`Loaded: ${imgPath}`);
          loadedImages.push({ src: imgPath, index: loadedImages.length });
          resolve(true);
        };
        
        img.onerror = () => {
          // Try .png as fallback
          const pngPath = `${folderPath}/${i}.png`;
          const pngImg = new Image();
          pngImg.src = pngPath;
          
          pngImg.onload = () => {
            console.log(`Loaded: ${pngPath}`);
            loadedImages.push({ src: pngPath, index: loadedImages.length });
            resolve(true);
          };
          
          pngImg.onerror = () => {
            console.log(`Not found: ${imgPath} or ${pngPath}`);
            resolve(false);
          };
        };
      });
      
      promises.push(promise);
    }
    
    // Wait for all image loading attempts to complete
    Promise.all(promises).then(() => {
      // Remove loading indicator
      imageContainer.innerHTML = '';
      
      if (loadedImages.length === 0) {
        // No images found
        const noImagesDiv = document.createElement('div');
        noImagesDiv.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 3rem;';
        noImagesDiv.innerHTML = `
          <i class="fas fa-image" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="color: var(--text-muted);">No images found in this folder</h3>
          <p style="color: var(--text-muted); margin-top: 1rem;">Please check back later or browse other galleries.</p>
          <a href="gallery.html" class="btn btn-primary" style="margin-top: 2rem; display: inline-block;">Back to Gallery</a>
        `;
        imageContainer.appendChild(noImagesDiv);
      } else {
        // Display loaded images
        loadedImages.forEach((imgData) => {
          const imageElement = createImageElement(imgData.src, imgData.index);
          imageContainer.appendChild(imageElement);
        });
        
        // Add observer for animations
        setTimeout(() => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, { threshold: 0.1 });

          document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
          });
        }, 100);
      }
    });
  };

  // Start loading images
  setTimeout(loadImages, 500); // Small delay to ensure DOM is ready
});
