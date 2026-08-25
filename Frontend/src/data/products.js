const products = [
  // =========================
  // GOLDEN ZARI - 10 SAREES
  // =========================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "Banarasi Pure Raw Silk Saree Golden Zari",
    category: "Banarasi Raw Silk",
    price: 4100,
    badge: i === 0 ? "BESTSELLER" : "",
    description:
      "Pure raw silk Banarasi saree with golden zari buti and mina work.",
    image: `/images/sarees/golden-zari-${String(i + 1).padStart(2, "0")}.jpeg`,
  })),

  // =========================
  // HANDLOOM MASHRU - 15
  // =========================
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 11,
    name: "Banarasi Handloom Mashru Katan Silk Khaddi Saree",
    category: "Handloom Mashru Katan",
    price: 4100,
    badge: i === 0 ? "NEW" : "",
    description:
      "Handloom Mashru Katan silk Khaddi Banarasi saree with soft fabric and pure Katan feel.",
    sareeLength: "5.50m",
    blouseLength: "95cm",
    image: `/images/sarees/katan-${String(i + 1).padStart(2, "0")}.jpeg`,
  })),

  // =========================
  // KORASILK - 27 SAREES
  // =========================
  ...Array.from({ length: 23 }, (_, i) => ({
    id: i + 26,
    name: "Pure Handloom Banarasi Korasilk Saree",
    category: "Banarasi Korasilk",
    price: 7200,
    badge: i === 0 ? "PREMIUM" : "",
    description:
      "Pure handloom Banarasi Korasilk saree with Kaduwa zari, antique zari work and blouse with border.",
    image: `/images/sarees/r7200-${String(i + 1).padStart(2, "0")}.jpeg`,
  })),
];

export default products;