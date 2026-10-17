// კეპლერი (TOYS.GE) - პროდუქტების ბაზა და მონაცემთა მოდელი
// 18 პოზიცია გარე მომწოდებლიდან +65% საბაზისო მარკაპით, ბრენდის ნიშნების გარეშე

const CATEGORIES = [
  { id: "all", name: "ყველა", name_en: "All Toys", name_ru: "Все игрушки", icon: "grid_view" },
  { id: "construction", name: "სამშენებლო ტექნიკა", name_en: "Construction", name_ru: "Стройтехника", icon: "front_loader" },
  { id: "robots", name: "რობოტები", name_en: "Robots", name_ru: "Роботы", icon: "smart_toy" },
  { id: "rc", name: "RC ტექნიკა", name_en: "RC Vehicles", name_ru: "RC Техника", icon: "sports_Motorsports" },
  { id: "building", name: "კონსტრუქტორები", name_en: "Building Sets", name_ru: "Конструкторы", icon: "extension" },
  { id: "space", name: "კოსმოსი", name_en: "Space", name_ru: "Космос", icon: "rocket_launch" },
  { id: "roleplay", name: "როლური თამაშები", name_en: "Role Play", name_ru: "Ролевые игры", icon: "medical_services" },
  { id: "educational", name: "საგანმანათლებლო", name_en: "Educational", name_ru: "Обучающие", icon: "science" }
];

const BRANDS = [
  {
    id: "construction",
    name: "სამშენებლო ტექნიკა",
    country: "კატეგორია",
    badge: "მძიმე ტექნიკა & ამწეები",
    count: 3,
    desc: "დისტანციური მართვის ექსკავატორები, თვითმცლელები და გიგანტური სამშენებლო ამწეები.",
    category: "სამშენებლო ტექნიკა",
    icon: "front_loader",
    color: "#F59E0B"
  },
  {
    id: "robots",
    name: "რობოტები",
    country: "კატეგორია",
    badge: "AI & ტრანსფორმერები",
    count: 4,
    desc: "რვაბორბლიანი მექანიკური რობოტი-ძაღლები, მაგნიტური ტრანსფორმერები და სენსორული ბოტები.",
    category: "რობოტები",
    icon: "smart_toy",
    color: "#3A86FF"
  },
  {
    id: "rc",
    name: "RC ტექნიკა",
    country: "კატეგორია",
    badge: "დისტანციური მართვა 2.4GHz",
    count: 4,
    desc: "ამფიბია ყველგანმავლები, სწრაფი დრიფტის სპორტქარები, მინი ოფ-როუდ ჯიპები და სარაკეტო მანქანები.",
    category: "RC ტექნიკა",
    icon: "directions_car",
    color: "#EF4444"
  },
  {
    id: "space",
    name: "კოსმოსი",
    country: "კატეგორია",
    badge: "რაკეტები & შატლები",
    count: 3,
    desc: "კოსმოსური რაკეტების გამშვები სადგურები, შატლები და ასტრონავტების საექსპედიციო ხომალდები.",
    category: "კოსმოსი",
    icon: "rocket_launch",
    color: "#6366F1"
  },
  {
    id: "building",
    name: "კონსტრუქტორები",
    country: "კატეგორია",
    badge: "DIY აწყობა",
    count: 2,
    desc: "სახრახნისით ასაწყობი კონსტრუქტორები, ხის და პლასტმასის სამოდელო ნაკრებები ყუთით.",
    category: "კონსტრუქტორები",
    icon: "extension",
    color: "#10B981"
  },
  {
    id: "roleplay",
    name: "როლური თამაშები",
    country: "კატეგორია",
    badge: "პროფესიები",
    count: 2,
    desc: "საბავშვო ექიმის სამედიცინო სადგური ეკრანით და პატარა ოსტატის ხელსაწყოების სახელოსნო.",
    category: "როლური თამაშები",
    icon: "medical_services",
    color: "#EC4899"
  },
  {
    id: "educational",
    name: "საგანმანათლებლო",
    country: "კატეგორია",
    badge: "STEM & ეკო-მეცნიერება",
    count: 2,
    desc: "მარილიან წყალზე მომუშავე ეკო-მანქანა და საკონტეინერო გემი-ტერმინალი ამწე მექანიზმით.",
    category: "საგანმანათლებლო",
    icon: "science",
    color: "#06B6D4"
  }
];

