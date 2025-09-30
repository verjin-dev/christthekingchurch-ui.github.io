// Main Gallery Page - Display Gallery Folders
document.addEventListener('DOMContentLoaded', () => {
  const galleryBasePath = 'images/gallery';
  
  // Define the actual gallery structure based on your folders
  const galleryStructure = {
    '2024': [
      { name: 'Christmas', displayName: 'Christmas Celebration', thumbnail: '1.jpg' },
      { name: 'Mother Mary Feast', displayName: 'Mother Mary Feast', thumbnail: '1.jpg' }
    ],
    '2023': [
      { name: 'Easter', displayName: 'Easter Celebration', thumbnail: '1.jpg' },
      { name: 'Christmas', displayName: 'Christmas Celebration', thumbnail: '1.jpg' }
    ]
  };

  const imageContainer = document.getElementById('image-container');
  
  if (!imageContainer) {
    console.error('Image container not found');
    return;
  }

  // Clear existing content
  imageContainer.innerHTML = '';

  // Create gallery cards for each folder
  for (const [year, folders] of Object.entries(galleryStructure)) {
    folders.forEach((folder, index) => {
      const folderPath = `${galleryBasePath}/${year}/${folder.name}`;
      
      // Create gallery card
      const card = document.createElement('div');
      card.className = 'gallery-item animate-on-scroll';
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Create link wrapper
      const link = document.createElement('a');
      link.href = `folder-gallery.html?year=${year}&folder=${encodeURIComponent(folder.name)}`;
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      
      // Create image
      const img = document.createElement('img');
      img.src = `${folderPath}/${folder.thumbnail}`;
      img.alt = folder.displayName;
      img.style.width = '100%';
      img.style.height = '250px';
      img.style.objectFit = 'cover';
      
      // Handle image error
      img.onerror = function() {
        this.src = 'images/logo.png'; // Fallback image
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
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem;">${folder.displayName}</h3>
        <p style="font-size: 0.9rem; opacity: 0.9;">${year}</p>
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
  }

  // Add observer for animations
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
});
