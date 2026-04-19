(() => {
  const list = document.querySelector("ol[aria-label]");
  const announcer = document.getElementById("sr-announcer");

  if (!list) return;

  let items = Array.from(list.querySelectorAll("li"));
  let activeIndex = null;
  let dragged = null;

  const announce = (msg) => {
    if (!announcer) return;
    announcer.textContent = "";
    setTimeout(() => (announcer.textContent = msg), 10);
  };

  const getItems = () =>
    Array.from(list.querySelectorAll("li"));

  const updateRanks = () => {
    items = getItems();

    items.forEach((el, i) => {
      const rank = el.querySelector("[data-rank]");
      if (rank) rank.textContent = i + 1;
      el.dataset.index = i;
    });
  };

  // 🔥 SINGLE SOURCE OF TRUTH FOR REORDER + ANNOUNCEMENTS
  const swap = (from, to) => {
    if (to < 0 || to >= items.length) return;

    const fromEl = items[from];
    const toEl = items[to];
    if (!fromEl || !toEl) return;

    const label =
      fromEl.querySelector("[data-rank]")?.textContent || "";

    if (from < to) {
      list.insertBefore(toEl, fromEl);
    } else {
      list.insertBefore(fromEl, toEl);
    }

    updateRanks();

    // ♿ announce EVERY reorder (keyboard + drag + touch)
    announce(`Moved item ${label} to position ${to + 1}`);
  };

  const focusItem = (i) => {
    const el = items[i];
    if (el) el.focus();
  };

  // -------------------------
  // Keyboard support
  // -------------------------
  list.addEventListener("keydown", (e) => {
    const el = e.target.closest("li");
    if (!el) return;

    let index = Number(el.dataset.index);

    if (Number.isNaN(index)) {
      updateRanks();
      index = Number(el.dataset.index);
    }

    // PICK UP / DROP
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (activeIndex === null) {
        activeIndex = index;

        el.setAttribute("aria-selected", "true");
        el.classList.add("focus-visible:ring-aqua");
        el.classList.remove("focus-visible:ring-white");

        announce(`Picked up item ${index + 1}`);
      } else {
        const activeEl = items[activeIndex];

        if (activeEl) {
          activeEl.setAttribute("aria-selected", "false");
          activeEl.classList.remove("focus-visible:ring-aqua");
          activeEl.classList.add("focus-visible:ring-white");
        }

        activeIndex = null;
        announce("Dropped item");
      }
    }

    // MOVE UP
    if (activeIndex !== null && e.key === "ArrowUp") {
      e.preventDefault();

      swap(activeIndex, activeIndex - 1);
      activeIndex = activeIndex - 1;

      focusItem(activeIndex);
    }

    // MOVE DOWN
    if (activeIndex !== null && e.key === "ArrowDown") {
      e.preventDefault();

      swap(activeIndex, activeIndex + 1);
      activeIndex = activeIndex + 1;

      focusItem(activeIndex);
    }
  });

  // -------------------------
  // Pointer drag (swap-based)
  // -------------------------
  list.addEventListener("dragstart", (e) => {
    const el = e.target.closest("li");
    if (!el) return;

    dragged = el;
    el.classList.add("opacity-50");

    const label = el.querySelector("[data-rank]")?.textContent;
    announce(`Picked up item ${label}`);
  });

  list.addEventListener("dragend", () => {
    if (dragged) dragged.classList.remove("opacity-50");

    announce("Item dropped");
    dragged = null;
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();

    const target = e.target.closest("li");
    if (!target || target === dragged) return;
    if (!dragged) return;

    const from = Number(dragged.dataset.index);
    const to = Number(target.dataset.index);

    swap(from, to);
  });

  // enable dragging
  getItems().forEach((el) => (el.draggable = true));

  // initial sync
  updateRanks();

  // expose a refresh hook
window.refreshSortableList = () => {
  items = getItems();
  items.forEach((el) => (el.draggable = true));
  updateRanks();
};
})();
