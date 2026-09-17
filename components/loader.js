const COMPONENTS = {
  // UI
  "av-audio": "ui/s-audio.js",
  "av-spoiler": "ui/s-spoiler.js",
  "av-tabs": "ui/s-tabs.js",
  "av-tab": "ui/s-tab.js",
  "av-carousel": "ui/s-carousel.js",
  "av-copy": "ui/s-copy.js",
  "av-accordion": "ui/s-accordion.js",
  "s-filter": "ui/s-filter.js",
  
  // POSTS
  "av-rol": "posts/s-rol.js",
  "av-timeline": "posts/s-timeline.js",
  "av-event": "posts/s-event.js",
  "av-location": "posts/s-location.js",
  "av-search": "posts/s-search.js",
  "av-banner": "posts/s-banner.js",
  "av-cronologia": "posts/s-cronologia.js",
  "av-tema": "posts/s-tema.js",
  "av-playlist": "posts/s-playlist.js",

  // RPG
  "av-pnj": "rpg/av-pnj.js"
};

const loadingComponents = new Set();

function loadComponent(tag) {
  if (customElements.get(tag)) return;
  if (loadingComponents.has(tag)) return;

  const file = COMPONENTS[tag];
  if (!file) return;

  loadingComponents.add(tag);

  const componentUrl = new URL(file, import.meta.url);

  import(componentUrl.href)
    .then(module => {
      if (customElements.get(tag)) return;

      const component = module.default || module;
      customElements.define(tag, component);
    })
    .catch(error => {
      console.error(`Error cargando ${tag}`, error);
    })
    .finally(() => {
      loadingComponents.delete(tag);
    });
}

function scan(root = document) {
  if (root.nodeType !== Node.ELEMENT_NODE &&
      root.nodeType !== Node.DOCUMENT_NODE &&
      root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
    return;
  }

  if (
    root.nodeType === Node.ELEMENT_NODE &&
    root.tagName.includes("-")
  ) {
    loadComponent(root.tagName.toLowerCase());
  }

  root.querySelectorAll?.("*").forEach(element => {
    if (element.tagName.includes("-")) {
      loadComponent(element.tagName.toLowerCase());
    }
  });
}

scan();

new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      scan(node);
    });
  });
}).observe(document.body, {
  childList: true,
  subtree: true
});
