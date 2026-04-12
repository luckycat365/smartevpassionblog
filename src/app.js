function renderHomepage() {
  const container = document.getElementById('app-content');
  if(!container) return;

  let html = `
    <h2 style="font-size: 2.5rem;">Select a Manufacturer</h2>
    <p style="color: var(--text-muted); margin-bottom: 2rem;">Explore representative videos and dive into models.</p>
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

function navigateToBrand(id) {
  console.log("Navigate to", id);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderHomepage, navigateToBrand };
}

// Browser Initialization
if (typeof window !== 'undefined') {
  window.navigateToBrand = navigateToBrand;
  window.renderHomepage = renderHomepage;
  document.addEventListener('DOMContentLoaded', () => {
    if(typeof EVData !== 'undefined') renderHomepage();
  });
}
