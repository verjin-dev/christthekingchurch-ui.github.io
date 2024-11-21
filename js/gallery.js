document.addEventListener('DOMContentLoaded', () => {
  const galleryBasePath = 'images/gallery'; // Base path for gallery images
  const folders = ['Mother Mary Feast 2024', 'Easter', 'SpecialPrayer']; // List of gallery folders

  const folderContainer = document.getElementById('folder-container');

  folders.forEach(folder => {
    const folderPath = `${galleryBasePath}/${folder}`;
    const folderElement = document.createElement('div');
    folderElement.classList.add('rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white');

    // Use the first image in the folder as the thumbnail
    const folderThumbnail = `${folderPath}/1.jpg`;
    folderElement.innerHTML = `
      <a href="folder-gallery.html?folder=${encodeURIComponent(folder)}">
        <img src="${folderThumbnail}" alt="${folder}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-bold">${folder}</h3>
        </div>
      </a>
    `;
    folderContainer.appendChild(folderElement);
  });
});
