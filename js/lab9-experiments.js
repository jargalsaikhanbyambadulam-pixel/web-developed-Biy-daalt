// Лаб 9.1: Хувьсагч, төрөл, хөрвүүлэлтийн жижиг туршилт
const brandName = "Билэг ус";
const experienceYears = 14;
const isFreeDelivery = true;
let discountCode = null;
let pendingOrder;
const sampleProductId = Symbol("productId");
const bigStockCount = 1000000000000n;

console.table([
  { expression: "brandName", value: brandName, type: typeof brandName },
  { expression: "experienceYears", value: experienceYears, type: typeof experienceYears },
  { expression: "isFreeDelivery", value: isFreeDelivery, type: typeof isFreeDelivery },
  { expression: "discountCode", value: discountCode, type: typeof discountCode },
  { expression: "pendingOrder", value: pendingOrder, type: typeof pendingOrder },
  { expression: "sampleProductId", value: String(sampleProductId), type: typeof sampleProductId },
  { expression: "bigStockCount", value: bigStockCount.toString(), type: typeof bigStockCount }
]);

console.table([
  { caseName: "0.1 + 0.2", result: 0.1 + 0.2, type: typeof (0.1 + 0.2) },
  { caseName: "Number((0.1 + 0.2).toFixed(2))", result: Number((0.1 + 0.2).toFixed(2)), type: typeof Number((0.1 + 0.2).toFixed(2)) },
  { caseName: 'Number("45000")', result: Number("45000"), type: typeof Number("45000") },
  { caseName: '"12" + 3 (implicit)', result: "12" + 3, type: typeof ("12" + 3) },
  { caseName: '"12" - 3 (implicit)', result: "12" - 3, type: typeof ("12" - 3) }
]);