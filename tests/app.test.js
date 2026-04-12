/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

global.EVData = [
  { id: 'test1', name: 'Test Brand', representativeVideoId: '12345', models: [] }
];

// Mock YouTube API
global.YT = {
    Player: jest.fn().mockImplementation(() => ({
        getPlayerState: jest.fn(),
        pauseVideo: jest.fn()
    })),
    PlayerState: { PLAYING: 1, PAUSED: 2 }
};

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
    expect(container.innerHTML).toContain('data-video-id="12345"');
  });

  test('Renders inner brand page', () => {
    const { renderBrandPage } = require('../src/app.js');
    renderBrandPage('test1');
    const container = document.getElementById('app-content');
    expect(container.innerHTML).not.toContain('Select a Manufacturer');
    expect(container.innerHTML).toContain('Test Brand');
    expect(container.innerHTML).toContain('Models');
  });
});
