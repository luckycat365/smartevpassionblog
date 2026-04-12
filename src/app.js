let players = [];

function clearPlayers() {
  players = [];
}

function initYouTubePlayers() {
  const placeholders = document.querySelectorAll('.yt-placeholder');
  placeholders.forEach((el, index) => {
    const videoId = el.getAttribute('data-video-id');
    const player = new YT.Player(el, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        'rel': 0,
        'modestbranding': 1
      },
      events: {
        'onStateChange': (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            players.forEach(p => {
              if (p !== player && p.getPlayerState() === YT.PlayerState.PLAYING) {
                p.pauseVideo();
              }
            });
          }
        }
      }
    });
    players.push(player);
  });
}

// Router Logic
function handleRoute() {
  // Normalize path: remove leading # and /
  const path = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  const parts = path.split('/').filter(p => p !== '');

  console.log('Routing to parts:', parts);

  if (parts.length === 0) {
    renderHomepage();
  } else if (parts.length === 1) {
    renderBrandPage(parts[0]);
  } else if (parts.length === 2) {
    renderSubBrandPage(parts[0], parts[1]);
  } else {
    renderHomepage();
  }
}

function navigateTo(path) {
    window.location.hash = '/' + path.replace(/^\//, '');
}

function renderHomepage() {
  const container = document.getElementById('app-content');
  if(!container) return;
  
  clearPlayers();

  let html = `
    <div class="grid-container">
  `;

  if(typeof EVData !== 'undefined') {
    EVData.forEach(brand => {
      html += `
        <div class="card brand-card" onclick="navigateTo('${brand.id}')">
          <div class="card-video">
            <img src="${brand.image}" alt="${brand.name}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div class="card-title">${brand.name}</div>
        </div>
      `;
    });
  }

  html += `</div>`;
  container.innerHTML = html;
}

function renderBrandPage(brandId) {
  const container = document.getElementById('app-content');
  if(!container || typeof EVData === 'undefined') return;

  const brand = EVData.find(b => b.id === brandId);
  if(!brand) {
    console.error('Brand not found:', brandId);
    navigateTo('');
    return;
  }
  
  clearPlayers();

  let html = `
      <div class="glass-panel">
        <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1rem;">${brand.name}</h2>
        <p style="color: var(--text-main); font-size: 1.2rem; max-width: 900px; margin-bottom: 1.5rem;">
          ${brand.description || ''}
        </p>
        <button onclick="navigateTo('')" class="back-button">
          &larr; Back to Brands
        </button>
      </div>
  `;

  if (brand.subBrands) {
    html += `
      <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">Select a Sub-Brand</h3>
      <div class="grid-container">
    `;
    brand.subBrands.forEach(sub => {
      html += `
        <div class="card brand-card" onclick="navigateTo('${brand.id}/${sub.id}')">
          <div class="card-video">
             <img src="${sub.image}" alt="${sub.name}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div class="card-title">${sub.name}</div>
        </div>
      `;
    });
  } else if (brand.models) {
    html += `
      <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">${brand.name} Models</h3>
      <div class="grid-container">
    `;
    brand.models.forEach(model => {
      html += `
        <div class="card model-card" style="cursor: default;">
          <div class="card-video">
            <div class="yt-placeholder" data-video-id="${model.videoId}"></div>
          </div>
          <div class="card-title" style="font-size: 1rem;">${model.name}</div>
        </div>
      `;
    });
  } else {
    html += `<p style="color: var(--text-muted);">No content added yet.</p>`;
  }

  html += `</div>`;
  container.innerHTML = html;
  
  if (typeof YT !== 'undefined' && YT.Player) {
    initYouTubePlayers();
  }
}

function renderSubBrandPage(brandId, subBrandId) {
    const container = document.getElementById('app-content');
    if(!container || typeof EVData === 'undefined') return;

    const brand = EVData.find(b => b.id === brandId);
    if(!brand || !brand.subBrands) return;

    const sub = brand.subBrands.find(s => s.id === subBrandId);
    if(!sub) return;

    clearPlayers();

    let html = `
      <div class="glass-panel">
        <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1.5rem;">${sub.name}</h2>
        <button onclick="navigateTo('${brandId}')" class="back-button">
          &larr; Back to ${brand.name}
        </button>
      </div>
      <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">Models View</h3>
      <div class="grid-container">
    `;

    if (sub.models && sub.models.length > 0) {
      sub.models.forEach(model => {
        html += `
          <div class="card model-card" style="cursor: default;">
            <div class="card-video">
              <div class="yt-placeholder" data-video-id="${model.videoId}"></div>
            </div>
            <div class="card-title" style="font-size: 1rem;">${model.name}</div>
          </div>
        `;
      });
    } else {
      html += `
        <div class="card model-card" style="cursor: default;">
          <div class="card-video">
            <div class="yt-placeholder" data-video-id="${sub.videoId}"></div>
          </div>
          <div class="card-title" style="font-size: 1rem;">Representative Curation</div>
        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;
    if (typeof YT !== 'undefined' && YT.Player) {
        initYouTubePlayers();
    }
}

// Global Callback for YouTube API
window.onYouTubeIframeAPIReady = function() {
  if (typeof window !== 'undefined' && typeof EVData !== 'undefined') {
      handleRoute();
  }
};

// Browser Initialization
if (typeof window !== 'undefined') {
  window.navigateTo = navigateTo;
  window.renderHomepage = renderHomepage;
  window.renderBrandPage = renderBrandPage;
  window.renderSubBrandPage = renderSubBrandPage;
  
  window.addEventListener('hashchange', handleRoute);

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof YT !== 'undefined' && YT.Player) {
       handleRoute();
    }
    
    // Attach logo handler
    const logo = document.getElementById('logo');
    if(logo) {
      logo.addEventListener('click', () => navigateTo(''));
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderHomepage, renderBrandPage, navigateTo };
}
