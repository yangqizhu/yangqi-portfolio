const mapEl = document.getElementById("map");
const locationTitle = document.getElementById("location-title");
const locationMeta = document.getElementById("location-meta");
const locationDesc = document.getElementById("location-desc");
const galleryEl = document.getElementById("gallery");
const musicBtn = document.getElementById("music-toggle");

const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const modalClose = document.getElementById("modal-close");

const themeToggle = document.getElementById("theme-toggle");

let currentAudio = null;
let currentTrip = null;

const trips = [
  {
    id: "Málaga",
    name: "Weekend Trip to Spain",
    coords: [36.7213, -4.4214],
    date: "March 2026",
    description: "Step into a lively and historically rich perl of Spain, if you get there... don't forget to try Vermouth! ",
    photos: [
      { src: "assets/photos/malaga1.JPG", caption: "The famous orange trees of Spain were decorating the streets shining under the sun." },
      { src: "assets/photos/malaga2.JPG", caption: "What I enjoy about discovering a new city is to take time wandering in its street and look at the art." },
      { src: "assets/photos/malaga3.JPG", caption: "There is something so comforting about people sitting outside and chattting over some tapas late in the evening." },
      { src: "assets/photos/malaga4.JPG", caption: "During the day the harbor is a popular place to discover, all the small stands selling handmade objects will lead to a sandy beach. " },
      { src: "assets/photos/malaga5.JPG", caption: "Spanish flag spotted! In front of the Picasso Museum..." }
    ]
  },
  {
    id: "Nanjing",
    name: "Summer in China",
    coords: [32.049999, 118.766670],
    date: "Summer 2023",
    description: "My hometown in China and home to many souls",
    photos: [
      { src: "assets/photos/Nanjing_1.jpeg", caption: "In summer time you can find lotus flowers blooming in various parks" },
      { src: "assets/photos/Nanjing_2.jpeg", caption: "I rarely was able to see a sunset in summertime due to the heat, everyone usually stays at home or in closed areas with air conditionner" },
      { src: "assets/photos/Nanjing_3.jpeg", caption: "People think of Shanghai when I say I am going to China, but the truth is China is full of outstanding landscapes, nature and unmatched culture" }
    ]
  },

  {
    id: "Dublin",
    name: "St Patrick's Day",
    coords: [ 53.350140, -6.266155],
    date: "March 2026",
    description: "The one event that you have to go to Dublin to experience at the fullest",
    photos: [
      { src: "assets/photos/dublin_1.JPG", caption: "In summer time you can find lotus flowers blooming in various parks." },
      { src: "assets/photos/dublin_2.jpg", caption: "I rarely was able to see a sunset in summertime due to the heat, everyone usually stays at home or in closed areas with air conditionner" },
      { src: "assets/photos/dublin_3.JPG", caption: "Dublin is known for being gloomy but that day the light relfecting on the jersey was a moment I had to capture. " },
      { src: "assets/photos/dublin_4.JPG", caption: "Happiness! Only seeing smiles during the parade and that's what we came for!" },
      { src: "assets/photos/dublin_5.JPG", caption: "Of course, I had to stop a minute to admire the street art, which Ireland is full of contrasting with the weather." },
    ]
  },
  
  {
    id: "Touquet",
    name: "Weekend at the beach in France",
    coords: [ 50.52015, 1.58669],
    date: "April 2026",
    description: "Touquet is one of my parents favorite place for a gateway",
    photos: [
      { src: "assets/photos/touquet.jpg", caption: "Behind is an art gallery that I wanted to visit with a little girl playing rollers passing by, and I thought this moment quite reflected happy moments of my childhood, with art and rollers." },
      { src: "assets/photos/touquet2.JPG", caption: "Since I have started taking pictures, angles and colors are very important to me and the orange and green next to each other was just perfect." },
      { src: "assets/photos/touquet3.JPG", caption: "Just a lovely day at the beach!" },
      { src: "assets/photos/touquet4.JPG", caption: "If you zoom closely, you can see in one frame two horses and a surfer behind, which is super cool!" },
      { src: "assets/photos/touquet5.JPG", caption: "Touquet is very famous for its dunes of sand where you can climb and enjoy the view of the beach." },
      { src: "assets/photos/touquet6.JPG", caption: "The Westminster hotel is the most famous and prestigious hotel of Touquet, where people often come just to take pictures of it." },
    ]
  }, 

  {
    id: "Keukenhof",
    name: "Day trip to see the tulips in the Netherlands",
    coords: [52.269386, 4.548342],
    date: "April 2026",
    description: "Travel 2 hours to see some tulips, sounds good to me!",
    photos: [
      { src: "assets/photos/Keukenhof1.jpeg", caption: "The color of this tulip was very special" },
      { src: "assets/photos/Keukenhof2.jpeg", caption: "The pink pops up so much more vividly with my camera" },
      { src: "assets/photos/Keukenhof3.jpeg", caption: "Beautiful rainbow over the water jet" },
      { src: "assets/photos/Keukenhof4.jpeg", caption: "My grandma took the same picture when she came to visit us so I had to take the same one after quite a few years." },
      { src: "assets/photos/Keukenhof5.jpeg", caption: "Poeple say that this tunnel is very popular and I can understand why, it is full of flowers of completely different colors" },
      { src: "assets/photos/Keukenhof6.jpeg", caption: "I can definitely say that after this trip my sister got obsessed with Miffy haha." },
    ]
  },

  {
    id: "Notting Hill",
    name: "Summer in Notting Hill, London",
    coords: [51.5094, -0.1969],
    date: "July 2026",
    description: "A pastel-coloured corner of London full of flowers, markets, and character",
    photos: [
      { src: "assets/photos/notting hill.JPG", caption: "Summer in London is my favorite season because you get to see beautiful flowers on the roads that are contrasting with the charms of London buildings." },
      { src: "assets/photos/notting hill2.JPG", caption: "Those are the famous colored Notting Hill houses that people travel to come see and I feel lucky to access this view whenever I want." },
      { src: "assets/photos/notting hill3.JPG", caption: "Portobello Market is my favorite market to go to on Sundays because it is so lively yet so local and you can find literally anything that you want or like." }
    ]
  },

  {
    id: "Mykonos",
    name: "First trip to Greece",
    coords: [37.450001, 25.35],
    date: "April 2025",
    description: "Mykonos off season is the best",
    photos: [
      { src: "assets/photos/mykonos1.jpeg", caption: "First picture that I took was this flag as a sign of excitement for my first trip to Greece." },
      { src: "assets/photos/mykonos2.jpeg", caption: "We climbed this small hill to end of at a church having a wondering view over the island." },
      { src: "assets/photos/mykonos3.jpeg", caption: "We were wandering around when I saw this light coming out of the window which I thought is very prone to a picture." },
      { src: "assets/photos/mykonos4.jpeg", caption: "Mykonos is thought to be warm and sunny but the truth is it is still an island with scenic ocean views during the rainy days." },
      { src: "assets/photos/mykonos5.jpeg", caption: "The famous Mykonos wind mills." },
      { src: "assets/photos/mykonos7.jpeg", caption: "I was very loving this color palette." },
    ]
  },

];

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (musicBtn) {
    musicBtn.textContent = "▶ Play Room Audio";
  }
}

