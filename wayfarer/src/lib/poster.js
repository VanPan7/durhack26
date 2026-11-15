import { esc } from './escape.js';

const safeUrl = (u) => (/^https?:\/\//.test(u || '') ? u : '');

// Picks one activity that has a usable image (random, so retakes look different).
export function pickPhoto(activities = []) {
  const withImg = activities.filter((a) => safeUrl(a.image));
  if (!withImg.length) return null;
  const a = withImg[Math.floor(Math.random() * withImg.length)];
  return { src: safeUrl(a.image), credit: a.image_copyright || '', title: a.title || '' };
}

// Markup for the photo layer of a poster ('' when there is no photo).
export const photoLayer = (photo) => (photo
  ? `<img class="poster-img" src="${esc(photo.src)}" alt="" loading="lazy" referrerpolicy="no-referrer">`
  : '');

export const photoCredit = (photo) => (photo && photo.credit
  ? `<small class="act-credit">Photo: ${esc(photo.credit)}</small>` : '');

// If an image fails to load, fall back to the coloured poster.
export function guardPhotos(root) {
  root.querySelectorAll('.poster-img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.poster')?.classList.remove('poster--photo');
      img.remove();
    });
  });
}
