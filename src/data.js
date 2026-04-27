export const EVData = [
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    representativeVideoId: 'Wa3V8f_iprY',
    image: '/smartevblog/assets/Mercedes brand pic.webp',
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
    image: '/smartevblog/assets/Tesla brand.jpg',
    description: 'Tesla leads the world in electric vehicle innovation, high-performance battery technology, and a global supercharging network that makes long-distance travel effortless.',
    subBrands: [
      {
        id: 'fleet',
        name: 'Model Fleet',
        image: '/smartevblog/assets/Tesla brand.jpg',
        models: [
          { id: 'model-3', name: 'Model 3 Performance', videoId: 'krQKnhMwxn4' },
          { id: 'model-y', name: 'Model Y', videoId: 'iPJDW5EaIzE' },
          { id: 'cybertruck', name: 'Cybertruck', videoId: 'DsonSEllPmU' }
        ]
      },
      {
        id: 'fsd',
        name: 'Tesla FSD',
        image: '/smartevblog/assets/TeslaFSDPicture.webp',
        models: [
          { id: 'fsd-14-3', name: 'FSD V14.3', videoId: 'oV-fAXaWqhg' }
        ]
      },
      {
        id: 'optimus',
        name: 'Optimus',
        image: '/smartevblog/assets/optimuspicture.webp',
        models: [
          { id: 'optimus-v2', name: 'Optimus Gen 2', videoId: 'cpraXaw7dyc' }
        ]
      }
    ]
  },
  {
    id: 'nio',
    name: 'NIO',
    image: '/smartevblog/assets/Nio brand.webp',
    description: 'NIO is a pioneer in the premium smart electric vehicle market, renowned for its innovative battery as a service (BaaS) and luxury autonomous driving experiences.',
    models: [
      { id: 'es9', name: 'Nio ES9', videoId: 'X4Pn9m2sEYA' }
    ]
  },
  {
    id: 'xpeng',
    name: 'XPENG',
    image: '/smartevblog/assets/xpeng brand.jpg',
    description: 'XPENG is a leading AI car company that designs, develops, manufactures and markets smart electric vehicles that appeal to the large and growing base of technology-savvy consumers.',
    models: [
      { id: 'p7', name: 'Xpeng P7', videoId: 'uELL3fAwlwU' }
    ]
  },
  {
    id: 'byd',
    name: 'BYD',
    representativeVideoId: 'abQ3z3uCauo',
    image: '/smartevblog/assets/BYD brand pic.webp',
    description: 'Build Your Dreams (BYD) has rapidly grown to become a dominant force in the global EV market. They blend affordability with impressive battery technology (Blade Battery).',
    models: [
      { id: 'seal', name: 'BYD Seal', videoId: 'heXMDCoPjHA' }, 
      { id: 'atto3', name: 'BYD Atto 3', videoId: 'YolSvZPMW0c' } 
    ]
  },
  {
    id: 'huawei',
    name: 'Huawei',
    image: '/smartevblog/assets/Huawei brand pic.webp',
    description: 'Huawei Harmony Intelligent Mobility Alliance (HIMA) represents a powerful ecosystem of smart automotive sub-brands, bringing advanced HarmonyOS connectivity and autonomous driving intelligence to the road.',
    subBrands: [
      { 
        id: 'aito', 
        name: 'AITO 问界', 
        videoId: '5-w-L_S-N8E', 
        image: '/smartevblog/assets/Huawei subbrand AITO.jpg',
        models: [
          { id: 'aito-m9', name: 'AITO M9', videoId: 'NJTbeBhdEy0' }
        ]
      },
      { 
        id: 'luxeed', 
        name: 'Luxeed 智界', 
        videoId: 'vRE56v3N-i0', 
        image: '/smartevblog/assets/Huawei subbrand Luxeed.webp',
        models: [
          { id: 'luxeed-r7', name: 'Luxeed R7', videoId: '5T2S9TSDL_A' }
        ]
      }, 
      { 
        id: 'stelato', 
        name: 'STELATO 享界', 
        videoId: 'xP-L87R1S_c', 
        image: '/smartevblog/assets/Huawei Subbrand Stelato.jpg',
        models: [
          { id: 'stelato-s9', name: 'Stelato S9', videoId: 'YKfUGnFYcJI' }
        ]
      },
      { id: 'maextro', name: 'MAEXTRO 尊界', videoId: 'wlaZWRXgB_I', image: '/smartevblog/assets/Huawei Subbrand Maextro.png' },
      { 
        id: 'avatr', 
        name: 'AVATR 阿维塔', 
        videoId: 'kP-Q2X9qW1w', 
        image: '/smartevblog/assets/Huawei subbrand Avatr.webp',
        models: [
          { id: 'avatr-06', name: 'Avatr 06 Touring', videoId: 'TIKZPDa-KsY' }
        ]
      }
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    image: '/smartevblog/assets/Xiaomi-brand.png',
    description: 'Xiaomi brings its consumer electronics expertise into the EV arena, delivering tech-forward smart electric vehicles that combine performance, cutting-edge connectivity, and remarkable value.',
    models: [
      { id: 'su7', name: 'Xiaomi Su7', videoId: 'xERGYnl_iZA' },
      { id: 'yu7', name: 'Xiaomi Yu7', videoId: 'MbWfVSutS4A' }
    ]
  },
  {
    id: 'geely',
    name: 'Geely',
    image: '/smartevblog/assets/Geely Brand.jpg',
    description: 'Geely Holding Group is a global automotive powerhouse, leading the way in electrification and smart mobility through its diverse portfolio of innovative brands.',
    subBrands: [
      { 
        id: 'zeekr', 
        name: 'Zeekr', 
        videoId: 'h8R2C6mP3gI', 
        image: '/smartevblog/assets/Zeekr brand.jpg',
        models: [
          { id: 'zeekr-9x', name: 'Zeekr 9X', videoId: 'N8oMK898K2I' }
        ]
      }, 
      {
        id: 'lynkco',
        name: 'Lynk & Co',
        videoId: 'tWc2P7VnNnU',
        image: '/smartevblog/assets/LynkCo brand pic.jpg',
        models: [
          { id: 'lynkco-z10', name: 'Lynk & Co Z10', videoId: 'WsLi6_8wpKU' }
        ]
      },
      {
        id: 'galaxy',
        name: 'Galaxy',
        videoId: 'yv1Xn0D0f8I',
        image: '/smartevblog/assets/Geely Galaxy brand pic.webp',
        models: [
          { id: 'galaxy-m9', name: 'Galaxy M9', videoId: 'R4Eg6XFeM1Y' }
        ]
      }
    ]
  }
];
