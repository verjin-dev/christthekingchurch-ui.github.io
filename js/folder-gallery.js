document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder');
    const galleryBasePath = 'images/gallery'; // Base path for gallery images
  
    if (!folder) {
      document.getElementById('folder-name').textContent = 'No Folder Selected';
      return;
    }
  
    const folderPath = `${galleryBasePath}/${folder}`;
    const imageContainer = document.getElementById('image-container');
    document.getElementById('folder-name').textContent = folder;
  
    // Assuming images are sequentially numbered (1.jpg, 2.jpg, etc.)
    for (let i = 1; i <= 100; i++) {
      const imagePath = `${folderPath}/${i}.jpg`;
  
      // Dynamically create image elements
      const imgElement = document.createElement('div');
      imgElement.classList.add('rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white');
      imgElement.innerHTML = `
        <img src="${imagePath}" alt="Image ${i}" class="w-full h-48 object-cover">
      `;
  
      // Stop adding if the image doesn't exist
      const img = new Image();
      img.src = imagePath;
      img.onload = () => imageContainer.appendChild(imgElement);
      img.onerror = () => false; // Skip if the image doesn't exist
    }
  });
  