document.addEventListener('DOMContentLoaded', () => {
  const galleryBasePath = 'images/gallery'; // Base path for gallery images
  const years = ['2024', '2023','2022']; // Example years, you can add more or make dynamic

  const yearContainer = document.getElementById('year-container');

  years.forEach(year => {
    const yearPath = `${galleryBasePath}/${year}`;
    const yearElement = document.createElement('div');
    yearElement.classList.add('year-section');
    yearElement.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-4">${year}</h3>
      <div id="folder-container-${year}" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Folders for each function will be dynamically inserted here -->
      </div>
    `;
    yearContainer.appendChild(yearElement);

    // Fetch folder names (e.g., Christmas, Easter, etc.) for each year
    const functionFolders = ['Mother Mary Feast', 'Easter', 'SpecialPrayer']; // Example function folders for each year
    const folderContainer = document.getElementById(`folder-container-${year}`);

    functionFolders.forEach(folder => {
      const folderPath = `${yearPath}/${folder}`;
      const folderElement = document.createElement('div');
      folderElement.classList.add('rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white');
      const folderThumbnail = `${folderPath}/1.jpg`; // Assume 1.jpg is the thumbnail

      folderElement.innerHTML = `
        <a href="folder-gallery.html?year=${year}&folder=${encodeURIComponent(folder)}">
          <img src="${folderThumbnail}" alt="${folder}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h4 class="text-lg font-bold">${folder}</h4>
          </div>
        </a>
      `;
      folderContainer.appendChild(folderElement);
    });
  });
});
