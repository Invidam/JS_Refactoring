export function subtractDate(date = new Date(), value) {
  return new Date(new Date().setDate(date.getDate() - value));
}
