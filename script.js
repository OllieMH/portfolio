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
    // Collision detection between player and hotspots to trigger pop animations
    try {
      const playerEl = document.getElementById("player");
      const hsTree = document.querySelector(".hs-tree");
      const hsHouse = document.querySelector(".hs-house");
      const treeObj = document.querySelector(".tree-obj");
      const houseObj = document.querySelector(".house-obj");

      function isColliding(a, b) {
        if (!a || !b) return false;
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return !(
          ra.right < rb.left ||
          ra.left > rb.right ||
          ra.bottom < rb.top ||
          ra.top > rb.bottom
        );
      }

      // Toggle popped state based on overlap
      if (isColliding(playerEl, hsTree)) {
        treeObj && treeObj.classList.add("popped");
      } else {
        treeObj && treeObj.classList.remove("popped");
      }

      if (isColliding(playerEl, hsHouse)) {
        houseObj && houseObj.classList.add("popped");
      } else {
        houseObj && houseObj.classList.remove("popped");
      }
    } catch (err) {
      // Defensive: if anything fails, don't break the animation loop
      // console.error(err);
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

  // Also allow direct pointer/touch interaction with hotspots
  try {
    const hsTree = document.querySelector(".hs-tree");
    const hsHouse = document.querySelector(".hs-house");
    const treeObj = document.querySelector(".tree-obj");
    const houseObj = document.querySelector(".house-obj");

    if (hsTree) {
      hsTree.addEventListener(
        "pointerenter",
        () => treeObj && treeObj.classList.add("popped")
      );
      hsTree.addEventListener(
        "pointerleave",
        () => treeObj && treeObj.classList.remove("popped")
      );
      hsTree.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        treeObj && treeObj.classList.add("popped");
      });
      hsTree.addEventListener(
        "pointerup",
        () => treeObj && treeObj.classList.remove("popped")
      );
    }

    if (hsHouse) {
      hsHouse.addEventListener(
        "pointerenter",
        () => houseObj && houseObj.classList.add("popped")
      );
      hsHouse.addEventListener(
        "pointerleave",
        () => houseObj && houseObj.classList.remove("popped")
      );
      hsHouse.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        houseObj && houseObj.classList.add("popped");
      });
      hsHouse.addEventListener(
        "pointerup",
        () => houseObj && houseObj.classList.remove("popped")
      );
    }
  } catch (err) {
    // ignore
  }
});
