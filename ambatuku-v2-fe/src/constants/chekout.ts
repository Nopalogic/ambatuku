export const PAYMENT_OPTIONS = [
  {
    image: "qris",
    value: "qris",
    label: "Qris Payment",
  },
  {
    image: "mandiri",
    value: "echannel",
    label: "Mandiri Virtual Account",
  },
  {
    image: "bca",
    value: "bca_va",
    label: "Mandiri Virtual Account",
  },
  {
    image: "bri",
    value: "bri_va",
    label: "Mandiri Virtual Account",
  },
  {
    image: "bni",
    value: "bni_va",
    label: "Mandiri Virtual Account",
  },
];

export const SHIPPING_OPTIONS = [
  {
    type: "ekonomi",
    estimation: "2025-04-18",
    price: 5000,
  },
  {
    type: "standard",
    estimation: "2025-04-14",
    price: 10000,
  },
  {
    type: "regular",
    estimation: "2025-04-10",
    price: 15000,
  },
  {
    type: "kargo",
    estimation: "2025-04-18",
    price: 20000,
  },
];

export const OTHER_FEES = [
  { name: "Biaya Layanan", amount: 2500 },
  { name: "Biaya Jasa Aplikasi", amount: 2500 },
];
