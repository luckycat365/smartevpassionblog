const EVData = [
  {
    id: 'byd',
    name: 'BYD',
    representativeVideoId: 'abQ3z3uCauo',
    image: 'src/assets/BYD brand pic.webp',
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
    image: 'src/assets/Mercedes brand pic.webp',
    description: 'Mercedes-Benz new EV design language brings their historic luxury legacy into the electric era with aerodynamic designs and opulent interiors.',
    models: [
      { id: 'glc-ev', name: 'GLC EV', videoId: '9gSWNybiE1c' }, 
      { id: 'cla-ev', name: 'CLA EV', videoId: 'wxs3AwL40as' },
      { id: 'vision-iconic', name: 'Vision Iconic', videoId: 'HKIBDda0Ptk' }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVData };
}
