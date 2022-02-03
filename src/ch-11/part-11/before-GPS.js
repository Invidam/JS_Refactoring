export function result(points) {
  function calculateAscent() {
    for (let i = 1; i < points.length; i++) {
      const verticalChange = points[i] - points[i - 1];

      totalAscent += verticalChange > 0 ? verticalChange : 0;
    }
  }

  let totalAscent = 0;
  calculateAscent();

  return totalAscent;
}
