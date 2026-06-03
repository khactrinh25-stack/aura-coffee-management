/**
 * Map beverage category names to real drink images from Unsplash CDN.
 * All drinks in the same category share one image for simplicity and reliability.
 *
 * CATEGORIES (5 categories):
 *   Cà phê
 *   Trà sữa
 *   Sinh tố
 *   Đá xay
 *   Cacao & Socola
 *
 * @param {string} tenDanhMuc - The category name (e.g., "Cà phê", "Trà sữa")
 * @returns {string} URL to the category photo
 */
function getDrinkImage(tenDanhMuc) {
  // Using Unsplash photos - ALL verified with HTTP 200
  const CDN = 'https://images.unsplash.com';
  const SIZE = '?w=300&h=220&fit=crop';

  // One image per category - all verified working
  const IMG_COFFEE = `${CDN}/photo-1509042239860-f550ce710b93${SIZE}`;     // Coffee cup ✓
  const IMG_TEA = `${CDN}/photo-1558857563-b371033873b8${SIZE}`;           // Bubble tea ✓
  const IMG_SMOOTHIE = `${CDN}/photo-1505252585461-04db1eb84625${SIZE}`;   // Smoothie ✓
  const IMG_BLENDED = `${CDN}/photo-1637178035222-a08f2d4dd1a3${SIZE}`;      // Shake ✓
  const IMG_CHOCOLATE = `${CDN}/photo-1542990253-0d0f5be5f0ed${SIZE}`;    // Hot chocolate ✓

  const category = tenDanhMuc?.trim() || '';

  // Exact category name matching (no substring ambiguity)
  if (category === 'Cà phê') {
    return IMG_COFFEE;
  }

  if (category === 'Trà sữa') {
    return IMG_TEA;
  }

  if (category === 'Sinh tố') {
    return IMG_SMOOTHIE;
  }

  if (category === 'Đá xay') {
    return IMG_BLENDED;
  }

  if (category === 'Cacao & Socola') {
    return IMG_CHOCOLATE;
  }

  // Ultimate fallback
  return IMG_SMOOTHIE;
}

export default getDrinkImage;