const regionSelector = document.getElementById('region-selector');
const selectionList = document.getElementById('selection-list');
const placeholder = document.getElementById('placeholder');

const itemMap = new Map();

// Cache and remove all <li>
selectionList.querySelectorAll('li').forEach(li => {
  const input = li.querySelector('input');
  if (!input) return;

  const value = input.value;
  itemMap.set(value, li);

  li.remove();
});

// Placeholder
function updatePlaceholder() {
  const anyChecked = regionSelector.querySelector('input:checked');
  placeholder.classList.toggle('hidden', !!anyChecked);
}

// Insert in correct order
function addItem(value) {
  const li = itemMap.get(value);
  if (!li) return;

  // ✅ guarantee it's visible
  li.classList.remove('hidden');

  const index = parseInt(li.dataset.index, 10);
  const children = Array.from(selectionList.children);

  const insertBefore = children.find(child =>
    parseInt(child.dataset.index, 10) > index
  );

  selectionList.insertBefore(li, insertBefore || null);

  window.refreshSortableList?.();
}

// Remove item
function removeItem(value) {
  const li = itemMap.get(value);
  if (!li) return;

  li.remove();

  // 🔥 sync with drag system
  window.refreshSortableList?.();
}

// Select / deselect
regionSelector.addEventListener('change', (e) => {
  const input = e.target;
  if (!input.matches('input[type="checkbox"]')) return;

  const value = input.value;

  if (input.checked) {
    addItem(value);
  } else {
    removeItem(value);
  }

  updatePlaceholder();
});

// Remove button
selectionList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const li = btn.closest('li');
  if (!li) return;

  const input = li.querySelector('input');
  if (!input) return;

  const value = input.value;

  removeItem(value);

  const regionInput = regionSelector.querySelector(
    `input[value="${value}"]`
  );
  if (regionInput) {
    regionInput.checked = false;
  }

  updatePlaceholder();
});

// Init
updatePlaceholder();