function renderHomepage() {
  const container = document.getElementById('app-content');
  if(!container) return;

  let html = `
    <div class="glass-panel">
      <h2 style="font-size: 2.5rem; margin: 0;">Select a Manufacturer</h2>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Explore representative videos and dive into models.</p>
    </div>
    <div class="grid-container">
  `;

  if(typeof EVData !== 'undefined') {
    EVData.forEach(brand => {
      html += `
        <div class="card brand-card" data-id="${brand.id}" onclick="navigateToBrand('${brand.id}')">
          <div class="card-video">
            <iframe src="https://www.youtube.com/embed/${brand.representativeVideoId}?rel=0" loading="lazy" allowfullscreen></iframe>
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
    renderHomepage();
    return;
  }

  let html = `
    <div class="glass-panel">
      <button onclick="renderHomepage()" style="background:var(--card-bg); color:var(--text-main); border:1px solid #333; padding:10px 20px; border-radius:8px; cursor:pointer; font-weight:bold; margin-bottom: 20px; transition: 0.2s;">
        &larr; Back to Brands
      </button>
      <h2 style="font-size: 2.8rem; color: var(--accent); line-height: 1; margin-bottom: 1rem;">${brand.name}</h2>
      <p style="color: var(--text-main); font-size: 1.2rem; max-width: 900px;">
        ${brand.description || ''}
      </p>
    </div>
    <h3 style="margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 1rem;">${brand.name} Models</h3>
    <div class="grid-container">
  `;

  if(brand.models && brand.models.length > 0) {
    brand.models.forEach(model => {
      html += `
        <div class="card model-card">
          <div class="card-video">
            <iframe src="https://www.youtube.com/embed/${model.videoId}?rel=0" loading="lazy" allowfullscreen></iframe>
          </div>
          <div class="card-title" style="font-size: 1rem;">${model.name}</div>
        </div>
      `;
    });
  } else {
    html += `<p style="color: var(--text-muted);">No models added yet.</p>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function navigateToBrand(id) {
  renderBrandPage(id);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderHomepage, renderBrandPage, navigateToBrand };
}

// Browser Initialization
if (typeof window !== 'undefined') {
  window.navigateToBrand = navigateToBrand;
  window.renderHomepage = renderHomepage;
  window.renderBrandPage = renderBrandPage;
  
  document.addEventListener('DOMContentLoaded', () => {
    if(typeof EVData !== 'undefined') renderHomepage();
    
    // Attach logo handler
    const logo = document.getElementById('logo');
    if(logo) {
      logo.addEventListener('click', () => renderHomepage());
    }
  });
}
