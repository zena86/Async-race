export default class CarGenerator {
  private brands: { name: string; models: string[] }[];

  constructor() {
    this.brands = [
      {
        name: 'Skoda',
        models: [
          'CITIGO',
          'FABIA',
          'KAMIQ',
          'KAROQ',
          'KODIAQ',
          'KUSHAQ',
          'OCTAVIA',
          'RAPID',
          'ROOMSTER',
          'SCALA',
          'SUNROQ',
          'SUPERB',
          'YETI',
        ],
      },
      {
        name: 'BMW',
        models: [
          'X7',
          'M5 Competition',
          '8-Series',
          'Z4',
          'I8',
          '1-Series M Coupe',
          'M3 E92',
          '4-Series',
          'X1',
          '7-Series',
        ],
      },
      {
        name: 'Audi',
        models: [
          'A5/S5',
          'Q7',
          'A7',
          'A8',
          'Q5',
          'A4',
          'R8',
          'Q8',
          'E-Tron',
          'RS6',
        ],
      },
      {
        name: 'Tesla',
        models: [
          'Model S',
          'Model 3',
          'Model X',
          'Model Y',
          'Cybertruck',
          'Roadster',
        ],
      },
      {
        name: 'Porsche',
        models: ['356', '917', '956', '959', 'Cayenne', 'Boxster', 'Cayman'],
      },
      {
        name: 'Lexus',
        models: [
          'CT 200H',
          'IS XE20',
          'HS 250H',
          'GS 450h',
          'GX',
          'LS 400',
          'RX',
          'IS 300',
          'LS XF40',
          'RX Hybrid',
        ],
      },
      {
        name: 'Volvo',
        models: [
          '850',
          'S70',
          'V70',
          'C70 T5',
          'S60 T5',
          'C30 T5',
          'S80',
          'XC90 V8',
        ],
      },
      {
        name: 'Lamborghini',
        models: [
          'Miura',
          'Espada',
          'Urraco',
          'Jalpa',
          'Countach',
          'Aventador SVJ',
        ],
      },
      {
        name: 'Ferrari',
        models: [
          'LaFerrari',
          'Dino 246 GTS',
          'F40',
          'Testarossa',
          '288 GTO',
          'Ferrari Enzo',
          '308 GTS',
          '250 GT',
          'F50',
        ],
      },
      {
        name: 'Jaguar',
        models: [
          'Mark 1',
          'Mark 2',
          'XK',
          'F-Type SVR',
          'XJ-S',
          'XK120',
          'XK140',
          'XK150',
          'XJR-15',
          'XKSS',
          'E-Type',
        ],
      },
    ];
  }

  generateName(): string {
    const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    const model = brand.models[Math.floor(Math.random() * brand.models.length)];
    return `${brand.name} ${model}`;
  }

  static generateColor(): string {
    let r = `${Math.floor(Math.random() * 255).toString(16)}`;
    let g = `${Math.floor(Math.random() * 255).toString(16)}`;
    let b = `${Math.floor(Math.random() * 255).toString(16)}`;
    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;
    return `#${r}${g}${b}`;
  }
}
