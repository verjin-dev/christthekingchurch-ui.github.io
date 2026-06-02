// Main Gallery Page - Display Gallery Folders

document.addEventListener('DOMContentLoaded', () => {
  const galleryBasePath = 'images/gallery';
  const imageContainer = document.getElementById('image-container');

  if (!imageContainer) {
    console.error('Image container not found');
    return;
  }

  if (typeof getGalleryFolders !== 'function') {
    console.error('Gallery data is not available');
    imageContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Gallery data is unavailable right now.</p>';
    return;
  }

  const folders = getGalleryFolders();

  // Clear existing content
  imageContainer.innerHTML = '';

  if (folders.length === 0) {
    imageContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No galleries available yet.</p>';
    return;
  }

  // Create gallery cards for each folder
  folders.forEach((item, index) => {
    const folderPath = `${galleryBasePath}/${item.year}/${item.folder}`;

    // Create gallery card
    const card = document.createElement('div');
    card.className = 'gallery-item animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    // Create link wrapper
    const link = document.createElement('a');
    link.href = `folder-gallery.html?year=${item.year}&folder=${encodeURIComponent(item.folder)}`;
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';

    // Create image
    const img = document.createElement('img');
    img.src = `${folderPath}/${item.data.coverImage || '1.JPG'}`;
    img.alt = item.data.displayName;
    img.style.width = '100%';
    img.style.height = '250px';
    img.style.objectFit = 'cover';

    // Handle image error
    img.onerror = function onImageError() {
      this.src = 'images/logo.png';
      this.style.padding = '20px';
      this.style.objectFit = 'contain';
    };

    // Create overlay with text
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: white;
      padding: 1.5rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    `;
    overlay.innerHTML = `
      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem;">${item.data.displayName}</h3>
      <p style="font-size: 0.9rem; opacity: 0.9;">${item.year}</p>
    `;

    // Add hover effect
    card.addEventListener('mouseenter', () => {
      overlay.style.transform = 'translateY(0)';
    });

    card.addEventListener('mouseleave', () => {
      overlay.style.transform = 'translateY(100%)';
    });

    // Assemble the card
    link.appendChild(img);
    link.appendChild(overlay);
    card.appendChild(link);
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    imageContainer.appendChild(card);
  });

  // Add observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});