// ფასის კალკულაციის ფორმულა: cost * (1 + markup / 100)
function calcSitePrice(cost, markup = 65) {
  return Number((Number(cost) * (1 + Number(markup) / 100)).toFixed(2));
}

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    sku: "TOY-001",
    title: "სამშენებლო ექსკავატორი და თვითმცლელი სატვირთო ნაკრები",
    title_en: "Construction Excavator & Dump Truck Set",
    title_ru: "Набор строительного экскаვაтора и самосвала",
    brandId: "construction",
    brand: "კეპლერი",
    category: "construction",
    categoryLabel: "სამშენებლო ტექნიკა",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 65.68,
    markup: 65,
    price: 108.37,
    oldPrice: 135.00,
    discount: 20,
    rating: 4.9,
    reviewsCount: 42,
    stock: 15,
    status: "active",
    inStock: true,
    installment: 9,
    image: "images/products/toy-01-main.jpg?v=3",
    gallery: [
      "images/products/toy-01-main.jpg?v=3",
      "images/products/toy-01-detail.jpg?v=3",
      "images/products/toy-01-studio.jpg?v=3"
    ],
    badge: "TOP",
    badgeColor: "yellow",
    description: "მძლავრი სამშენებლო ტექნიკის კომპლექტი: მუხლუხა ექსკავატორი მოძრავი მკლავითა და სამაგრით + თვითმცლელი სატვირთო მანქანა. ავითარებს კოორდინაციას და მოტორიკას.",
    specs: ["SKU: TOY-001", "კატეგორია: სამშენებლო ტექნიკა", "კომპლექტში: ექსკავატორი + სატვირთო", "მასალა: დარტყმაგამძლე ABS პლასტმასი", "ასაკი: 3+ წელი"]
  },
  {
    id: 2,
    sku: "TOY-002",
    title: "რვაბორბლიანი ინტერაქტიული AI რობოტი-ძაღლი სროლის ფუნქციით",
    title_en: "Eight-Wheel AI Mechanical Robot Dog with Blaster",
    title_ru: "Восьмиколесная радиоуправляемая робот-собака с бластером",
    brandId: "robots",
    brand: "კეპლერი",
    category: "robots",
    categoryLabel: "რობოტები",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 35.57,
    markup: 65,
    price: 58.69,
    oldPrice: 79.00,
    discount: 26,
    rating: 5.0,
    reviewsCount: 87,
    stock: 24,
    status: "active",
    inStock: true,
    installment: 5,
    isHotDeal: true,
    isDealOfDay: true,
    image: "images/products/toy-02-main.jpg?v=3",
    gallery: [
      "images/products/toy-02-main.jpg?v=3",
      "images/products/toy-02-detail.jpg?v=3",
      "images/products/toy-02-studio.jpg?v=3"
    ],
    badge: "ჰიტი",
    badgeColor: "sale",
    description: "მრავალფუნქციური 8-ბორბლიანი მექანიკური რობოტი-ძაღლი დისტანციური მართვით, LED განათებით, ხმოვანი ეფექტებით, 360° დრიფტითა და წყლის/რბილი ტყვიების გამშვებით.",
    specs: ["SKU: TOY-002", "კატეგორია: რობოტები", "8 სპეციალური როლიკებიანი თვალი", "დისტანციური პულტი + განათება", "ასაკი: 6+ წელი"]
  },
  {
    id: 3,
    sku: "TOY-003",
    title: "კოსმოსური რაკეტის და გამშვები კოშკის დიდი კონსტრუქტორი",
    title_en: "Aerospace Rocket & Launch Tower Building Set",
    title_ru: "Большой конструктор Космическая ракета со стартовой башней",
    brandId: "space",
    brand: "კეპლერი",
    category: "space",
    categoryLabel: "კოსმოსი",
    age: "6-8",
    ageLabel: "7+ წელი",
    cost: 59.58,
    markup: 65,
    price: 98.31,
    oldPrice: 125.00,
    discount: 21,
    rating: 4.9,
    reviewsCount: 64,
    stock: 12,
    status: "active",
    inStock: true,
    installment: 9,
    isHotDeal: true,
    image: "images/products/toy-03-main.jpg?v=3",
    gallery: [
      "images/products/toy-03-main.jpg?v=3",
      "images/products/toy-03-detail.jpg?v=3",
      "images/products/toy-03-studio.jpg?v=3"
    ],
    badge: "კოსმოსი",
    badgeColor: "blue",
    description: "დეტალური აეროკოსმოსური რაკეტისა და სასტარტო პლატფორმის ასაწყობი ნაკრები. მოყვება მრავალსართულიანი გამშვები კოშკი და მოძრავი საინჟინრო ხიდები.",
    specs: ["SKU: TOY-003", "კატეგორია: კოსმოსი", "დეტალური სასტარტო კოშკი", "STEM კონსტრუქცია", "ასაკი: 7+ წელი"]
  },
  {
    id: 4,
    sku: "TOY-004",
    title: "კოსმოსური შატლის სასტარტო სადგურის კონსტრუქტორი",
    title_en: "Space Shuttle Launch Pad Building Blocks",
    title_ru: "Конструктор Космический шаттл со стартовой площадкой",
    brandId: "space",
    brand: "კეპლერი",
    category: "space",
    categoryLabel: "კოსმოსი",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 29.41,
    markup: 65,
    price: 48.53,
    oldPrice: 62.00,
    discount: 22,
    rating: 4.8,
    reviewsCount: 53,
    stock: 18,
    status: "active",
    inStock: true,
    installment: 4,
    image: "images/products/toy-04-main.jpg?v=3",
    gallery: [
      "images/products/toy-04-main.jpg?v=3",
      "images/products/toy-04-detail.jpg?v=3",
      "images/products/toy-04-studio.jpg?v=3"
    ],
    badge: "ახალი",
    badgeColor: "blue",
    description: "2026 წლის ახალი მოდელის კოსმოსური რაკეტა-მატარებელი ლურჯი სასტარტო კოშკურითა და სასაჩუქრე ყუთით. იდეალურია კოსმოსის მოყვარული ბავშვებისთვის.",
    specs: ["SKU: TOY-004", "კატეგორია: კოსმოსი", "სასაჩუქრე შეფუთვა", "თავსებადი კუბიკები", "ასაკი: 6+ წელი"]
  },
  {
    id: 5,
    sku: "TOY-005",
    title: "მაგნიტური ტრანსფორმერი რობოტი 5-1-ში სპეცტექნიკა",
    title_en: "5-in-1 Magnetic Transforming Robot Toy",
    title_ru: "Магнитный робот-трансформер 5-в-1",
    brandId: "robots",
    brand: "კეპლერი",
    category: "robots",
    categoryLabel: "რობოტები",
    age: "3-5",
    ageLabel: "4+ წელი",
    cost: 25.04,
    markup: 65,
    price: 41.32,
    oldPrice: 55.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 39,
    stock: 20,
    status: "active",
    inStock: true,
    installment: 4,
    image: "images/products/toy-05-main.jpg?v=3",
    gallery: [
      "images/products/toy-05-main.jpg?v=3",
      "images/products/toy-05-detail.jpg?v=3",
      "images/products/toy-05-studio.jpg?v=3"
    ],
    badge: "5-1-ში",
    badgeColor: "green",
    description: "5 სხვადასხვა საბრძოლო და სამაშველო მანქანა მაგნიტური შეერთებით ერთიანდება ერთ დიდ გიგანტურ მეგა-რობოტად. მარტივი და უსაფრთხო ტრანსფორმაცია.",
    specs: ["SKU: TOY-005", "კატეგორია: რობოტები", "5 მანქანა = 1 დიდი რობოტი", "მაგნიტური სამაგრები", "ასაკი: 4+ წელი"]
  },
  {
    id: 6,
    sku: "TOY-006",
    title: "საგანმანათლებლო საკონტეინერო გემი-ტერმინალი ამწეთი და მანქანებით",
    title_en: "Educational Cargo Ship Set with Crane & Vehicles",
    title_ru: "Обучающий грузовой корабль-контейнеровоз с краном и машинками",
    brandId: "educational",
    brand: "კეპლერი",
    category: "educational",
    categoryLabel: "საგანმანათლებლო",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 52.54,
    markup: 65,
    price: 86.69,
    oldPrice: 110.00,
    discount: 21,
    rating: 4.9,
    reviewsCount: 61,
    stock: 14,
    status: "active",
    inStock: true,
    installment: 8,
    image: "images/products/toy-06-main.jpg?v=3",
    gallery: [
      "images/products/toy-06-main.jpg?v=3",
      "images/products/toy-06-detail.jpg?v=3",
      "images/products/toy-06-studio.jpg?v=3"
    ],
    badge: "STEM",
    badgeColor: "blue",
    description: "დიდი სატვირთო გემი-კონტეინერმზიდი მოძრავი ამწე კოშკით, გასახსნელი ტრიუმით, კონტეინერებითა და მინი-ავტომობილებით. ხმოვანი და განათების ეფექტებით.",
    specs: ["SKU: TOY-006", "კატეგორია: საგანმანათლებლო", "მოყვება მანქანები და კონტეინერები", "მოძრავი ამწე მექანიზმი", "ასაკი: 3+ წელი"]
  },
  {
    id: 7,
    sku: "TOY-007",
    title: "ამფიბია დისტანციური მართვის ყველგანმავალი მანქანა წყლის ქვემეხით",
    title_en: "Amphibious Remote Control Tank Car with Water Cannon",
    title_ru: "Радиоуправляемый вездеход-амфибия с водяной пушкой",
    brandId: "rc",
    brand: "კეპლერი",
    category: "rc",
    categoryLabel: "RC ტექნიკა",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 37.79,
    markup: 65,
    price: 62.35,
    oldPrice: 82.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 73,
    stock: 19,
    status: "active",
    inStock: true,
    installment: 6,
    isHotDeal: true,
    image: "images/products/toy-07-main.jpg?v=3",
    gallery: [
      "images/products/toy-07-main.jpg?v=3",
      "images/products/toy-07-detail.jpg?v=3",
      "images/products/toy-07-studio.jpg?v=3"
    ],
    badge: "4WD ამფიბია",
    badgeColor: "sale",
    description: "წყალგაუმტარი ამფიბია RC მანქანა მანათობელი LED საბურავებითა და მძლავრი წყლის ჭავლის ქვემეხით. თავისუფლად მოძრაობს ხმელეთზე, ქვიშაზე და წყალში.",
    specs: ["SKU: TOY-007", "კატეგორია: RC ტექნიკა", "წყლის სროლის ფუნქცია", "LED მანათობელი თვლები", "2.4GHz უსადენო მართვა"]
  },
  {
    id: 8,
    sku: "TOY-008",
    title: "კოსმოსური ხომალდისა და ასტრონავტების სათამაშო ნაკრები",
    title_en: "Space Shuttle Capsule & Astronaut Figurines Set",
    title_ru: "Игровой набор Космический шаттл и капсула с астронавтами",
    brandId: "space",
    brand: "კეპლერი",
    category: "space",
    categoryLabel: "კოსმოსი",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 8.84,
    markup: 65,
    price: 14.59,
    oldPrice: 22.00,
    discount: 34,
    rating: 4.7,
    reviewsCount: 95,
    stock: 35,
    status: "active",
    inStock: true,
    installment: 2,
    image: "images/products/toy-08-main.jpg?v=3",
    gallery: [
      "images/products/toy-08-main.jpg?v=3",
      "images/products/toy-08-detail.jpg?v=3",
      "images/products/toy-08-studio.jpg?v=3"
    ],
    badge: "ბესტსელერი",
    badgeColor: "yellow",
    description: "სახალისო კოსმოსური რაკეტა გასახსნელი კაბინით, კოსმოსური კაფსულითა და ასტრონავტის ფიგურებით. საუკეთესო საბიუჯეტო საჩუქარი პატარა მკვლევრებისთვის.",
    specs: ["SKU: TOY-008", "კატეგორია: კოსმოსი", "გასახსნელი კაბინა + ასტრონავტები", "უსაფრთხო მომრგვალებული ფორმები", "ასაკი: 3+ წელი"]
  },
  {
    id: 9,
    sku: "TOY-009",
    title: "გიგანტური დისტანციური მართვის სამშენებლო კოშკურა ამწე",
    title_en: "Giant Remote Control Tower Crane",
    title_ru: "Гигантский радиоуправляемый башенный кран",
    brandId: "construction",
    brand: "კეპლერი",
    category: "construction",
    categoryLabel: "სამშენებლო ტექნიკა",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 54.53,
    markup: 65,
    price: 89.97,
    oldPrice: 115.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 31,
    stock: 10,
    status: "active",
    inStock: true,
    installment: 8,
    image: "images/products/toy-09-main.jpg?v=3",
    gallery: [
      "images/products/toy-09-main.jpg?v=3",
      "images/products/toy-09-detail.jpg?v=3",
      "images/products/toy-09-studio.jpg?v=3"
    ],
    badge: "გიგანტი",
    badgeColor: "yellow",
    description: "მაღალი სამშენებლო კოშკურა ამწე სრული დისტანციური მართვით: ისრის 360° შემობრუნება, კაუჭის აწევა/დაწევა და სამშენებლო ტვირთის გადატანა.",
    specs: ["SKU: TOY-009", "კატეგორია: სამშენებლო ტექნიკა", "360° ბრუნვა და ტვირთის აწევა", "პულტით მართვა + პროჟექტორი", "ასაკი: 6+ წელი"]
  },
  {
    id: 10,
    sku: "TOY-010",
    title: "დისტანციური მართვის სამხედრო სარაკეტო სატვირთო მანქანა",
    title_en: "Electric Remote Control Missile Launcher Truck",
    title_ru: "Радиоуправляемый грузовик с ракетной установкой",
    brandId: "rc",
    brand: "კეპლერი",
    category: "rc",
    categoryLabel: "RC ტექნიკა",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 62.31,
    markup: 65,
    price: 102.81,
    oldPrice: 129.00,
    discount: 20,
    rating: 4.8,
    reviewsCount: 28,
    stock: 11,
    status: "active",
    inStock: true,
    installment: 9,
    image: "images/products/toy-10-main.jpg?v=3",
    gallery: [
      "images/products/toy-10-main.jpg?v=3",
      "images/products/toy-10-detail.jpg?v=3",
      "images/products/toy-10-studio.jpg?v=3"
    ],
    badge: "სწრაფი გასროლა",
    badgeColor: "green",
    description: "სრული დისტანციური მართვის ტაქტიკური სატვირთო მანქანა მრავალლულიანი სარაკეტო დანადგარით. პულტიდან იმართება როგორც სვლა, ისე რბილი რაკეტების ავტომატური გასროლა.",
    specs: ["SKU: TOY-010", "კატეგორია: RC ტექნიკა", "პულტიდან სროლის ფუნქცია", "ამწევი სარაკეტო პლატფორმა", "ასაკი: 6+ წელი"]
  },
  {
    id: 11,
    sku: "TOY-011",
    title: "საბავშვო ხელსაწყოების სამუშაო მაგიდა-სახელოსნო ელექტრო დრელით",
    title_en: "Children's Electric Tool Workbench Playset",
    title_ru: "Детский игровой верстак с электродрелью и инструментами",
    brandId: "roleplay",
    brand: "კეპლერი",
    category: "roleplay",
    categoryLabel: "როლური თამაშები",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 41.68,
    markup: 65,
    price: 68.77,
    oldPrice: 89.00,
    discount: 23,
    rating: 4.9,
    reviewsCount: 54,
    stock: 16,
    status: "active",
    inStock: true,
    installment: 6,
    image: "images/products/toy-11-main.jpg?v=3",
    gallery: [
      "images/products/toy-11-main.jpg?v=3",
      "images/products/toy-11-detail.jpg?v=3",
      "images/products/toy-11-studio.jpg?v=3"
    ],
    badge: "სახელოსნო",
    badgeColor: "yellow",
    description: "პატარა ოსტატის სრული სამუშაო სადგური, რომელიც ასევე იკეცება ჩემოდნად! მოყვება სათამაშო ელექტრო დრელი, ხერხი, ჩაქუჩი, ქანჩები და ჭანჭიკები.",
    specs: ["SKU: TOY-011", "კატეგორია: როლური თამაშები", "მოყვება ელექტრო დრელი", "ტრანსფორმირდება ჩემოდნად", "ასაკი: 3+ წელი"]
  },
  {
    id: 12,
    sku: "TOY-012",
    title: "ყვითელი ტრანსფორმერი რობოტი-მშენებელი 6-1-ში",
    title_en: "6-in-1 Yellow Construction Transforming Robot",
    title_ru: "Желтый робот-трансформер Строительная техника 6-в-1",
    brandId: "robots",
    brand: "კეპლერი",
    category: "robots",
    categoryLabel: "რობოტები",
    age: "6-8",
    ageLabel: "5+ წელი",
    cost: 42.53,
    markup: 65,
    price: 70.17,
    oldPrice: 89.00,
    discount: 21,
    rating: 4.9,
    reviewsCount: 47,
    stock: 14,
    status: "active",
    inStock: true,
    installment: 6,
    image: "images/products/toy-12-main.jpg?v=3",
    gallery: [
      "images/products/toy-12-main.jpg?v=3",
      "images/products/toy-12-detail.jpg?v=3",
      "images/products/toy-12-studio.jpg?v=3"
    ],
    badge: "6-1-ში",
    badgeColor: "yellow",
    description: "6 ყვითელი სამშენებლო მანქანისგან ასაწყობი დიდი მებრძოლი რობოტი ფარითა და ხმლით. იშლება ცალკეულ მანქანებად და კვლავ იწყობა რობოტად.",
    specs: ["SKU: TOY-012", "კატეგორია: რობოტები", "6 მანქანა ერთ ნაკრებში", "მრავალჯერადი აწყობა", "ასაკი: 5+ წელი"]
  },
  {
    id: 13,
    sku: "TOY-013",
    title: "DIY სახრახნისით ასაწყობი ხის და პლასტმასის კონსტრუქტორი ყუთით",
    title_en: "Children's DIY Screwdriver Repair Assembly Toolbox",
    title_ru: "Детский деревянный DIY конструктор с отверткой в чемоданчике",
    brandId: "building",
    brand: "კეპლერი",
    category: "building",
    categoryLabel: "კონსტრუქტორები",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 22.91,
    markup: 65,
    price: 37.80,
    oldPrice: 49.00,
    discount: 23,
    rating: 5.0,
    reviewsCount: 112,
    stock: 28,
    status: "active",
    inStock: true,
    installment: 4,
    isHotDeal: true,
    image: "images/products/toy-13-main.jpg?v=3",
    gallery: [
      "images/products/toy-13-main.jpg?v=3",
      "images/products/toy-13-detail.jpg?v=3",
      "images/products/toy-13-studio.jpg?v=3"
    ],
    badge: "მონტესორი",
    badgeColor: "green",
    description: "შემოქმედებითი DIY კონსტრუქტორი მოსახერხებელ მწვანე ყუთში. ბავშვები ხელსაწყოებითა და ჭანჭიკებით აწყობენ თვითმფრინავებს, მანქანებსა და ცხოველებს.",
    specs: ["SKU: TOY-013", "კატეგორია: კონსტრუქტორები", "სათავსო ყუთი + ხელსაწყოები", "ავითარებს წვრილ მოტორიკას", "ასაკი: 3+ წელი"]
  },
  {
    id: 14,
    sku: "TOY-014",
    title: "საბავშვო ექიმის დიდი სამედიცინო ურიკა და კარდიო-სადგური",
    title_en: "Deluxe Children's Doctor Medical Cart & ECG Set",
    title_ru: "Большой детский игровой набор Доктор с медицинской тележкой и ЭКГ",
    brandId: "roleplay",
    brand: "კეპლერი",
    category: "roleplay",
    categoryLabel: "როლური თამაშები",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 107.79,
    markup: 65,
    price: 177.85,
    oldPrice: 220.00,
    discount: 19,
    rating: 5.0,
    reviewsCount: 68,
    stock: 8,
    status: "active",
    inStock: true,
    installment: 15,
    image: "images/products/toy-14-main.jpg?v=3",
    gallery: [
      "images/products/toy-14-main.jpg?v=3",
      "images/products/toy-14-detail.jpg?v=3",
      "images/products/toy-14-studio.jpg?v=3"
    ],
    badge: "PREMIUM",
    badgeColor: "sale",
    description: "პრემიუმ ხარისხის მოძრავი სამედიცინო სადგური განათებული ეკრანით, სტეთოსკოპით, თერმომეტრით, შპრიცითა და სრული სამედიცინო აღჭურვილობით.",
    specs: ["SKU: TOY-014", "კატეგორია: როლური თამაშები", "ხმოვანი კარდიოგრამის მონიტორი", "ბორბლებიანი სამედიცინო ურიკა", "ასაკი: 3+ წელი"]
  },
  {
    id: 15,
    sku: "TOY-015",
    title: "სწრაფი დრიფტის რბოლის დისტანციური მართვის სპორტქარი",
    title_en: "2026 High-Speed RC Drift Racing Sports Car",
    title_ru: "Скоростная радиоуправляемая дрифт-машина 2026",
    brandId: "rc",
    brand: "კეპლერი",
    category: "rc",
    categoryLabel: "RC ტექნიკა",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 27.33,
    markup: 65,
    price: 45.09,
    oldPrice: 59.00,
    discount: 24,
    rating: 4.8,
    reviewsCount: 44,
    stock: 22,
    status: "active",
    inStock: true,
    installment: 4,
    image: "images/products/toy-15-main.jpg?v=3",
    gallery: [
      "images/products/toy-15-main.jpg?v=3",
      "images/products/toy-15-detail.jpg?v=3",
      "images/products/toy-15-studio.jpg?v=3"
    ],
    badge: "DRIFT",
    badgeColor: "sale",
    description: "აეროდინამიკური სარბოლო RC სპორტქარი სწრაფი დრიფტის რეჟიმით, LED ფარებითა და 2.4GHz მართვის პულტით. გამოირჩევა სწრაფი აჩქარებით და მანევრირებით.",
    specs: ["SKU: TOY-015", "კატეგორია: RC ტექნიკა", "4WD დრიფტის საბურავები", "LED განათება", "ასაკი: 6+ წელი"]
  },
  {
    id: 16,
    sku: "TOY-016",
    title: "მეტალის კორპუსიანი მინი ოფ-როუდ RC ჯიპი",
    title_en: "Alloy Mini Off-Road Remote Control Monster Truck",
    title_ru: "Металлический мини радиоуправляемый внедорожник",
    brandId: "rc",
    brand: "კეპლერი",
    category: "rc",
    categoryLabel: "RC ტექნიკა",
    age: "6-8",
    ageLabel: "5+ წელი",
    cost: 20.66,
    markup: 65,
    price: 34.09,
    oldPrice: 45.00,
    discount: 24,
    rating: 4.8,
    reviewsCount: 83,
    stock: 30,
    status: "active",
    inStock: true,
    installment: 3,
    image: "images/products/toy-16-main.jpg?v=3",
    gallery: [
      "images/products/toy-16-main.jpg?v=3",
      "images/products/toy-16-detail.jpg?v=3",
      "images/products/toy-16-studio.jpg?v=3"
    ],
    badge: "ALLOY",
    badgeColor: "green",
    description: "კომპაქტური და გამძლე მეტალის (Alloy) კორპუსიანი მინი ყველგანმავალი ჯიპი ღრმა პროტექტორიანი საბურავებით და ამორტიზაციით.",
    specs: ["SKU: TOY-016", "კატეგორია: RC ტექნიკა", "მეტალის კორპუსი (Alloy)", "USB დამუხტვა", "ასაკი: 5+ წელი"]
  },
  {
    id: 17,
    sku: "TOY-017",
    title: "სენსორული დისტანციური მართვის მინი რობოტი-ავტობუსი LED თვალებით",
    title_en: "Smart Sensor RC Mini Robot Bus with LED Eyes & Soccer Ball",
    title_ru: "Сенсорный радиоуправляемый мини робот-автобус с LED глазами",
    brandId: "robots",
    brand: "კეპლერი",
    category: "robots",
    categoryLabel: "რობოტები",
    age: "3-5",
    ageLabel: "3+ წელი",
    cost: 29.43,
    markup: 65,
    price: 48.56,
    oldPrice: 64.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 51,
    stock: 17,
    status: "active",
    inStock: true,
    installment: 4,
    image: "images/products/toy-17-main.jpg?v=3",
    gallery: [
      "images/products/toy-17-main.jpg?v=3",
      "images/products/toy-17-detail.jpg?v=3",
      "images/products/toy-17-studio.jpg?v=3"
    ],
    badge: "სენსორული",
    badgeColor: "blue",
    description: "საყვარელი ინტერაქტიული მინი-ავტობუსი ემოციური LED თვალებით, ხაზის გაყოლის სენსორით, დაბრკოლების არიდებითა და მინი ფეხბურთის ბურთით.",
    specs: ["SKU: TOY-017", "კატეგორია: რობოტები", "სენსორული გაყოლა + პულტი", "LED ემოციების ეკრანი", "ასაკი: 3+ წელი"]
  },
  {
    id: 18,
    sku: "TOY-018",
    title: "მარილიან წყალზე მომუშავე ასაწყობი ეკო-მანქანა DIY STEM",
    title_en: "Salt Water Powered Concept Car DIY STEM Kit",
    title_ru: "Сборная эко-машинка на соленой воде DIY STEM",
    brandId: "educational",
    brand: "კეპლერი",
    category: "educational",
    categoryLabel: "საგანმანათლებლო",
    age: "6-8",
    ageLabel: "6+ წელი",
    cost: 6.74,
    markup: 65,
    price: 11.12,
    oldPrice: 16.00,
    discount: 30,
    rating: 4.8,
    reviewsCount: 104,
    stock: 45,
    status: "active",
    inStock: true,
    installment: 2,
    image: "images/products/toy-18-main.jpg?v=3",
    gallery: [
      "images/products/toy-18-main.jpg?v=3",
      "images/products/toy-18-detail.jpg?v=3",
      "images/products/toy-18-studio.jpg?v=3"
    ],
    badge: "ECO STEM",
    badgeColor: "green",
    description: "სამეცნიერო-საგანმანათლებლო DIY კონსტრუქტორი: ბავშვი თვითონ აწყობს კონცეპტ-მანქანას, რომელიც ელემენტის გარეშე — მხოლოდ მარილიანი წყლის ქიმიური რეაქციით მოძრაობს!",
    specs: ["SKU: TOY-018", "კატეგორია: საგანმანათლებლო", "მუშაობს მარილიან წყალზე (ელემენტის გარეშე)", "ეკო-მეცნიერების ექსპერიმენტი", "ასაკი: 6+ წელი"]
  }
];