function renderTrip(trip) {
  currentTrip = trip;
  locationTitle.textContent = trip.name;
  locationMeta.textContent = trip.date;
  locationDesc.textContent = trip.description;

  galleryEl.innerHTML = "";

  trip.photos.forEach((p) => {
    const card = document.createElement("figure");
    card.className = "photo-card";
    card.innerHTML = `
      <img src="${p.src}" alt="${p.caption}">
      <figcaption class="photo-caption">${p.caption}</figcaption>
    `;
    card.addEventListener("click", () => openModal(p.src, p.caption));
    galleryEl.appendChild(card);
  });

  stopCurrentAudio();
  if (musicBtn) {
    if (trip.audio && trip.audio.trim() !== "") {
      musicBtn.disabled = false;
    } else {
      musicBtn.disabled = true;
      musicBtn.textContent = "No Audio for This Room";
    }
  }
}

function openModal(src, caption) {
  modalImg.src = src;
  modalCaption.textContent = caption || "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!currentTrip || !currentTrip.audio) return;

    if (!currentAudio) {
      currentAudio = new Audio(currentTrip.audio);
      currentAudio.loop = true;
      currentAudio.play();
      musicBtn.textContent = "⏸ Pause Room Audio";
    } else if (currentAudio.paused) {
      currentAudio.play();
      musicBtn.textContent = "⏸ Pause Room Audio";
    } else {
      currentAudio.pause();
      musicBtn.textContent = "▶ Play Room Audio";
    }
  });
}

if (mapEl) {
  const map = L.map("map", {
    worldCopyJump: true,
    minZoom: 2,
    maxBounds: [[-85, -Infinity], [85, Infinity]],
    maxBoundsViscosity: 1.0
  }).setView([25, 10], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  trips.forEach((trip, i) => {
    const marker = L.marker(trip.coords).addTo(map);
    marker.bindPopup(`<b>${trip.name}</b><br>${trip.date}`);
    marker.on("click", () => renderTrip(trip));
    if (i === 0) renderTrip(trip);
  });
}

/* Theme toggle */
function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark");
}
applySavedTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  });
}