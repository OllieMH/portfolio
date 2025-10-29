// script.js

const CONFIG = {
  speed: 300, // pixels per second
  keys: {
    left: ["ArrowLeft", "a", "A"],
    right: ["ArrowRight", "d", "D"],
  },
};

class PlayerController {
  constructor(playerId) {
    this.player = document.getElementById(playerId);
    if (!this.player) {
      console.error(`Player element #${playerId} not found`);
      return;
    }

    this.setupPositioning();
    this.x = this.getInitialX();
    this.keys = { left: false, right: false };
    this.lastTime = performance.now();

    this.bindEvents();
    this.startAnimationLoop();
  }

  setupPositioning() {
    const parent =
      this.player.offsetParent || this.player.parentElement || document.body;
    const parentStyle = getComputedStyle(parent);
    if (parentStyle.position === "static") {
      parent.style.position = "relative";
    }

    const elStyle = getComputedStyle(this.player);
    if (elStyle.position === "static") {
      this.player.style.position = "absolute";
    }

    this.parent = parent;
  }

  getInitialX() {
    const elStyle = getComputedStyle(this.player);
    let x = parseFloat(elStyle.left);
    if (Number.isNaN(x)) {
      x = this.player.offsetLeft || 0;
    }
    this.player.style.left = `${x}px`;
    return x;
  }

  bindEvents() {
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  handleKeyDown(e) {
    if (CONFIG.keys.left.includes(e.key)) {
      this.keys.left = true;
      this.player.classList.add("player-flipped");
      e.preventDefault();
    } else if (CONFIG.keys.right.includes(e.key)) {
      this.keys.right = true;
      this.player.classList.remove("player-flipped");
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    if (CONFIG.keys.left.includes(e.key)) {
      this.keys.left = false;
    } else if (CONFIG.keys.right.includes(e.key)) {
      this.keys.right = false;
    }
  }

  update(deltaTime) {
    const direction = (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0);

    this.player.classList.toggle("walking", direction !== 0);

    if (direction !== 0) {
      this.x += direction * CONFIG.speed * deltaTime;
      this.x = this.clampPosition(this.x);
      this.player.style.left = `${this.x}px`;
    }
  }

  clampPosition(value) {
    const maxX = Math.max(0, this.parent.clientWidth - this.player.offsetWidth);
    return Math.max(0, Math.min(maxX, value));
  }

  startAnimationLoop() {
    const animate = (now) => {
      const deltaTime = (now - this.lastTime) / 1000;
      this.lastTime = now;

      this.update(deltaTime);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  getElement() {
    return this.player;
  }
}

class HotspotManager {
  constructor(playerElement) {
    this.player = playerElement;
    this.hotspots = [
      {
        trigger: document.querySelector(".hs-tree"),
        target: document.querySelector(".tree-obj"),
      },
      {
        trigger: document.querySelector(".hs-house"),
        target: document.querySelector(".house-obj"),
      },
    ].filter((hs) => hs.trigger && hs.target);

    this.setupCollisionDetection();
    this.setupInteractions();
  }

  setupCollisionDetection() {
    const checkCollisions = () => {
      this.hotspots.forEach(({ trigger, target }) => {
        const colliding = this.isColliding(this.player, trigger);
        target.classList.toggle("popped", colliding);
      });
      requestAnimationFrame(checkCollisions);
    };
    requestAnimationFrame(checkCollisions);
  }

  setupInteractions() {
    this.hotspots.forEach(({ trigger, target }) => {
      trigger.addEventListener("pointerenter", () => {
        target.classList.add("popped");
      });

      trigger.addEventListener("pointerleave", () => {
        target.classList.remove("popped");
      });

      trigger.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        target.classList.add("popped");
      });

      trigger.addEventListener("pointerup", () => {
        target.classList.remove("popped");
      });
    });
  }

  isColliding(elementA, elementB) {
    if (!elementA || !elementB) return false;

    const rectA = elementA.getBoundingClientRect();
    const rectB = elementB.getBoundingClientRect();

    return !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const playerController = new PlayerController("player");

  if (playerController.getElement()) {
    new HotspotManager(playerController.getElement());
  }
});