// პროდუქტების წამოღება localStorage-დან (Admin Panel-თან სინქრონიზაცია)
function loadProductsDatabase() {
  try {
    const saved = localStorage.getItem('kepler_products_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => ({
          ...p,
          cost: Number(p.cost || 0),
          markup: Number(p.markup !== undefined ? p.markup : 65),
          price: calcSitePrice(p.cost || 0, p.markup !== undefined ? p.markup : 65),
          inStock: p.status === 'active' && Number(p.stock) > 0
        }));
      }
    }
  } catch (e) {
    console.warn('Error loading custom products:', e);
  }
  localStorage.setItem('kepler_products_v3', JSON.stringify(DEFAULT_PRODUCTS));
  return [...DEFAULT_PRODUCTS];
}

function saveProductsDatabase(productsList) {
  const normalized = productsList.map(p => ({
    ...p,
    cost: Number(p.cost || 0),
    markup: Number(p.markup !== undefined ? p.markup : 65),
    price: calcSitePrice(p.cost || 0, p.markup !== undefined ? p.markup : 65),
    inStock: p.status === 'active' && Number(p.stock) > 0
  }));
  localStorage.setItem('kepler_products_v3', JSON.stringify(normalized));
  PRODUCTS = normalized;
  return normalized;
}

let PRODUCTS = loadProductsDatabase();

