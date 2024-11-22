const translations = {
  en: {
    // Shared content
    churchName: "Christ the King Church, Iruthyapuram",
    homeLink: "Home",
    historyLink: "History",
    galleryLink: "Gallery",
    contactLink: "Contact",
    heroTitle: "Welcome to Christ the King Church",
    heroDescription: "A community of faith, worship, and love in Iruthyapuram",
    contactBtn: "Contact Us",
    missionTitle: "Our Mission",
    missionText: "At Christ the King Church, we strive to bring people closer to God through meaningful worship, compassionate service, and community building.",
    
    // History page content
    historyHeroTitle: "A Short History",
    historyHeroDescription: "Discover the journey of Christ the King Church, Iruthyapuram, from its humble beginnings to its vibrant present.",
    historyIntroTitle: "Introduction",
    historyIntroText: "Varavilai, known also as Vandikaravilai, was a part of Manivila parish belonging to the vicariate of Trivandrum. A small Catholic community of 10 families built a thatched church having Christ the King as their patron in 1943. Over the years, through the tireless efforts of parish priests and the growing Catholic community, Iruthyapuram Parish has become a beacon of faith and community development.",
    historyTimelineTitle: "Historical Timeline",
    historyTimelineItems: [
      { year: "1943", event: "Founding", description: "A small Catholic community of 10 families built a thatched church having Christ the King as their patron." },
      { year: "1946", event: "Substation Established", description: "Piracode was made a substation of Siluvaipuram parish belonging to the diocese of Kottar." },
      { year: "1975", event: "New Church Blessed", description: "A tiled church was built with stones and blessed on 23rd February 1975 by Bishop Marianus Arokiasamy." },
      { year: "2002", event: "Parish Erected", description: "Iruthayapuram was erected as a new parish on 3rd June 2002, with Fr D.M. Sujan Kumar as the first parish priest." },
      { year: "2009", event: "New Church Built", description: "A new church was built at the cost of 1.25 crore rupees and blessed on 22nd November 2009 by Bishop Peter Remigius." },
    ],
  },
  ta: {
    // Shared content
    churchName: "கிறிஸ்து அரசர் ஆலயம், இருதயபுரம்",
    homeLink: "முகப்பு",
    historyLink: "வரலாறு",
    galleryLink: "படக்காட்சிகள்",
    contactLink: "தொடர்பு",
    heroTitle: "கிறிஸ்து அரசர் ஆலயத்திற்கு உங்களை வரவேற்கிறோம்",
    heroDescription: "இருதயபுரத்தில் அம்பலமான பக்தி, தொழுகை மற்றும் அன்பின் சமூகத்தை உருவாக்குவது",
    contactBtn: "எங்களை தொடர்புகொள்ளவும்",
    missionTitle: "எங்களின் பரபரப்பான பணிகள்",
    missionText: "கிறிஸ்து ராஜா கோயிலில், நாம் பொருந்துமிடம், கருணைக்கான சேவை மற்றும் சமூக அமைப்பை உள்ளடக்குவதன் மூலம் மக்களை கடவுளுடன் நெருங்குவதற்கு முயற்சிக்கின்றோம்.",

    // History page content
    historyHeroTitle: "ஒரு சுருக்கமான வரலாறு",
    historyHeroDescription: "இருதயபுரம் பகுதியில் கிறிஸ்து ராஜா திருச்சபையின் பயணம் அதன் எளிய தொடக்கத்திலிருந்து அதன் பிரகாசமான நிகழ்காலம் வரை.",
    historyIntroTitle: "அறிமுகம்",
    historyIntroText: "1943 ஆம் ஆண்டில் கிறிஸ்து ராஜா தலைவராகக் கொண்டு 10 குடும்பங்களைக் கொண்ட ஒரு சிறிய கத்தோலிக்க சமூகத்தினர் குடிசை திருச்சபையை கட்டினர்.",
    historyTimelineTitle: "வரலாற்று காலவரிசை",
    historyTimelineItems: [
      { year: "1943", event: "தொடக்கம்", description: "10 குடும்பங்களைக் கொண்ட ஒரு சிறிய கத்தோலிக்க சமூகத்தினர் குடிசை திருச்சபையை கட்டினர்." },
      { year: "1946", event: "துணை மையம் நிறுவப்பட்டது", description: "பிரகோட் சிலுவைப்புரம் பங்கின் துணை மையமாக அமைக்கப்பட்டது." },
      { year: "1975", event: "புதிய திருச்சபை ஆசீர்வதிக்கப்பட்டது", description: "புதிதாக கட்டப்பட்ட செருப்பு ஆசீர்வதிக்கப்பட்டது." },
      { year: "2002", event: "புதிய பங்கு நிறுவப்பட்டது", description: "புதிதாக பங்கு 2002 இல் நிறுவப்பட்டது." },
      { year: "2009", event: "புதிய திருச்சபை கட்டப்பட்டது", description: "2009 ஆம் ஆண்டு புதிய திருச்சபை கட்டப்பட்டது." },
    ],
  },
};

let currentLanguage = "en"; // Default language

function toggleLanguage() {
  // Toggle between English and Tamil
  currentLanguage = currentLanguage === "en" ? "ta" : "en";
  updateContent(currentLanguage);
  updateButtonText(currentLanguage);
}

function updateContent(language) {
  const languageContent = translations[language];

  // Shared elements to update
  const elementsToUpdate = [
    "churchName",
    "homeLink",
    "historyLink",
    "galleryLink",
    "contactLink",
    "heroTitle",
    "heroDescription",
    "contactBtn",
    "missionTitle",
    "missionText",
    "historyHeroTitle",
    "historyHeroDescription",
    "historyIntroTitle",
    "historyIntroText",
    "historyTimelineTitle",
  ];

  elementsToUpdate.forEach((id) => {
    const element = document.getElementById(id);
    if (element && languageContent[id]) {
      element.textContent = languageContent[id];
    } else if (!element) {
      console.warn(`Element with ID '${id}' not found in the DOM.`);
    }
  });

  // Update timeline on the history page
  if (languageContent.historyTimelineItems) {
    const timelineContainer = document.getElementById("timeline-container");
    if (timelineContainer) {
      timelineContainer.innerHTML = ""; // Clear previous timeline
      languageContent.historyTimelineItems.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add(
          "timeline-card",
          "bg-white",
          "rounded-lg",
          "shadow-lg",
          "p-6",
          "hover:shadow-2xl",
          "transition-transform"
        );
        card.innerHTML = `
          <h3 class="text-xl font-bold text-blue-600">${item.year} - ${item.event}</h3>
          <p class="text-gray-700 mt-2">${item.description}</p>
        `;
        timelineContainer.appendChild(card);
      });
    }
  }
}

function updateButtonText(language) {
  // Change button text based on selected language
  const buttonText = language === "en" ? "தமிழ்" : "English";
  const buttonElement = document.getElementById("languageText");
  if (buttonElement) {
    buttonElement.textContent = buttonText;
  } else {
    console.warn("Language toggle button not found.");
  }
}

// Initialize default language on page load
document.addEventListener("DOMContentLoaded", function () {
  updateContent(currentLanguage);
  updateButtonText(currentLanguage);
});
