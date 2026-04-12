const EVData = [
  {
    id: 'byd',
    name: 'BYD',
    representativeVideoId: 'abQ3z3uCauo',
    description: 'Build Your Dreams (BYD) has rapidly grown to become a dominant force in the global EV market. They blend affordability with impressive battery technology (Blade Battery).',
    models: [
      { id: 'seal', name: 'BYD Seal', videoId: 'heXMDCoPjHA' }, 
      { id: 'atto3', name: 'BYD Atto 3', videoId: 'YolSvZPMW0c' } 
    ]
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    representativeVideoId: 'Wa3V8f_iprY',
    description: 'Mercedes-Benz EQ line brings their historic luxury legacy into the electric era with aerodynamic designs and opulent interiors.',
    models: [
      { id: 'eqs', name: 'EQS Sedan', videoId: 'N9cWe8n6P8U' }, 
      { id: 'eqe', name: 'EQE SUV', videoId: 'vT3Ztd2W6q8' } 
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVData };
}
