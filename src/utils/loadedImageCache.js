// Tracks image URLs the browser has already fetched somewhere on the page
// (e.g. a project card's cover image) so a component showing that same URL
// again later (e.g. the project detail modal's gallery) can skip its "still
// loading" state instead of flashing a spinner for an image that's already
// sitting in the browser cache.
const loadedImageUrls = new Set();

export const markImageLoaded = (url) => {
  if (url) loadedImageUrls.add(url);
};

export const isImageLoaded = (url) => loadedImageUrls.has(url);
