export function isInvalidText(text) {
  return !text || text.trim() === '';
}

export function isInvalidEmail(email) {
  return !email || !email.includes('@');
}

export function isInvalidImage(image) {
  if (!image) return true;
  return !(image.size > 0);
}
