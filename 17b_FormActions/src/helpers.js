export const isTooShort = (value, minLength) => value.trim().length < minLength;

export const isTooLong = (value, maxLength) => value.trim().length > maxLength;

export const isEmpty = (value) => value.trim() === '';
