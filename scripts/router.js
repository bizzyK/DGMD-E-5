const content = document.getElementById("content");

const routes = {
  "#home": "partials/home.html",
  "#about": "partials/about.html",
  "#media": "partials/media.html",
  "#presentation": "partials/presentation.html",
};

function loadPage(hash) {
  const route = routes[hash] || routes["#home"];
  fetch(route)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
    })
    .catch(() => {
      content.innerHTML = "<p>Page not found.</p>";
    });
}

window.addEventListener("hashchange", () => {
  loadPage(window.location.hash);
});

window.addEventListener("DOMContentLoaded", () => {
  loadPage(window.location.hash || "#home");
});

// Cycling through 3 placeholder images (placeholder1.png to placeholder3.png)
const photos = [...Array(3).keys()].map(i => `images/placeholder${i + 1}.png`);
let current = 0;

function updatePhoto() {
  document.getElementById('stepper-img').src = photos[current];
}

function prevPhoto() {
  current = (current - 1 + photos.length) % photos.length;
  updatePhoto();
}

function nextPhoto() {
  current = (current + 1) % photos.length;
  updatePhoto();
}