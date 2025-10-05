// Test script to check URL encoding
const testProducts = [
    "AC Blower Motor",
    "AC Air Filter Set",
    "AC Capacitor 45/5 µF"
];

console.log("Testing URL encoding for product names:");
testProducts.forEach(productName => {
    const encodedName = encodeURIComponent(productName);
    const expectedFilename = encodedName + ".html";
    console.log(`${productName} -> ${expectedFilename}`);
});