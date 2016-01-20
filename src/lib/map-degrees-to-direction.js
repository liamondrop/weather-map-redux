const CARDINAL_DIRECTIONS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW', 'N'
]

export default function mapDegreesToDirection(degrees) {
  const index = Math.round(degrees / 11.25 / 2);
  return CARDINAL_DIRECTIONS[index];
}
