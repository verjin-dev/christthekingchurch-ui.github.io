document.addEventListener("DOMContentLoaded", () => {
  // Default language is English
  let currentLanguage = "en";

  // Language data
  const languageData = {
    en: {
      navbar: {
        title: "Christ the King Church",
        home: "Home",
        history: "History",
        gallery: "Gallery",
        contact: "Contact",
      },
      hero: {
        title: "A Short History",
        description: "Discover the journey of Christ the King Church, Iruthayapuram, from its humble beginnings to its vibrant present.",
      },
      intro: {
        title: "Introduction",
        text: "Varavilai, known also as Vandikaravilai, was a part of Manivila parish belonging to the vicariate of Trivandrum. A small Catholic community of 10 families built a thatched church having Christ the King as their patron in 1943. Over the years, through the tireless efforts of parish priests and the growing Catholic community, Iruthayapuram Parish has become a beacon of faith and community development.",
      },
      timeline: {
        title: "Historical Timeline",
        items: [
          { year: "1943", event: "Founding", description: "A small Catholic community of 10 families built a thatched church having Christ the King as their patron." },
          { year: "1946", event: "Substation Established", description: "Piracode was made a substation of Siluvaipuram parish belonging to the diocese of Kottar." },
          { year: "1975", event: "New Church Blessed", description: "A tiled church was built with stones and blessed on 23rd February 1975 by Bishop Marianus Arokiasamy." },
          { year: "2002", event: "Parish Erected", description: "Iruthayapuram was erected as a new parish on 3rd June 2002, with Fr D.M. Sujan Kumar as the first parish priest." },
          { year: "2009", event: "New Church Built", description: "A new church was built at the cost of 1.25 crore rupees and blessed on 22nd November 2009 by Bishop Peter Remigius." },
        ],
      },
    },
    ta: {
      navbar: {
        title: "கிறிஸ்து ராஜா திருச்சபை",
        home: "முகப்பு",
        history: "வரலாறு",
        gallery: "காட்சியகம்",
        contact: "தொடர்பு கொள்ளவும்",
      },
      hero: {
        title: "ஒரு சுருக்கமான வரலாறு",
        description: "இருதயபுரம் பகுதியில் கிறிஸ்து ராஜா திருச்சபையின் பயணம் அதன் எளிய தொடக்கத்திலிருந்து அதன் பிரகாசமான நிகழ்காலம் வரை.",
      },
      intro: {
        title: "அறிமுகம்",
        text: "1943 ஆம் ஆண்டில் கிறிஸ்து ராஜா தலைவராகக் கொண்டு 10 குடும்பங்களைக் கொண்ட ஒரு சிறிய கத்தோலிக்க சமூகத்தினர் குடிசை திருச்சபையை கட்டினர்.",
      },
      timeline: {
        title: "வரலாற்று காலவரிசை",
        items: [
          { year: "1943", event: "தொடக்கம்", description: "10 குடும்பங்களைக் கொண்ட ஒரு சிறிய கத்தோலிக்க சமூகத்தினர் குடிசை திருச்சபையை கட்டினர்." },
          { year: "1946", event: "துணை மையம் நிறுவப்பட்டது", description: "பிரகோட் சிலுவைப்புரம் பங்கின் துணை மையமாக அமைக்கப்பட்டது." },
          { year: "1975", event: "புதிய திருச்சபை ஆசீர்வதிக்கப்பட்டது", description: "புது செருப்பு 23 ம் 1975 இல் ஆசீர்வதிக்கப்பட்டது." },
          { year: "2002", event: "புதிய பங்கு அமைக்கப்பட்டது", description: "2002 ஆம் ஆண்டு புதிதாக பங்கு நிறுவப்பட்டது." },
          { year: "2009", event: "புதிய திருச்சபை கட்டப்பட்டது", description: "2009 ஆம் ஆண்டு புதிய திருச்சபை கட்டப்பட்டது." },
        ],
      },
    },
  };

  // Switch language
  const updateLanguage = () => {
    const data = languageData[currentLanguage];

    // Navbar
    document.getElementById("navbar-title").textContent = data.navbar.title;
    document.getElementById("nav-home").textContent = data.navbar.home;
    document.getElementById("nav-history").textContent = data.navbar.history;
    document.getElementById("nav-gallery").textContent = data.navbar.gallery;
    document.getElementById("nav-contact").textContent = data.navbar.contact;

    // Hero
    document.getElementById("hero-title").textContent = data.hero.title;
    document.getElementById("hero-description").textContent = data.hero.description;

    // Introduction
    document.getElementById("intro-title").textContent = data.intro.title;
    document.getElementById("intro-text").textContent = data.intro.text;

    // Timeline
    document.getElementById("timeline-title").textContent = data.timeline.title;
    const timelineContainer = document.getElementById("timeline-container");
    timelineContainer.innerHTML = ""; // Clear previous content
    data.timeline.items.forEach((item) => {
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
  };

  // Initial language setup
  updateLanguage();

  // Language toggle button
  const languageToggle = document.getElementById("language-toggle");
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ta" : "en";
    languageToggle.textContent =
      currentLanguage === "en" ? "Switch to Tamil" : "Switch to English";
    updateLanguage();
  });
});
