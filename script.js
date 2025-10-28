// script.js
// Moves left/right with ArrowLeft/ArrowRight or A/D keys.

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("player");

  // Ensure parent is positioned so absolute positioning of element works
  const parent = el.offsetParent || el.parentElement || document.body;
  const parentStyle = getComputedStyle(parent);
  if (parentStyle.position === "static") parent.style.position = "relative";

  // Ensure the element can be positioned with left
  const elStyle = getComputedStyle(el);
  if (elStyle.position === "static") el.style.position = "absolute";

  // Initialize x from left css or offsetLeft
  let x = parseFloat(elStyle.left);
  if (Number.isNaN(x)) x = el.offsetLeft || 0;
  el.style.left = `${x}px`;

  const speed = 300; // px per second
  const keys = { left: false, right: false };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      keys.left = true;
      el.classList.toggle("player-flipped", true);
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      keys.right = true;
      el.classList.toggle("player-flipped", false);
      e.preventDefault();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
      keys.left = false;
    else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
      keys.right = false;
  });

  let last = performance.now();
  function clamp(val, a, b) {
    return Math.max(a, Math.min(b, val));
  }

  function step(now) {
    const dt = (now - last) / 1000;
    last = now;
    const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    el.classList.toggle("walking", dir !== 0); // Toggle animation based on movement
    if (dir !== 0) {
      x += dir * speed * dt;
      const maxX = Math.max(0, parent.clientWidth - el.offsetWidth);
      x = clamp(x, 0, maxX);
      el.style.left = `${x}px`;
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
});
