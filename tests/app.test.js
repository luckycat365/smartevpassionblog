/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

global.EVData = [
  { id: 'test1', name: 'Test Brand', representativeVideoId: '12345', models: [] }
];

describe('App Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="app-content"></main>';
    require('../src/app.js');
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Renders homepage grid of brands', () => {
    const { renderHomepage } = require('../src/app.js');
    renderHomepage();
    const container = document.getElementById('app-content');
    expect(container.innerHTML).toContain('Test Brand');
    expect(container.innerHTML).toContain('youtube.com/embed/12345');
  });
});
