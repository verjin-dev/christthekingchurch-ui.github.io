function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  
  function setLanguage(language) {
    fetch(`locales/${language}.json`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('welcome').textContent = data.welcome;
        document.getElementById('about').textContent = data.about;
      })
      .catch(err => console.error(err));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const lightboxOverlay = document.createElement("div");
    lightboxOverlay.className = "lightbox-overlay";
    document.body.appendChild(lightboxOverlay);
  
    const closeButton = document.createElement("button");
    closeButton.className = "lightbox-close";
    closeButton.innerHTML = "×";
    closeButton.onclick = () => (lightboxOverlay.style.display = "none");
    lightboxOverlay.appendChild(closeButton);
  
    const lightboxImage = document.createElement("img");
    lightboxOverlay.appendChild(lightboxImage);
  
    galleryImages.forEach((image) => {
      image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxOverlay.style.display = "flex";
      });
    });
  });

  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
};

  