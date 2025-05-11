const content = document.getElementById("content");

const routes = {
    "#home": "partials/home.html",
    "#mission": "partials/mission.html",
    "#film": "partials/film.html",
    "#involved": "partials/involved.html",
    "#resources": "partials/resources.html",
    "#news": "partials/news.html",
    "#presentation": "partials/presentation.html",
    "#contact": "partials/contact.html",
};

function loadPage(hash) {
    const route = routes[hash] || routes["#home"];
    fetch(route)
        .then(res => res.text())
        .then(html => {
            const audio = document.getElementById("ambient-audio");
            const wasPlaying = audio && !audio.paused;

            content.innerHTML = html;

            const track = document.querySelector('.carousel-track');
            if (track) {
                const images = track.querySelectorAll('img');
                let index = 0;

                document.querySelector('.next')?.addEventListener('click', () => {
                    index = (index + 1) % images.length;
                    track.style.transform = `translateX(-${index * 100}%)`;
                });

                document.querySelector('.prev')?.addEventListener('click', () => {
                    index = (index - 1 + images.length) % images.length;
                    track.style.transform = `translateX(-${index * 100}%)`;
                });
            }

            if (wasPlaying && audio && audio.paused) {
                audio.paused = false;
                audio.play();
            }

            if (typeof emailjs !== "undefined") {
                console.log("emailjs is", typeof emailjs);
                emailjs.init("_cbPRUv5xc4rPx0bA");

                const form = document.getElementById("contact-form");
                if (form) {
                    form.addEventListener("submit", function (event) {
                        event.preventDefault();

                        emailjs.sendForm("service_a5zfyk9", "template_qambcpm", form)
                            .then(function () {
                                const status = document.getElementById("email-status");
                                if (status) {
                                    status.innerHTML = "Message sent successfully!";
                                    status.style.color = "green";
                                }
                                form.reset();
                            }, function (error) {
                                const status = document.getElementById("email-status");
                                if (status) {
                                    status.innerHTML = "Failed to send message. Please try again.";
                                    status.style.color = "red";
                                }
                                console.error("EmailJS error:", error);
                            });
                    });
                }
            }
        })
        .catch(() => {
            content.innerHTML = "<p>Page not found.</p>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // Load the initial page
    loadPage(window.location.hash || "#home");

    // Set up audio toggle
    const audio = document.getElementById("ambient-audio");
    const toggle = document.getElementById("audio-toggle");

    if (audio && toggle) {
        audio.volume = 0.4;
        audio.loop = true;
        toggle.innerHTML = audio.paused
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M8 5v14l11-7z"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

        toggle.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
            } else {
                audio.pause();
                toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M8 5v14l11-7z"/></svg>';
            }
        });
    }
});

window.addEventListener("hashchange", () => {
    loadPage(window.location.hash);
});
