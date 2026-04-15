const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#C7F464"];

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t) {
  return t * t * t;
}

function mixColor(c1, c2, t) {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t))
  };
}

function rgbToString(c) {
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function animateNode(node) {
  if (node._animating) return;
  node._animating = true;

  const originalFill = node.getAttribute("fill") || "#ffffff";

  const from = hexToRgb(originalFill);
  const to = hexToRgb(randomItem(colors));

  /* 🔥 300% slower */
  const speedMultiplier = 3;

  const fadeInDuration = (300 + Math.random() * 400) * speedMultiplier;
  const holdDuration = (200 + Math.random() * 300) * speedMultiplier;
  const fadeOutDuration = (600 + Math.random() * 900) * speedMultiplier;

  let start = null;

  function frame(time) {
    if (!start) start = time;
    const elapsed = time - start;

    let color;

    if (elapsed < fadeInDuration) {
      const t = easeOutCubic(elapsed / fadeInDuration);
      color = mixColor(from, to, t);

    } else if (elapsed < fadeInDuration + holdDuration) {
      color = to;

    } else if (elapsed < fadeInDuration + holdDuration + fadeOutDuration) {
      const t = easeInCubic(
        (elapsed - fadeInDuration - holdDuration) / fadeOutDuration
      );
      color = mixColor(to, from, t);

    } else {
      node.style.fill = originalFill;
      node._animating = false;
      return;
    }

    node.style.fill = rgbToString(color);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function init() {
  const svg = document.querySelector("aside svg");

  if (!svg) {
    console.warn("SVG not found");
    return;
  }

  const nodes = svg.querySelectorAll("path");

  function loop() {
    /* 🔥 slower + softer burst */
    const burst = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < burst; i++) {
      const node = randomItem(nodes);
      animateNode(node);
    }

    /* 🔥 300% slower spawn rate */
    const next =
      (Math.random() * 180 + 60) * 3;

    setTimeout(loop, next);
  }

  loop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}