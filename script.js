const card = document.getElementById("characterCard");
const wrap = document.getElementById("characterWrap");
const speech = document.getElementById("speech");
const video = document.getElementById("characterVideo");

const normalVideo = "character.mp4";
const reactionVideo = "loop.mp4";

let reacting = false;
let reactionTimer;

card.addEventListener("mousemove", (e) => {
  const r = card.getBoundingClientRect();

  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;

  wrap.style.transform =
    `rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translate(${x * 8}px, ${y * 5}px)`;

  speech.textContent =
    x > 0.15 ? "Looking this way 👀" :
    x < -0.15 ? "Hi there! 👋" :
    "Welcome! ✨";

  // Play the reaction video when the visitor moves over the character.
  if (!reacting) {
    reacting = true;

    video.src = reactionVideo;
    video.loop = false;
    video.currentTime = 0;
    video.play().catch(() => {});

    clearTimeout(reactionTimer);

    reactionTimer = setTimeout(() => {
      video.src = normalVideo;
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(() => {});
      reacting = false;
    }, 5000);
  }
});

card.addEventListener("mouseleave", () => {
  wrap.style.transform =
    "rotateY(0deg) rotateX(0deg) translate(0,0)";

  speech.textContent = "Hello! 👋";
});
