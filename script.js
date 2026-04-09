// Only runs on travel page where #map exists
const mapEl = document.getElementById("map");
const locationTitle = document.getElementById("location-title");
const locationMeta = document.getElementById("location-meta");
const locationDesc = document.getElementById("location-desc");
const galleryEl = document.getElementById("gallery");

const trips = [
  {
    id: "málaga",
    name: "málaga, Spain",
    coords: [36.719444, -4.420000],
    date: "March 2026",
    description: "Málaga is sunlight, sea air, and stories in stone—an artsy Mediterranean city where history, color, and everyday life blend beautifully.",
    photos: [
      { src: "assets/photos/malaga1.JPG", caption: "Spanish orange trees" },
      { src: "assets/photos/malaga2.JPG", caption: "Little statues wandering in the streets of málaga" },
      { src: "assets/photos/malaga3.JPG", caption: "Traditional restaurant" },
      { src: "assets/photos/malaga4.JPG", caption: "Seaside Terrace" },
      { src: "assets/photos/malaga5.JPG", caption: "Spanish flag throning the alley" },
    ]
  },
 
];

function renderTrip(trip) {
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
    galleryEl.appendChild(card);
  });
}

if (mapEl) {
  const map = L.map("map", {
    worldCopyJump: true
  }).setView([25, 10], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  trips.forEach((trip, index) => {
    const marker = L.marker(trip.coords).addTo(map);
    marker.bindPopup(`<b>${trip.name}</b><br/>${trip.date}`);
    marker.on("click", () => renderTrip(trip));

    // Show first trip by default
    if (index === 0) renderTrip(trip);
  });
}