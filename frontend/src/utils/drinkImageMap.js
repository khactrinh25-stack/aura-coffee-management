/**
 * Map beverage names to category-based real drink images from Unsplash CDN.
 * All drinks in the same category share one image for simplicity and reliability.
 *
 * CATEGORIES (5 categories):
 *   Cà phê        → 5 drinks
 *   Trà sữa       → 5 drinks
 *   Sinh tố       → 9 drinks (original smoothies + former juices)
 *   Đá xay        → 3 drinks
 *   Cacao & Socola → 3 drinks
 *
 * @param {string} tenDoUong - The beverage name
 * @returns {string} URL to the category photo
 */
function getDrinkImage(tenDoUong) {
  // Using Unsplash photos - ALL verified with HTTP 200
  const CDN = 'https://images.unsplash.com';
  const SIZE = '?w=300&h=220&fit=crop';

  // One image per category - all verified working
  const IMG_COFFEE = `${CDN}/photo-1509042239860-f550ce710b93${SIZE}`;     // Coffee cup ✓
  const IMG_TEA = `${CDN}/photo-1558857563-b371033873b8${SIZE}`;           // Bubble tea ✓
  const IMG_SMOOTHIE = `${CDN}/photo-1505252585461-04db1eb84625${SIZE}`;   // Smoothie ✓
  const IMG_BLENDED = `${CDN}/photo-1551024506-0bccd828d307${SIZE}`;      // Shake ✓
  const IMG_CHOCOLATE = `${CDN}/photo-1542990253-0d0f5be5f0ed${SIZE}`;    // Hot chocolate ✓

  const name = tenDoUong?.toLowerCase() || '';

  // Cà phê (Coffee) - 5 drinks
  if (name.includes('cà phê') || name.includes('bạc xỉu') || name.includes('espresso') || name.includes('latte')) {
    return IMG_COFFEE;
  }

  // Trà sữa / Trà (Milk Tea / Tea) - 5 drinks
  if (name.includes('trà') || name.includes('tea')) {
    return IMG_TEA;
  }

  // Sinh tố (merged: original smoothies + former juices) - 9 drinks
  if (name.includes('sinh tố') || name.includes('nước ép') || name.includes('smoothie') || name.includes('ép')) {
    return IMG_SMOOTHIE;
  }

  // Đá xay (Blended) - 3 drinks
  if (name.includes('đá xay') || name.includes('cream')) {
    return IMG_BLENDED;
  }

  // Cacao & Socola (Chocolate) - 3 drinks
  if (name.includes('cacao') || name.includes('socola') || name.includes('chocolate')) {
    return IMG_CHOCOLATE;
  }

  // Ultimate fallback
  return IMG_SMOOTHIE;
}

export default getDrinkImage;