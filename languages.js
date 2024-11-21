// languages.js

const translations = {
    en: {
      churchName: "Christ the King Church, Iruthyapuram",
      homeLink: "Home",
      historyLink: "History",
      galleryLink: "Gallery",
      contactLink: "Contact",
      heroTitle: "Welcome to Christ the King Church",
      heroDescription: "A community of faith, worship, and love in Iruthyapuram",
      contactBtn: "Contact Us",
      missionTitle: "Our Mission",
      missionText: "At Christ the King Church, we strive to bring people closer to God through meaningful worship, compassionate service, and community building."
    },
    ta: {
      churchName: "கிறிஸ்து அரசர் ஆலயம்,இருதயபுரம் ",
      homeLink: "முகப்பு",
      historyLink: "வரலாறு",
      galleryLink: "படக்காட்சிகள்",
      contactLink: "தொடர்பு",
      heroTitle: "கிறிஸ்து அரசர் ஆலயத்திற்கு உங்களை வரவேற்கிறோம்",
      heroDescription: "இருதயபுரத்தில் அம்பலமான பக்தி, தொழுகை மற்றும் அன்பின் சமூகத்தை உருவாக்குவது",
      contactBtn: "எங்களை தொடர்புகொள்ளவும்",
      missionTitle: "எங்களின் பரபரப்பான பணிகள்",
      missionText: "கிறிஸ்து ராஜா கோயிலில், நாம் பொருந்துமிடம், கருணைக்கான சேவை மற்றும் சமூக அமைப்பை உள்ளடக்குவதன் மூலம் மக்களை கடவுளுடன் நெருங்குவதற்கு முயற்சிக்கின்றோம்."
    }
  };
  
  let currentLanguage = 'en'; // Default language
  
  function toggleLanguage() {
    // Toggle between English and Tamil
    currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
    updateContent(currentLanguage);
    updateButtonText(currentLanguage);
  }
  
  function updateContent(language) {
    const languageContent = translations[language];
  
    // Update text content based on selected language
    document.getElementById('churchName').textContent = languageContent.churchName;
    document.getElementById('homeLink').textContent = languageContent.homeLink;
    document.getElementById('historyLink').textContent = languageContent.historyLink;
    document.getElementById('galleryLink').textContent = languageContent.galleryLink;
    document.getElementById('contactLink').textContent = languageContent.contactLink;
    document.getElementById('heroTitle').textContent = languageContent.heroTitle;
    document.getElementById('heroDescription').textContent = languageContent.heroDescription;
    document.getElementById('contactBtn').textContent = languageContent.contactBtn;
    document.getElementById('missionTitle').textContent = languageContent.missionTitle;
    document.getElementById('missionText').textContent = languageContent.missionText;
  }
  
  function updateButtonText(language) {
    // Change button text based on selected language
    const buttonText = language === 'en' ? 'English' : 'தமிழ்';
    document.getElementById('languageText').textContent = buttonText;
  }
  
  // Initialize default language as English
  document.addEventListener('DOMContentLoaded', function() {
    updateContent(currentLanguage);
    updateButtonText(currentLanguage);
  });
  