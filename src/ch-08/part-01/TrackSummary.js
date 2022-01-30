function trackSummary(points) {
  const totalTime = calculateTime();

  const pace = totalTime / 60 / totalDistance(points);

  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace, // km/h
  };

  // 총 시간 계산
  function calculateTime(params) {
    return 3600; // min
  }
}

const points = [
  { lat: 0, lon: 0 },
  { lat: 3, lon: 4 },
  { lat: 7, lon: 1 },
  //   { x: 7, y: 3 },
  //   { x: 20, y: 0 },
];

console.log(trackSummary(points));

// 총 거리 계산
function totalDistance(points) {
  let result = 0;

  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}
function distance(p1, p2) {
  // return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  // 하버사인 공식은 다음 링크 참고
  // http://www.movable-type.co.uk/scrips/latlong.html
  const EARTH_RADIUS = 3959; // mile
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p2.lat)) *
      Math.cos(radians(p1.lat)) *
      Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}

// 라디안 값으로 변환
function radians(degrees) {
  return (degrees * Math.PI) / 180;
}