// საწყისი შეკვეთები (Admin Panel-ის და User Account-ის სადემონსტრაციოდ)
const DEFAULT_ORDERS = [
  {
    id: "ORD-2026-101",
    date: "2026-10-17 14:20",
    customer: "გიორგი მამულაშვილი",
    phone: "599 12 34 56",
    city: "თბილისი",
    address: "ჭავჭავაძის გამზ. #34, ბინა 12",
    deliveryMethod: "კურიერი (თბილისი)",
    deliveryCost: 0,
    paymentMethod: "TBC Pay",
    status: "delivered",
    trackingCode: "GE-TBC-884920",
    items: [
      { sku: "TOY-002", title: "რვაბორბლიანი ინტერაქტიული AI რობოტი-ძაღლი", qty: 1, price: 58.69, cost: 35.57 },
      { sku: "TOY-008", title: "კოსმოსური ხომალდისა და ასტრონავტების ნაკრები", qty: 1, price: 14.59, cost: 8.84 }
    ],
    total: 73.28,
    totalCost: 44.41
  },
  {
    id: "ORD-2026-102",
    date: "2026-10-17 15:05",
    customer: "ნინო კვარაცხელია",
    phone: "577 98 76 54",
    city: "ბათუმი",
    address: "რუსთაველის ქ. #15",
    deliveryMethod: "კურიერი (რეგიონები)",
    deliveryCost: 0,
    paymentMethod: "BOG Pay (საქართველოს ბანკი)",
    status: "shipped",
    trackingCode: "GE-POST-441092",
    items: [
      { sku: "TOY-014", title: "საბავშვო ექიმის დიდი სამედიცინო ურიკა", qty: 1, price: 177.85, cost: 107.79 }
    ],
    total: 177.85,
    totalCost: 107.79
  },
  {
    id: "ORD-2026-103",
    date: "2026-10-17 15:40",
    customer: "დავით ბერიძე",
    phone: "596 03 25 25",
    city: "ქუთაისი",
    address: "აღმაშენებლის გამზ. #88",
    deliveryMethod: "საქართველოს ფოსტა",
    deliveryCost: 0,
    paymentMethod: "Flitt",
    status: "processing",
    trackingCode: "PENDING",
    items: [
      { sku: "TOY-001", title: "სამშენებლო ექსკავატორი და თვითმცლელი", qty: 1, price: 108.37, cost: 65.68 },
      { sku: "TOY-013", title: "DIY სახრახნისით ასაწყობი კონსტრუქტორი", qty: 1, price: 37.80, cost: 22.91 }
    ],
    total: 146.17,
    totalCost: 88.59
  }
];

function loadOrdersDatabase() {
  try {
    const saved = localStorage.getItem('kepler_orders_v1');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn(e);
  }
  localStorage.setItem('kepler_orders_v1', JSON.stringify(DEFAULT_ORDERS));
  return [...DEFAULT_ORDERS];
}

function saveOrdersDatabase(orders) {
  localStorage.setItem('kepler_orders_v1', JSON.stringify(orders));
  return orders;
}

// Initial Cart items
const INITIAL_CART = [
  { productId: 2, quantity: 1 },
  { productId: 3, quantity: 1 }
];

// Initial Wishlist
const INITIAL_WISHLIST = [1, 2, 14];
