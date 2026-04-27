/**
 * @jest-environment jsdom
 */

const EVData = [
  { id: 'mercedes', name: 'Mercedes-Benz', image: 'test.png', models: [{ id: 'glc-ev', name: 'GLC EV', videoId: 'abc' }] }
];

describe('EVData shape', () => {
  test('each brand has id, name, image', () => {
    EVData.forEach(brand => {
      expect(brand.id).toBeDefined();
      expect(brand.name).toBeDefined();
      expect(brand.image).toBeDefined();
    });
  });

  test('brands with models have videoId on each model', () => {
    EVData.filter(b => b.models).forEach(brand => {
      brand.models.forEach(model => {
        expect(model.videoId).toBeDefined();
      });
    });
  });
});
