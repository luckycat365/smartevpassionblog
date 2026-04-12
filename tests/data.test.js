const { EVData } = require('../src/data.js');

test('EVData contains BYD and Mercedes with video IDs', () => {
  const byd = EVData.find(b => b.id === 'byd');
  expect(byd.name).toBe('BYD');
  expect(byd.representativeVideoId).toBe('abQ3z3uCauo');
  
  const mercedes = EVData.find(b => b.id === 'mercedes');
  expect(mercedes.name).toBe('Mercedes-Benz');
  expect(mercedes.representativeVideoId).toBe('Wa3V8f_iprY');
});
