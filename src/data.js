const EVData = [
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
  },
  {
    id: 'tesla',
    name: 'Tesla',
    image: 'src/assets/Tesla brand.jpg',
    description: 'Tesla leads the world in electric vehicle innovation, high-performance battery technology, and a global supercharging network that makes long-distance travel effortless.',
    models: [
      { id: 'model-3', name: 'Model 3 Performance', videoId: 'krQKnhMwxn4' },
      { id: 'model-y', name: 'Model Y', videoId: 'iPJDW5EaIzE' },
      { id: 'cybertruck', name: 'Cybertruck', videoId: 'DsonSEllPmU' }
    ]
  },
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
    id: 'huawei',
    name: 'Huawei',
    image: 'src/assets/Huawei brand pic.webp',
    description: 'Huawei Harmony Intelligent Mobility Alliance (HIMA) represents a powerful ecosystem of smart automotive sub-brands, bringing advanced HarmonyOS connectivity and autonomous driving intelligence to the road.',
    subBrands: [
      { id: 'aito', name: 'AITO 问界', videoId: '5-w-L_S-N8E', image: 'src/assets/Huawei subbrand AITO.jpg' },
      { id: 'luxeed', name: 'Luxeed 智界', videoId: 'vRE56v3N-i0', image: 'src/assets/Huawei subbrand Luxeed.webp' }, 
      { id: 'stelato', name: 'STELATO 享界', videoId: 'xP-L87R1S_c', image: 'src/assets/Huawei Subbrand Stelato.jpg' },
      { id: 'maextro', name: 'MAEXTRO 尊界', videoId: 'wlaZWRXgB_I', image: 'src/assets/Huawei Subbrand Maextro.png' },
      { id: 'avatr', name: 'AVATR 阿维塔', videoId: 'kP-Q2X9qW1w', image: 'src/assets/Huawei subbrand Avatr.webp' }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVData };
}
