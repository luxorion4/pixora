const categories = {
  wallpapers:{title:'Wallpapers',folder:'wallpapers',prefix:'wallpaper'},
  paysages:{title:'Paysages',folder:'paysages',prefix:'paysage'},
  voitures:{title:'Voitures',folder:'voitures',prefix:'voiture'},
  technologie:{title:'Technologie',folder:'technologie',prefix:'technologie'},
  nourriture:{title:'Nourriture',folder:'nourriture',prefix:'nourriture'},
  sport:{title:'Sport',folder:'sport',prefix:'sport'},
  voyage:{title:'Voyage',folder:'voyage',prefix:'voyage'},
  mode:{title:'Mode',folder:'mode',prefix:'mode'},
  animaux:{title:'Animaux',folder:'animaux',prefix:'animaux'}
};

function openPreview(src, alt) {
  let modal = document.getElementById('image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.className = 'image-modal';
    modal.innerHTML = `<button class='close' aria-label='Fermer'>✕</button><img alt='' />`;
    document.body.appendChild(modal);
    modal.querySelector('.close').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('mousemove', (e) => {
      const rect = modal.querySelector('img').getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        modal.classList.remove('active');
      }
    });
  }
  const img = modal.querySelector('img');
  img.src = src;
  img.alt = alt;
  modal.classList.add('active');
}

function generateImages(folder, prefix, number) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 1; i <= number; i += 1) {
    const card = document.createElement('article');
    card.className = 'card';
    const img = document.createElement('img');
    const uppercasePrefix =
      (folder === 'mode' && i >= 2) ||
      (folder === 'sport' && i >= 2) ||
      folder === 'technologie' ||
      (folder === 'voitures' && i >= 6) ||
      (folder === 'voyage' && i !== 1 && i !== 17);
    const filenamePrefix = uppercasePrefix ? prefix.toUpperCase() : prefix;
    img.src = `images/${folder}/${filenamePrefix}${i}.jpg`;
    img.alt = `${prefix} ${i}`;
    img.onerror = () => {
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%231f2937"/%3E%3Ctext x="200" y="130" fill="%23f8fafc" font-size="20" font-family="Arial, sans-serif" text-anchor="middle"%3EImage non disponible%3C/text%3E%3C/svg%3E';
      dl.style.display = 'none';
      img.style.filter = 'grayscale(60%)';
    };

    let hoverTimer = null;
    img.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        openPreview(img.src, img.alt);
      }, 2000);
    });
    img.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });

    const body = document.createElement('div');
    body.className = 'card-body';
    const h3 = document.createElement('h3');
    h3.className = 'card-title';
    h3.textContent = `${prefix} ${i}`;
    const sub = document.createElement('p');
    sub.className = 'card-sub';
    sub.textContent = `Catégorie ${folder}`;
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const dl = document.createElement('a');
    dl.href = img.src;
    dl.textContent = 'Télécharger';
    dl.download = `${prefix}${i}.jpg`;
    actions.appendChild(dl);
    body.appendChild(h3);
    body.appendChild(sub);
    body.appendChild(actions);
    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (!page || page === 'index') return;
  const meta = categories[page];
  if (!meta) return;
  const title = document.getElementById('page-title');
  if (title) title.textContent = `Galerie ${meta.title}`;
  generateImages(meta.folder, meta.prefix, 30);
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return;

  // Charger le thème sauvegardé
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }

  // Changer le thème
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    toggle.textContent = isLight ? "☀️" : "🌙";

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
// Loader : cacher quand la page est chargée
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});
// Scroll reveal
function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-reveal");
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
