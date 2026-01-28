/* ---------------- PAGE NAV ---------------- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ---------------- SETTINGS ---------------- */
const root = document.documentElement;

/* Restore */
root.dataset.text = localStorage.getItem('text') || 'normal';

/* Text size */
document.getElementById('textSize').addEventListener('change', e => {
  root.dataset.text = e.target.value;
  localStorage.setItem('text', e.target.value);
});

/* ---------------- CHECKLIST DATA ---------------- */
const OLL_COUNT = 57;
const PLL_COUNT = 21;

const ollList = document.getElementById('ollList');
const pllList = document.getElementById('pllList');

const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');

/* Create lists */
function createList(type, count, container) {
  const saved = JSON.parse(localStorage.getItem(type)) || {};
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const row = document.createElement('div');
    row.className = 'alg-item';
    if (saved[i]) row.classList.add('completed');

    const cb = document.createElement('md-checkbox');
    cb.checked = !!saved[i];

    cb.addEventListener('change', () => {
      saved[i] = cb.checked;
      localStorage.setItem(type, JSON.stringify(saved));
      row.classList.toggle('completed', cb.checked);
      updateProgress();
    });

    row.append(cb, `${type.toUpperCase()} ${i}`);
    container.appendChild(row);
  }
}

createList('oll', OLL_COUNT, ollList);
createList('pll', PLL_COUNT, pllList);

/* Progress */
function updateProgress() {
  const active = document.querySelector('#algTabs md-segmented-button[selected]').value;
  const data = JSON.parse(localStorage.getItem(active)) || {};
  const total = active === 'oll' ? OLL_COUNT : PLL_COUNT;
  const done = Object.values(data).filter(Boolean).length;

  progressText.textContent = `${done} / ${total} completed`;
  progressBar.value = done / total;
}

updateProgress();

/* Tab switch */
document.getElementById('algTabs').addEventListener('change', e => {
  ollList.classList.toggle('hidden', e.target.value !== 'oll');
  pllList.classList.toggle('hidden', e.target.value !== 'pll');
  updateProgress();
});
